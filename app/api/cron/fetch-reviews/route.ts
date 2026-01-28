import { NextRequest, NextResponse } from "next/server";
import { createSerpAPIClient, SerpAPIReview } from "@/lib/serpapi";
import { getReviewsCollection } from "@/lib/mongodb";
import { transformBatchReviews } from "@/utils/review-transformer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get("authorization");
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

    if (authHeader !== expectedAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate Place ID environment variable
    const placeId = process.env.GOOGLE_PLACE_ID;
    if (!placeId) {
      return NextResponse.json(
        { error: "GOOGLE_PLACE_ID environment variable is not set" },
        { status: 500 },
      );
    }

    // Fetch from SerpAPI with pagination
    const serpClient = createSerpAPIClient();
    const startTime = Date.now();
    const allReviews: SerpAPIReview[] = [];
    let nextPageToken: string | undefined = undefined;
    let pageCount = 0;

    do {
      const response = await serpClient.getGoogleReviews(placeId, {
        language: "pt",
        sortBy: "newest",
        ...(nextPageToken && { next_page_token: nextPageToken }),
      });

      if (response.reviews && response.reviews.length > 0) {
        allReviews.push(...response.reviews);
        pageCount++;
      }

      nextPageToken = response.serpapi_pagination?.next_page_token;

      // Rate limit: wait 1s between requests
      if (nextPageToken) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } while (nextPageToken);

    console.log(
      `[Cron] Fetched ${allReviews.length} reviews from ${pageCount} pages`,
    );

    if (!allReviews || allReviews.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No reviews found",
        count: 0,
      });
    }

    // Transform reviews
    const defaultImage =
      process.env.DEFAULT_REVIEW_IMAGE || "/default-avatar.jpg";
    const transformedReviews = transformBatchReviews(allReviews, defaultImage);

    // Store in MongoDB
    const collection = await getReviewsCollection();

    // Use upsert to avoid duplicates based on reviewId
    const bulkOps = transformedReviews.map((review) => {
      // Remove createdAt and updatedAt from the review to avoid conflict with $setOnInsert
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { createdAt, updatedAt, ...reviewData } = review;

      return {
        updateOne: {
          filter: { reviewId: review.reviewId },
          update: {
            $set: { ...reviewData, updatedAt: new Date() },
            $setOnInsert: { createdAt: new Date() },
          },
          upsert: true,
        },
      };
    });

    const result = await collection.bulkWrite(bulkOps);

    // Create indexes if they don't exist
    await collection.createIndex({ reviewId: 1 }, { unique: true });
    await collection.createIndex({
      isActive: 1,
      rating: -1,
      publishedDate: -1,
    });
    await collection.createIndex({ publishedDate: -1 });

    const executionTime = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      message: "Reviews fetched and stored successfully",
      stats: {
        totalFetched: allReviews.length,
        pagesProcessed: pageCount,
        inserted: result.upsertedCount,
        updated: result.modifiedCount,
        executionTimeMs: executionTime,
      },
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("[Cron] Error fetching reviews:", error);

    return NextResponse.json(
      {
        success: false,
        error: errorMessage || "Failed to fetch reviews",
      },
      { status: 500 },
    );
  }
}

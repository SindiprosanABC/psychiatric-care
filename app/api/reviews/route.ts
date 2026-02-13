import { NextRequest, NextResponse } from "next/server";
import { getReviewsCollection } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ReviewResponse {
  reviewId: string;
  authorName: string;
  authorImage: string | null;
  rating: number;
  reviewText: string;
  relativeDate: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const minRating = parseInt(searchParams.get("minRating") || "1", 10);

    const collection = await getReviewsCollection();

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build query
    const query = {
      isActive: true,
      rating: { $gte: minRating },
    };

    // Fetch reviews and total count in parallel
    const [reviews, total] = await Promise.all([
      collection
        .find(query)
        .sort({ rating: -1, publishedDate: -1 }) // Sort by highest rating, then newest
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments(query),
    ]);

    // Transform to frontend format (only necessary fields)
    const reviewsList: ReviewResponse[] = reviews.map((review) => ({
      reviewId: review.reviewId,
      authorName: review.authorName,
      authorImage: review.authorImage,
      rating: review.rating,
      reviewText: review.reviewText,
      relativeDate: review.relativeDate,
    }));

    return NextResponse.json({
      reviews: reviewsList,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("[API] Error fetching reviews:", errorMessage);

    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 },
    );
  }
}

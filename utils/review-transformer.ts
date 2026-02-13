import type { SerpAPIReview } from "@/lib/serpapi";

interface TransformedReview {
  reviewId: string;
  authorName: string;
  authorImage: string | null;
  rating: number;
  reviewText: string;
  publishedDate: Date;
  relativeDate: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorIsLocalGuide?: boolean;
  authorReviewCount?: number;
  likes?: number;
  ownerResponse?: {
    date: Date;
    text: string;
  };
}

export function transformSerpAPIReview(
  review: SerpAPIReview,
  defaultImage: string = "/default-avatar.jpg",
): TransformedReview {
  // Use SerpAPI's review_id if available, otherwise generate from author name and date
  const reviewId =
    review.review_id ||
    generateReviewId(
      review.user?.name || "anonymous",
      review.date || new Date().toISOString(),
    );

  // Parse date - SerpAPI returns relative dates like "2 months ago"
  // We need to convert this to an actual Date object
  const publishedDate = parseSerpAPIDate(review.date || "");

  return {
    // Core review data
    reviewId,
    authorName: review.user?.name || "Usuário Anônimo",
    authorImage: review.user?.thumbnail || defaultImage,
    rating: review.rating || 5,
    reviewText: review.snippet || "",
    publishedDate,
    relativeDate: review.date || "Recentemente",

    // Metadata
    isActive: true, // All reviews active by default
    createdAt: new Date(),
    updatedAt: new Date(),

    // Optional fields
    authorIsLocalGuide: review.user?.local_guide || false,
    authorReviewCount: review.user?.reviews || 0,
    likes: review.likes || 0,

    // Owner response
    ownerResponse: review.response_from_owner_text
      ? {
          date: new Date(review.response_from_owner_date || ""),
          text: review.response_from_owner_text,
        }
      : undefined,
  };
}

function generateReviewId(authorName: string, date: string): string {
  // Create a stable, unique ID from author name and date
  const cleanName = authorName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .substring(0, 30);

  // Extract date portion if available
  const dateHash = Buffer.from(date).toString("base64").substring(0, 8);

  return `${cleanName}-${dateHash}`;
}

function parseSerpAPIDate(relativeDate: string): Date {
  // SerpAPI returns dates like:
  // "2 months ago", "3 weeks ago", "5 days ago", "1 year ago"

  const now = new Date();
  const match = relativeDate.match(/(\d+)\s+(month|week|day|year)s?\s+ago/i);

  if (!match) {
    return now; // Default to now if parsing fails
  }

  const [, amount, unit] = match;
  const value = parseInt(amount, 10);

  switch (unit.toLowerCase()) {
    case "year":
      now.setFullYear(now.getFullYear() - value);
      break;
    case "month":
      now.setMonth(now.getMonth() - value);
      break;
    case "week":
      now.setDate(now.getDate() - value * 7);
      break;
    case "day":
      now.setDate(now.getDate() - value);
      break;
  }

  return now;
}

export function transformBatchReviews(
  reviews: SerpAPIReview[],
  defaultImage?: string,
): TransformedReview[] {
  return reviews
    .map((review) => transformSerpAPIReview(review, defaultImage))
    .filter((review) => {
      // Filter out reviews without text or with ratings below 5 stars
      return review.reviewText.length > 0 && review.rating >= 5;
    });
}

export type { TransformedReview };

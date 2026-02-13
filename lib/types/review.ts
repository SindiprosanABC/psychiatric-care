// SerpAPI Google Reviews Response Types
export interface SerpAPIReview {
  position?: number;
  user?: {
    name?: string;
    link?: string;
    thumbnail?: string;
    local_guide?: boolean;
    reviews?: number;
    photos?: number;
  };
  rating?: number;
  date?: string;
  snippet?: string;
  likes?: number;
  images?: Array<{
    link?: string;
    thumbnail?: string;
  }>;
  response_from_owner_date?: string;
  response_from_owner_text?: string;
  review_id?: string;
}

export interface SerpAPIGoogleReviewsResponse {
  search_metadata?: {
    id?: string;
    status?: string;
    created_at?: string;
    processed_at?: string;
  };
  search_parameters?: {
    engine?: string;
    place_id?: string;
    hl?: string;
  };
  place_results?: {
    title?: string;
    rating?: number;
    reviews?: number;
  };
  reviews?: SerpAPIReview[];
  serpapi_pagination?: {
    next?: string;
    next_page_token?: string;
  };
}

// Internal Review Type (stored in MongoDB)
export interface Review {
  reviewId: string; // Unique identifier
  authorName: string;
  authorImage: string | null;
  rating: number; // 1-5
  reviewText: string;
  publishedDate: Date;
  relativeDate: string; // e.g., "2 meses atrás"
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Optional metadata
  authorIsLocalGuide?: boolean;
  authorReviewCount?: number;
  likes?: number;
  ownerResponse?: {
    date: Date;
    text: string;
  };
}

// Frontend Review Type (displayed in component)
export interface ReviewDisplay {
  reviewId: string;
  authorName: string;
  authorImage: string | null;
  rating: number;
  reviewText: string;
  relativeDate: string;
}

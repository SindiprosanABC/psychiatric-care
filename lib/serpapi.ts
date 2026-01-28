interface SerpAPIReview {
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

interface SerpAPIGoogleReviewsResponse {
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

export class SerpAPIClient {
  private apiKey: string;
  private baseUrl = "https://serpapi.com/search";

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("SerpAPI key is required");
    }
    this.apiKey = apiKey;
  }

  async getGoogleReviews(
    placeId: string,
    options?: {
      language?: string;
      sortBy?: "most_relevant" | "newest" | "highest_rating" | "lowest_rating";
      limit?: number;
      next_page_token?: string;
    },
  ): Promise<SerpAPIGoogleReviewsResponse> {
    const params = new URLSearchParams({
      api_key: this.apiKey,
      engine: "google_maps_reviews",
      place_id: placeId,
      hl: options?.language || "pt",
    });

    // SerpAPI uses 'sort_by' parameter for sorting
    if (options?.sortBy) {
      params.append("sort_by", options.sortBy);
    }

    // Add pagination token if provided
    if (options?.next_page_token) {
      params.append("next_page_token", options.next_page_token);
    }

    const response = await fetch(`${this.baseUrl}?${params}`, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("SerpAPI rate limit exceeded");
      }
      if (response.status === 401) {
        throw new Error("SerpAPI authentication failed - check API key");
      }
      throw new Error(`SerpAPI error: ${response.statusText}`);
    }

    const data: SerpAPIGoogleReviewsResponse = await response.json();

    // Filter reviews if limit specified
    if (options?.limit && data.reviews) {
      data.reviews = data.reviews.slice(0, options.limit);
    }

    return data;
  }
}

export function createSerpAPIClient() {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    throw new Error("SERPAPI_KEY environment variable is not set");
  }
  return new SerpAPIClient(apiKey);
}

export type { SerpAPIReview, SerpAPIGoogleReviewsResponse };

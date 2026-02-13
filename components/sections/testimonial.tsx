"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface ReviewProps {
  reviewId: string;
  authorName: string;
  authorImage: string | null;
  rating: number;
  reviewText: string;
  relativeDate: string;
}

export const TestimonialSection = () => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedReview, setSelectedReview] = useState<ReviewProps | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    console.log("TestimonialSection mounted", reviews);
  }, [reviews]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("/api/reviews?limit=50&minRating=5");
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();
        setReviews(data.reviews || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const openReviewModal = (review: ReviewProps) => {
    setSelectedReview(review);
    setIsDialogOpen(true);
  };

  const isTextTruncated = (text: string) => {
    return text.length > 100;
  };

  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${index < rating
            ? "fill-[#6b2b2c] text-[#6b2b2c]"
            : "fill-gray-300 text-gray-300"
          }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="bg-gray-50 py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-2 text-xl font-semibold text-gray-600">Avaliações</p>
          <h2 className="text-3xl font-bold text-[#6b2b2c]">
            Veja o que os pacientes estão dizendo
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#6b2b2c]"></div>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-gray-600">
              Não foi possível carregar as avaliações. Tente novamente mais tarde.
            </p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-600">
              Nenhuma avaliação disponível no momento.
            </p>
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
            }}
            className="mx-auto w-[85%] sm:w-[90%] lg:max-w-screen-xl"
          >
            <CarouselPrevious className="" />
            <CarouselNext />
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem
                  key={review.reviewId}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full flex flex-col border-none bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
                    <CardContent className="flex flex-col justify-between h-full p-8">
                      <div className="flex gap-1 pb-6">
                        {renderStars(review.rating)}
                      </div>
                      <div className="mb-6 flex-1">
                        <p className="text-gray-600 line-clamp-4">{`"${review.reviewText}"`}</p>
                        {isTextTruncated(review.reviewText) && (
                          <button
                            onClick={() => openReviewModal(review)}
                            className="mt-2 text-sm text-[#6b2b2c] hover:underline font-medium"
                          >
                            Ler mais
                          </button>
                        )}
                      </div>
                      <div className="flex flex-row items-center gap-4">
                        {review.authorImage && (
                          <Image
                            src={review.authorImage}
                            alt={review.authorName}
                            className="h-16 w-16 rounded-full object-cover"
                            width={64}
                            height={64}
                          />
                        )}
                        <div className="flex flex-col">
                          <CardTitle className="text-[#6b2b2c]">
                            {review.authorName}
                          </CardTitle>
                          <CardDescription className="text-gray-600">
                            {review.relativeDate}
                          </CardDescription>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        {/* Modal para exibir review completa */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            {selectedReview && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-4">
                    {selectedReview.authorImage && (
                      <img
                        src={selectedReview.authorImage}
                        alt={selectedReview.authorName}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <DialogTitle className="text-[#6b2b2c]">
                        {selectedReview.authorName}
                      </DialogTitle>
                      <DialogDescription className="text-gray-600">
                        {selectedReview.relativeDate}
                      </DialogDescription>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {renderStars(selectedReview.rating)}
                  </div>
                </DialogHeader>
                <div className="mt-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    &ldquo;{selectedReview.reviewText}&rdquo;
                  </p>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

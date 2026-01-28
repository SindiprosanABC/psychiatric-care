"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import Image from "next/image";
import type { News } from "@/lib/types/news";
import Link from "next/link";

export const LatestNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/news?limit=20&category=saude-mental");
        if (!response.ok) throw new Error("Failed to fetch news");
        const data = await response.json();
        setNews(data.news || []);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <section id="news" className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-2 text-xl font-semibold text-gray-600">Notícias</p>
          <h2 className="text-3xl font-bold text-[#6b2b2c]">
            Últimas notícias e atualizações
          </h2>
          <p className="mt-4 text-gray-600">
            Fique por dentro das últimas novidades sobre saúde mental, psiquiatria e bem-estar
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#6b2b2c]"></div>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="text-gray-600">
              Não foi possível carregar as notícias. Tente novamente mais tarde.
            </p>
          </div>
        ) : news.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-600">Nenhuma notícia disponível no momento.</p>
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
              {news.map((newsItem, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="flex h-full flex-col border-none bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
                    <div className="relative h-52 w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={newsItem.imageSrc}
                        alt={newsItem.title}
                        width={500}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="rounded-full bg-[#ffe4cf] px-3 py-1 text-xs font-semibold text-[#6b2b2c]">
                          {newsItem.tag}
                        </span>
                        <span className="text-sm text-gray-500">
                          {newsItem.date}
                        </span>
                      </div>
                      <CardTitle className="line-clamp-2 text-xl text-[#6b2b2c]">
                        {newsItem.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-4">
                      <p className="line-clamp-3 text-gray-600">
                        {newsItem.bodyText}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Link
                        href={newsItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button
                          variant="outline"
                          className="w-full border-[#6b2b2c] text-[#6b2b2c] hover:bg-[#6b2b2c] hover:text-white"
                        >
                          {newsItem.cta}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </section>
  );
};

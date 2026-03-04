import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ObjectId } from 'mongodb';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/card';
import type { News } from '@/lib/types/news';
import { getNewsCollection } from '@/lib/mongodb';

// Fetch da notícia por slug
async function fetchNewsBySlug(slug: string): Promise<News | null> {
  try {
    const collection = await getNewsCollection();
    const article = await collection.findOne({ slug, isActive: true });
    if (!article) return null;
    return article as unknown as News;
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
}

// Fetch de notícias relacionadas
async function fetchRelatedNews(
  tag: string,
  category: string,
  excludeId: string
): Promise<News[]> {
  try {
    const collection = await getNewsCollection();
    const excludeObjectId = excludeId ? new ObjectId(excludeId) : null;

    const baseFilter: Record<string, unknown> = { isActive: true };
    if (excludeObjectId) baseFilter._id = { $ne: excludeObjectId };

    // Busca por tag
    const byTag = await collection
      .find({ ...baseFilter, tag })
      .sort({ publishedAt: -1 })
      .limit(6)
      .toArray();

    let related = byTag;

    // Se não tiver pelo menos 3, complementa com categoria
    if (related.length < 3) {
      const existingIds = related.map((r) => r._id);
      const byCategory = await collection
        .find({
          ...baseFilter,
          category,
          _id: { $nin: existingIds },
        })
        .sort({ publishedAt: -1 })
        .limit(6 - related.length)
        .toArray();
      related = [...related, ...byCategory];
    }

    return related.slice(0, 6) as unknown as News[];
  } catch (error) {
    console.error('Error fetching related news:', error);
    return [];
  }
}

// Geração de metadata para SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = await fetchNewsBySlug(slug);
  console.log('Generated metadata for slug:', news);

  if (!news) {
    return {
      title: 'Notícia não encontrada | Psychiatric Care',
    };
  }

  return {
    title: `${news.title} | Psychiatric Care`,
    description: news.bodyText,
    openGraph: {
      title: news.title,
      description: news.bodyText,
      images: [news.imageSrc],
      type: 'article',
      publishedTime: news.publishedAt
        ? new Date(news.publishedAt).toISOString()
        : undefined,
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = await fetchNewsBySlug(slug);

  // Se não encontrar ou estiver inativa, retorna 404
  if (!news || !news.isActive) {
    notFound();
  }

  // Busca notícias relacionadas
  const relatedNews = await fetchRelatedNews(
    news.tag,
    news.category || 'saude-mental',
    news._id || ''
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="container mx-auto px-4 pt-8 pb-0">
          <div className="mx-auto max-w-4xl">
            {/* Tag Badge */}
            <div className="mb-4">
              <span className="inline-block rounded-full bg-[#ffe4cf] px-4 py-1 text-sm font-medium text-[#6b2b2c]">
                {news.tag}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-bold text-[#6b2b2c] md:text-5xl">
              {news.title}
            </h1>

            {/* Metadata */}
            <div className="mb-6 flex items-center gap-4 text-gray-600">
              <span>{news.date}</span>
              {news.author && (
                <>
                  <span>•</span>
                  <span>Por {news.author}</span>
                </>
              )}
            </div>

            {/* Description/Lead */}
            {(news.bodyText) && (
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                {news.bodyText}
              </p>
            )}

            {/* Featured Image */}
            <div className="relative mb-12 h-96 w-full overflow-hidden rounded-lg">
              <Image
                src={news.imageSrc}
                alt={news.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div
              className="prose prose-lg prose-headings:text-[#6b2b2c] prose-a:text-[#6b2b2c] prose-strong:text-[#6b2b2c] max-w-none"
              dangerouslySetInnerHTML={{ __html: news.content || '' }}
            />
          </div>
        </div>
      </section>

      {/* Related News Section */}
      {relatedNews.length > 0 && (
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-[#6b2b2c] md:text-4xl">
                Notícias Relacionadas
              </h2>
              <p className="mt-3 text-gray-600">
                Explore mais conteúdos sobre este tema
              </p>
            </div>

            {/* Carousel */}
            <Carousel
              opts={{
                align: 'start',
              }}
              className="mx-auto w-full max-w-7xl"
            >
              <CarouselContent className="-ml-4">
                {relatedNews.map((item) => (
                  <CarouselItem
                    key={item._id}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="flex h-full flex-col border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-[#6b2b2c]/20 hover:shadow-lg">
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          width={500}
                          height={300}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                      <CardHeader className="pb-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="rounded-full bg-[#ffe4cf] px-3 py-1 text-xs font-semibold text-[#6b2b2c]">
                            {item.tag}
                          </span>
                          <span className="text-xs text-gray-500">
                            {item.date}
                          </span>
                        </div>
                        <CardTitle className="line-clamp-2 text-lg font-bold text-[#6b2b2c] transition-colors hover:text-[#5a1f20]">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 pb-4">
                        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                          {item.bodyText}
                        </p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Link href={`/noticias/${item.slug}`} className="w-full">
                          <Button
                            variant="outline"
                            className="w-full border-[#6b2b2c] text-[#6b2b2c] transition-all hover:bg-[#6b2b2c] hover:text-white"
                          >
                            Ler artigo →
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-12 hidden lg:flex" />
              <CarouselNext className="-right-12 hidden lg:flex" />
            </Carousel>
          </div>
        </section>
      )}

      {/* Back to News CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#6b2b2c] to-[#5a1f20] py-16">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Explore Mais Notícias
            </h3>
            <p className="mb-8 text-lg text-white/90">
              Descubra as últimas novidades sobre saúde mental, bem-estar e
              cuidados psiquiátricos
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/#news">
                <Button
                  size="lg"
                  className="bg-white text-[#6b2b2c] shadow-lg transition-all hover:bg-gray-100"
                >
                  ← Ver Todas as Notícias
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

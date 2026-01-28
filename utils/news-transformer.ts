import { generateSlug } from "./slug-generator";
import { formatDatePortuguese } from "./date-formatter";
import type { NewsAPIArticle } from "@/lib/newsapi";

interface TransformedNewsArticle {
  slug: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  source: { id: string | null; name: string };
  author: string | null;
  imageSrc: string;
  tag: string;
  date: string;
  bodyText: string;
  cta: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  language: string;
  category: string;
}

export function transformNewsAPIArticle(
  article: NewsAPIArticle,
  defaultImage: string = "/news-placeholder.jpg",
  category: string = "saude-mental",
): TransformedNewsArticle {
  const publishedAt = new Date(article.publishedAt);
  const slug = generateSlug(article.title, publishedAt);

  // Extract clean body text (NewsAPI content is truncated with [+chars])
  const bodyText = article.description || article.content || "";

  // Determine tag based on source or keywords
  const tag = determineTag(article.title, article.description);

  return {
    // Original NewsAPI fields
    title: article.title,
    description: article.description || "",
    content: article.content || "",
    url: article.url,
    urlToImage: article.urlToImage || defaultImage,
    publishedAt,
    source: article.source,
    author: article.author,

    // Transformed fields for your app
    slug,
    imageSrc: article.urlToImage || defaultImage,
    tag,
    date: formatDatePortuguese(publishedAt),
    bodyText: bodyText,
    cta: "Saiba mais",

    // Metadata
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    language: "pt",
    category,
  };
}

function determineTag(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();

  // Tags customizadas para psiquiatria e saúde mental
  if (
    text.includes("depressão") ||
    text.includes("ansiedade") ||
    text.includes("transtorno") ||
    text.includes("saúde mental")
  ) {
    return "Saúde Mental";
  }
  if (
    text.includes("terapia") ||
    text.includes("tratamento") ||
    text.includes("psicoterapia")
  ) {
    return "Terapias";
  }
  if (
    text.includes("estudo") ||
    text.includes("pesquisa") ||
    text.includes("descoberta")
  ) {
    return "Pesquisas";
  }
  if (
    text.includes("bem-estar") ||
    text.includes("qualidade de vida") ||
    text.includes("autocuidado")
  ) {
    return "Bem-Estar";
  }

  return "Notícias de Saúde"; // Default
}

export function transformBatchArticles(
  articles: NewsAPIArticle[],
  defaultImage?: string,
  category: string = "saude-mental",
): TransformedNewsArticle[] {
  return articles.map((article) =>
    transformNewsAPIArticle(article, defaultImage, category),
  );
}

export type { TransformedNewsArticle };

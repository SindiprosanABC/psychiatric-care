export type News = {
  slug: string;
  imageSrc: string;
  tag: string;
  date: string; // Data formatada em português
  title: string;
  bodyText: string; // Descrição/resumo
  cta: string;
  content: string; // Conteúdo HTML completo
  category: string;
  source?: { id: string | null; name: string };
  author?: string | null;
  url: string;
  // Admin fields
  _id?: string; // MongoDB ObjectId
  isActive?: boolean; // Controle de publicação
  publishedAt?: Date; // Data de publicação (para ordenação)
  createdBy?: string; // ID do usuário que criou
  updatedBy?: string; // ID do usuário que atualizou
  createdAt?: Date; // Data de criação do registro
  updatedAt?: Date; // Data da última atualização
};

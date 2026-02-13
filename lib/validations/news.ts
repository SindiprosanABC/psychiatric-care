import { z } from 'zod';

export const createNewsSchema = z.object({
  title: z
    .string()
    .min(10, 'Título deve ter pelo menos 10 caracteres')
    .max(200, 'Título deve ter no máximo 200 caracteres'),
  description: z
    .string()
    .min(20, 'Descrição deve ter pelo menos 20 caracteres')
    .max(500, 'Descrição deve ter no máximo 500 caracteres'),
  content: z.string().min(50, 'Conteúdo deve ter pelo menos 50 caracteres'),
  tag: z.string().min(1, 'Selecione uma tag'),
  category: z.string().default('saude-mental'),
  imageSrc: z.string().min(1, 'Imagem é obrigatória'),
  publishedAt: z.coerce.date(),
  isActive: z.boolean().default(true),
});

export const updateNewsSchema = z.object({
  _id: z.string().min(1),
  title: z.string().min(10).max(200).optional(),
  description: z.string().min(20).max(500).optional(),
  content: z.string().min(50).optional(),
  tag: z.string().optional(),
  category: z.string().optional(),
  imageSrc: z.string().optional(),
  publishedAt: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
});

export const deleteNewsSchema = z.object({
  _id: z.string().min(1),
});

export type CreateNewsInput = z.infer<typeof createNewsSchema>;
export type UpdateNewsInput = z.infer<typeof updateNewsSchema>;
export type DeleteNewsInput = z.infer<typeof deleteNewsSchema>;

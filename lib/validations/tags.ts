import { z } from 'zod';

export const createTagSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres')
    .refine((val) => val.trim().length > 0, 'Nome não pode ser vazio'),
  slug: z.string().optional(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Cor deve estar no formato hexadecimal (#RRGGBB)'),
  description: z.string().max(200, 'Descrição deve ter no máximo 200 caracteres').optional(),
  order: z.number().int().positive().optional(),
  isActive: z.boolean().default(true),
});

export const updateTagSchema = z.object({
  _id: z.string().min(1),
  name: z.string().min(3).max(50).optional(),
  slug: z.string().optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  description: z.string().max(200).optional(),
  order: z.number().int().positive().optional(),
  isActive: z.boolean().optional(),
});

export const deleteTagSchema = z.object({
  _id: z.string().min(1),
});

export type CreateTagInput = z.infer<typeof createTagSchema>;
export type UpdateTagInput = z.infer<typeof updateTagSchema>;
export type DeleteTagInput = z.infer<typeof deleteTagSchema>;

export interface Tag {
  name: string;
  slug: string;
  color: string; // Hex color (#RRGGBB)
  description?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // ObjectId do usuário
  updatedBy: string;
}

export interface TagDocument extends Tag {
  _id: string;
}

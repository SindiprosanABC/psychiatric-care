/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TipTapEditor } from '@/components/editor/tiptap-editor';
import { Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const newsSchema = z.object({
  title: z.string().min(10, 'Título deve ter pelo menos 10 caracteres').max(200),
  description: z.string().min(20, 'Descrição deve ter pelo menos 20 caracteres').max(500),
  tag: z.string().min(1, 'Selecione uma tag'),
  category: z.string(),
  publishedAt: z.string(),
  isActive: z.boolean(),
});

type NewsForm = z.infer<typeof newsSchema>;

export default function CreateNewsPage() {
  const router = useRouter();
  const [tags, setTags] = useState<any[]>([]);
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsForm>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      publishedAt: new Date().toISOString().split('T')[0],
      isActive: true,
      category: 'saude-mental',
    },
  });

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    const res = await fetch('/api/tags?activeOnly=true');
    if (res.ok) {
      const data = await res.json();
      setTags(data.tags);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: NewsForm) => {
    console.log('Form submitted', { data, content, image });

    if (!image) {
      alert('Por favor, selecione uma imagem');
      return;
    }

    if (!content || content.length < 50) {
      alert('O conteúdo deve ter pelo menos 50 caracteres');
      return;
    }

    setLoading(true);

    try {
      // Upload image
      const formData = new FormData();
      formData.append('file', image);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error('Erro no upload da imagem');
      }

      const { url } = await uploadRes.json();

      // Create news
      const newsRes = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          content,
          imageSrc: url,
        }),
      });

      if (!newsRes.ok) {
        throw new Error('Erro ao criar notícia');
      }

      router.push('/admin/news');
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao criar notícia');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/news"
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-bold">Nova Notícia</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              {...register('title')}
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6b2b2c] outline-none"
              placeholder="Digite o título da notícia"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição *
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6b2b2c] outline-none"
              placeholder="Breve resumo da notícia"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conteúdo *
            </label>
            <TipTapEditor content={content} onChange={setContent} />
            {content.length < 50 && (
              <p className="mt-1 text-sm text-gray-600">
                Mínimo de 50 caracteres ({content.length}/50)
              </p>
            )}
          </div>

          {/* Tag */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tag *
            </label>
            <select
              {...register('tag')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6b2b2c] outline-none"
            >
              <option value="">Selecione uma tag</option>
              {tags.map((tag) => (
                <option key={tag._id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
            {errors.tag && (
              <p className="mt-1 text-sm text-red-600">{errors.tag.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagem *
            </label>
            <div className="flex items-start gap-4">
              <label className="flex-1 border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-[#6b2b2c] transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Clique para selecionar uma imagem
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG ou WebP (max 2MB)
                  </p>
                </div>
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>
          </div>

          {/* Publish Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data de Publicação *
            </label>
            <input
              {...register('publishedAt')}
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6b2b2c] outline-none"
            />
          </div>

          {/* Active Checkbox */}
          <div className="flex items-center gap-2">
            <input
              {...register('isActive')}
              type="checkbox"
              id="isActive"
              className="w-4 h-4 text-[#6b2b2c] rounded focus:ring-[#6b2b2c]"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Publicar imediatamente
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/news"
            className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#6b2b2c] text-white rounded-lg hover:bg-[#5a1f20] transition disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Criar Notícia'}
          </button>
        </div>
      </form>
    </div>
  );
}

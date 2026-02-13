/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { TipTapEditor } from '@/components/editor/tiptap-editor';
import { Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [tags, setTags] = useState<any[]>([]);
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    Promise.all([fetchTags(), fetchNews()]);
  }, [id]);

  const fetchTags = async () => {
    const res = await fetch('/api/tags?activeOnly=true');
    if (res.ok) {
      const data = await res.json();
      setTags(data.tags);
    }
  };

  const fetchNews = async () => {
    try {
      const res = await fetch(`/api/news?all=true`);
      if (res.ok) {
        const data = await res.json();
        const news = data.news.find((n: any) => n._id === id);

        if (news) {
          setValue('title', news.title);
          setValue('description', news.bodyText || news.description);
          setValue('tag', news.tag);
          setValue('publishedAt', new Date(news.publishedAt || news.createdAt).toISOString().split('T')[0]);
          setValue('isActive', news.isActive);
          setContent(news.content);
          setCurrentImage(news.imageSrc);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setCurrentImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: any) => {
    setSubmitting(true);

    try {
      let imageSrc = currentImage;

      // Upload new image if selected
      if (image) {
        const formData = new FormData();
        formData.append('file', image);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (uploadRes.ok) {
          const { url } = await uploadRes.json();
          imageSrc = url;
        }
      }

      // Update news
      const res = await fetch('/api/news', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: id,
          ...data,
          content,
          imageSrc,
        }),
      });

      if (res.ok) {
        router.push('/admin/news');
      } else {
        alert('Erro ao atualizar notícia');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao atualizar notícia');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6b2b2c]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/news" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-bold">Editar Notícia</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              {...register('title')}
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6b2b2c] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição *
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6b2b2c] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conteúdo *
            </label>
            <TipTapEditor content={content} onChange={setContent} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tag *
            </label>
            <select
              {...register('tag')}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6b2b2c] outline-none"
            >
              {tags.map((tag) => (
                <option key={tag._id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagem
            </label>
            <div className="flex items-start gap-4">
              <label className="flex-1 border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-[#6b2b2c]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    {image ? 'Alterar imagem' : 'Manter imagem atual'}
                  </p>
                </div>
              </label>
              {currentImage && (
                <img
                  src={currentImage}
                  alt="Current"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>
          </div>

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

          <div className="flex items-center gap-2">
            <input
              {...register('isActive')}
              type="checkbox"
              id="isActive"
              className="w-4 h-4"
            />
            <label htmlFor="isActive" className="text-sm font-medium">
              Notícia ativa
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/admin/news"
            className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-[#6b2b2c] text-white rounded-lg hover:bg-[#5a1f20] disabled:opacity-50"
          >
            {submitting ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}

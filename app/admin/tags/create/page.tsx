/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const tagSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').max(50),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Cor deve estar no formato hexadecimal (#RRGGBB)'),
  description: z.string().max(200).optional(),
  order: z.number().int().positive().optional(),
  isActive: z.boolean(),
});

type TagForm = z.infer<typeof tagSchema>;

const PRESET_COLORS = [
  { value: '#6B2B2C', name: 'Burgundy' },
  { value: '#10B981', name: 'Verde' },
  { value: '#EF4444', name: 'Vermelho' },
  { value: '#8B5CF6', name: 'Roxo' },
  { value: '#F59E0B', name: 'Laranja' },
  { value: '#6B7280', name: 'Cinza' },
  { value: '#3B82F6', name: 'Azul' },
];

export default function CreateTagPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#6B2B2C');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TagForm>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      isActive: true,
      color: '#6B2B2C',
    },
  });

  const onSubmit = async (data: TagForm) => {
    setLoading(true);

    try {
      const res = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erro ao criar tag');
      }

      router.push('/admin/tags');
    } catch (error: any) {
      console.error('Erro:', error);
      alert(error.message || 'Erro ao criar tag');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/tags"
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-bold">Nova Tag</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome *
            </label>
            <input
              {...register('name')}
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6b2b2c] outline-none"
              placeholder="Ex: Notícias da indústria"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cor *
            </label>
            <div className="flex items-center gap-3">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => {
                    setSelectedColor(color.value);
                    setValue('color', color.value);
                  }}
                  className={`w-12 h-12 rounded-lg border-2 transition-all ${
                    selectedColor === color.value
                      ? 'border-gray-900 scale-110'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {selectedColor === color.value && (
                    <svg
                      className="w-6 h-6 text-white mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            <input type="hidden" {...register('color')} value={selectedColor} />
            {errors.color && (
              <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição (opcional)
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6b2b2c] outline-none resize-none"
              placeholder="Descrição opcional para ajudar a identificar o propósito da tag"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordem (opcional)
            </label>
            <input
              {...register('order', { valueAsNumber: true })}
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6b2b2c] outline-none"
              placeholder="Deixe em branco para atribuir automaticamente"
            />
            <p className="mt-1 text-xs text-gray-500">
              Ordem de exibição nos dropdowns (menor número aparece primeiro)
            </p>
            {errors.order && (
              <p className="mt-1 text-sm text-red-600">{errors.order.message}</p>
            )}
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
              Tag ativa
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/tags"
            className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#6b2b2c] text-white rounded-lg hover:bg-[#5a1f20] transition disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Criar Tag'}
          </button>
        </div>
      </form>
    </div>
  );
}

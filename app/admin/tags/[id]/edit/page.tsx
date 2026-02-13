/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const PRESET_COLORS = [
  { value: '#6B2B2C', name: 'Burgundy' },
  { value: '#10B981', name: 'Verde' },
  { value: '#EF4444', name: 'Vermelho' },
  { value: '#8B5CF6', name: 'Roxo' },
  { value: '#F59E0B', name: 'Laranja' },
  { value: '#6B7280', name: 'Cinza' },
  { value: '#3B82F6', name: 'Azul' },
];

export default function EditTagPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [originalName, setOriginalName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#6B2B2C');

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    fetchTag();
  }, [id]);

  const fetchTag = async () => {
    try {
      const res = await fetch(`/api/tags?all=true`);
      if (res.ok) {
        const data = await res.json();
        const tag = data.tags.find((t: any) => t._id === id);

        if (tag) {
          setValue('name', tag.name);
          setValue('color', tag.color);
          setValue('description', tag.description || '');
          setValue('order', tag.order);
          setValue('isActive', tag.isActive);
          setOriginalName(tag.name);
          setSelectedColor(tag.color || '#6B2B2C');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    setSubmitting(true);

    // Aviso se o nome foi alterado
    if (data.name !== originalName) {
      const confirm = window.confirm(
        `Alterar o nome da tag de "${originalName}" para "${data.name}" irá atualizar todas as notícias que usam esta tag. Deseja continuar?`
      );
      if (!confirm) {
        setSubmitting(false);
        return;
      }
    }

    try {
      const res = await fetch('/api/tags', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: id,
          ...data,
        }),
      });

      if (res.ok) {
        router.push('/admin/tags');
      } else {
        const error = await res.json();
        alert(error.error || 'Erro ao atualizar tag');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao atualizar tag');
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
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/tags" className="p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-bold">Editar Tag</h1>
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
            />
            {originalName && (
              <p className="mt-1 text-xs text-gray-500">
                ⚠️ Alterar o nome irá atualizar todas as notícias que usam esta tag
              </p>
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
          </div>

          {/* Active Checkbox */}
          <div className="flex items-center gap-2">
            <input
              {...register('isActive')}
              type="checkbox"
              id="isActive"
              className="w-4 h-4"
            />
            <label htmlFor="isActive" className="text-sm font-medium">
              Tag ativa
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/admin/tags"
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

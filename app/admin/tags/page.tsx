'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Eye, EyeOff, Pencil, Trash2 } from 'lucide-react';

interface Tag {
  _id: string;
  name: string;
  slug: string;
  color: string;
  description?: string;
  order: number;
  isActive: boolean;
  usageCount?: number;
}

export default function TagsListPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchTags();
  }, [search, statusFilter]);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ all: 'true' });

      if (search) params.append('search', search);
      if (statusFilter !== 'all') params.append('status', statusFilter);

      const res = await fetch(`/api/tags?${params}`);
      if (res.ok) {
        const data = await res.json();
        setTags(data.tags);
      }
    } catch (error) {
      console.error('Erro ao carregar tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/tags', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id, isActive: !currentStatus }),
      });

      if (res.ok) {
        fetchTags();
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const deleteTag = async (id: string, usageCount: number) => {
    // Avisa se está em uso
    if (usageCount > 0) {
      alert(
        `Esta tag está sendo usada em ${usageCount} notícia(s). Para excluí-la, primeiro remova ou substitua a tag nas notícias.`
      );
      return;
    }

    if (!window.confirm('Tem certeza que deseja excluir esta tag permanentemente?')) {
      return;
    }

    try {
      const res = await fetch('/api/tags', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id }),
      });

      if (res.ok) {
        fetchTags();
      } else {
        const data = await res.json();
        alert(data.error || 'Erro ao excluir tag');
      }
    } catch (error) {
      console.error('Erro ao excluir tag:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Tags</h1>
        <Link
          href="/admin/tags/create"
          className="inline-flex items-center gap-2 bg-[#6b2b2c] text-white px-4 py-2 rounded-lg hover:bg-[#5a1f20] transition"
        >
          <Plus className="w-5 h-5" />
          Nova Tag
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6b2b2c] outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#6b2b2c] outline-none"
          >
            <option value="all">Todos os status</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>
        </div>
      </div>

      {/* Tags List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6b2b2c]" />
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      ) : tags.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">Nenhuma tag encontrada</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ordem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Badge
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tags.map((tag) => (
                  <tr key={tag._id} className="hover:bg-gray-50">
                    {/* Ordem */}
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {tag.order}
                    </td>

                    {/* Badge */}
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag.name}
                      </span>
                    </td>

                    {/* Descrição */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {tag.description || '-'}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            tag.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                          >
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                          {tag.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </td>

                    {/* Ações */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/tags/${tag._id}/edit`}
                          className="p-2 hover:bg-blue-50 rounded-lg transition"
                          title="Editar"
                        >
                          <Pencil className="w-5 h-5 text-blue-600" />
                        </Link>
                        <button
                          onClick={() => toggleActive(tag._id, tag.isActive)}
                          className="p-2 hover:bg-yellow-50 rounded-lg transition"
                          title={tag.isActive ? 'Desativar' : 'Ativar'}
                        >
                          {tag.isActive ? (
                            <EyeOff className="w-5 h-5 text-yellow-600" />
                          ) : (
                            <Eye className="w-5 h-5 text-yellow-600" />
                          )}
                        </button>
                        <button
                          onClick={() => deleteTag(tag._id, tag.usageCount || 0)}
                          className="p-2 hover:bg-red-50 rounded-lg transition"
                          title="Excluir"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

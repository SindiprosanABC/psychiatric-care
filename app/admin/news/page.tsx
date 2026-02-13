'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Eye, EyeOff, Pencil, Trash2 } from 'lucide-react';

interface News {
  _id: string;
  title: string;
  tag: string;
  date: string;
  imageSrc: string;
  isActive: boolean;
}

export default function NewsListPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchNews();
  }, [page, search, statusFilter]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        all: 'true',
        page: page.toString(),
        limit: '10',
      });

      if (search) params.append('search', search);
      if (statusFilter !== 'all') params.append('status', statusFilter);

      const res = await fetch(`/api/news?${params}`);
      if (res.ok) {
        const data = await res.json();
        setNews(data.news);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error('Erro ao carregar notícias:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/news', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id, isActive: !currentStatus }),
      });

      if (res.ok) {
        fetchNews();
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const deleteNews = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta notícia?')) return;

    try {
      const res = await fetch('/api/news', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id }),
      });

      if (res.ok) {
        fetchNews();
      }
    } catch (error) {
      console.error('Erro ao excluir notícia:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Notícias</h1>
        <Link
          href="/admin/news/create"
          className="inline-flex items-center gap-2 bg-[#6b2b2c] text-white px-4 py-2 rounded-lg hover:bg-[#5a1f20] transition"
        >
          <Plus className="w-5 h-5" />
          Nova Notícia
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título..."
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

      {/* News List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6b2b2c]" />
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">Nenhuma notícia encontrada</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Imagem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tag
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {news.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                        {item.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.tag}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {item.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => toggleActive(item._id, item.isActive)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition"
                          title={item.isActive ? 'Desativar' : 'Ativar'}
                        >
                          {item.isActive ? (
                            <EyeOff className="w-4 h-4 text-gray-600" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                        <Link
                          href={`/admin/news/${item._id}/edit`}
                          className="p-2 hover:bg-gray-100 rounded-lg transition"
                          title="Editar"
                        >
                          <Pencil className="w-4 h-4 text-blue-600" />
                        </Link>
                        <button
                          onClick={() => deleteNews(item._id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t flex justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Anterior
              </button>
              <span className="px-4 py-2">
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Próxima
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

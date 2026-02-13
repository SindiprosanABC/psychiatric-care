'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import {
  LayoutDashboard,
  Newspaper,
  Tags,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redireciona para login se não autenticado
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  if (status === 'unauthenticated' && pathname !== '/admin/login') {
    router.push('/admin/login');
    return null;
  }

  // Se estiver na página de login, renderiza sem layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Notícias',
      href: '/admin/news',
      icon: Newspaper,
    },
    {
      name: 'Tags',
      href: '/admin/tags',
      icon: Tags,
    },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#6b2b2c] text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Painel Admin</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md hover:bg-[#5a1f20]"
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#6b2b2c] text-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 hidden lg:block">
            <h1 className="text-2xl font-bold">Painel Admin</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 mt-16 lg:mt-0">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white text-[#6b2b2c]'
                      : 'hover:bg-[#5a1f20]'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info & logout */}
          <div className="p-4 border-t border-[#5a1f20]">
            <div className="mb-3 px-4">
              <p className="text-sm text-gray-300">Conectado como</p>
              <p className="font-medium truncate">
                {session?.user?.email || 'Admin'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg w-full hover:bg-[#5a1f20] transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

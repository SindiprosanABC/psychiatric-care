import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-[#6b2b2c]">404</h1>
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          Notícia não encontrada
        </h2>
        <p className="mb-8 text-lg text-gray-600">
          A notícia que você está procurando não existe ou foi removida.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/#news">
            <Button
              variant="outline"
              className="border-[#6b2b2c] text-[#6b2b2c] hover:bg-[#6b2b2c] hover:text-white"
            >
              Ver todas as notícias
            </Button>
          </Link>
          <Link href="/">
            <Button className="bg-[#6b2b2c] text-white hover:bg-[#5a1f20]">
              Voltar para o início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

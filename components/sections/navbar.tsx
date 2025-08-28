import Link from "next/link";
import { Button } from "../button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../sheet";
import Image from "next/image";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative flex h-20 w-32 items-center justify-center md:h-24 md:w-32">
            <Image
              src={"/logo-fraviana.png"}
              width={600}
              height={600}
              alt="logo marca Flaviana psiquiatra"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          <Link
            href="/"
            className="font-medium text-[#6b2b2c] transition-colors hover:text-[#b77c5a]"
          >
            Home
          </Link>
          <Link
            href="/#services"
            className="font-medium text-[#6b2b2c] transition-colors hover:text-[#b77c5a]"
          >
            Serviços
          </Link>
          <Link
            href="/#benefits"
            className="font-medium text-[#6b2b2c] transition-colors hover:text-[#b77c5a]"
          >
            Benefícios
          </Link>
          <Link
            href="/#about"
            className="font-medium text-[#6b2b2c] transition-colors hover:text-[#b77c5a]"
          >
            Sobre
          </Link>
          <Link
            href="/#contact"
            className="font-medium text-[#6b2b2c] transition-colors hover:text-[#b77c5a]"
          >
            Contato
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="https://wa.me/5513998083034?text=Ol%C3%A1,%20estou%20iniciando%20uma%20conversa%20pelo%20site%20do%20SindiprosanABC"
            target="_blank"
            className=""
          >
            <Button className="hidden bg-[#ffe4cf] text-[#6b2b2c] hover:cursor-pointer hover:bg-[#ffe4cf]/90 md:flex">
              Contate Nos
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="border-[#6b2b2c] text-[#6b2b2c] hover:cursor-pointer lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-6 sm:w-[400px]">
              <nav className="mt-8 flex flex-col gap-4">
                <Link
                  href="/"
                  className="border-b py-2 font-medium text-[#6b2b2c] transition-colors hover:text-[#ffe4cf]"
                >
                  Home
                </Link>
                <Link
                  href="/#about"
                  className="border-b py-2 font-medium text-[#6b2b2c] transition-colors hover:text-[#ffe4cf]"
                >
                  Sobre Nós
                </Link>
                <Link
                  href="/#benefits"
                  className="border-b py-2 font-medium text-[#6b2b2c] transition-colors hover:text-[#ffe4cf]"
                >
                  Benefícios
                </Link>
                <Link
                  href="/#education"
                  className="border-b py-2 font-medium text-[#6b2b2c] transition-colors hover:text-[#ffe4cf]"
                >
                  Educação
                </Link>
                <Link
                  href="/#news"
                  className="border-b py-2 font-medium text-[#6b2b2c] transition-colors hover:text-[#ffe4cf]"
                >
                  Notícias
                </Link>
                <Link
                  href="/#contact"
                  className="border-b py-2 font-medium text-[#6b2b2c] transition-colors hover:text-[#ffe4cf]"
                >
                  Contato
                </Link>
                <Button className="mt-4 bg-[#ffe4cf] hover:cursor-pointer hover:bg-[#ffe4cf]/90">
                  Join Now
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

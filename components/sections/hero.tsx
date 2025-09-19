import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "../button";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center py-12 md:py-24 lg:flex-row">
          <div className="mb-12 w-full pr-0 lg:mb-0 lg:w-1/2 lg:pr-16">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-[#6b2b2c] md:text-5xl">
              Dra. Flaviana Becker Dartora
            </h1>
            <p className="mb-8 max-w-lg text-xl text-gray-600">
              Psiquiatra para crianças, adolescentes e adultos.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="https://wa.me/5513998083034?text=Ol%C3%A1,%20estou%20iniciando%20uma%20conversa%20pelo%20site%20da%20Doutora Flaviana Becker"
                target="_blank"
              >
                <Button className="rounded-full bg-[#6b2b2c] px-8 text-white hover:cursor-pointer hover:bg-[#5a2324]">
                  Marque uma consulta <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href={"/#about"}>
                <Button
                  variant="outline"
                  className="rounded-full border-[#6b2b2c] px-8 text-[#6b2b2c] hover:cursor-pointer"
                >
                  Quem eu sou
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative w-full lg:w-1/2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/profile-image-2.jpeg"
                alt="Doctor portrait"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-xl bg-white p-4 shadow-lg">
              <div className="rounded-full bg-[#ffe4cf] p-2">
                <Calendar className="h-6 w-6 text-[#6b2b2c]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Atendimento</p>
                <p className="font-semibold text-[#6b2b2c]">
                  Marque um horário
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

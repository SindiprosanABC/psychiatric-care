import { ArrowRight } from "lucide-react";
import { Button } from "../button";
import Link from "next/link";
import Image from "next/image";

export const Experience = () => {
  return (
    <section id="benefits" className="bg-white py-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <h2 className="mb-6 text-3xl font-bold text-[#6b2b2c]">
              Uma rica experiência para ajudar você a resgatar a sua saúde
              mental
            </h2>
            <p className="mb-6 text-gray-600">
              Como psiquiatra especializada em crianças e adolescentes, dediquei
              minha carreira a compreender e tratar os desafios singulares de
              saúde mental enfrentados por jovens e suas famílias.
            </p>
            <p className="mb-6 text-gray-600">
              Após concluir minha formação em psiquiatria de adultos, busquei
              uma especialização adicional que me permite avaliar de forma
              abrangente comportamentos e emoções em crianças e adolescentes,
              considerando seus contextos familiares, escolares e sociais.
            </p>
            <Link
              href="https://wa.me/5513998083034?text=Ol%C3%A1,%20estou%20iniciando%20uma%20conversa%20pelo%20site%20da%20Doutora Flaviana Becker"
              target="_blank"
            >
              <Button className="rounded-full bg-[#6b2b2c] px-8 text-white hover:cursor-pointer hover:bg-[#5a2324]">
                Marque uma consulta <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative w-full lg:w-1/2">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/flaviana.jpeg"
                alt="Doctor portrait"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-xl bg-white p-4 shadow-lg">
              <div>
                <p className="font-semibold text-[#6b2b2c]">
                  +20 anos de experiência
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { ArrowRight } from "lucide-react";
import { Button } from "../button";
import Link from "next/link";

export const Experience = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <h2 className="mb-6 text-3xl font-bold text-[#6b2b2c]">
              Uma Rica Experiência para Ajudar Você a se Curar
            </h2>
            <p className="mb-6 text-gray-600">
              Como psiquiatra especializado em crianças e adolescentes, dediquei
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
              href="https://wa.me/551338777780?text=Ol%C3%A1,%20estou%20iniciando%20uma%20conversa%20pelo%20site%20do%20SindiprosanABC"
              target="_blank"
            >
              <Button className="rounded-full bg-[#6b2b2c] px-8 text-white hover:cursor-pointer hover:bg-[#5a2324]">
                Marque uma consulta <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative w-full lg:w-1/2">
            <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-full border-8 border-[#ffe4cf]">
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#ffe4cf]">
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#6b2b2c]">10+</div>
                  <div className="text-sm font-medium text-[#6b2b2c]">
                    Anos de experiência
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

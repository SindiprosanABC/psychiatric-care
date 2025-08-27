import Link from "next/link";
import { Button } from "../button";
import { ArrowRight } from "lucide-react";

export const CallToAction = () => {
  return (
    <section className="bg-[#6b2b2c] py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-6 text-3xl font-bold text-white">
          Pronto para dar o primeiro passo ?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-white/80">
          Programe uma consulta hoje e comece sua jornada em direção a uma
          melhor saúde mental e bem-estar emocional.
        </p>
        <Link
          href="https://wa.me/5513998083034?text=Ol%C3%A1,%20estou%20iniciando%20uma%20conversa%20pelo%20site%20do%20SindiprosanABC"
          target="_blank"
        >
          <Button className="rounded-full bg-[#ffe4cf] px-8 text-[#6b2b2c] hover:cursor-pointer hover:bg-[#361e1f] hover:text-[#ffe4cf]">
            Marque uma consulta <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

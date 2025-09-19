import { ArrowRight, Check, Smartphone, Watch } from "lucide-react";
import { Button } from "../button";
import { Card, CardContent } from "../card";
import Link from "next/link";

export const HowWork = () => {
  return (
    <section id="online-care" className="bg-gray-50 py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#6b2b2c]">
            Como funciona o atendimento online
          </h2>
          <p className="text-gray-600">
            Atendimento psiquiátrico prático e acessível no conforto da sua casa
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="border-none shadow-md transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe4cf]">
                <Smartphone className="text-[#6b2b2c]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#6b2b2c]">
                Digital e Prático
              </h3>
              <p className="text-gray-600">
                Todo o processo de atendimento, desde a receita até o pagamento,
                é realizado de forma digital. Você pode fazer tudo usando o
                celular ou computador, com total praticidade.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe4cf]">
                <Watch className="text-[#6b2b2c]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#6b2b2c]">
                Acesso Fácil à Consulta
              </h3>
              <p className="text-gray-600">
                Você receberá um link para entrar na consulta e também para
                acessar a receita digital.A consulta dura cerca de 45 minutos a
                1 hora, no conforto da sua casa.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe4cf]">
                <Check className="text-[#6b2b2c]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#6b2b2c]">
                Receita com Orientações Após a consulta, você receberá um passo
                a passo completo.
              </h3>
              <p className="text-gray-600">
                Tudo o que você precisa saber para utilizar sua receita com
                segurança e tranquilidade.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="https://wa.me/5513998083034?text=Ol%C3%A1,%20estou%20iniciando%20uma%20conversa%20pelo%20site%20da%20Doutora Flaviana Becker"
            target="_blank"
          >
            <Button className="rounded-full bg-[#6b2b2c] px-8 text-white hover:cursor-pointer hover:bg-[#5a2324]">
              Marque uma consulta <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

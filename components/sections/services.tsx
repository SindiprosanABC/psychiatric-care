import { Card, CardContent } from "../card";
import { Users, Baby, UserCheck, Monitor, PersonStanding } from "lucide-react";

export const Services = () => {
  return (
    <section id="services" className="bg-gray-50 py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#6b2b2c]">
            Nossos serviços
          </h2>
          <p className="text-gray-600">
            Cuidado especializado para diferentes grupos de idade
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-none shadow-md transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe4cf]">
                <Users className="h-6 w-6 text-[#6b2b2c]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#6b2b2c]">
                Atendimento de Adultos
              </h3>
              <p className="mb-6 text-gray-600">
                O atendimento para adultos é realizado através de anamnese, que
                nada mais é do que uma conversa, na qual o paciente conta sobre
                sua rotina, seu dia-a-dia, seus sentimentos, seus
                comportamentos, conta um pouco de sua história de vida, para que
                com esses elementos possa ser feita uma hipótese diagnóstica e,
                se for necessário, iniciar uma terapia medicamentosa.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe4cf]">
                <Baby className="h-6 w-6 text-[#6b2b2c]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#6b2b2c]">
                Atendimento de Crianças
              </h3>
              <p className="mb-6 text-gray-600">
                O atendimento a esse público é feito através de anamnese com os
                pais, avaliação lúdica do paciente (por meio de brincadeiras e
                jogos) e, em alguns casos, são utilizados questionários a serem
                preenchidos pelos pais/responsáveis e escola. Essa avaliação tem
                como objetivo identificar um possível diagnóstico e encaminhar
                aos tratamentos que serão necessários, avaliando também a
                necessidade (ou não) de terapia medicamentosa.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe4cf]">
                <UserCheck className="h-6 w-6 text-[#6b2b2c]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#6b2b2c]">
                Atendimento de Adolescentes
              </h3>
              <p className="mb-6 text-gray-600">
                Nessa faixa etária é comum aparecerem mudanças de comportamento,
                mudanças de humor e dificuldade de relacionamento com os pais. A
                avaliação nesses casos tem como objetivo avaliar se esses
                sintomas fazem parte do fenômeno da própria adolescência ou se
                podem ser sinais de que há “algo a mais”, ou seja, se existe
                algum Transtorno Mental e Emocional e se, em caso positivo,
                avaliar se esse jovem terá necessidade de terapia medicamentosa.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe4cf]">
                <PersonStanding className="h-6 w-6 text-[#6b2b2c]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#6b2b2c]">
                Avaliação Diagnóstica para suspeita de Transtorno do Espectro do
                Autismo
              </h3>
              <p className="mb-6 text-gray-600">
                A avaliação nesses casos consiste em Entrevista Estruturada ou
                Semi-estruturada para avaliação de características de TEA em
                adolescentes e adultos e avaliação lúdica para o público
                infantil. Para poder realizar uma avaliação completa e
                individualizada, em alguns casos o paciente será encaminhado
                para realizar avaliações complementares com profissionais
                parceiros (psicólogos, neuropsicólogos, terapeutas ocupacionais,
                fonoaudiólogos).
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe4cf]">
                <Monitor className="h-6 w-6 text-[#6b2b2c]" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#6b2b2c]">
                Atendimento Online
              </h3>
              <p className="mb-6 text-gray-600">
                Essa modalidade de atendimento tem como objetivo facilitar o
                acesso à consulta em casos em que o paciente esteja
                impossibilitado de comparecer presencialmente. É indicado,
                preferencialmente, para adolescentes e adultos, a depender do
                caso.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

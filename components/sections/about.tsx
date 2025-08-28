import Image from "next/image";

export const About = () => {
  return (
    <section id="about" className="bg-white py-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="order-2 w-full lg:order-1">
            <h2 className="mb-6 text-3xl font-bold text-[#6b2b2c]">
              Sou Flaviana Becker Dartora
            </h2>
            <p className="mb-4 text-gray-600">
              Médica  formada no ano de 2003 pela PUCRS, especializada em
              Psiquiatria pela FFFCMPA/CEJBF e em Psiquiatria da Infância e
              Adolescência pela UFRGS/CELG, na cidade de Porto Alegre.
            </p>
            <p className="mb-4 text-gray-600">
              Tenho Título de Especialista em Psiquiatria e Título de
              Especialista em Psiquiatria da Infância e Adolescência (AMB/ABP –
              RQE 85551/85551-1). Tenho pós-graduação em Psicoterapia
              Cognitivo-comportamental, Terapia Cognitivo-comportamental da
              Infância e Adolescência, em Transtorno do Espectro Autista e em
              Intervenções Precoces Baseadas no Modelo Denver.
            </p>
            <p className="mb-4 text-gray-600">
              Acredito no atendimento baseado no bom vínculo com o paciente e
              seus familiares, embasado em evidências científicas, enxergando as
              pessoas na sua individualidade. Tenho como objetivo uma visão
              ampla dos processos de saúde e doença dentro do meu trabalho, pois
              dessa forma acredito conseguir acolher e orientar cada situação de
              forma compreensiva e afetiva.
            </p>
          </div>
          <div className="order-1 w-full lg:order-2">
            <div className="relative">
              <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-2xl md:h-80 md:w-96 lg:h-[30rem] lg:w-full xl:h-[36rem]">
                <Image
                  src="/profile-image-1.jpeg"
                  alt="Doctor's portrait"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute -right-6 -bottom-6 rounded-xl bg-[#ffe4cf] p-4 shadow-lg">
                <div className="font-medium text-[#6b2b2c]">
                  Dr. Flaviana Becker Dartora - Psiquiatra
                </div>
                <div className="text-sm text-gray-600">
                  Child & Adolescent Specialist
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

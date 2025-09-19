"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface ReviewProps {
  name: string;
  position: string;
  comment: string;
  rating: number;
}

export const TestimonialSection = () => {
  const reviewsList: ReviewProps[] = [
    {
      name: "Ludmila Aro",
      position: "Paciente",
      comment:
        "Profissional excelente, um ótimo atendimento!! Super paciente, soube me ouvir, me orientar e não apenas realizar uma consulta em 15min, sem ao menos olhar em meus olhos. Além de sua linguagem compreensível, o que me fez ter um maior entendimento.",
      rating: 5,
    },
    {
      name: "Thayanna Magalhães",
      position: "Paciente",
      comment:
        "Psiquiatra incrível!! Sempre com muita paciência e empatia nas consultas. Tenta conversar para entender bem a situação. Passo nela há mais de 1 ano e recomendaria com muita facilidade. Inclusive, ela foi recomendação da minha psicóloga.",
      rating: 5,
    },
    {
      name: "Dudu Salomão",
      position: "Paciente",
      comment:
        "Excelentíssimo atendimento com muito carinho e muita responsabilidade com o paciente, ADORAMOS",
      rating: 5,
    },
    {
      name: "Renata Pereira",
      position: "Paciente",
      comment:
        "Atendimento ótimo! Pontual, gentil e excelente profissional. Super recomendo",
      rating: 5,
    },
    {
      name: "Rubia Girardi",
      position: "Paciente",
      comment:
        "A Dra. Flaviana é uma excelente psiquiatra! Muito atenciosa e sorridente, recomendo!",
      rating: 5,
    },
    {
      name: "Victor Porto",
      position: "Paciente",
      comment:
        "Excelente médica. Atenciosa e preocupada com o paciente. Parabéns!",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="bg-gray-50 py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-2 text-xl font-semibold text-gray-600">Avaliações</p>
          <h2 className="text-3xl font-bold text-[#6b2b2c]">
            Veja o que os pacientes estão dizendo
          </h2>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="mx-auto w-[85%] sm:w-[90%] lg:max-w-screen-xl"
        >
          <CarouselPrevious className="" />
          <CarouselNext />
          <CarouselContent>
            {reviewsList.map((review) => (
              <CarouselItem
                key={review.name}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <Card className="border-none bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex gap-1 pb-6">
                      <Star className="h-4 w-4 fill-[#6b2b2c] text-[#6b2b2c]" />
                      <Star className="h-4 w-4 fill-[#6b2b2c] text-[#6b2b2c]" />
                      <Star className="h-4 w-4 fill-[#6b2b2c] text-[#6b2b2c]" />
                      <Star className="h-4 w-4 fill-[#6b2b2c] text-[#6b2b2c]" />
                      <Star className="h-4 w-4 fill-[#6b2b2c] text-[#6b2b2c]" />
                    </div>
                    <p className="mb-6 text-gray-600">{`"${review.comment}"`}</p>
                    <div className="flex flex-row items-center gap-4">
                      <div className="flex flex-col">
                        <CardTitle className="text-[#6b2b2c]">
                          {review.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {review.position}
                        </CardDescription>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

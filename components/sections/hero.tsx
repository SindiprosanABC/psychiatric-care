import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "../button";
import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center py-12 md:py-24 lg:flex-row">
          <div className="mb-12 w-full pr-0 lg:mb-0 lg:w-1/2 lg:pr-16">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-[#6b2b2c] md:text-5xl">
              Specialized Psychiatric Care.
              <br />
              For Every Age.
            </h1>
            <p className="mb-8 max-w-lg text-lg text-gray-600">
              Comprehensive psychiatric services for children, adolescents, and
              adults in a supportive and understanding environment.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="rounded-full bg-[#6b2b2c] px-8 text-white hover:bg-[#5a2324]">
                Book Consultation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-[#6b2b2c] px-8 text-[#6b2b2c]"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative w-full lg:w-1/2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/Image_fx.jpg"
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
                <p className="text-sm font-medium text-gray-600">
                  Next Available
                </p>
                <p className="font-semibold text-[#6b2b2c]">
                  Tomorrow, 10:00 AM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

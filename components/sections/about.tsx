import Image from "next/image";
import { Button } from "../button";
import { ArrowRight } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="order-2 w-full lg:order-1 lg:w-1/2">
            <h2 className="mb-6 text-3xl font-bold text-[#6b2b2c]">About Me</h2>
            <p className="mb-4 text-gray-600">
              As a specialized child and adolescent psychiatrist, I have
              dedicated my career to understanding and treating the unique
              mental health challenges faced by young people and their families.
            </p>
            <p className="mb-4 text-gray-600">
              After completing my training in adult psychiatry, I pursued
              additional specialization that enables me to comprehensively
              assess behaviors and emotions in children and adolescents, while
              considering their family, school, and social contexts.
            </p>
            <p className="mb-4 text-gray-600">
              My approach is holistic and patient-centered, focusing on creating
              individualized treatment plans that address each person s specific
              needs and circumstances.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button className="rounded-full bg-[#6b2b2c] px-8 text-white hover:bg-[#5a2324]">
                My Qualifications <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="order-1 w-full lg:order-2 lg:w-1/2">
            <div className="relative">
              <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-2xl md:h-80 md:w-96 lg:h-96 lg:w-full">
                <Image
                  src="/image_fx_2.jpg"
                  alt="Doctor's portrait"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -right-6 -bottom-6 rounded-xl bg-[#ffe4cf] p-4 shadow-lg">
                <div className="font-medium text-[#6b2b2c]">
                  Dr. Psychiatrist
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

import { ArrowRight } from "lucide-react";
import { Button } from "../button";

export const Experience = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <h2 className="mb-6 text-3xl font-bold text-[#6b2b2c]">
              A Wealth of Experience To Help You Heal
            </h2>
            <p className="mb-6 text-gray-600">
              As a specialized child and adolescent psychiatrist, I have
              dedicated my career to understanding and treating the unique
              mental health challenges faced by young people and their families.
            </p>
            <p className="mb-6 text-gray-600">
              After completing my training in adult psychiatry, I pursued
              additional specialization that enables me to comprehensively
              assess behaviors and emotions in children and adolescents, while
              considering their family, school, and social contexts.
            </p>
            <Button className="rounded-full bg-[#6b2b2c] px-8 text-white hover:bg-[#5a2324]">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="relative w-full lg:w-1/2">
            <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-full border-8 border-[#ffe4cf]">
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#ffe4cf]">
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#6b2b2c]">10+</div>
                  <div className="text-sm font-medium text-[#6b2b2c]">
                    Years Experience
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

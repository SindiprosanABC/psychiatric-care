import { Brain, Clock, MessageSquare } from "lucide-react";

export const ServiceHighlights = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-white p-8 shadow-md">
          <div className="flex flex-col items-center md:flex-row">
            <div className="mb-8 w-full md:mb-0 md:w-1/3">
              <h2 className="mb-2 text-2xl font-bold text-[#6b2b2c]">
                A personal approach with clinical excellence.
              </h2>
              <p className="text-gray-600">
                Specialized care tailored to your unique needs and
                circumstances.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3 md:w-2/3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe4cf]">
                  <Brain className="h-6 w-6 text-[#6b2b2c]" />
                </div>
                <h3 className="mb-1 font-semibold">Psychiatric Assessment</h3>
                <p className="text-sm text-gray-500">
                  Comprehensive evaluation for accurate diagnosis
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe4cf]">
                  <MessageSquare className="h-6 w-6 text-[#6b2b2c]" />
                </div>
                <h3 className="mb-1 font-semibold">Therapy Sessions</h3>
                <p className="text-sm text-gray-500">
                  Supportive environment for all age groups
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe4cf]">
                  <Clock className="h-6 w-6 text-[#6b2b2c]" />
                </div>
                <h3 className="mb-1 font-semibold">Online Consultations</h3>
                <p className="text-sm text-gray-500">
                  Convenient care from the comfort of home
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

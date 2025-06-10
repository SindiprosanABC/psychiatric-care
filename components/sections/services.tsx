import Link from "next/link";
import { Card, CardContent } from "../card";
import { ArrowRight } from "lucide-react";

export const Services = () => {
  return (
    <section id="services" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#6b2b2c]">
            Comprehensive Psychiatric Services
          </h2>
          <p className="text-gray-600">
            Specialized care for different age groups and mental health needs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-none shadow-md transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe4cf]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#6b2b2c]"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#6b2b2c]">
                Adult Care
              </h3>
              <p className="mb-6 text-gray-600">
                Comprehensive assessment through anamnesis, where we discuss
                your routine, feelings, behaviors, and life story to develop a
                diagnostic hypothesis and determine if medication therapy is
                needed.
              </p>
              <Link
                href="#"
                className="flex items-center font-medium text-[#6b2b2c]"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe4cf]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#6b2b2c]"
                >
                  <path d="M8 10h.01"></path>
                  <path d="M3 10a7 7 0 0 1 7-7"></path>
                  <path d="M21 10a7 7 0 0 0-7-7"></path>
                  <path d="M8 14a6 6 0 0 0 3 5.5"></path>
                  <path d="M16 14a6 6 0 0 1-3 5.5"></path>
                  <path d="M12 10a2 2 0 0 0 2-2"></path>
                  <path d="M12 10a2 2 0 0 1-2-2"></path>
                  <path d="M16 10h.01"></path>
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#6b2b2c]">
                Child Care
              </h3>
              <p className="mb-6 text-gray-600">
                Assessment through parent interviews, playful evaluation with
                the child, and questionnaires for parents and schools to
                identify potential diagnoses and determine appropriate
                treatments.
              </p>
              <Link
                href="#"
                className="flex items-center font-medium text-[#6b2b2c]"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe4cf]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#6b2b2c]"
                >
                  <path d="M7 20v-4"></path>
                  <path d="M17 20v-4"></path>
                  <path d="M12 20v-4"></path>
                  <path d="M7 4v4"></path>
                  <path d="M17 4v4"></path>
                  <path d="M12 4v4"></path>
                  <rect width="20" height="4" x="2" y="8" rx="1"></rect>
                  <rect width="20" height="4" x="2" y="12" rx="1"></rect>
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#6b2b2c]">
                Adolescent Care
              </h3>
              <p className="mb-6 text-gray-600">
                Specialized assessment to distinguish between normal adolescent
                development and potential mental health disorders, evaluating
                the need for therapeutic interventions.
              </p>
              <Link
                href="#"
                className="flex items-center font-medium text-[#6b2b2c]"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe4cf]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#6b2b2c]"
                >
                  <path d="M12 2a5 5 0 0 0-5 5v14a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z"></path>
                  <path d="M9 7h6"></path>
                  <path d="M9 12h6"></path>
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#6b2b2c]">
                Autism Spectrum Disorder Assessment
              </h3>
              <p className="mb-6 text-gray-600">
                Structured evaluations for ASD in adolescents and adults, and
                playful assessments for children, with referrals to partner
                specialists when needed for comprehensive care.
              </p>
              <Link
                href="#"
                className="flex items-center font-medium text-[#6b2b2c]"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe4cf]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#6b2b2c]"
                >
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                  <path d="M12 18h.01"></path>
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#6b2b2c]">
                Online Care
              </h3>
              <p className="mb-6 text-gray-600">
                Remote consultations for patients unable to attend in-person,
                primarily recommended for adolescents and adults depending on
                individual circumstances.
              </p>
              <Link
                href="#"
                className="flex items-center font-medium text-[#6b2b2c]"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

import { ArrowRight } from "lucide-react";
import { Button } from "../button";
import { Card, CardContent } from "../card";

export const HowWork = () => {
  return (
    <section id="online-care" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#6b2b2c]">
            How Online Care Works
          </h2>
          <p className="text-gray-600">
            Convenient and accessible psychiatric care from the comfort of your
            home
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="border-none shadow-md transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe4cf]">
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#6b2b2c]">
                Register
              </h3>
              <p className="text-gray-600">
                Create your account and complete a brief intake form to help us
                understand your needs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe4cf]">
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
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <line x1="8" x2="16" y1="12" y2="12"></line>
                  <line x1="12" x2="12" y1="8" y2="16"></line>
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#6b2b2c]">
                Schedule
              </h3>
              <p className="text-gray-600">
                Choose a convenient time for your consultation from our
                available slots.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md transition-shadow duration-300 hover:shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffe4cf]">
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
                  <path d="M15 10v5"></path>
                  <path d="M9 10v5"></path>
                  <path d="M4 10h16"></path>
                  <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path>
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#6b2b2c]">Connect</h3>
              <p className="text-gray-600">
                Join your secure video consultation at the scheduled time from
                any device.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Button className="rounded-full bg-[#6b2b2c] px-8 text-white hover:bg-[#5a2324]">
            Book Online Consultation <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

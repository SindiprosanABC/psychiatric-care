import Image from "next/image";
import Link from "next/link";

export const MobileApp = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <h2 className="mb-6 text-3xl font-bold text-[#6b2b2c]">
              Download Our Patient Portal App
            </h2>
            <p className="mb-6 text-gray-600">
              Manage your appointments, access your records, and communicate
              securely with our office from your mobile device.
            </p>
            <div className="mb-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffe4cf]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#6b2b2c]"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-[#6b2b2c]">
                    Easy Appointment Scheduling
                  </h3>
                  <p className="text-gray-600">
                    Book and manage your appointments with just a few taps.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffe4cf]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#6b2b2c]"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-[#6b2b2c]">
                    Secure Messaging
                  </h3>
                  <p className="text-gray-600">
                    Communicate directly with our office through encrypted
                    messaging.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ffe4cf]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#6b2b2c]"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-[#6b2b2c]">
                    Medication Reminders
                  </h3>
                  <p className="text-gray-600">
                    Set up notifications to help you stay on track with your
                    treatment plan.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="inline-block">
                <Image
                  src="/placeholder.svg?height=40&width=120"
                  alt="App Store"
                  width={120}
                  height={40}
                />
              </Link>
              <Link href="#" className="inline-block">
                <Image
                  src="/placeholder.svg?height=40&width=120"
                  alt="Google Play"
                  width={120}
                  height={40}
                />
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="relative mx-auto w-64">
                <Image
                  src="/placeholder.svg?height=500&width=250"
                  alt="Mobile App"
                  width={250}
                  height={500}
                  className="rounded-3xl shadow-xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 -z-10 h-48 w-48 rounded-full bg-[#ffe4cf]"></div>
              <div className="absolute -bottom-4 -left-4 -z-10 h-32 w-32 rounded-full bg-[#ffe4cf]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

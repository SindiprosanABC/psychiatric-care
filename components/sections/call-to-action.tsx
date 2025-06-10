import { Button } from "../button";

export const CallToAction = () => {
  return (
    <section className="bg-[#6b2b2c] py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-6 text-3xl font-bold text-white">
          Ready to Take the First Step?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-white/80">
          Schedule a consultation today and begin your journey toward better
          mental health and emotional well-being.
        </p>
        <Button className="rounded-full bg-white px-8 py-6 text-lg text-[#6b2b2c] hover:bg-[#ffe4cf]">
          Book Your Appointment Now
        </Button>
      </div>
    </section>
  );
};

import { About } from "@/components/sections/about";
import { CallToAction } from "@/components/sections/call-to-action";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { HowWork } from "@/components/sections/how-work";
import { Services } from "@/components/sections/services";
import { ServiceHighlights } from "@/components/sections/services-highlight";
import { TestimonialSection } from "@/components/sections/testimonial";
import { LatestNews } from "@/components/sections/latest-news";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <ServiceHighlights />
      <Services />
      <Experience />
      <HowWork />
      <About />
      <TestimonialSection />
      <LatestNews />
      <CallToAction />
    </main>
  );
}

import { About } from "@/components/sections/about";
import { CallToAction } from "@/components/sections/call-to-action";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { HowWork } from "@/components/sections/how-work";
import { MobileApp } from "@/components/sections/mobile-app";
import { Services } from "@/components/sections/services";
import { ServiceHighlights } from "@/components/sections/services-highlight";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <ServiceHighlights />
      <Services />
      <Experience />
      <HowWork />
      <About />
      <MobileApp />
      <CallToAction />
    </main>
  );
}

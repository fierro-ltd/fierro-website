import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { FAQ } from "@/components/sections/faq";
import { CTABanner } from "@/components/cta-banner";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <FAQ />
      <CTABanner />
    </>
  );
}

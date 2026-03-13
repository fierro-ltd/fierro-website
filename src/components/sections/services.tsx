import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/bento-grid";
import { FadeIn } from "@/components/fade-in";
import { services } from "@/data/services";
import { serviceIconMap } from "@/data/service-icons";

export function Services() {
  return (
    <section className="relative py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary mb-3">
                What we build
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-balance">
                AI solutions for real problems
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 shrink-0"
            >
              All services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <BentoGrid>
            {services.map((service) => {
              const Icon = serviceIconMap[service.icon];
              return (
                <BentoCard key={service.title}>
                  <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                    {Icon && <Icon className="size-5" />}
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2 text-balance">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </BentoCard>
              );
            })}
          </BentoGrid>
        </FadeIn>
      </div>
    </section>
  );
}

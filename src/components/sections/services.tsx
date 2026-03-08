import { Bot, FileSearch, Code, Lightbulb } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/bento-grid";
import { FadeIn } from "@/components/fade-in";
import { services } from "@/data/services";

const iconMap: Record<string, React.ElementType> = {
  Bot,
  FileSearch,
  Code,
  Lightbulb,
};

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Capabilities
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              What We Do
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              We specialise in building intelligent software&nbsp;&mdash; from
              AI-native applications to production-grade platforms.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <BentoGrid>
            {services.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <BentoCard key={service.title}>
                  <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary">
                    {Icon && <Icon className="size-5" />}
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">
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

import { Bot, FileSearch, Code, Lightbulb } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/bento-grid";
import { services } from "@/data/services";

const iconMap: Record<string, React.ElementType> = {
  Bot,
  FileSearch,
  Code,
  Lightbulb,
};

export function Services() {
  return (
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            What We Do
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We specialise in building intelligent software — from AI-native
            applications to production-grade platforms.
          </p>
        </div>

        <BentoGrid>
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <BentoCard key={service.title}>
                <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                  {Icon && <Icon className="size-5" />}
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </BentoCard>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}

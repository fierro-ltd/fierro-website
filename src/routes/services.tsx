import { createFileRoute } from "@tanstack/react-router";
import { Bot, FileSearch, Code, Lightbulb } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { FadeIn } from "@/components/fade-in";
import { CTABanner } from "@/components/cta-banner";
import { services } from "@/data/services";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

const iconMap: Record<string, React.ElementType> = {
  Bot,
  FileSearch,
  Code,
  Lightbulb,
};

const extendedInfo: Record<string, { details: string; useCases: string[] }> = {
  "Agentic AI Systems": {
    details:
      "We design autonomous AI agents that plan, execute, and adapt. Our agents handle complex multi-step workflows, integrate with external tools and APIs, and make decisions based on your business rules. Built with enterprise-grade reliability using durable workflow engines.",
    useCases: [
      "Customer support automation",
      "Document processing workflows",
      "Research and analysis pipelines",
      "Task orchestration and scheduling",
    ],
  },
  "Document Intelligence": {
    details:
      "Transform unstructured documents into structured, actionable data. Our pipelines handle classification, extraction, validation, and enrichment across any document type. Built with plugin architectures for multi-domain support.",
    useCases: [
      "Invoice and receipt processing",
      "Regulatory compliance checking",
      "Clinical document structuring",
      "Contract analysis and extraction",
    ],
  },
  "Full-Stack Applications": {
    details:
      "Production-grade web applications built with modern tooling. React frontends, Python backends, automated testing, CI/CD pipelines, and infrastructure-as-code. Every project ships with documentation and handoff materials.",
    useCases: [
      "Internal tools and dashboards",
      "Customer-facing SaaS platforms",
      "Data visualisation portals",
      "AI-powered web applications",
    ],
  },
  "AI Strategy & Prototyping": {
    details:
      "Validate ideas before committing. We build rapid proof-of-concepts, evaluate model performance, and define the right architecture for your use case. Our prototypes are designed to evolve into production systems.",
    useCases: [
      "Feasibility studies",
      "Model evaluation and benchmarking",
      "Architecture design",
      "Proof-of-concept development",
    ],
  },
};

function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="What we build"
        description="Production-grade AI systems that deliver measurable impact. We specialise in taking complex problems and shipping reliable solutions."
      />

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            const extra = extendedInfo[service.title];
            return (
              <FadeIn key={service.title} delay={i * 100}>
                <div className="rounded-xl border border-border/50 bg-card p-8 md:p-10">
                  <div className="flex items-start gap-5">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary shrink-0">
                      {Icon && <Icon className="size-6" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display text-2xl font-semibold mb-3">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {extra?.details ?? service.description}
                      </p>
                      {extra?.useCases && (
                        <div>
                          <p className="text-sm font-medium mb-2">Example use cases</p>
                          <div className="flex flex-wrap gap-2">
                            {extra.useCases.map((uc) => (
                              <span
                                key={uc}
                                className="text-xs font-mono text-muted-foreground bg-secondary px-2.5 py-1 rounded"
                              >
                                {uc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Process section */}
      <section className="py-24 bg-background-alt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm font-medium uppercase tracking-widest text-primary mb-3">
                Process
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-balance">
                How we work
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Discover",
                  description: "We dive deep into your problem space, define scope, and build rapid prototypes to validate the approach.",
                },
                {
                  step: "02",
                  title: "Build",
                  description: "Production-grade engineering with automated testing, CI/CD pipelines, and infrastructure-as-code.",
                },
                {
                  step: "03",
                  title: "Ship",
                  description: "Deploy to your cloud, hand off with documentation, and provide ongoing support.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground font-display font-bold text-lg mb-5">
                    {item.step}
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

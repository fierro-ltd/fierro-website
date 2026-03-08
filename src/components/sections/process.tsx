import { FadeIn } from "@/components/fade-in";

const steps = [
  {
    number: 1,
    title: "Discover",
    description:
      "We dive deep into your problem space, define scope, and build rapid prototypes to validate the approach.",
  },
  {
    number: 2,
    title: "Build",
    description:
      "Production-grade engineering with automated testing, CI/CD pipelines, and infrastructure-as-code.",
  },
  {
    number: 3,
    title: "Ship",
    description:
      "Deploy to your cloud, hand off with documentation, and provide ongoing support.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Process
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              How We Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              A streamlined process designed to move fast without cutting
              corners.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-6 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] border-t-2 border-dashed border-primary/20" />

            {steps.map((step) => (
              <div
                key={step.number}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-display font-bold text-base mb-5 shadow-[0_0_20px_var(--primary)/30%]">
                  {step.number}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

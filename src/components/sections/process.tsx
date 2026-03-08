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
    <section id="process" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              How We Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A streamlined process designed to move fast without cutting corners.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Dashed connector line (desktop only) */}
          <div className="hidden md:block absolute top-5 left-[calc(16.67%+1.25rem)] right-[calc(16.67%+1.25rem)] border-t-2 border-dashed border-border" />

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-sm mb-4">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
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

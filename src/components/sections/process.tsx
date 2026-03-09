import { FadeIn } from "@/components/fade-in";
import { useInView } from "@/hooks/use-in-view";

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

function StepNumber({ number, isInView, delay }: { number: number; isInView: boolean; delay: number }) {
  return (
    <div
      className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-display font-bold text-base mb-5 shadow-[0_0_20px_var(--primary)/30%] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "scale(1)" : "scale(0.5)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {number}
    </div>
  );
}

export function Process() {
  const { ref: stepsRef, isInView: stepsInView } = useInView(0.15);

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

        <div ref={stepsRef} className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {/* Connector line (desktop only) — animates drawing in */}
          <div
            className="hidden md:block absolute top-6 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] border-t-2 border-dashed border-primary/20 origin-left transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: stepsInView ? "scaleX(1)" : "scaleX(0)",
              transitionDelay: "200ms",
            }}
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                opacity: stepsInView ? 1 : 0,
                transform: stepsInView ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <StepNumber number={step.number} isInView={stepsInView} delay={i * 150 + 100} />
              <h3 className="font-display text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

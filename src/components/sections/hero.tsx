import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Subtle radial glow behind headline */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,var(--primary)_0%,transparent_60%)] opacity-[0.06] animate-glow-pulse" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-in-up text-balance leading-[0.95]">
          We Build{" "}
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer">
            AI-Powered
          </span>{" "}
          Software That&nbsp;Ships
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in-up [animation-delay:150ms] opacity-0 [animation-fill-mode:forwards] text-balance leading-relaxed">
          FIERRO specialises in agentic AI, document intelligence, and
          full-stack applications&nbsp;&mdash; from prototype to production.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
          <Button variant="outline" size="lg" className="group" asChild>
            <a href="#portfolio">
              View Our Work
              <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                &rarr;
              </span>
            </a>
          </Button>
          <Button size="lg" className="group" asChild>
            <a href="#contact">
              Get In Touch
              <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                &rarr;
              </span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

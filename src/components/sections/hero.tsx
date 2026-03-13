import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,var(--primary)_0%,transparent_65%)] opacity-[0.05] animate-glow-pulse" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-primary mb-6 animate-fade-in-up">
          Boutique Software Factory
        </p>

        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards] text-balance leading-[1.05]">
          We build{" "}
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer">
            intelligent
          </span>{" "}
          systems
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards] text-balance leading-relaxed">
          AI-native applications that automate, reason, and scale &mdash; from first prototype to production deployment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:350ms] opacity-0 [animation-fill-mode:forwards]">
          <Button size="lg" className="group" asChild>
            <Link to="/projects">
              View our work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/contact">Get in touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/fade-in";

export function CTABanner() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="rounded-2xl border border-border/50 bg-card p-12 md:p-16 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
              Ready to build something intelligent?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-lg leading-relaxed">
              Let&rsquo;s discuss how AI can accelerate your business. From initial concept to production deployment.
            </p>
            <Button size="lg" className="group" asChild>
              <Link to="/contact">
                Start a conversation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

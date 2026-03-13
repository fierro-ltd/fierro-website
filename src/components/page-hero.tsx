import { FadeIn } from "@/components/fade-in";

export function PageHero({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-3">
            {label}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

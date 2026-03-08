import { BentoGrid } from "@/components/bento-grid";
import { ProjectCard } from "@/components/project-card";
import { FadeIn } from "@/components/fade-in";
import { projects } from "@/data/projects";

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Portfolio
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              Our Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Live demos and production systems we&rsquo;ve built for clients
              and as open-source references.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <BentoGrid>
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </BentoGrid>
        </FadeIn>
      </div>
    </section>
  );
}

import { BentoGrid } from "@/components/bento-grid";
import { ProjectCard } from "@/components/project-card";
import { FadeIn } from "@/components/fade-in";
import { projects } from "@/data/projects";

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Our Work
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Live demos and production systems we've built for clients and as
              open-source references.
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

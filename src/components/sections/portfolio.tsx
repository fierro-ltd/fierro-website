import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { FadeIn } from "@/components/fade-in";
import { projects } from "@/data/projects";

export function Portfolio() {
  return (
    <section className="relative py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary mb-3">
                Our work
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-balance">
                Featured projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 shrink-0"
            >
              All projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(0, 4).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

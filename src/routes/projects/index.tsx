import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { FadeIn } from "@/components/fade-in";
import { CTABanner } from "@/components/cta-banner";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/projects/")({
  component: ProjectsPage,
  head: () => ({
    meta: [{ title: "Projects — FIERRO" }],
  }),
});

function ProjectsPage() {
  return (
    <>
      <PageHero
        label="Projects"
        title="Our work"
        description="Production systems and live platforms we've shipped for clients across regulated industries."
      />

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

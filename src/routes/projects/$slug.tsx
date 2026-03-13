import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { gradientMap, tagColorMap } from "@/data/project-colors";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectDetailPage,
  head: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    return {
      meta: [{ title: project ? `${project.title} — FIERRO` : "Project — FIERRO" }],
    };
  },
});

function ProjectDetailPage() {
  const { slug } = Route.useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-bold mb-4">Project not found</h1>
        <p className="text-muted-foreground mb-8">
          The project you&rsquo;re looking for doesn&rsquo;t exist.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to projects
        </Link>
      </div>
    );
  }

  const gradient = gradientMap[project.tagColor] ?? gradientMap.blue;
  const tagColor = tagColorMap[project.tagColor] ?? tagColorMap.blue;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <FadeIn>
        {/* Back link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to projects
        </Link>

        {/* Gradient header */}
        <div className={cn("h-40 rounded-xl bg-gradient-to-br mb-8 flex items-end p-6", gradient)}>
          <Badge variant="outline" className={cn(tagColor)}>{project.tag}</Badge>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-balance">
          {project.title}
        </h1>

        {/* Description */}
        <p className="text-lg text-muted-foreground leading-relaxed mb-12">
          {project.longDescription}
        </p>

        {/* Features */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-semibold mb-6">Key features</h2>
          <ul className="space-y-3">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" aria-hidden="true" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-semibold mb-6">Tech stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm font-mono px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Demo button */}
        <Button asChild size="lg" className="group">
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            View live demo
            <ExternalLink className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </Button>

        {/* Next project */}
        {nextProject && (
          <div className="mt-20 pt-12 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-2">Next project</p>
            <Link
              to="/projects/$slug"
              params={{ slug: nextProject.slug }}
              className="font-display text-2xl font-semibold hover:text-primary transition-colors duration-200"
            >
              {nextProject.title} &rarr;
            </Link>
          </div>
        )}
      </FadeIn>
    </div>
  );
}

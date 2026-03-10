import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio/$slug")({
  component: PortfolioDetailPage,
});

const gradientMap: Record<string, string> = {
  blue: "from-blue-500/20 to-blue-600/5",
  violet: "from-violet-500/20 to-violet-600/5",
  emerald: "from-emerald-500/20 to-emerald-600/5",
  amber: "from-amber-500/20 to-amber-600/5",
};

const tagColorMap: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

function PortfolioDetailPage() {
  const { slug } = Route.useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="font-display text-4xl font-bold mb-4">
          Project Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          The project you&rsquo;re looking for doesn&rsquo;t exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    );
  }

  const gradient = gradientMap[project.tagColor] ?? gradientMap.blue;
  const tagColor = tagColorMap[project.tagColor] ?? tagColorMap.blue;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Home
      </Link>

      {/* Decorative header bar */}
      <div
        className={cn(
          "h-3 rounded-full bg-gradient-to-r mb-8",
          gradient
        )}
      />

      {/* Tag badge */}
      <Badge variant="outline" className={cn("mb-4", tagColor)}>
        {project.tag}
      </Badge>

      {/* Title */}
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-balance">
        {project.title}
      </h1>

      {/* Long description */}
      <p className="text-lg text-muted-foreground leading-relaxed mb-12">
        {project.longDescription}
      </p>

      {/* Features section */}
      <div className="mb-12">
        <h2 className="font-display text-2xl font-semibold mb-6 text-balance">
          Key Features
        </h2>
        <ul className="space-y-3">
          {project.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check
                className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech stack section */}
      <div className="mb-12">
        <h2 className="font-display text-2xl font-semibold mb-6 text-balance">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-sm font-mono px-3 py-1"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* View Live Demo button */}
      <Button asChild size="lg" className="text-base group">
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Live Demo
          <ExternalLink
            className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </Button>
    </div>
  );
}

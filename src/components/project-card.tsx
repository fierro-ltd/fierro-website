import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BentoCard } from "@/components/bento-grid";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const gradientMap: Record<string, string> = {
  blue: "from-blue-500/20 to-blue-600/5",
  violet: "from-violet-500/20 to-violet-600/5",
  emerald: "from-emerald-500/20 to-emerald-600/5",
  amber: "from-amber-500/20 to-amber-600/5",
};

export function ProjectCard({ project }: { project: Project }) {
  const gradient = gradientMap[project.tagColor] ?? gradientMap.blue;

  return (
    <Link
      to="/portfolio/$slug"
      params={{ slug: project.slug }}
      className={cn(
        "block",
        project.gridSpan === "wide" && "lg:col-span-2"
      )}
    >
      <BentoCard className="h-full flex flex-col">
        {/* Gradient header */}
        <div
          className={cn(
            "h-32 rounded-lg bg-gradient-to-br mb-4",
            gradient
          )}
        />

        <Badge variant="secondary" className="w-fit mb-3">
          {project.tag}
        </Badge>

        <h3 className="font-display text-lg font-semibold mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 flex-1 min-w-0 leading-relaxed">
          {project.description}
        </p>

        {/* Bottom row */}
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
            {project.techStack.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-[10px] font-mono px-1.5 py-0 text-muted-foreground"
              >
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 text-muted-foreground tabular-nums"
              >
                +{project.techStack.length - 4}
              </Badge>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(project.demoUrl, "_blank", "noopener,noreferrer");
            }}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            View Live Demo
            <ExternalLink className="size-3" aria-hidden="true" />
          </button>
        </div>
      </BentoCard>
    </Link>
  );
}

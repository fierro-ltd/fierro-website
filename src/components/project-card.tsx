import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const gradientMap: Record<string, string> = {
  blue: "from-blue-500/15 to-indigo-600/5",
  violet: "from-violet-500/15 to-purple-600/5",
  emerald: "from-emerald-500/15 to-teal-600/5",
  amber: "from-amber-500/15 to-orange-600/5",
};

const tagColorMap: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  violet: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export function ProjectCard({ project }: { project: Project }) {
  const gradient = gradientMap[project.tagColor] ?? gradientMap.blue;
  const tagColor = tagColorMap[project.tagColor] ?? tagColorMap.blue;

  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="group block"
    >
      <div className="rounded-xl border border-border/50 bg-card p-6 h-full flex flex-col transition-all duration-300 hover:border-primary/30 hover:translate-y-[-2px]">
        {/* Gradient header */}
        <div
          className={cn(
            "h-32 rounded-lg bg-gradient-to-br mb-5 flex items-end p-4",
            gradient
          )}
        >
          <Badge variant="outline" className={cn("text-xs", tagColor)}>
            {project.tag}
          </Badge>
        </div>

        <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-200">
          View project
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}

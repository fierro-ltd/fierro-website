export interface Project {
  slug: string;
  title: string;
  tag: string;
  tagColor: string;
  description: string;
  longDescription: string;
  features: string[];
  techStack: string[];
  demoUrl: string;
  gridSpan?: "wide" | "normal";
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

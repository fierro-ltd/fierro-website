import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/use-in-view";
import React from "react";

export function BentoGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, isInView } = useInView(0.05);

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6",
        className
      )}
    >
      {React.Children.map(children, (child, i) => (
        <div
          className="transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transitionDelay: `${i * 100}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export function BentoCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group rounded-xl border border-border/50 bg-card backdrop-blur-md p-6",
        "hover:border-primary/40 hover:shadow-[0_0_30px_-5px_var(--primary)/15%]",
        "transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
        "hover:translate-y-[-2px]",
        className
      )}
    >
      {children}
    </div>
  );
}

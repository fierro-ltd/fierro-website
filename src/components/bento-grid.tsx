import { cn } from "@/lib/utils";

export function BentoGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6",
        className
      )}
    >
      {children}
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
        "hover:border-primary/40 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_var(--primary)/15%]",
        "transition-all duration-300 ease-out",
        className
      )}
    >
      {children}
    </div>
  );
}

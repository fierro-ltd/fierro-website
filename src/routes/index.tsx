import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <h1 className="text-5xl font-bold tracking-tight">FIERRO</h1>
    </div>
  );
}

import { lazy, Suspense } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

const GalaxyBackground = lazy(() =>
  import("@/components/galaxy-background").then((m) => ({
    default: m.GalaxyBackground,
  }))
);
const ParticleField = lazy(() =>
  import("@/components/particle-field").then((m) => ({
    default: m.ParticleField,
  }))
);

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Suspense fallback={null}>
        <GalaxyBackground />
        <ParticleField />
      </Suspense>
      <NavBar />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

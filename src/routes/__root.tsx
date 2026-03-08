import { createRootRoute, Outlet } from "@tanstack/react-router";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import { ParticleField } from "@/components/particle-field";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <ParticleField />
      <NavBar />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

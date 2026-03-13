import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

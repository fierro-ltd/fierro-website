import { createRootRoute, HeadContent, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export const Route = createRootRoute({
  component: RootLayout,
  head: () => ({
    meta: [{ title: "FIERRO — Boutique Software Factory" }],
  }),
});

function RootLayout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <HeadContent />
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
] as const;

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-xl border-b border-border/40">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link to="/" className="font-[family-name:Afacad] text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity duration-200">
          FIERRO
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "relative text-sm font-medium transition-colors duration-200 py-1",
                "after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-primary after:transition-[width] after:duration-300 after:ease-[cubic-bezier(0.25,1,0.5,1)]",
                currentPath === link.to || currentPath.startsWith(link.to + "/")
                  ? "text-foreground after:w-full"
                  : "text-muted-foreground hover:text-foreground after:w-0 hover:after:w-full"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" className="hidden md:inline-flex" asChild>
            <Link to="/contact">Get in touch</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span
              className="transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: mobileOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </span>
          </Button>
        </div>
      </nav>

      <div
        className="md:hidden grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ gridTemplateRows: mobileOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border/40 bg-background/90 backdrop-blur-xl px-4 py-4 space-y-3">
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "block text-sm font-medium transition-[color,transform] duration-200",
                  currentPath === link.to ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                style={{
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateX(0)" : "translateX(-8px)",
                  transition: `opacity 300ms ${100 + i * 50}ms cubic-bezier(0.25,1,0.5,1), transform 300ms ${100 + i * 50}ms cubic-bezier(0.25,1,0.5,1)`,
                }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

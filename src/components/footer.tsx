import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/30 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} FIERRO LTD. All rights reserved.</p>
            <p className="mt-1">Built with ❤️ &amp; 🧉 in London</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/fierro-ltd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
            >
              <Github className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="https://linkedin.com/company/fierro-ltd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="mailto:hello@fierro.co.uk"
              aria-label="Email"
              className="text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

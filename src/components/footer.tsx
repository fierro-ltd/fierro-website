import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";

const footerLinks = [
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
] as const;

const socialLinks = [
  { href: "https://github.com/fierro-ltd", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/company/fierro-ltd", label: "LinkedIn", icon: Linkedin },
  { href: "mailto:hello@fierro.co.uk", label: "Email", icon: Mail },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="font-[family-name:Afacad] text-xl font-bold tracking-tight">
              FIERRO
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Boutique software factory specialising in agentic AI, document intelligence, and full-stack applications.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-sm font-semibold mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-sm font-semibold mb-4">Connect</p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={link.label}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <link.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FIERRO LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

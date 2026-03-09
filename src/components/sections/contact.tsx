import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BentoCard } from "@/components/bento-grid";
import { FadeIn } from "@/components/fade-in";
import { Mail, Github, Linkedin } from "lucide-react";

export function Contact() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;

    const subject = encodeURIComponent(`New enquiry from ${name}`);
    const body = encodeURIComponent(
      `From: ${name} (${email})\n\n${message}`
    );
    window.location.href = `mailto:hello@fierro.co.uk?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="relative py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Contact
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
              Let&rsquo;s Build Something Together
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Have a project in mind? We&rsquo;d love to hear about it.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="max-w-2xl mx-auto">
            <BentoCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1.5"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name…"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1.5"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com…"
                      spellCheck={false}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1.5"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    autoComplete="off"
                    placeholder="Tell us about your project…"
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </BentoCard>

            {/* Direct contact links */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Or reach out directly
              </p>
              <div className="flex items-center justify-center gap-6">
                <a
                  href="mailto:hello@fierro.co.uk"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-y-[-1px]"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  hello@fierro.co.uk
                </a>
                <a
                  href="https://github.com/fierro-ltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-y-[-1px]"
                >
                  <Github className="size-4" aria-hidden="true" />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/company/fierro-ltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-y-[-1px]"
                >
                  <Linkedin className="size-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

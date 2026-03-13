import { createFileRoute } from "@tanstack/react-router";
import { Mail, Github, Linkedin } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/fade-in";
import { FAQ } from "@/components/sections/faq";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [{ title: "Contact — FIERRO" }],
  }),
});

function ContactPage() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const company = data.get("company") as string;
    const message = data.get("message") as string;

    const subject = encodeURIComponent(`New enquiry from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})${company ? `\nCompany: ${company}` : ""}\n\n${message}`);
    window.location.href = `mailto:hello@fierro.co.uk?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <PageHero
        label="Contact"
        title="Let's talk"
        description="Tell us about your project and we'll get back to you within 24 hours."
      />

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
              {/* Form */}
              <div className="md:col-span-3">
                <div className="rounded-xl border border-border/50 bg-card p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          autoComplete="name"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@company.com"
                          spellCheck={false}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-1.5">
                        Company <span className="text-muted-foreground">(optional)</span>
                      </label>
                      <Input
                        id="company"
                        name="company"
                        autoComplete="organization"
                        placeholder="Your company"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        autoComplete="off"
                        placeholder="Tell us about your project..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Send message
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact info */}
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="font-display text-lg font-semibold mb-4">Direct contact</h3>
                  <div className="space-y-3">
                    <a
                      href="mailto:hello@fierro.co.uk"
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                      hello@fierro.co.uk
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold mb-4">Find us online</h3>
                  <div className="space-y-3">
                    <a
                      href="https://github.com/fierro-ltd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      <Github className="h-4 w-4 shrink-0" aria-hidden="true" />
                      github.com/fierro-ltd
                    </a>
                    <a
                      href="https://linkedin.com/company/fierro-ltd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      <Linkedin className="h-4 w-4 shrink-0" aria-hidden="true" />
                      linkedin.com/company/fierro-ltd
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold mb-2">Based in London</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We work with clients across the UK and internationally. All engagements are remote-first.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <FAQ />
    </>
  );
}

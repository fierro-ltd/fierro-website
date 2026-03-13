# FIERRO Website Redesign Plan

## Design Vision

Redesign fierro.co.uk as a clean, dark, minimal developer-tools-style website inspired by **VoidZero**, **void.cloud**, and **Base44**. Single color mode (dark only). Multi-page architecture. Professional, credible, and modern.

---

## Current State Summary

- **Stack**: React 19 + Vite 7 + TanStack Router + Tailwind CSS v4 + shadcn/ui
- **Pages**: Single-page app (home) + dynamic portfolio detail page
- **Issues to address**:
  - Heavy Three.js backgrounds (galaxy + particle field) — impressive but distracting and slow
  - Light/dark mode toggle adds complexity for no business value
  - Single-page scroll layout limits SEO and navigation
  - Visual design feels "startup portfolio" rather than "trusted AI consultancy"

---

## Design Principles (from inspiration sites)

| Principle | Inspired by |
|-----------|-------------|
| Deep dark background, restrained palette with strategic accent colors | VoidZero |
| Clean typography hierarchy (display + body + mono) | VoidZero (APK Protocol / KH Teka system) |
| Zero-clutter layout with generous whitespace | All three |
| Product/project showcase as card grid with clear categorization | Base44 |
| FAQ/Questions section at bottom of key pages | Base44 |
| Multi-page navigation with clear information architecture | Base44 |
| Subtle CSS animations (fade-in, hover states) instead of heavy WebGL | void.cloud / VoidZero |
| Single dark color mode — no toggle | User requirement |
| Focused hero with short headline + one supporting sentence + CTA | Base44 / void.cloud |

---

## Recommended Color Palette

```
Background:       #0a0a0f  (near-black with slight blue undertone)
Surface/Card:     #12121a  (slightly elevated dark)
Border:           #1e1e2e  (subtle separator)
Border hover:     #2a2a3e  (slightly brighter on interaction)

Text primary:     #f0f0f5  (off-white, easy on eyes)
Text secondary:   #8888a0  (muted gray-purple)
Text tertiary:    #55556a  (for labels/captions)

Accent primary:   #6366f1  (indigo — brand anchor)
Accent glow:      #818cf8  (lighter indigo for hover states)
Accent secondary: #a78bfa  (violet — for highlights)

Success:          #34d399
Warning:          #fbbf24
```

---

## Recommended Typography

Keep the existing font stack but refine usage:

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display/Hero | Outfit | 600-700 | Page titles, hero headlines |
| Headings | Outfit | 500-600 | Section headers, card titles |
| Body | Plus Jakarta Sans | 400-500 | Paragraphs, descriptions |
| Mono/Technical | Fira Code | 400 | Tech stack badges, code references |
| Logo | Afacad | 700 | Brand wordmark only |

---

## Page Architecture (Multi-Page)

### 1. **Home** (`/`)
The front door. Concise and impactful.

- **Hero Section**: Bold headline ("We build intelligent systems") + 1-2 line subtitle + primary CTA ("View our work") + secondary CTA ("Get in touch")
- **What We Do** (Services overview): 3-4 cards in a responsive grid. Each card: icon + title + 1-line description. Links to `/services`
- **Featured Projects**: 2-3 highlighted project cards (Base44-style). Image/gradient header + title + tag + short description. Links to individual project pages
- **Social Proof / Numbers** (optional): Key stats if available (projects delivered, technologies, etc.)
- **FAQ Section**: 5-6 accordion-style Q&As addressing common client questions (What's your tech stack? How do engagements work? What industries do you serve? etc.)
- **CTA Banner**: "Ready to build something intelligent?" + contact button

### 2. **Services** (`/services`)
Detailed breakdown of capabilities.

- **Page Hero**: "What we build" + subtitle
- **Service Cards** (expanded): Each service gets a detailed card with:
  - Icon + Title
  - Description (2-3 paragraphs)
  - Key technologies/tools used (badge pills)
  - Example use cases
- **Process Section**: Discover → Build → Ship (keep existing concept but simplify visually)
- **CTA**: "Let's discuss your project"

### 3. **Projects** (`/projects`)
Portfolio showcase (Base44-style grid).

- **Page Hero**: "Our work" + subtitle
- **Filter/Category Tags** (optional): All / Agentic AI / Document Intelligence / Healthcare / FinTech
- **Project Grid**: Cards with:
  - Gradient or image header
  - Category badge
  - Title
  - 1-line description
  - Tech stack pills
  - Arrow link to detail page
- Each card links to `/projects/:slug`

### 4. **Project Detail** (`/projects/:slug`)
Deep dive into individual projects. (Already exists, refine design.)

- Back navigation
- Project title + category badge
- Long description
- Features list
- Tech stack section
- Demo link / CTA
- "Next project" navigation at bottom

### 5. **Contact** (`/contact`)
Dedicated contact page.

- **Page Hero**: "Let's talk" + subtitle
- **Contact Form**: Name, email, company (optional), message
- **Alternative Contact**: Email + LinkedIn + GitHub links
- **FAQ mini-section**: 2-3 engagement-related questions

### 6. **Blog** (`/blog`) — Future/Optional
Keep the existing blog concept but as a separate route. Not in scope for initial redesign unless requested.

---

## Component Changes

### Remove
- `galaxy-background.tsx` — Remove Three.js galaxy shader (heavy, distracting)
- `particle-field.tsx` — Remove Three.js particle field
- `theme-toggle.tsx` — No more light/dark toggle
- Light mode CSS variables in `index.css`
- `three` dependency from package.json (saves ~500KB)

### Modify
- `nav-bar.tsx` — Update links to new multi-page routes, remove theme toggle, add subtle blur-backdrop sticky header
- `index.css` — Single dark palette, remove `:root` light variables, keep only dark
- `__root.tsx` — Remove background components, simplify layout wrapper
- `index.tsx` — Restructure to new homepage sections
- `bento-grid.tsx` → Rename/refine to general `card-grid.tsx`
- `project-card.tsx` — Redesign to match Base44-style cards
- `fade-in.tsx` — Keep but ensure it's CSS-only (no heavy JS)

### Add
- `src/routes/services.tsx` — New services page
- `src/routes/projects/index.tsx` — New projects listing page
- `src/routes/contact.tsx` — New contact page
- `src/components/sections/faq.tsx` — Accordion FAQ component
- `src/components/page-hero.tsx` — Reusable page hero (title + subtitle)
- `src/components/cta-banner.tsx` — Reusable call-to-action banner
- `src/data/faq.ts` — FAQ content data

### Keep (with refinement)
- `fade-in.tsx` — Scroll animations
- `use-in-view.ts` — IntersectionObserver hook
- `lib/utils.ts` — Utility functions
- All shadcn/ui components (`button`, `badge`, `card`, `input`, `textarea`, `separator`)
- `data/projects.ts` and `data/services.ts` — Static data

---

## Animation Strategy

Replace heavy Three.js with lightweight CSS/JS animations:

- **Scroll-triggered fade-ins**: Keep existing `FadeIn` component
- **Hover states**: Subtle border glow, slight lift (translateY), smooth transitions
- **Gradient accents**: CSS gradient borders/backgrounds on cards (no shaders)
- **Staggered reveals**: Cards animate in sequence on scroll
- **Smooth page transitions**: CSS transitions on route changes
- **No WebGL, no Three.js** — Pure CSS + minimal JS

---

## Implementation Order

### Phase 1: Foundation (core changes)
1. Remove Three.js backgrounds and theme toggle
2. Set up single dark color palette in `index.css`
3. Update `__root.tsx` layout (clean wrapper, no backgrounds)
4. Redesign `nav-bar.tsx` with new routes and blur-backdrop style
5. Create reusable `page-hero.tsx` and `cta-banner.tsx` components

### Phase 2: Homepage Redesign
6. Rebuild hero section (clean, focused, VoidZero-style)
7. Redesign services overview cards
8. Add featured projects section (Base44-style cards)
9. Build FAQ accordion component + add to homepage
10. Add CTA banner

### Phase 3: New Pages
11. Create `/services` page with detailed service cards + process section
12. Create `/projects` listing page with card grid
13. Refine `/projects/:slug` detail page design
14. Create `/contact` page with form + info

### Phase 4: Polish
15. Add staggered scroll animations across all pages
16. Responsive testing and fixes
17. Footer redesign
18. Remove `three` and `@types/three` from dependencies
19. Final cleanup and testing

---

## Key Recommendations

1. **Drop Three.js entirely** — It's ~500KB of JavaScript for background effects. CSS gradients and subtle animations achieve a more professional look with zero performance cost. VoidZero and Base44 prove that restraint is more impressive than spectacle.

2. **Single dark mode** — Eliminates complexity in code and design. All three inspiration sites use a single dark theme. It's the standard for developer-focused companies.

3. **Multi-page over single-page scroll** — Better SEO, better UX, better analytics. Each page has a focused purpose. Users can bookmark/share specific pages. Base44's approach is the model here.

4. **FAQ section is high-value** — Addresses client concerns without requiring a call. Reduces friction in the sales process. Place on homepage and contact page.

5. **Typography hierarchy matters more than effects** — VoidZero's design impact comes from confident typography with generous spacing, not from animations. Invest in getting the type scale right.

6. **Card-based project showcase** — Base44's product grid is scannable and professional. Each project should feel like a product, not just a portfolio item. Include tech stack badges for credibility.

7. **Keep the tech stack** — React 19 + Vite + TanStack Router + Tailwind v4 is excellent. No framework changes needed. The redesign is purely visual/architectural.

8. **Subtle > Spectacular** — Replace "look what we can do" (Three.js shaders) with "look what we've built" (project showcase). The current site's backgrounds compete with the content. Let the work speak.

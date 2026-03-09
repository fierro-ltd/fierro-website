# Atmospheric Depth & Visual Impact Upgrade

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Enhance the FIERRO website with atmospheric depth inspired by A2R.com — adding a nebula fog shader layer behind particles, section rhythm with alternating backgrounds, and bolder hero typography.

**Architecture:** Three independent changes: (1) Add FBM noise-based fog/nebula shader as a separate Three.js mesh behind the particle system in particle-field.tsx, (2) Alternate section backgrounds between default and a darker variant for visual rhythm, (3) Make hero typography bolder with lighter font weight for elegance and left-aligned asymmetry option.

**Tech Stack:** Three.js (existing), GLSL shaders, Tailwind CSS 4

---

### Task 1: Add Nebula Fog Shader Layer to Particle Field

**Files:**
- Modify: `src/components/particle-field.tsx`

**Context:** The particle field already has a Three.js scene with particles + connection lines. We need to add a full-screen quad behind the particles that renders an animated FBM noise nebula. This creates atmospheric depth like A2R.com's background.

**Step 1: Add the nebula fog shader mesh**

Add a `THREE.PlaneGeometry` full-screen quad with a custom `ShaderMaterial` positioned behind the particles (z = -100). The fragment shader uses FBM noise to create drifting, organic fog clouds.

Dark mode: subtle indigo/violet fog on dark background (opacity ~0.12-0.18)
Light mode: very subtle warm indigo fog (opacity ~0.06-0.10)

The shader uniforms:
- `uTime` — shared with particle material, drives animation
- `uMouse` — normalized mouse position for subtle fog displacement
- `uColor1` — primary fog color (indigo)
- `uColor2` — accent fog color (violet)
- `uOpacity` — overall fog opacity (theme-dependent)
- `uResolution` — viewport resolution

The vertex shader is a simple pass-through. The fragment shader:
1. Compute UV from fragment position
2. Apply mouse-based displacement (subtle, 2-5% UV shift)
3. Layer 3-4 octaves of FBM noise at different scales and speeds
4. Mix between uColor1 and uColor2 based on noise value
5. Output with smooth alpha falloff toward edges (vignette)

**Step 2: Wire fog uniforms into the existing animation loop**

Update the `animate()` function to set `uTime` and `uMouse` uniforms each frame. Update the `updateTheme()` function to adjust fog colors and opacity for dark/light mode.

**Step 3: Verify build**

Run: `npm run build`
Expected: Clean build, no TypeScript errors

---

### Task 2: Alternate Section Backgrounds for Visual Rhythm

**Files:**
- Modify: `src/index.css` — add a new CSS variable `--background-alt` for both light and dark themes
- Modify: `src/components/sections/process.tsx` — add alternate background
- Modify: `src/components/sections/contact.tsx` — add alternate background

**Context:** A2R.com alternates between white and near-black sections. For FIERRO, we'll alternate between the default background and a slightly darker/different variant to create section rhythm.

**Step 1: Add alternate background CSS variables**

In `src/index.css`:
- Light mode `:root`: `--background-alt: oklch(0.95 0.008 270);` (slightly cooler/darker than 0.98)
- Dark mode `.dark`: `--background-alt: oklch(0.06 0.025 280);` (slightly deeper than 0.08)
- Add to `@theme inline`: `--color-background-alt: var(--background-alt);`

**Step 2: Apply alternating backgrounds to sections**

Apply `bg-background-alt` to the Process and Contact sections (alternating with Services and Portfolio which keep default bg). This creates: Hero (transparent) → Services (default) → Process (alt) → Portfolio (default) → Contact (alt) → Footer.

**Step 3: Verify build**

Run: `npm run build`
Expected: Clean build

---

### Task 3: Bolder Hero Typography

**Files:**
- Modify: `src/components/sections/hero.tsx`

**Context:** A2R uses font-weight 300 for their hero headline — light weight reads as premium and elegant. Our current hero is bold (700+) and centered. We'll make the weight lighter and add more dramatic scale.

**Step 1: Update hero typography**

- Change h1 from `font-bold` to `font-light` (300 weight)
- Increase size: `text-6xl md:text-8xl lg:text-[7rem]` for more drama
- Tighten tracking: `tracking-tighter`
- Keep centered layout (asymmetric left-align would need broader layout changes)

**Step 2: Verify build**

Run: `npm run build`
Expected: Clean build

---

### Task 4: Final Build Verification & Commit

**Step 1: Run full build**

Run: `npx tsc --noEmit && npm run build`
Expected: Zero errors, clean production build

**Step 2: Commit all changes**

```bash
git add src/components/particle-field.tsx src/index.css src/components/sections/process.tsx src/components/sections/contact.tsx src/components/sections/hero.tsx
git commit -m "feat: add atmospheric nebula fog, section rhythm, and bolder hero typography

Adds FBM noise shader fog layer behind particles for atmospheric depth,
alternating section backgrounds for visual rhythm, and lighter hero
font weight for premium elegance. Inspired by A2R.com audit.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

**Step 3: Push to main**

```bash
git push origin main
```

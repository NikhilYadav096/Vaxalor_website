# Vaxalor redesign: research and motion strategy

Method: both sites were opened in headless Chromium (Playwright) at 1440x900 and 390x844, scrolled and screenshotted.
The reference's animation scripts and CSS were downloaded and read. Anything marked **(markup only)** was seen in code
but not confirmed by watching it run. The reference's intro popup covered most of the scroll screenshots, so scroll
behaviour is documented from its scripts, not from frame-by-frame observation.

## 1. Vaxalor today (verified)

| Area | Finding |
| --- | --- |
| Identity | Glossy sky-to-cobalt "Vai" mark, white-and-blue robot mascot. Brand colour is **blue**, not orange (an earlier draft of this rebuild used orange in error). |
| Type | Sora (700) for headings, Inter for body. Slate ink `#0f172a`, canvas `#f8fafc`, dark sections `#0f172a`. |
| Structure | Floating pill nav, dotted grid hero with the 3D logo poster, three value cards, stat meters, work list, 4-step process, one testimonial, contact form. |
| Content | 5 pillars, 57 services, toolkit list, 4 projects, 4 named team members, founded 2025, 20-day delivery, real FAQ, privacy and terms (updated 16 Apr 2026), 3 blog posts. |
| Not on the site | Industry products (restaurant, school, college, hospital, hotel, clinic). Only "ERP Systems", "CRM Portals", "SaaS Product Architecture", "Custom Business Management Tools". The redesign does not invent the rest. |
| Weaknesses | Template-like card grids, one repeated fade-in, no sense of craft in motion, work section thin (no project pages), hero is static. |

## 2. Reference analysis: The Bikaneri Kitchen

Shopify theme with custom sections. Libraries: **Lenis** (smooth scroll), **GSAP + ScrollTrigger**.
Design: monochrome editorial (white, `#f3f3f3`, charcoal `#242833`), Baskervville serif headings, Assistant body, large
full-bleed media, generous whitespace.

### Animation inventory (from `site-animations.js`, `smooth-scroll.js`, `custom-loading-screen.js`, CSS)

| # | Effect | Verified how | Trigger | Motion | Duration / easing |
| - | ------ | ------------ | ------- | ------ | ----------------- |
| 1 | Smooth scroll | script | wheel/touch | eased scroll | Lenis 1.1s, expo-out |
| 2 | Loading screen | script + CSS | first load, once per session | 3 icons open, centre one spins, layer fades after load or 5s cap | open 0.4s back.out, min 450ms |
| 3 | Hero veil + settle | script | after load | dark veil fades, frame scales 1.06 to 1 | 1.4s power2.inOut / 2.2s expo.out |
| 4 | Heading mask rise | script | element enters at ~90% viewport | each word rises out of an overflow mask (yPercent 120 to 0) | 1.15s power4.out, stagger 0.055 |
| 5 | Fade-rise | script | enter | opacity + y | 0.8-0.95s, stagger 0.08-0.12 |
| 6 | Clip reveal | script | enter | `clip-path: inset()` wipe | 1.35s power3.inOut |
| 7 | Line draw | script | enter | rules scale from 0 to 1 on X | 1.2s power3.inOut |
| 8 | Ken Burns | script | scroll, scrubbed | image scale 1 to 1.12 | scrub 0.6 |
| 9 | Background parallax | script | scroll, scrubbed | yPercent -5 to 5 | scrub 0.6 |
| 10 | Hero pin space | CSS class names **(markup only)** | scroll | tall pinned video frame (14:25) | not measured |
| 11 | Intro popup with video | screenshots | load | modal, split image/text | n/a |
| 12 | Hover states | CSS (17 rules) | hover | colour, opacity, small transforms | 0.15-0.3s ease |
| 13 | Reduced-motion | script | media query | all effects skipped | n/a |

Not present in the reference: page transitions (full Shopify page loads), custom cursor, horizontal scroll, scroll-jacking,
text scrub. These are Vaxalor additions and are not described as reproduced.

## 3. Creative direction for Vaxalor

**Editorial technology studio.** Cool paper white and deep night blue, with the real brand blue as the single accent.
Sora for display, Instrument Serif italic for one emphasised word per headline (the editorial move borrowed from the
reference's serif), Inter for reading text. No gradients, glass or glow. Contrast comes from scale, rhythm and
alternating light and dark bands.

Tokens: `--paper #f6f8fc`, `--mist #e7eefb`, `--ink #0b1220`, `--night #0a1020`, `--brand #1a56d6`, `--brand-deep #0b2a6b`,
`--sky #62b8f0`.

## 4. Homepage plan and motion map

| Section | Composition | Motion (and why) |
| ------- | ----------- | ---------------- |
| Loader | Night layer, dots and star | Open, spin, fade (reference #2) |
| Hero | Three-line headline, copy and CTAs, wide media frame (video slot) with mascot | Line reveal in sequence, then CTAs, then frame rises. Frame **expands to full-bleed on scroll** (clip-path scrub). Logo parallax and mascot float |
| Story | One huge sentence, arch image, facts | **Scroll-linked word brightening**, arch wipe, counters |
| Services | Editorial index of 5 pillars | Rule draw + mask titles. Rows **expand on hover** to show categories. Toolkit marquee speeds with scroll velocity |
| Work | Four full-height panels that stack | CSS sticky stack, previous panel scales and dims, images parallax, wipe reveals |
| Systems | Tabbed schematic of ERP, CRM, SaaS, tools, modernisation | Diagram lines **draw** on tab change |
| Process | Sticky title + 4 steps (Discovery, Design, Develop, Ship) | Progress line scrubs, active step lights up, day range swaps |
| Why Vaxalor | Brand-blue band, four commitments | Mask text, rule draw, hover shift |
| Final CTA | Night, huge headline, magnetic button | Rounded top edge flattens on scroll, magnetic pull |
| Footer | Links, contact, wordmark | Letters rise one by one |
| Between pages | Curtain wipe | Original addition, history-safe, skipped for reduced motion |

Mobile: sticky stacks, expand-on-scroll, parallax and magnetic effects are disabled below 901px. Entrances remain.
`prefers-reduced-motion` disables all motion.

## 5. Architecture

Next.js 15 App Router, TypeScript, plain CSS with tokens (kept from the existing project), GSAP + ScrollTrigger, Lenis.
Motion tokens live in `src/lib/motion.ts`. Reusable components in `src/components/motion/`: `SplitText`, `ScrubWords`,
`Reveal`, `ImageReveal`, `Magnetic`, `Counter`, `Marquee`, `MotionProvider`, plus the `useMotion` hook, which wraps
`gsap.matchMedia` so desktop, mobile and reduced-motion each get their own setup and are cleaned up on navigation.

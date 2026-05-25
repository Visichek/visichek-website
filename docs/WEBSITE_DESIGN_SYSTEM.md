# VisiChek Website Design System Snapshot

Snapshot date: 2026-05-25

This document captures the current public website visual direction so the web
apps can be updated to feel like the same product family.

## Core Personality

VisiChek's current website is clean, security-focused, and editorial. It uses a
mostly white canvas, restrained charcoal text, brand green actions, soft
surfaces, and a polished glass navigation bar. The tone should feel trustworthy,
modern, and operational rather than loud or decorative.

## Typography

Fonts are loaded in `app/layout.tsx` and exposed through Tailwind theme tokens
in `app/globals.css`.

- Default app font: Geist Sans via `--font-geist-sans`.
- Default mono font: Geist Mono via `--font-geist-mono`.
- Marketing sans: TWK Lausanne via `--font-marketing-sans`.
- Marketing serif: Moderat Serif via `--font-marketing-serif`.
- Marketing mono: SF Mono via `--font-marketing-mono`.
- Accent handwriting: Rock Salt via `--font-marketing-handwritten`.

The marketing shell overrides common font utilities:

- `.marketing-shell` uses TWK Lausanne for body/interface text.
- `.marketing-shell .font-serif` maps to Moderat Serif.
- `.marketing-shell .font-mono` maps to SF Mono.

Current heading style:

- Hero and section headings use Moderat Serif.
- Body, buttons, nav, forms, and card copy use TWK Lausanne.
- Large headings commonly use tight leading and slight negative tracking on the
  website. For dense product app screens, prefer normal tracking and smaller
  heading sizes unless the surface is a true marketing hero.

## Color System

Primary palette:

- Brand green: `#3A9615`.
- Brand hover green: `#2e7a11`.
- CTA gradient: `#43aa1a` to `#2e7a11`.
- Tailwind brand tokens: `brand-200 #bbf7d0`, `brand-500 #22c55e`,
  `brand-600 #16a34a`.

Neutrals:

- Page background: `#ffffff`.
- Deep charcoal: `#1a1a1a`.
- Main charcoal token: `#2a2a2a`.
- Body text: `#4a4a4a`.
- Muted text: `#6a6a6a`.
- Border: `#e8e8e8`.
- Soft panel fill: `#fafafa`.
- Pale green surfaces: `#f2f8f0`, `#f8fbf8`.

Usage guidance for web apps:

- Keep screens mostly white with charcoal text.
- Use green for primary actions, active states, focus rings, and small status
  accents.
- Use borders and subtle shadows before heavy fills.
- Reserve strong green gradients for primary CTAs, not every button.
- Use blue, amber, and red only for app state semantics such as info, warning,
  or destructive actions.

## Glass And Surface Treatment

The most distinctive website effect is the desktop marketing nav glass in
`app/components/marketing-header.tsx`, powered by `components/GlassSurface.jsx`
and `components/GlassSurface.css`.

Current glass behavior:

- The nav is fixed at the top.
- At page top it is a full-width white bar, 72px tall.
- After scroll it becomes a centered 1140px glass pill, 60px tall, with a 24px
  radius.
- Desktop uses SVG displacement plus `backdrop-filter` saturation.
- Mobile uses a solid white bar for clarity and performance.
- Fallback glass uses `rgba(255,255,255,0.25)`, `blur(12px)`,
  `saturate(1.8)`, soft inset highlights, and light shadows.

Other glass-adjacent surfaces:

- Modal backdrops use `bg-black/50` plus `backdrop-blur-sm`.
- Sticky content bars use `bg-white/85 backdrop-blur`.
- Pills and active nav states use translucent white or green-tinted fills.

For product web apps, use glass sparingly: top navigation, floating command
bars, or modal overlays. Do not make every card glass; most app surfaces should
remain solid white with crisp borders.

## Layout And Spacing

Marketing layout:

- Root marketing wrapper: `.marketing-shell min-h-screen bg-white text-[#2a2a2a]`.
- Standard horizontal padding: `px-6`.
- Common max widths: `max-w-6xl`, `max-w-[1200px]`, and `max-w-[800px]` for
  reading pages.
- Top spacing accounts for fixed nav: page heroes usually start around
  `pt-[120px]` to `pt-[140px]`.
- Sections are full-width bands, usually white with a top or bottom border.
- Repeated items use cards; page sections themselves are not floating cards.

Card and panel style:

- Website cards often use `rounded-2xl`, `border #e8e8e8`, white fill, and a
  hover shadow like `0 8px 32px rgba(0,0,0,0.07)`.
- Product app cards should tighten this: smaller radius, denser spacing, and
  predictable tables/forms for repeat use.

## Buttons And Controls

Primary CTA:

- Rounded full pill.
- Green gradient or solid `#3A9615`.
- White text, medium/semi-bold weight.
- Soft green shadow and small hover lift.

Secondary CTA:

- Rounded full pill.
- White or transparent fill.
- `#e8e8e8` border.
- Charcoal text.

Forms:

- Inputs use `#fafafa` fill, `#e5e7eb` border, 12px radius, and transition to
  white on hover/focus.
- Focus state uses brand green border plus a soft green ring:
  `0 0 0 3px rgba(58, 150, 21, 0.1)`.

## Motion

Motion is subtle and polished:

- Reveal animations fade in and move up about 22px over 0.55s.
- Nav resizing uses `cubic-bezier(0.16, 1, 0.3, 1)`.
- Cards lift by 1-3px on hover.
- Buttons use short 150-200ms transitions and active scale around `0.98`.
- FAQ answers animate with CSS grid row transitions.

For web apps, keep motion functional: use it for focus, navigation changes,
modals, and async state feedback. Avoid long decorative motion in workflows
people use repeatedly.

## Current Page Patterns

- Home: editorial marketing landing page with a pale green hero, serif headline,
  green CTA, sticky service sections, compliance cards, FAQ, and CTA section.
- Pricing: data-backed pricing surface with cards, comparison rows, FAQ, and
  CTA.
- Blog/content: refined hero with subtle grid texture, serif headings, white
  cards, and green active accents.
- Legal: API-backed index and detail pages under `/legal`, using the same
  reading width, serif title, charcoal body copy, green metadata accents, and
  no-cache PDF download redirects.

## Implementation References

- Global tokens and marketing CSS: `app/globals.css`.
- Font loading: `app/layout.tsx`.
- Marketing chrome switching: `app/components/chrome-router.tsx`.
- Glass nav: `app/components/marketing-header.tsx`,
  `components/GlassSurface.jsx`, `components/GlassSurface.css`.
- Footer and modal form styling: `app/components/marketing-footer.tsx`.
- Home page sections: `app/components/marketing-clone/*`.
- Legal API integration: `app/util/legal.ts`, `app/legal/*`.

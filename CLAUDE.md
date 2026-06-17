# CLAUDE.md: Rams Driving Academy

Guardrails for anyone (human or agent) working in this repo. The full spec lives
in `assets/build_spec/` (CLAUDE.md, DESIGN.md, CONTENT.md, SEO.md, ARCHITECTURE.md)
and the original single-file build is at `assets/build_spec/reference/v3/index.html`.
Those docs are the source of truth, in this priority order if they ever conflict:
CLAUDE.md > DESIGN.md > CONTENT.md > SEO.md > ARCHITECTURE.md.

## What this is
A single-page, scroll-driven Astro site for an Adelaide driving school. The only
conversion action is a WhatsApp message (or a phone call). No cart, no login, no
server, no forms that email. Every CTA opens WhatsApp with a pre-filled message.

## Hard rules
- Australian English everywhere (organise, colour, licence, centre, kerb, enrol).
- Never use em dashes or en dashes. Commas, colons, parentheses or full stops only.
- One phone number, two link formats: WhatsApp `wa.me/61432065741`, call `tel:+61432065741`.
  All of it flows through `waLink()` / `phone` in `src/data/content.ts`. Do not hardcode.
- Locked palette (cream, maroon, gold, warm dark) in `src/styles/tokens.css`. No new hues.
- Every text/background pairing meets WCAG AA. Keyboard reachable, visible focus rings.
- Respect `prefers-reduced-motion`: all motion no-ops and shows static final states.
- Mobile-first. The booking funnel and mobile menu are what people actually touch.
- Do not invent facts, prices, reviews or suburbs. Copy comes only from `content.ts`
  (which mirrors CONTENT.md). Placeholders are flagged; leave TODO comments for real data.

## Deliberate deviation from the spec (approved by the owner)
The build_spec docs ask for vanilla JS with no animation library. The owner explicitly
chose **GSAP and WebGL** instead, to push the craft higher:
- GSAP (ScrollTrigger + MotionPathPlugin), bundled locally, drives all scroll motion and
  the road + sedan motion path. See `src/components/Motion.astro`.
- A raw WebGL fragment shader provides the ambient glow. See `src/components/Ambient.astro`.
Both are gated behind capability + reduced-motion checks with CSS fallbacks. Do not revert
these to vanilla unless the owner asks.

## Stack
Astro (static), plain CSS tokens, GSAP, raw WebGL. Deploy: Vercel (static, no adapter).
`npm run dev` / `npm run build` / `npm run preview`.

## Open TODOs for Loki (grep `TODO(loki)`)
Real domain, real photos (`public/images/`), real reviews, confirm suburbs, Google Business
Profile + sameAs, manifesto sign-off name, confirm opening hours, optional CSP in vercel.json.

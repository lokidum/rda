# Rams Driving Academy

Production website for Rams Driving Academy, an Adelaide driving school. Single-page,
scroll-driven, built to turn visitors into WhatsApp bookings.

## Tech
- [Astro](https://astro.build) static site, one page.
- Plain CSS design tokens (`src/styles/tokens.css`), no CSS framework.
- [GSAP](https://gsap.com) (ScrollTrigger + MotionPathPlugin) for the scroll road, the
  travelling car and section motion.
- A raw WebGL fragment shader for the ambient glow.
- All copy, prices and WhatsApp strings live in one place: `src/data/content.ts`.

## Develop
```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output to dist/
npm run preview   # preview the production build
```
Node 22 (see `.nvmrc`).

## Deploy (Vercel)
Vercel auto-detects Astro (build `astro build`, output `dist`). `vercel.json` adds the
security headers, long-cache rules and the `/home` to `/` redirect. Connect the GitHub
repo for push-to-deploy, then add the custom domain in the Vercel dashboard (add both
apex and www, pick one primary, Vercel redirects the other) and point DNS at Vercel.

## Adding real photos
Drop files with the exact names in `public/images/` (see `public/images/README.txt`).
The branded placeholders disappear automatically on the next build.

## Specification
The full design, content and SEO spec is in `assets/build_spec/`. Edit those docs first,
then update the matching code. See `CLAUDE.md` for the hard rules and the GSAP/WebGL note.

## Before launch (TODOs)
Search the repo for `TODO(loki)`:
- Real domain (meta, canonical, schema, sitemap, robots, OG image URL).
- Real photos, real student reviews, confirmed suburb list.
- Google Business Profile (the biggest local-SEO lever) and `sameAs` links.
- Manifesto sign-off name, confirmed opening hours.
- Validate JSON-LD in Google's Rich Results Test once the domain is live.

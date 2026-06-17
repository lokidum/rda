# ARCHITECTURE.md: Rams Driving Academy

How the Astro project is structured, how the motion islands work, and how it ships to Vercel. The site is a single page, so this is deliberately simple. Resist the urge to over-engineer.

---

## 1. Stack summary

- **Astro** (latest), static output (`output: 'static'`). One page.
- **Plain CSS** with design tokens (DESIGN.md) in a global stylesheet. Component-scoped styles inside each `.astro` file via the `<style>` block. No Tailwind, no CSS framework.
- **Vanilla JS islands** only where motion needs it. No React, no animation library.
- **Vercel** for hosting. Static build, so any static host would work, but the config here targets Vercel.

Why Astro: it ships HTML and zero JS by default, scopes styles per component, and gives the best SEO and Core Web Vitals out of the box. The animated bits become small `<script>` islands that hydrate themselves, not a whole framework runtime.

---

## 2. Folder structure

```
rams-driving-academy/
├── astro.config.mjs
├── vercel.json
├── package.json
├── tsconfig.json
├── CLAUDE.md                # the guardrails (also copy at root for the agent)
├── DESIGN.md
├── CONTENT.md
├── SEO.md
├── reference/
│   └── v3/index.html        # the existing build, read-only reference
├── public/
│   ├── robots.txt
│   ├── llms.txt
│   ├── sitemap.xml          # or generated, see SEO.md
│   ├── favicon.svg
│   └── images/
│       ├── README.txt       # the shot list / photography brief
│       └── (hero.jpg, lesson-1.jpg ... dropped in later by Loki)
└── src/
    ├── data/
    │   └── content.ts       # services, faq, reviews, suburbs, wa-messages (from CONTENT.md)
    ├── layouts/
    │   └── Base.astro       # <head>, meta, schema, global styles, header, footer, fixed bars
    ├── styles/
    │   ├── tokens.css       # all CSS custom properties from DESIGN.md
    │   └── global.css       # resets, base type, helpers
    ├── components/
    │   ├── Header.astro
    │   ├── MobileMenu.astro
    │   ├── BottomBar.astro
    │   ├── WhatsAppWidget.astro
    │   ├── RoadAnimation.astro
    │   ├── Hero.astro
    │   ├── Manifesto.astro
    │   ├── Services.astro
    │   ├── ServiceCard.astro
    │   ├── Experience.astro
    │   ├── Fleet.astro
    │   ├── Areas.astro
    │   ├── SuburbChip.astro
    │   ├── Reviews.astro
    │   ├── ReviewCard.astro
    │   ├── Faq.astro
    │   ├── FaqItem.astro
    │   ├── BookingFunnel.astro
    │   ├── FinalCta.astro
    │   └── Placeholder.astro
    └── pages/
        └── index.astro      # composes the sections in order
```

---

## 3. Content as data

Put structured content in `src/data/content.ts` so copy lives in one place and components stay presentational. Pull the exact values from CONTENT.md. Example shape:

```ts
export const phone = { wa: "61432065741", call: "+61432065741" };

export const services = [
  {
    id: "learner",
    title: "Learner to P training",
    price: "$110",
    unit: "/ lesson",
    blurb: "...",                       // from CONTENT.md
    waMessage: "Hi Rams Driving Academy, I'd like to ask about learner to P training.",
  },
  // ...
];

export const faq = [ { q: "...", a: "..." }, /* ... */ ];
export const reviews = [ { name: "...", initials: "...", text: "...", placeholder: true }, /* ... */ ];
export const suburbs = [ "Mawson Lakes", "Prospect", /* ... */ ];
```

A small helper builds WhatsApp URLs so encoding is consistent everywhere:

```ts
export const waLink = (msg: string) =>
  `https://wa.me/${phone.wa}?text=${encodeURIComponent(msg)}`;
```

Single source of truth for the number and the encoding. Every CTA uses `waLink(...)`.

---

## 4. Motion islands

Each animated piece is a self-contained `<script>` at the bottom of its component. Keep them tiny and dependency-free.

- **RoadAnimation:** one SVG `<path>` for the road plus a `<g>` for the car. On scroll, compute progress `0..1`, then `path.getPointAtLength(progress * path.getTotalLength())` for position and the delta for rotation. Update inside a single `requestAnimationFrame` loop that reads a cached scroll value (set in a passive scroll listener). Never read layout in the rAF loop.
- **Header:** passive scroll listener toggles `is-scrolled`, `is-hidden` (down) / visible (up), updates the progress bar width, and runs scrollspy via IntersectionObserver on the sections.
- **Hero:** IntersectionObserver triggers the word-by-word reveal once; scroll drives the steering-wheel rotation and parallax in the same rAF loop as the road if convenient.
- **Manifesto:** IntersectionObserver with a per-word observer or a scroll-progress map to light words.
- **Experience:** position: sticky pin plus scroll progress to crossfade the three images.
- **BookingFunnel:** plain state machine in JS (current step, answers object). Renders step visibility, validates compulsory fields, advances the dashed-road car, and on submit builds `waLink(compiledMessage)` and opens it.

Guard every island with:
```js
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduce) { /* set final state, skip animation */ }
```

Touch detection to disable hover tilt:
```js
const canHover = matchMedia("(hover: hover)").matches;
```

---

## 5. Astro specifics

- `astro.config.mjs`: `output: 'static'`. Add `@astrojs/sitemap` if you prefer generating the sitemap over hand-writing it (either is fine; SEO.md has the hand-written version as the baseline). Set `site: 'https://ramsdrivingacademy.com.au'` (placeholder domain, leave a TODO if not final).
- Use `<link rel="preconnect">` and the font `<link>` in `Base.astro` head exactly as DESIGN.md specifies.
- Use Astro's `<Image />` from `astro:assets` for real photos when they exist (automatic responsive sizes, lazy loading, modern formats). For the placeholder fallback, the `Placeholder.astro` component renders the styled frame. A small helper checks whether the expected file exists at build time and picks one or the other.
- Inline critical CSS is handled by Astro automatically for scoped styles. Keep `tokens.css` and `global.css` small.
- All JS is module-scoped per component; nothing global leaks.

---

## 6. Vercel deploy

- Framework preset: Astro (Vercel auto-detects). Build command `astro build`, output `dist`.
- Add `vercel.json` for security headers, caching and the canonical redirect (full file in SEO.md). Summary:
  - Long cache on `/images/*`, `/_astro/*` (hashed assets, immutable).
  - Security headers: `X-Content-Type-Options`, `Referrer-Policy`, a sensible `Content-Security-Policy` that allows the Google Fonts host and `self`, `Strict-Transport-Security`.
  - Redirect the bare domain to the primary host (pick www or apex, then 301 the other), and force https.
- Connect the GitHub repo to Vercel for push-to-deploy. Set the custom domain once it is registered. Note in README: add the domain in Vercel, then point the registrar's DNS at Vercel.
- No server functions needed. Everything is static plus client JS. The WhatsApp funnel never hits a server.

---

## 7. Local dev and scripts

```
npm create astro@latest
npm install
npm run dev      # local
npm run build    # production build to /dist
npm run preview  # preview the build
```

Node 18-plus. Commit `package-lock.json`. Add a `.nvmrc` if Loki wants a pinned Node version on Vercel.

---

## 8. Future hooks (do not build now, just leave room)

- GA4 or a privacy-light analytics snippet (SEO.md has the note). Add via a single component in `Base.astro` head behind a config flag.
- A real booking calendar later (Cal.com embed or similar) could replace or sit beside the WhatsApp funnel. Keep the funnel modular so it can be swapped.
- Multilingual (Tamil, Hindi) versions could become Astro routes `/ta`, `/hi` with hreflang. Not now, but the content-as-data structure makes it cheap later.

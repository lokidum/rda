# Rams Driving Academy: Master Build Prompt for Claude Code

Copy everything inside the block below into Claude Code as your first message. Have the six companion docs (`CLAUDE.md`, `DESIGN.md`, `ARCHITECTURE.md`, `CONTENT.md`, `SEO.md`, and this file) sitting in the project root so Claude Code can read them. Drop the existing V3 `index.html` into a folder called `/reference/v3/` first, because the build refines that file rather than starting from nothing.

---

```
You are building the production website for Rams Driving Academy, a driving school
in Adelaide, South Australia run by my dad. He has taught on Adelaide roads for over
20 years and serves a wide mix of South Asian, Asian and Western students. The site
has one job: turn visitors into WhatsApp bookings.

This is a REFINE, not a rebuild from scratch. A polished single-file V3 already exists
at /reference/v3/index.html. It has the locked palette, the scroll-driven road with a
little Corolla, the 4-step WhatsApp booking funnel, and a full SEO/GEO/AEO stack. Your
job is to port all of that into a clean Astro project, keep every good detail, and lift
the craft to Apple/Tesla tier. When in doubt about a value (a colour, a shadow, an easing
curve, a piece of copy), read it out of the V3 file rather than inventing a new one.

Before writing any code, read these files in the project root and treat them as the
source of truth, in this priority order if they ever conflict:
  1. CLAUDE.md       (hard rules, voice, guardrails, what NOT to do)
  2. DESIGN.md       (palette, type, spacing, motion, component specs, section layouts)
  3. CONTENT.md      (every word of copy, prices, FAQ, reviews, WhatsApp message strings)
  4. SEO.md          (schema, robots, llms.txt, sitemap, meta, Vercel headers)
  5. ARCHITECTURE.md (Astro structure, component map, animation approach, Vercel deploy)

Tech stack (locked):
  - Astro, static output, near-zero client JS by default.
  - Plain CSS using the design tokens in DESIGN.md (CSS custom properties). No Tailwind,
    no CSS framework. Component-scoped styles plus one global tokens file.
  - Vanilla JS islands only where motion needs it (scroll road, funnel, header). Use
    Intersection Observer and requestAnimationFrame. No animation libraries unless
    DESIGN.md names one.
  - Deploy target is Vercel. Include vercel.json and the headers/redirects from SEO.md.

Non-negotiables (full detail in CLAUDE.md):
  - Australian English everywhere. Never use em dashes or en dashes anywhere in copy or
    comments. Use commas, colons, parentheses or full stops.
  - One phone number, two formats: WhatsApp link uses 61432065741, click-to-call uses
    +61432065741. Every primary CTA funnels to WhatsApp with a pre-filled message.
  - Locked palette: cream background, maroon brand, gold plate accent. Do not introduce
    new hues. All text must pass the WCAG AA contrast ratios listed in DESIGN.md.
  - Must be flawless on phones first. The booking funnel and mobile menu are the two
    things people will actually touch, so they get the most attention.

Build order:
  1. Scaffold the Astro project and the folder structure from ARCHITECTURE.md.
  2. Create the global tokens stylesheet from DESIGN.md (every colour, shadow, glow,
     font, easing curve and spacing step as a CSS variable).
  3. Build the layout shell: <head> with all meta and schema from SEO.md, the glass
     header with scrollspy, the mobile menu, the fixed bottom call/WhatsApp bar, and
     the floating WhatsApp widget.
  4. Build each section as its own component, top to bottom, exactly in the order and
     layout given in DESIGN.md: hero, manifesto, services, experience, fleet, areas,
     reviews, faq, book (the funnel), final.
  5. Wire the scroll-driven road and Corolla across the whole page (SVG motion path),
     plus the steering wheel rotation in the hero.
  6. Build the 4-step booking funnel that compiles answers into a pre-filled WhatsApp
     message. Logic and questions are in CONTENT.md.
  7. Add robots.txt, llms.txt, sitemap.xml, the image placeholder system and
     /public/images/README.txt, all per SEO.md and CONTENT.md.
  8. Add vercel.json with headers and the canonical redirect.

After the build, do a verification pass and report it to me:
  - Run a contrast check on every text/background pairing against DESIGN.md targets.
  - Confirm the JSON-LD validates (no trailing commas, correct types).
  - List every CTA and the exact WhatsApp URL it fires, so I can eyeball the numbers.
  - Build the project and confirm zero console errors and a clean Astro build.
  - Give me a Lighthouse-style self-check: anything that would cost performance, SEO
    or accessibility points, and how you addressed it.

Do not invent reviews, prices, or facts. Use only what is in CONTENT.md. Where a real
photo is missing, use the branded placeholder system described in DESIGN.md and CONTENT.md
so the site looks intentional until my dad's photos land. Leave clear TODO comments only
where I genuinely have to supply something (domain, real reviews, Google Business link).

Work section by section, keep the diffs readable, and tell me what you did at each step.
```

---

## How to use this package

1. Make a new folder for the project and open it in Claude Code.
2. Put all six markdown docs in the root.
3. Put the current V3 `index.html` in `/reference/v3/index.html`.
4. Paste the prompt above as your first message.
5. Let it scaffold, then review section by section. The companion docs mean you can
   say things like "rebuild the services section per DESIGN.md section 9.3" and it will
   know exactly what you mean.

## When you want to change something later

Edit the relevant doc first, then tell Claude Code "re-read DESIGN.md and update X to
match". Keeping the spec as the source of truth is what keeps the build coherent over
many edits. The docs are the brain, the code is the body.

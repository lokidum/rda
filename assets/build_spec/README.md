# Rams Driving Academy: Claude Code Build Spec

This folder is the complete brief for rebuilding the Rams Driving Academy website in Claude Code, as a clean Astro project that refines the existing V3, deployed to Vercel. Hand these docs to Claude Code and it has everything it needs to build the site "perfectly" and consistently across many edits.

## The files, and the order to use them

1. **00_BUILD_PROMPT.md** Start here. The copy-paste kickoff prompt for Claude Code, plus instructions on how to set the project up.
2. **CLAUDE.md** The hard rules: voice, palette locks, accessibility floor, performance budget, what not to do. This is the top-priority guardrail file.
3. **DESIGN.md** The design system: palette with exact hex and contrast ratios, type scale, spacing, the full motion and interaction spec, component inventory, and section-by-section layout.
4. **CONTENT.md** Every word: services and prices, FAQ, review placeholders, suburb list, the WhatsApp message strings, the funnel question logic, and the image brief.
5. **SEO.md** The SEO, GEO and AEO spec: meta, JSON-LD schema, robots.txt, llms.txt, sitemap, Vercel headers, and the off-site Google Business Profile action list.
6. **ARCHITECTURE.md** The Astro folder structure, component map, how the motion islands work, and the Vercel deploy steps.

## How to run it

1. Make a fresh project folder, open it in Claude Code.
2. Copy all six docs into the project root.
3. Drop the current V3 `index.html` into `/reference/v3/index.html` (it ships in the same zip as this folder).
4. Paste the prompt from 00_BUILD_PROMPT.md as your first message.
5. Review section by section. Because the spec is the source of truth, you can give precise instructions like "redo the services section per DESIGN.md 9.3" or "the funnel message should match CONTENT.md section 10".

## The locked decisions (so you do not have to re-explain them)

- Stack: Astro, plain CSS tokens, vanilla JS islands. Host: Vercel.
- Approach: refine the V3 build, do not start from scratch.
- Palette: cream, maroon, gold plate accent. No new hues.
- Voice: Australian English, no em or en dashes, warm and plain.
- One job: WhatsApp bookings on +61 432 065 741. WhatsApp links use 61432065741.

## What still needs you (TODOs flagged through the docs)

- The real domain (swap the placeholder everywhere).
- Real photos (the slots and the brief are in CONTENT.md section 12).
- Real reviews (placeholders are clearly marked in CONTENT.md section 8).
- Confirm the suburb list Dad actually covers (CONTENT.md section 7).
- Create the Google Business Profile (SEO.md section 8, the single biggest lever).
- Decide whether the manifesto signs off as "Rams" or Dad's first name.

## Keeping it coherent over time

When you want to change something, edit the relevant doc first, then tell Claude Code to re-read it and update the code to match. The docs are the brain, the code is the body. That habit is what keeps a heavily-iterated site from drifting into a mess.

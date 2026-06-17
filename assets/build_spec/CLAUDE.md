# CLAUDE.md: Rams Driving Academy

Project rules for Claude Code. These override defaults and any habit you have. Read this before touching code, and re-read it if a build decision feels ambiguous.

## What this site is

A single-page, scroll-driven marketing site for Rams Driving Academy, an Adelaide driving school with 20+ years of experience. The only conversion action is a WhatsApp message (or a phone call). There is no shopping cart, no login, no online payment, no contact form that emails. Every path leads to WhatsApp.

Primary visitor: someone in Adelaide who needs driving lessons, often an overseas licence holder converting to a South Australian licence, a learner working towards their Ps, or a licensed driver who wants confidence back. Many are not native English speakers, so copy stays plain and warm.

## Voice and copy rules

- Australian English at all times: organise, analyse, recognise, behaviour, colour, defence, centre, licence (noun), enrol, kerb. Never American spellings.
- Never use em dashes or en dashes. Not in copy, not in code comments, not anywhere. Use commas, colons, parentheses or full stops. For number ranges use "to" or a hyphen (9am to 5pm, or 20-plus years).
- Warm, calm, confident. This is a patient teacher, not a hype machine. No exclamation spam. No "unlock", no "revolutionise", no buzzwords.
- Plain words over clever ones. A nervous first-time driver should understand every sentence.
- Do not invent facts, prices, reviews, suburbs served, or qualifications. Use only what is in CONTENT.md. If something is missing, leave a clear TODO comment for Loki.

## Brand and contact (locked)

- Business name: Rams Driving Academy.
- Location: Adelaide, South Australia.
- One phone number, two surfaces:
  - WhatsApp links: `https://wa.me/61432065741?text=...` (no plus, no spaces, country code 61, leading 0 dropped).
  - Click-to-call links: `tel:+61432065741`.
- Every booking button opens WhatsApp with a pre-filled, URL-encoded message. The exact strings live in CONTENT.md. Different buttons carry different messages so Dad knows what the person wants the moment they message.

## Palette (locked, do not add hues)

Cream background, maroon brand, gold number-plate accent, warm near-black for dark sections. Full hex values and the required contrast ratios are in DESIGN.md. Do not introduce blues, greens (except the one WhatsApp green), or any new accent. The only greens allowed are the WhatsApp brand green and its darkened accessible variant.

## Accessibility floor (hard requirement)

- Every text/background pairing must meet WCAG AA: 4.5:1 for body text, 3:1 for large text (24px or 19px bold and above). DESIGN.md lists the measured ratios for each pairing. Do not ship a pairing below target.
- All interactive elements are keyboard reachable with a visible focus ring.
- Respect `prefers-reduced-motion`: when set, disable the scroll road animation, the steering wheel spin, parallax and Ken Burns, and just show the content statically.
- Touch targets at least 44 by 44 px. Hover effects disabled on touch devices so nothing feels sticky.
- Every image has meaningful alt text. Decorative SVGs get `aria-hidden`.

## Performance budget

- Static Astro output. Ship as little client JS as possible. Each animated piece is a small vanilla island, not a framework.
- Lazy-load every image below the fold. Hero image preloaded.
- No web font flash of invisible text: use `font-display: swap`, preconnect to the font host, and a system-font fallback stack.
- Target Lighthouse 95-plus on Performance, Accessibility, Best Practices and SEO on mobile. If a decision trades user delight against a couple of Lighthouse points, keep the delight but tell Loki.

## Things NOT to do

- Do not switch the stack. Astro, plain CSS tokens, vanilla JS islands. No Tailwind, no React, no jQuery, no animation library unless DESIGN.md explicitly names one.
- Do not add tracking, analytics or third-party scripts unless asked. (A note on adding GA4 later lives in SEO.md, but do not add it now.)
- Do not collect data server-side. The funnel only ever builds a WhatsApp URL on the client.
- Do not change prices, the phone number, or the service list. Those are Dad's, not yours.
- Do not use placeholder lorem ipsum. Real copy is in CONTENT.md.
- Do not over-animate. Motion serves the story (you start on Ls, you arrive at booking). If an effect does not earn its place, cut it.

## Definition of done

A clean Astro build with zero console errors, all schema validating, every CTA firing the correct WhatsApp URL, all contrast pairings passing, reduced-motion handled, and the whole thing seamless from a 320px phone up to a wide desktop. See the verification checklist in 00_BUILD_PROMPT.md.

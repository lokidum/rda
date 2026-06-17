# DESIGN.md: Rams Driving Academy

The design system. Every value here is lifted from or refined on top of the V3 build. When Claude Code needs a colour, a shadow, a font size or an easing curve, it comes from this file. Aim for Apple/Tesla restraint: lots of space, big confident type, motion that feels expensive and quiet.

---

## 1. Design principles

1. **Calm luxury, not loud.** The brand is a patient 20-year teacher. The site should feel premium and unhurried. White (well, cream) space is a feature.
2. **One journey.** The page is a drive. You start on your Ls at the top, a little car travels the road as you scroll, and the booking section at the bottom is the destination. Every section is a stop on that road.
3. **Type does the heavy lifting.** Oversized Fraunces serif headlines, generous line height in body, a clear scale. Decoration is minimal; the words and the space carry it.
4. **Motion serves the story.** The road, the car, the steering wheel, the word-by-word reveals. Each motion either advances the journey metaphor or rewards attention. Nothing spins for the sake of spinning.
5. **Mobile is the real product.** Most students arrive on a phone. Design every section for a 360px screen first, then let it breathe on desktop.

---

## 2. Colour tokens (locked palette)

Define these as CSS custom properties on `:root`. Do not add new hues. Values are the production V3 values, already tuned for contrast.

```css
:root{
  /* Cream family (backgrounds and surfaces) */
  --cream:        #F4EDDF;  /* page background */
  --cream-2:      #FCF8EE;  /* raised surfaces, cards */
  --cream-3:      #E8DEC8;  /* tints, hairline fills */

  /* Ink and text */
  --ink:          #211309;  /* primary text on cream */
  --text-2:       #5A4338;  /* secondary text on cream */

  /* Maroon (brand primary) */
  --maroon:       #8A2418;  /* brand primary, buttons, links */
  --maroon-bright:#A53321;  /* hovers, accents */
  --maroon-deep:  #5C150B;  /* deep shade, gradients */

  /* Dark sections (warm near-black) */
  --dark:         #1B110B;
  --dark-2:       #271A11;
  --cream-on-dark:#F6EFE0;  /* text on dark */
  --soft-on-dark: rgba(246,239,224,.8);

  /* Gold and plate accents */
  --gold:         #F2CE16;  /* number-plate yellow */
  --gold-soft:    #F6CF3D;
  --plate-red:    #D8201C;  /* L-plate / P-plate red */

  /* WhatsApp (the only greens permitted) */
  --wa:           #0F8443;  /* darkened for AA with white text */

  /* Hairlines */
  --hair:         rgba(33,19,9,.15);
  --hair-strong:  rgba(33,19,9,.24);
  --hair-light:   rgba(246,239,224,.2);
}
```

### 2.1 Contrast pairings (must hold)

These were measured in V3. Keep them at or above target. If you adjust a colour, re-measure and report.

| Foreground | Background | Ratio | Use |
| --- | --- | --- | --- |
| `--ink` #211309 | `--cream` #F4EDDF | ~15.5:1 | body copy |
| `--text-2` #5A4338 | `--cream` #F4EDDF | ~7.9:1 | secondary copy |
| `--maroon` #8A2418 | `--cream` #F4EDDF | ~7.7:1 | links, labels, prices |
| `--cream-on-dark` #F6EFE0 | `--dark` #1B110B | ~14:1 | text on dark sections |
| white #FFFFFF | `--wa` #0F8443 | ~4.8:1 | WhatsApp button text |
| `--gold` #F2CE16 | `--dark` #1B110B | ~12:1 | gold accents on dark |

Rule: never put `--gold` text on `--cream` (fails). Gold is for dark backgrounds and for solid plate shapes only.

---

## 3. Shadow and glow system

```css
:root{
  --sh-sm: 0 1px 2px rgba(33,19,9,.07), 0 3px 10px -2px rgba(33,19,9,.07);
  --sh-md: 0 4px 10px -4px rgba(92,21,11,.16), 0 14px 34px -14px rgba(92,21,11,.22);
  --sh-lg: 0 10px 24px -10px rgba(92,21,11,.25), 0 34px 80px -30px rgba(92,21,11,.4);

  --glow-maroon: 0 8px 34px -8px rgba(138,36,24,.55);
  --glow-gold:   0 0 36px rgba(242,206,22,.30);
  --glow-wa:     0 10px 32px -8px rgba(23,166,83,.55);
}
```

Usage: cards rest on `--sh-md` and rise to `--sh-lg` on hover. Primary maroon buttons gain `--glow-maroon` on hover. WhatsApp buttons use `--glow-wa`. Stats, plates and the gold details breathe with `--glow-gold`. Keep glows soft and low-opacity; they should feel like ambient light, not neon.

Ambient background glows: large blurred radial gradients (maroon and gold, very low alpha) sitting behind the hero, fleet and booking sections, slowly drifting. Keep them subtle enough that text stays crisp.

---

## 4. Typography

Two families, loaded from Google Fonts with `display=swap` and a preconnect.

- **Display:** Fraunces (optical, serif). Used for all headings, prices, the brand wordmark and pull quotes. Italics are part of the brand voice (the wordmark is italic, accent words are italic).
- **Body:** Inter. Everything else.

```css
:root{
  --font-d: "Fraunces", Georgia, serif;
  --font-b: "Inter", -apple-system, "SF Pro Text", "Segoe UI", sans-serif;
}
```

Google Fonts link (matches V3):
```
https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,600;1,9..144,900&family=Inter:wght@400;500;600;700&display=swap
```

### 4.1 Scale (clamp-based, fluid)

| Token | clamp | Use |
| --- | --- | --- |
| Display XL | `clamp(2.8rem, 8vw, 6.5rem)` | hero headline |
| Display L | `clamp(2.2rem, 5vw, 4rem)` | section headlines, big stats |
| Display M | `clamp(1.55rem, 3.4vw, 2.7rem)` | pull quotes, sub-headlines |
| Heading | `1.32rem` to `1.5rem` | card titles, brand name |
| Body | `16px` base, `line-height:1.62` | paragraphs |
| Small | `.78rem` to `.9rem` | captions, helper text |
| Label | `.55rem` to `.7rem`, letter-spacing `.14em` to `.42em`, uppercase | eyebrows, plate sub-labels |

Headings: `font-weight:600`, `line-height:1.06`, `letter-spacing:-.015em`. Body: weight 400. Accent words in headlines: Fraunces italic, often in `--gold` (on dark) or `--maroon` (on cream).

---

## 5. Spacing and layout

- Base unit: 4px. Use multiples (4, 8, 12, 16, 24, 32, 48, 64, 96, 128).
- Section vertical padding: `clamp(80px, 12vh, 160px)` top and bottom. Generous. The luxury feel comes largely from space.
- Content max width: 1200px, centred, with `clamp(20px, 5vw, 48px)` side gutters.
- Reading max width for prose blocks: ~62ch.
- Hairline dividers (`--hair`) separate some sections rather than hard colour blocks.

---

## 6. Motion and interaction spec

Global easing: `--ease: cubic-bezier(.22,1,.36,1)`. Default transition `.3s var(--ease)` unless stated. Everything below must no-op under `prefers-reduced-motion: reduce`.

### 6.1 The scroll-driven road and car (signature element)
- A winding SVG road path runs the full length of the page, behind the sections, in a subtle maroon/ink stroke with a dashed centre line.
- A small white Corolla-style sedan (top-down view) travels along that path as the user scrolls, using SVG motion path / `getPointAtLength` tied to scroll progress. The car rotates to face the direction of travel.
- The car carries a small yellow RAMS roof sign. Soft blurred shadow underneath. Premium weight, not cartoonish.
- Performance: drive it with `requestAnimationFrame` reading a cached scroll value, not a layout read per frame. Throttle on mobile or simplify the path.

### 6.2 Hero
- Full-screen. Slow Ken Burns zoom on the hero image (or the branded placeholder). Parallax on scroll.
- Headline rises word by word as the page loads. A steering wheel sits in the hero and rotates with scroll. L-plate and P-plate float either side of the wheel.

### 6.3 Header
- Glass header. Over the hero it is light text on the dark image; once scrolled past the hero it becomes ink text on cream.
- Hides on scroll down, returns instantly on scroll up.
- A thin scroll-progress bar along the very top.
- Scrollspy underlines the nav item for the section currently in view.

### 6.4 Section reveals
- Sections and cards fade and rise in on first view via Intersection Observer (translateY ~24px to 0, opacity 0 to 1, `.6s var(--ease)`), staggered for grids.
- The manifesto / philosophy statement lights up word by word as it scrolls through the viewport, with tiny inline photo "pills" embedded in the sentence.
- The experience section is a pinned block where one photo crossfades through three lesson images as the steps scroll beside it.

### 6.5 Cards and buttons
- Service cards: gentle 3D tilt toward the cursor on hover (max ~6deg), hover fill sweep, oversized serif price. Disabled on touch.
- All clickable things get a press-down feedback (`transform: scale(.98)` on `:active`).
- Primary button (maroon): fill plus `--glow-maroon` on hover. WhatsApp button: `--wa` plus `--glow-wa`.
- Circular arrow buttons on service rows animate the arrow on hover.

### 6.6 Suburb chips
- Tappable chips in the areas section. Tapping one opens WhatsApp pre-filled with "I'm in {suburb}, do you cover my area?" (see CONTENT.md).

### 6.7 Booking funnel progress
- The 4-step funnel shows a dashed-road progress bar with a tiny yellow car that drives toward a finish flag as steps complete.

---

## 7. Components inventory

Build each as its own Astro component. Props where it makes sense so content stays in CONTENT.md or page frontmatter.

- `Header.astro` (glass nav, scrollspy, progress bar)
- `MobileMenu.astro` (full-screen, big serif links staggering in)
- `BottomBar.astro` (fixed mobile call / WhatsApp bar, iPhone safe-area padding)
- `WhatsAppWidget.astro` (floating button with "we reply fast" bubble)
- `RoadAnimation.astro` (the SVG road + car island)
- `Hero.astro`
- `Manifesto.astro`
- `Services.astro` + `ServiceCard.astro`
- `Experience.astro`
- `Fleet.astro`
- `Areas.astro` + `SuburbChip.astro`
- `Reviews.astro` + `ReviewCard.astro`
- `Faq.astro` + `FaqItem.astro` (accordion)
- `BookingFunnel.astro` (the 4-step island)
- `FinalCta.astro`
- `Placeholder.astro` (the branded image-slot component, see section 8)

---

## 8. Image placeholder system (keep from V3, refine)

Every image slot renders a branded, styled placeholder frame until a real photo exists. The placeholder shows the slot name and the intended shot at the right aspect ratio, so it reads as intentional, not broken.

The magic behaviour: if a file with the expected name exists in `/public/images/`, the real photo shows and the placeholder is gone; if not, the styled frame shows. In Astro, do this with an optional import or an existence check at build time, falling back to the placeholder component. The shot list and exact filenames/dimensions are in CONTENT.md section "Image brief".

Placeholder visual: cream-2 surface, hairline border, a small maroon "R" mark, the slot label in Fraunces italic, and the dimensions in small caps. Soft `--sh-md`.

---

## 9. Section-by-section layout (build in this order)

Order and intent match V3. Each is a "stop" on the drive.

### 9.1 Hero (`#hero`)
Full-screen image with dark base layer so the headline is always crisp. Glass header above. Headline "Master the Adelaide roads. Calmly." with "Calmly." as the gold/maroon italic accent, rising word by word. Sub-line: one warm sentence (CONTENT.md). Steering wheel + floating L/P plates. Primary CTA "Book a lesson" (WhatsApp) plus a secondary "Call now". A ticker strip of trust phrases (20-plus years, 7 days a week, automatic dual-control cars) runs below. Hero stats (years, students, etc. only if real, see CONTENT.md).

### 9.2 Manifesto (`#manifesto`)
A short philosophy statement that lights up word by word on scroll, with two tiny inline photo pills (inline-city, inline-keys). Signed off with Dad's name in Fraunces italic maroon. This is the emotional core: patient, judgement-free teaching.

### 9.3 Services (`#services`)
Hairline grid of four service cards with oversized serif pricing, hover fill, 3D tilt and a circular arrow button. Each card's button opens WhatsApp with its own pre-filled message. Cards (prices and copy in CONTENT.md):
1. Learner to P training, $110 / lesson
2. International licence conversion, $115 / lesson
3. Refresher lessons, $100 / lesson
4. Test day support and car hire, quoted on WhatsApp

### 9.4 Experience (`#experience`)
Pinned section. A single photo frame crossfades through three lesson images while the numbered steps (how it works) scroll beside it. Tells the "what a lesson with Rams feels like" story.

### 9.5 Fleet (`#fleet`)
Dark, Tesla-style chapter. Count-up stats and spec rows about the dual-control automatic car (the same car used for lessons and the test). Gold accents on dark. Ambient glow behind.

### 9.6 Areas (`#areas`)
Local-search section. A grid of Adelaide suburb chips (CONTENT.md list). Each chip taps through to WhatsApp pre-filled with an area question. Doubles as on-page local SEO signal.

### 9.7 Reviews (`#reviews`)
Varied-length testimonial cards in students' voices (placeholders, clearly marked in CONTENT.md until real ones land). Avatar initials in a maroon gradient circle. Mixed card heights for a natural masonry feel.

### 9.8 FAQ (`#faq`)
Accordion of common questions (VORT vs CBT&A, how many lessons, nervous drivers, languages, payment). Copy in CONTENT.md. This section is mirrored by FAQPage schema in SEO.md, so keep the on-page text and the schema text identical.

### 9.9 Book (`#book`): the conversion engine
The 4-step WhatsApp funnel with the dashed-road progress bar and the little car driving to a finish flag. Steps: compulsory (service, name, suburb), optional (experience, licence country, preferred times, notes), then a review screen compiling everything into a pre-filled WhatsApp message. Full question set and the message template are in CONTENT.md. The final button opens `wa.me/61432065741?text=...` with the compiled, URL-encoded message.

### 9.10 Final (`#final`)
Closing CTA chapter. Big serif line, one WhatsApp button, one call button. The end of the road, the finish flag. Footer with business name, area served, phone, hours, and the honest small print.

---

## 10. Responsive rules

- Breakpoints: design at 360px, refine at 768px and 1200px. Nothing breaks between.
- Mobile: full-screen menu, fixed bottom call/WhatsApp bar with safe-area inset padding, single-column sections, lazy images, hover effects off.
- The road animation simplifies or reduces its path complexity on small screens for smoothness.
- Service cards: 1 column on mobile, 2 on tablet, the hairline grid on desktop.
- Test on a real phone before calling anything done.

---

## 11. Favicon and wordmark

Favicon is an inline SVG: rounded cream square, italic maroon "R" (matches V3, keep it). Brand wordmark in the header: "Rams Driving" in Fraunces italic 900, with "Academy · Adelaide" as a small uppercase tracked sub-label beneath.

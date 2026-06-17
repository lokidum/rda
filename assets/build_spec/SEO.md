# SEO.md: Rams Driving Academy

Search (SEO), local (GEO) and answer-engine (AEO) spec. The goal is to rank for Adelaide driving-lesson searches AND to be the source AI assistants quote when someone asks "best driving instructor in Adelaide for overseas licence holders". Carry over everything from V3 and tighten it.

Replace `ramsdrivingacademy.com.au` with the real domain once registered. Leave a TODO if not final.

---

## 1. The three layers

- **SEO:** classic Google ranking. Clean semantic HTML, fast Core Web Vitals, good titles and meta, real local content, internal anchors.
- **GEO (local):** show up in Google Maps / local pack and "near me" searches. LocalBusiness schema with geo coordinates, named suburbs, consistent NAP (name, address, phone), and a Google Business Profile (off-site, but the single biggest lever, see section 8).
- **AEO (answer engines):** be quotable by ChatGPT, Claude, Perplexity, Google AI Overviews. Plain-language FAQ content mirrored in FAQPage schema, an `llms.txt` summary, and an open `robots.txt` that welcomes AI crawlers.

---

## 2. Head meta (in Base.astro)

```html
<title>Rams Driving Academy | Driving Lessons Adelaide, 20+ Years</title>
<meta name="description" content="Patient, expert driving lessons in Adelaide. Learner to P training, overseas licence conversion and refresher lessons in automatic dual-control cars. Book on WhatsApp.">
<link rel="canonical" href="https://ramsdrivingacademy.com.au/">
<meta name="robots" content="index,follow,max-image-preview:large">

<!-- Geo signals -->
<meta name="geo.region" content="AU-SA">
<meta name="geo.placename" content="Adelaide">
<meta name="geo.position" content="-34.9285;138.6007">
<meta name="ICBM" content="-34.9285, 138.6007">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="Rams Driving Academy | Driving Lessons Adelaide">
<meta property="og:description" content="Patient, expert driving lessons in Adelaide. Book on WhatsApp.">
<meta property="og:url" content="https://ramsdrivingacademy.com.au/">
<meta property="og:image" content="https://ramsdrivingacademy.com.au/images/hero.jpg">
<meta property="og:locale" content="en_AU">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Rams Driving Academy | Driving Lessons Adelaide">
<meta name="twitter:description" content="Patient, expert driving lessons in Adelaide. Book on WhatsApp.">
<meta name="twitter:image" content="https://ramsdrivingacademy.com.au/images/hero.jpg">
```

Adelaide CBD coordinates are used as a placeholder geo.position. If Dad has a base suburb, use its coordinates instead and leave a TODO.

---

## 3. Structured data (JSON-LD)

Three blocks in the head. Validate with Google's Rich Results Test before shipping. No trailing commas, correct `@type` values, prices as strings.

### 3.1 DrivingSchool / LocalBusiness with services

```json
{
  "@context": "https://schema.org",
  "@type": "DrivingSchool",
  "name": "Rams Driving Academy",
  "description": "Adelaide driving school with over 20 years of experience. Learner to P training, overseas licence conversion and refresher lessons in automatic dual-control cars.",
  "url": "https://ramsdrivingacademy.com.au/",
  "telephone": "+61432065741",
  "areaServed": { "@type": "City", "name": "Adelaide", "containedInPlace": { "@type": "State", "name": "South Australia" } },
  "address": { "@type": "PostalAddress", "addressLocality": "Adelaide", "addressRegion": "SA", "addressCountry": "AU" },
  "geo": { "@type": "GeoCoordinates", "latitude": -34.9285, "longitude": 138.6007 },
  "openingHours": "Mo-Su 07:00-21:00",
  "knowsLanguage": ["en", "ta", "hi"],
  "priceRange": "$$",
  "makesOffer": [
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Learner to P Licence Training" }, "price": "110", "priceCurrency": "AUD" },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "International Licence Conversion Training" }, "price": "115", "priceCurrency": "AUD" },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Refresher Driving Lessons" }, "price": "100", "priceCurrency": "AUD" },
    { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Test Day Support and Car Hire" } }
  ]
}
```
TODOs for Loki: real `openingHours` if not 7am to 9pm, a `sameAs` array once the Google Business Profile, Facebook or Instagram exist, and `aggregateRating` only once real reviews are collected (never fabricate a rating).

### 3.2 FAQPage
Mirror the seven FAQ questions and answers from CONTENT.md section 9 word for word. Each as a `Question` with an `acceptedAnswer`. Keeping on-page text and schema identical is what earns the rich result and the AI citation.

### 3.3 BreadcrumbList (optional, light)
Single-page so optional, but a one-item breadcrumb (Home) is harmless and tidy.

---

## 4. robots.txt (public/robots.txt)

Carry over V3. Open to all, AI crawlers explicitly welcomed.

```
# Rams Driving Academy - robots.txt
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: anthropic-ai
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: CCBot
Allow: /

Sitemap: https://ramsdrivingacademy.com.au/sitemap.xml
```
(Added OAI-SearchBot and Claude-SearchBot to the V3 list, as both now exist.)

---

## 5. llms.txt (public/llms.txt)

A plain-language brief that answer engines can lift directly. Keep it accurate, keep it current with CONTENT.md. Carry over the V3 version, which is already strong, and keep these sections: a one-line summary, services and prices, key facts (location, experience, vehicles, transmission, languages, availability, payment, booking), and common questions (VORT vs CBT and A, how many lessons for overseas drivers, nervous drivers welcome). The V3 `llms.txt` is in `/reference/v3/`, reuse it verbatim and only update if a fact changes.

---

## 6. sitemap.xml (public/sitemap.xml)

Single URL site. Either hand-write it or use `@astrojs/sitemap`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ramsdrivingacademy.com.au/</loc>
    <lastmod>2026-06-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 7. On-page SEO craft

- One `<h1>` only (the hero headline). Logical `<h2>` per section, `<h3>` for cards. Never skip levels.
- Use real semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<button>` for actions, `<a>` for links.
- Descriptive alt text on every image (the placeholder frames included, e.g. alt="Rams Driving Academy car on an Adelaide road").
- Suburb names in real on-page text (the areas section), not just in schema, so local queries have something to match.
- Internal anchor links from the nav to each section with descriptive text.
- Fast is a ranking factor: hit the performance budget in CLAUDE.md. Preload the hero image, lazy-load the rest, swap fonts, no render-blocking JS.
- Accessible is rankable: the WCAG AA contrast and keyboard rules in CLAUDE.md also help SEO.

---

## 8. Off-site, the biggest lever (note for Loki, not code)

On-page is necessary but a Google Business Profile is what actually wins local searches for a service like this. Action list for Loki:
1. Create / claim the Google Business Profile for Rams Driving Academy, category "Driving school", service area Adelaide.
2. Add photos, hours, the phone number (must match the site exactly), and services.
3. Ask happy students for Google reviews. Real reviews feed both the local pack and the `aggregateRating` schema later.
4. Get listed in a few AU directories (Yellow Pages AU, local Adelaide directories) with identical NAP for consistency.
This will move the needle more than anything on the page itself.

---

## 9. vercel.json

```json
{
  "redirects": [
    { "source": "/home", "destination": "/", "permanent": true }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [ { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" } ]
    },
    {
      "source": "/_astro/(.*)",
      "headers": [ { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" } ]
    }
  ]
}
```
Apex vs www canonical redirect is set in the Vercel dashboard (add both domains, pick one as primary, Vercel 308s the other). A Content-Security-Policy can be added once everything works; start permissive enough to allow the Google Fonts host (`fonts.googleapis.com`, `fonts.gstatic.com`) and WhatsApp links, then tighten.

---

## 10. Pre-launch SEO checklist

- [ ] Real domain swapped in everywhere (meta, canonical, schema, sitemap, robots).
- [ ] JSON-LD passes Google Rich Results Test (LocalBusiness + FAQPage).
- [ ] Title under ~60 chars, description ~150 to 160 chars.
- [ ] One h1, clean heading order.
- [ ] All images have alt text and are compressed.
- [ ] sitemap.xml and robots.txt reachable at the root.
- [ ] llms.txt reachable at the root and factually current.
- [ ] Lighthouse mobile 95-plus across the board.
- [ ] Google Business Profile created (off-site, but do it).
- [ ] Submit sitemap in Google Search Console once live.

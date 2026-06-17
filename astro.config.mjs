// @ts-check
import { defineConfig } from 'astro/config';

// Static, single page. Vercel auto-detects Astro (no adapter needed).
// TODO(loki): swap the placeholder domain for the real one once registered,
// then update SEO.md, robots.txt, llms.txt and sitemap.xml to match.
export default defineConfig({
  site: 'https://ramsdrivingacademy.com.au',
  output: 'static',
  build: {
    // Inline small stylesheets for fewer round trips; let Astro decide.
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});

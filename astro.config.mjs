// @ts-check
import { defineConfig } from 'astro/config';

// Static, single page. Vercel auto-detects Astro (no adapter needed).
export default defineConfig({
  site: 'https://ramsdrivingacademy.com',
  output: 'static',
  build: {
    // Inline small stylesheets for fewer round trips; let Astro decide.
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});

# Gowda's Solution — Web Studio

An editorial marketing site for **Gowda's Solution**, a small studio that designs
and builds websites for clients. Zero build step — plain HTML, CSS and JavaScript.

## Design direction

Deliberately **not** a dark-gradient SaaS template. The site is built like a studio's
project dossier:

- **Concept** — a "working index": the studio presents itself and its work as a
  typeset table of contents, with real metadata (a live Bengaluru clock, coordinates,
  booking status).
- **Type** — Bricolage Grotesque (display) · Newsreader serif (body) · JetBrains Mono
  (labels & data). A serif-body / grotesque-display inversion, on purpose.
- **Palette** — warm drafting-paper (`#efede5`), ink black, and a single cobalt accent
  (`#1e38d6`). No dark theme, no gradient glows.
- **Signature** — the work shown as an index list with hover-preview plates, plus
  monospace margin-notes throughout.

## Features

- Live IST clock in the masthead and footer
- Native smooth scrolling (CSS `scroll-behavior`) — no scroll-hijacking library
- Work index with a cursor-following preview plate (desktop, `hover` devices only)
- Fully responsive with a full-screen mobile menu
- Accessible: skip link, visible focus rings, semantic landmarks, ARIA live status

### Motion policy (deliberate)

All content is fully visible with static CSS — nothing fades in from `opacity:0` and
nothing is gated behind a scroll observer. This is intentional: it guarantees the page
renders completely even when the browser throttles or pauses its animation timeline
(e.g. a backgrounded or non-compositing tab), and it suits the restrained aesthetic.
Motion lives only in hover states and native smooth scroll, neither of which can leave
content stuck invisible.

## Run locally

Any static server works:

```bash
python -m http.server 5599 --directory gowdas-solution-website
```

Then open `http://localhost:5599`, or just open `index.html` in a browser.

## Structure

- `index.html` — markup and content
- `styles.css` — the paper/ink/cobalt system and responsive rules
- `script.js` — clock, native anchor scrolling, work-index preview, form logic

## Notes

- No external JS libraries — the page works fully offline (fonts are the only CDN load).
- The contact form is front-end only — wire it to an email service (Formspree,
  Resend) or a serverless function to actually deliver enquiries.
- Project names/plates are placeholders; swap in real case studies and screenshots.
- Fonts: Bricolage Grotesque, Newsreader, JetBrains Mono (Google Fonts).

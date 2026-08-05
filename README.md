# Ahmad Riaz — Portfolio

Light editorial monochrome portfolio with a real CSS 3D depth system.
React + Vite + Tailwind, TEXAR and TT Lakes Neue, no animation library required.

---

## Run it

```bash
npm install
npm run dev
```

Opens on http://localhost:5173

```bash
npm run build      # production build → dist/
npm run preview    # preview the production build
```

Node 18 or newer.

---

## Where things live

```
public/
  portrait.webp            black & white cut-out (69 KB, used by the hero)
  portrait.png             fallback for anything that can't do WebP
  fonts/
    texar.woff2            display face — subset to Latin, 7.8 KB
    lakes-*.woff2          body face, 4 weights, ~6.5 KB each
    original/              the untouched .otf / .ttf files you supplied
src/
  Portfolio.jsx            the whole site — data, styles and components
  App.jsx
  main.jsx
  index.css                Tailwind directives + page reset
index.html
tailwind.config.js         palette + font families mirrored as Tailwind tokens
```

`Portfolio.jsx` carries its own scoped stylesheet in the `CSS` constant near the
top, so nothing depends on Tailwind being present. Tailwind is configured and
ready if you want it for anything you add later.

---

## Editing content

Everything editable sits in the data block at the top of `src/Portfolio.jsx`:

| Constant     | What it controls                                     |
| ------------ | ---------------------------------------------------- |
| `PROFILE`    | name, role, tagline, email, phone, LinkedIn, bio      |
| `STATS`      | the four flip tiles (front number, label, back text)  |
| `MARQUEE`    | the scrolling tech band under the hero                |
| `EXPERIENCE` | timeline rows                                         |
| `PROJECTS`   | the numbered work list — `tags` drives the filters    |
| `FILTERS`    | filter labels; must match strings used in `tags`      |
| `SKILLS`     | the four folded stack panels                          |
| `NAV`        | top bar links and their bracketed counts              |

Adding a project: append an object to `PROJECTS` and give it at least one `tag`
from `FILTERS`. Counts in the filter pills update on their own.

---

## Tuning the 3D

Two constants at the top of `Portfolio.jsx` control the extrusion depth:

```js
const NAME_LAYERS = 14;  // Z-layers behind the hero name
const FIG_LAYERS  = 10;  // silhouette layers behind the portrait
```

Lower them if you want a lighter render on older machines — the effect degrades
gracefully. `prefers-reduced-motion` already collapses both to a single flat
layer automatically.

Scene rotation lives in the `Hero` component's `mousemove` handler
(`rotateX` / `rotateY` ranges), and the perspective depth is the `perspective`
value on `.stage` in the CSS constant.

---

## Swapping the photo

Replace `public/portrait.webp` with a cut-out PNG or WebP that has a
transparent background. The hero expects a roughly 3:4 portrait with the
subject centred and cropped at the waist. It needs to be pre-cut — the 3D
relief is built from the image's own alpha channel, so a photo with a
background baked in will extrude as a rectangle.

---

## Moving it to Next.js 14

1. `npx create-next-app@latest` (App Router, no `src/` dir needed)
2. Copy `public/` across as-is.
3. Copy `Portfolio.jsx` into `app/` and rename it `page.jsx`. It already has
   `"use client";` on the first line.
4. `npm i lucide-react`

Asset paths are absolute (`/fonts/...`, `/portrait.webp`) so they resolve the
same way under Next.

---

## Deploying

Vercel or Netlify pick this up with no configuration — build command
`npm run build`, output directory `dist`.

---

## Fonts

The `.woff2` files are subset to Latin, punctuation and a few symbols, which is
why they're small. If you need other glyphs, re-subset from
`public/fonts/original/` with `fonttools`:

```bash
pip install fonttools brotli
pyftsubset public/fonts/original/TEXAR.otf \
  --unicodes="U+0000-00FF,U+2000-206F" \
  --flavor=woff2 --output-file=public/fonts/texar.woff2
```

TT Lakes Neue is a trial licence in the files supplied — check your licence
before shipping to production.

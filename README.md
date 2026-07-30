# IN Website — Vercel deploy

Static site. No build step. Framework preset "Other", build command none, output directory `.`.

## Contents
- `index.html` — entry, redirects to `Home.EN.dc.html` (so `/` resolves and never goes stale)
- `*.EN.dc.html` / `*.KO.dc.html` — site pages (English + Korean)
- `Nav.dc.html`, `Nav-KO.dc.html`, `Footer.dc.html`, `Footer-KO.dc.html` — shared components
- `_ds/` — design-system tokens and bundle
- `support.js`, `image-slot.js` — runtime
- `story-img/`, `workshop-img/`, `community-img/`, `project-img/`, `story-photos/`, `team/` — imagery

## Notes
- Everything runs client-side; any static host works.
- `<image-slot>` placeholders start empty on a fresh host — real images must be committed.
- `ME=WE.EN.dc.html` is retired; the page is now `MEWE.EN.dc.html`.

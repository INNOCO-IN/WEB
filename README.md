# IN Website

Two frontends live in this repo:

- `legacy/` — the original static site (no build step). This is what's deployed today.
- `app/` — the Vite/React/TypeScript app for the new dynamic features (its own Vercel project, excluded from this deploy via `.vercelignore`).

Shared backend files stay at the root: `schema.sql`, `SUPABASE.md`.

## Deploy — `legacy/` (Vercel)

Static site. No build step. Framework preset "Other", build command none, output directory `.`.

`vercel.json` rewrites everything into `legacy/`, so public URLs are unchanged by the folder move — `/Home.EN.dc.html` still serves `legacy/Home.EN.dc.html`, and `/` serves `legacy/index.html`.

## Contents of `legacy/`
- `index.html` — entry, redirects to `Home.EN.dc.html` (so `/` resolves and never goes stale)
- `*.EN.dc.html` / `*.KO.dc.html` — site pages (English + Korean)
- `Nav.dc.html`, `Nav-KO.dc.html`, `Footer.dc.html`, `Footer-KO.dc.html` — shared components
- `_ds/` — design-system tokens and bundle
- `support.js`, `image-slot.js` — runtime
- `in-supabase.js`, `supabase-config.js`, `in-stories-feed.js` — Supabase form bridge + live feed
- `story-img/`, `workshop-img/`, `community-img/`, `project-img/`, `story-photos/`, `team/` — imagery
- `ROUTES.md` — route map

## Notes
- Everything in `legacy/` runs client-side with relative paths; any static host works, served from that folder as the root.
- `<image-slot>` placeholders start empty on a fresh host — real images must be committed.
- `ME=WE.EN.dc.html` is retired; the page is now `MEWE.EN.dc.html`.

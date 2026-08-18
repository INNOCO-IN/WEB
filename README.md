# IN Website — Vercel deploy bundle

Static, client-rendered build of the IN site (English + Korean). Pages are
self-contained Design Component HTML files; the shared runtime (`support.js`)
renders them in the browser, so **no build step is required** — plain static site.

Synced from the canonical project root on 2026-08-18.

## Deploy to Vercel

1. Install the CLI: `npm i -g vercel`
2. From this folder: `vercel` (follow prompts), then `vercel --prod`

Or drag this folder into the Vercel dashboard (New Project → deploy static),
or connect a Git repo containing these files. Framework preset: **Other**,
no build command, output directory = this folder.

## Structure

- `index.html` — the home page (copy of `Home.EN.dc.html`), served at `/`.
- `*.EN.dc.html` / `*.KO.dc.html` — 70 pages; the nav's EN/KR toggle swaps between them.
- `Nav.dc.html`, `Nav-KO.dc.html`, `Footer.dc.html`, `Footer-KO.dc.html`,
  `ProjectIndexRail.dc.html`, `Cards.EN.dc.html` — shared components.
- `support.js`, `image-slot.js` — runtime + image-drop helper.
- `in-supabase.js`, `supabase-config.js`, `data/stories.js` — story submission data.
- `_ds/` — IN design-system bundle (fonts, colors, components).
- `team/`, `community-img/`, `project-img/`, `story-img/`, `workshop-img/` — photography.
- `IN_Logo.png`, `IN_HorizontalStrip.png`, `innoco-mark.png` — brand marks.
- `vercel.json` — keeps file extensions; serves `index.html` at `/`.

All inter-page links are relative and keep the `.dc.html` extension, so the folder
works as-is on any static host.

## Notes

- Korean pages are drafts in progress; some blocks are still English or placeholder.
- A few hero/tile photos use in-browser image slots whose drops live in the editor's
  local storage, not as committed files. Those slots show a placeholder on a fresh
  deploy; all other imagery is baked in. Replace them with committed `<img>` tags
  if you need them live.
- Editing rule: change the files in the project root, then re-sync this folder.
  Never edit here.

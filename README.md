# IN Website — Vercel project (deploy target)

Static site, no build step. This folder **is** the Vercel project: its contents
become the repo root of `INNOCO-IN/WEB` (branch `main`), which Vercel serves as-is.
Copied unchanged from the project root on 2026-08-22.

## Deploy

**Existing repo (`INNOCO-IN/WEB`, `main`) — normal case**
1. Copy the contents of this folder into the repo root, overwriting.
2. Delete `ME=WE.EN.dc.html` from the repo if still present (superseded by `MEWE.EN.dc.html`).
3. Commit and push. Vercel redeploys automatically.

**New Vercel project**
1. Framework preset: **Other**
2. Build command: none · Output directory: `./` (repo root)
3. Deploy.

## What's in here
- 76 pages: `*.EN.dc.html` / `*.KO.dc.html`, plus the shared `Nav`, `Nav-KO`,
  `Footer`, `Footer-KO`, `Cards.EN`, `ProjectIndexRail`
- `IN Design System.dc.html` and `_ds/` (tokens + bundle)
- Runtime: `support.js`, `image-slot.js`, `in-supabase.js`, `supabase-config.js`
- Entry: `index.html` (redirects to `Home.EN.dc.html`), `vercel.json`, `.vercelignore`
- `data/` — `stories.js` (the story records the Story index, home card and
  constellation all read), CSVs, `link-map.json`
- Imagery: `community-img/`, `project-img/`, `story-img/`, `story-photos/`,
  `workshop-img/`, `slot-img/`, `team/`, root logo PNGs

## Fixed in this export (2026-08-22)
- **Dropped photos now ship as files.** Images dragged into `image-slot`s were stored
  only in `.image-slots.state.json`, which is not deployed — so live, those slots
  showed their empty placeholder. They are baked to `slot-img/*.webp` and written
  into each slot's `src`: MEWE EN+KO (DNA, nervous systems, forest roots,
  ecosystems), Workshop-Metanoia EN+KO, Workshop EN+KO (Möbius hero).
- 5 pages had drifted behind the project root and are now current: `Collectives.EN`,
  `Collectives.KO`, `Story.EN`, `Story.KO`, `Story-Submission.EN`. Every other file
  in this folder is byte-identical to root.
- **Missing image added: `team/13_Barbara.png`** — referenced by `Collectives.EN/KO`
  but never exported, so that portrait was a broken image in production.
- Image folders and `_ds/` re-checked file-for-file against root: identical.

## Fixed in the 2026-08-18 export
- **`data/` was missing from the previous sync** — `Story-Index.EN/KO` load
  `data/stories.js`; without it the index rendered empty in production.
- Every page now carries a `<title>`, `lang` (`en`/`ko`), favicon and `og:title` /
  `og:image`. Before this, all 76 pages were untitled — browser tabs and share
  cards showed the filename.
- `Are you IN` → **`Are You IN`** across 39 pages (locked capitalisation).
- Workshop magenta unified to `#E5188C` (21 pages still carried `#E6328C`).
- `Story-Submission.EN` and `Are-you-IN.EN` now load `supabase-config.js` before
  `in-supabase.js`, so the forms have their connection again.

## Verified before export
- No dead internal links across all 76 pages.
- Every local `src`/`href`/`url()` image reference on all 82 pages and in
  `data/stories.js` resolves inside this folder.
- No absolute preview (`claudeusercontent.com`) URLs, no merge-conflict markers.

## Not included (internal, by prior decision)
`IN Brief.*`, `IN-Workshop Brief.*`, `IN Brand Guideline.*`, `IN Studio Brief.*`,
`Content Register`, `IN Promotion Strategy`, `Promo`, option/study files,
`_ARCHIVE-*`. They reference `uploads/`, which is not deployed.

## Known state (reported, not changed)
- No KO version exists for `Community-*`, `Project-*` detail pages,
  `Story-Submission`, `Action-Research`; the KO nav links to the EN pages.
- A darker text tier sits alongside the taxonomy colours for small type on cream
  (teal `#146560`, story `#B87A00`, orange `#F0961E` / `#C8791A`, tan `#6E4722`,
  ink-soft `#2E3B40`). Applied consistently, but not yet written into the design
  system as named values.
- Older export snapshots still sit at the project root (`deploy/`, `deploy-en/`,
  `in-website/`, `vercel-deploy/`, `vercel-export/`) and are now stale. This
  folder is the single deploy target.

# IN Website — Vercel deploy

Static site, no build step. Contents copied from the project root unchanged
(2026-08-12) — no content, colour or layout edits.

## Deploy

**New Vercel project**
1. Framework preset: **Other**
2. Build command: none · Output directory: `./` (repo root)
3. Deploy.

**Existing repo (`INNOCO-IN/WEB`, branch `main`)**
1. Copy the contents of this folder into the repo root, overwriting.
2. Delete `ME=WE.EN.dc.html` if still present (superseded by `MEWE.EN.dc.html`).
3. Commit and push — Vercel redeploys automatically.

## What's in here
- 76 pages: `*.EN.dc.html` / `*.KO.dc.html` plus shared `Nav`, `Nav-KO`, `Footer`, `Footer-KO`, `Cards.EN`, `ProjectIndexRail`
- `IN Design System.dc.html` and `_ds/` (tokens + bundle)
- Runtime: `support.js`, `image-slot.js`
- Entry: `index.html` (redirects to `Home.EN.dc.html`), `vercel.json`, `.vercelignore`
- Imagery: `community-img/`, `project-img/`, `story-img/`, `story-photos/`, `workshop-img/`, `team/`, root logo PNGs
- `data/`

## Not included (internal, by prior decision)
`IN Brief.*`, `IN-Workshop Brief.*`, `IN Brand Guideline.*`, `Content Register`,
`IN Promotion Strategy`, `Promo`, option/study files, `_ARCHIVE-*`.

## Known state (unchanged, reported only)
- No KO version exists for `Community-*`, `Project-*` detail pages, `Story-Submission`, `Action-Research`; KO nav links to the EN pages.
- Colour drift across pages: magenta appears as `#E5188C` and `#E6328C`, teal as `#1E8A86` and `#146560`, plus several near-ink greys (`#2E3B40`, `#262A38`).

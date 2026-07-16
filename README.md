# IN (INNOCO) — Static Website

Plain static HTML site. **No build step, no framework, no dependencies.** Every page is a self-contained `.html` file sharing one `styles.css`. Any static host serves it as-is.

## Deploy to Vercel

**Option A — drag & drop**
1. Go to vercel.com → *Add New… → Project*.
2. Drag this whole `in-website` folder onto the page (or zip it and upload).
3. Deploy. No settings to change — Vercel detects a static site automatically.

**Option B — Vercel CLI**
```bash
cd in-website
vercel        # preview deploy
vercel --prod # production
```

**Option C — Git**
Push this folder to a repo, import it in Vercel. Framework preset: **Other** (nothing to configure).

## What's here
- `index.html` — home page (site root `/`).
- `*.EN.html` — all other pages (Workshop, ME=WE, Story, Community, Project, Manifesto, and every detail page). Links between pages are relative, so navigation works locally and when deployed.
- `styles.css` — design tokens (colors, type, spacing) + shared component styles. Loaded by every page.
- `IN_Logo.png` — logo used in the nav.
- `vercel.json` — enables clean URLs (`/Workshop.EN` instead of `/Workshop.EN.html`).

## Notes
- **Fonts** load from Google Fonts (Newsreader + Archivo) via `@import` in `styles.css` — needs internet at view time. To self-host, download both families and swap the `@import` for local `@font-face` rules.
- **Photos** are placeholders (hatched boxes labelled with what belongs there). Replace each `<div class="in-imgslot">` with a real `<img src="...">`. Drop image files into this folder and reference them relatively.
- **Forms** (Are you IN?, Story submission) are static markup — wire up a form handler / endpoint if you need submissions.
- This was generated from the design prototypes; it reproduces their look and copy. It is not wired to a CMS.

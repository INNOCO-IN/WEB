# IN Website — Vercel deploy

This folder is a **complete static site**. No build step, no framework, no server code — every page is plain HTML that runs entirely in the browser.

## What's here
- `index.html` — the landing page (served at `/`)
- `*.dc.html` — every site page + the shared `SiteHeader` / `SiteFooter` components
- `support.js` — the runtime the pages load
- `_ds/…` — the IN design system (fonts, colors, components bundle)
- `assets/…` — logo images
- `vercel.json` — static config (no build)

## Deploy — option A: drag & drop (fastest)
1. Go to https://vercel.com → **Add New… → Project**.
2. Drag this entire `deploy` folder onto the page (or zip it and upload).
3. When asked for a framework preset, choose **Other** — there is nothing to build.
4. Deploy. Your site is live at `https://<name>.vercel.app`.

## Deploy — option B: Vercel CLI
```bash
npm i -g vercel        # once
cd deploy
vercel                 # preview deploy, follow prompts
vercel --prod          # production
```
When prompted:
- Framework preset: **Other**
- Build command: leave empty
- Output directory: `.` (this folder)

## Deploy — option C: Git
Push the contents of this folder to a GitHub repo, then **Import Project** in Vercel and point it at the repo. Framework preset **Other**, no build command.

## Notes
- Pages navigate to each other by filename (e.g. `Workshop.dc.html`). This works as-is on Vercel static hosting.
- Filenames contain spaces; browsers encode them automatically. No action needed.
- To use a custom domain, add it under **Project → Settings → Domains** in Vercel.

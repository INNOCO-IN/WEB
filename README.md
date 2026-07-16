# IN Website — Vercel deploy bundle

Static, client-rendered build of the IN site (English). Pages are self-contained
Design Component HTML files; the shared runtime (`support.js`) renders them in the
browser, so **no build step is required** — this is a plain static site.

## Deploy to Vercel

1. Install the CLI: `npm i -g vercel`
2. From this folder: `vercel` (follow prompts), then `vercel --prod`

Or: drag this folder into the Vercel dashboard (New Project → deploy static),
or connect a Git repo containing these files. Framework preset: **Other**.
No build command, output directory = this folder.

## Structure

- `index.html` — redirects to `Home.EN.dc.html` (site entry).
- `*.EN.dc.html` — the pages.
- `Nav.dc.html`, `Footer.dc.html` — shared header/footer, loaded by each page.
- `support.js`, `image-slot.js` — runtime + image-drop helper.
- `_ds/` — IN design-system bundle + tokens/styles.
- `team/` — team photos and the ME=WE arc strip.
- `IN_Logo.png` — logo.
- `vercel.json` — keeps file extensions; serves `index.html` at `/`.

Home is the entry point. All inter-page links are relative and keep the
`.dc.html` extension, so the folder works as-is on any static host.

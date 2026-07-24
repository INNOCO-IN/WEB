# IN Website — Vercel deploy

Static site. No build step.

## Deploy
- **Dashboard:** drag this folder into vercel.com/new, or import and set framework = "Other", build command = none, output dir = `.`
- **CLI:** run `vercel` (preview) or `vercel --prod` from inside this folder.

## Contents
- `index.html` — Home (so `/` resolves)
- `*.EN.dc.html` — site pages
- `Nav.dc.html`, `Footer.dc.html` — shared components
- `_ds/` — design-system tokens, fonts, bundle
- `support.js`, `image-slot.js` — runtime
- images (png/jpeg)

## Notes
- Everything runs client-side; any static host works.
- `<image-slot>` placeholders start empty on a fresh host — add real images to those spots.

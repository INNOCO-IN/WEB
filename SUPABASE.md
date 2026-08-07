# Connecting the site to Supabase

Two forms write to your Supabase project, and one page reads a live feed back out of it.

| What | Page | Table / bucket |
|---|---|---|
| Connect / inquiry form | `Are-you-IN.EN.dc.html`, `Are-you-IN.KO.dc.html` | `submissions` |
| Story submission form | `Story-Submission.EN.dc.html` | `stories` (+ `story-media` storage bucket) |
| "Just shared" live feed | `Constellation.EN.dc.html` | `stories` (read-only, `status = 'published'`) |

## Setup — 3 steps

**1. Run the schema.** Supabase → SQL Editor → paste all of `schema.sql` → Run. This creates both tables, the RLS policies, the public `story-media` storage bucket, and turns on Realtime for `stories` so the live feed can push updates. Safe to re-run — every statement is idempotent.

**2. Keys are already in place.** `supabase-config.js` already has this project's URL and publishable (anon) key filled in. Both are safe in public code — RLS lets that key `insert` on both tables and `select` on `stories` only where `status = 'published'`; it can never read pending submissions or the `submissions` table.

**3. Deploy as usual.** Static site, no build step.

## How a submission goes live

1. Someone submits the "Are you IN?" form → a row lands in `submissions` with `status = 'new'`. This table is never shown on the site — check it in Supabase → Table Editor and follow up by hand.
2. Someone submits a story → a row lands in `stories` with `status = 'pending'`. Nothing public happens yet.
3. You review it in Supabase → Table Editor and change `status` to `published` (or `declined`).
4. The moment you do, the Constellation page's "Just shared" feed picks it up over Supabase Realtime — no redeploy, no page refresh for anyone already looking at it.

`stories.status` moves through `pending → published` or `pending → declined`. Only `published` rows are ever readable by the anon key.

## What's wired on each page

- **Are you IN?** (`Are-you-IN.EN/KO.dc.html`) — `<form data-in-form="submissions">` with a hidden honeypot field and an inline status line. Field names (`name`, `email`, `brings`, `message`) already matched the `submissions` columns; nothing visual changed.
- **Story Submission** — the step stack is now a real `<form data-in-form="stories">`. Step 1's "lived / noticed / imagined / were told / can't say" chips still drive their original reveal animation, and also write to a hidden `door` field. Format (Step 2) and ME=WE Arc (Step 3) are click-to-select chip groups (`data-chip-group`) that write `format` (multiple) and `arc_stage` (one). The attachment control is a real file input (accepts image/video/audio) — the old `<image-slot>` was a content-editor widget, not a visitor upload control, so it's been replaced here. "Send my story" is a submit button.
- **Constellation** — a new "Just shared — live" section near the top renders the newest published stories and updates itself in real time via `in-stories-feed.js`. This is separate from "The Sky" visualization further down the page, which is still seed/placeholder data (see `data()` in that page's component script — it says so itself: "Prototype v1 — all copy is draft; seed entries are placeholders"). Folding real submissions into that curated visualization is a content/editorial task (titles, kickers, arc placement per story), not just a data-plumbing one — worth doing by hand later, story by story.

## Notes

- Attachments go to the public `story-media` bucket. If you'd rather they stay private, drop the "public reads story media" policy in `schema.sql` and serve via signed URLs instead.
- No file-size cap is enforced client-side; Supabase's default is 50 MB per file.
- Errors surface inline next to each form's submit button and log to the console as `[IN → Supabase]`.
- The live feed (`in-stories-feed.js`) loads `@supabase/supabase-js` from a CDN — that's the only page pulling in a third-party script; the form-submission bridge (`in-supabase.js`) stays dependency-free.
- Same submission pattern extends to any new form: add `data-in-form="table"`, name the fields after the columns, done — `in-supabase.js` picks it up automatically.
- Separately from all of this: `Story-Index.EN.dc.html` expects a `data/stories.js` file that doesn't exist in this repo, so that page's curated story index currently renders empty. Unrelated to the Supabase work above — flagging it so it isn't mistaken for something this change broke.

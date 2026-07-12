# IN (INNOCO) Design System

IN (INNOCO) is a small design studio based in Seoul practicing **ME=WE** — the idea that personal growth and the
wellbeing of the people around us are not separate things. IN runs workshops (Möbius Making, Pathfinder, METANOIA,
Jungle Jam, and others), takes on community projects (Food Revolution, UAE Youth Camp, UNC Social Innovation), and
grows through **IN-Collectives** — independent partners who host the practice in their own contexts. The public
surface is a single marketing/content website: Landing, About IN, ME=WE, Workshop, Story, Community, Connect.

**Sources provided (stored here for reference, not assumed accessible):**
- `uploads/IN_Logo.png` — the only brand asset provided (multi-color ribbon "N" mark).
- `uploads/IN Web Content V1.pdf` (extracted to `uploads/pdf-text.txt`) — the complete, final website copy: every
  headline, body paragraph, CTA, and the full navigation/content map, dated v071026 (July 10, 2026).
- `uploads/IN Brand Guideline 2023.png` — a rendered reference page (`uploads/IN Design System (Standalone).html`)
  translating the brand into a full web design language: color palette, type system, button/card/form anatomy,
  layout and motion rules. This is the direct visual source for every token and component in this project.
- No Figma file, codebase, or slide template was attached.

---

## Index

- `styles.css` — the single stylesheet entry point (import this). Pulls in everything under `tokens/`.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `fonts.css`.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.
- `assets/logos/in-mark.png` — the IN logo mark.
- `components/` — reusable UI primitives, grouped by concern:
  - `core/` — **Button**, **Tag**, **Eyebrow**
  - `cards/` — **SolidCard**, **OutlineCard**, **ImageCard**, **HalftoneCard**
  - `forms/` — **Input**, **Select**
  - `navigation/` — **Header**, **Footer**
- `ui_kits/website/` — click-through recreation of the IN marketing site (Landing, About IN, Workshop, Connect).
- `SKILL.md` — portable skill file for use in Claude Code or other agent environments.

### Intentional additions
No component inventory was defined by a codebase or Figma file, so the component set above is a standard set sized
to the brand's needs (Button, Tag, Card family, form inputs, Header/Footer) — built from the visual language
observed in the brand-guideline reference and content PDF, not copied from an existing product.

---

## Content fundamentals

**Voice:** calm, direct, humble, quietly assertive. Never devotional, never corporate. IN speaks in first person
plural ("we"), asks questions it doesn't rush to answer, and prefers short declarative sentences over hype.

> "What if ME and WE were never actually two things?"
> "It is natural to feel separate at times... And yet something else is also quietly true: we are constantly influencing one another."

**Capitalization rules:**
- **IN** is always all caps.
- **ME=WE** is always capitalized as a unit (never "me=we" or "Me=We").
- Program names — *Möbius Making*, *Second Life*, *Jungle Jam* — capitalize the first letter of each word.

**Banned words:** changemaker, profound change, warrior of light, movement, client, success story. No pricing or
fees anywhere on the public site.

**Signature phrases, used verbatim:**
- "nature, science, art, and social action" — the method phrase, repeated across About, Manifesto, and Workshop pages.
- "Are you IN?" — appears exactly twice sitewide: the Landing hero, and the close of Connect.
- The thank-you state after the Connect form reads simply: **"You're IN."**

**Construction to avoid:** the "not X but Y" rhetorical device — used only where it truly earns its place, not as a
default crutch.

**CTA vocabulary:** `REGISTER` for open-enrollment workshops, `INQUIRE` for organizational ones. Section CTAs read as
short imperative phrases with an arrow — "See the Framework →", "Find a Workshop →", "Start a Conversation →".

**Structure habits:** long-form pages (Manifesto, workshop detail pages) are broken into short numbered or titled
movements (e.g. "1. PATTERN", "2. TRUTH" or "Self / Relationship / Organization / Integration") rather than
unbroken prose. Every Story card ends with a soft "pass it on" line (a ripple mechanic).

**Accessibility:** body text is set large and readable for all ages — never smaller than the navigation menu text.

**No emoji, anywhere.**

---

## Visual foundations

**Palette:** warm paper (`#FAF4E2`) and near-black ink (`#1A1613`) are the foundation for every page. **Teal**
(`#1E8A86`) is the single primary accent, reserved for links, CTAs, and kickers — it is never used decoratively.
Section and card backgrounds draw from eight flat, saturated accents (magenta, deep blue, plum, green, yellow,
amber, sky, blush) — exactly **one accent per card or section**, never mixed, paired with either paper or ink text.
No gradients anywhere in the system.

**Type:** two families, two jobs. **Newsreader** (serif) carries every headline, quote, and paragraph — weights
400/500/600, italic used freely for emphasis and voice, sizing from 17px body up to 96px display. **Archivo** (sans)
handles everything structural — nav, kickers, buttons, labels — always uppercase, wide letter-spacing (0.2em on
eyebrows), weights 600/700/800 only.

**Spacing:** a 4px-based scale from 4px to 120px (`--space-1` … `--space-10`). Page content caps at 1320px with 28px
side padding. The home/index grids use CSS `column-width` masonry (360px columns, 22px gap) rather than a strict
grid, so card heights vary freely.

**Backgrounds:** flat color only — no photography-as-background, no full-bleed hero gradients. Full-bleed color
"section bands" (teal or ink) alternate with paper sections to punctuate rhythm; the rule is never more than one
accent band in a row. Photography, where used, is a documentary/human image inside a card, always cropped to 4:3,
1:1, or 3:4 — never stock-glossy, never a background wash.

**Animation:** minimal and functional, nothing decorative. Interactive cards lift 4px on hover with a soft ink
shadow; links shift from ink/teal toward magenta. An occasional slow horizontal ticker is permitted for
community/social-proof strips. No parallax, no scroll-triggered reveals, no bounce or spring easing — transitions
use a standard ease (`--ease-standard`) at 120–200ms.

**Hover / press states:** cards lift + shadow; buttons/links darken teal toward `--color-teal-dark` or shift toward
magenta; no scale/shrink press effect is used.

**Borders & shape:** cards are square at rest — **never** border-radius, **never** a drop shadow at rest; edges are
flat color, and the only elevation is the hover lift on interactive cards. Radius exists in exactly two places:
full pill (`999px`) on buttons and tags, and circles on icon buttons/avatars. Form inputs are square-cornered with a
1.5px ink-tinted border, switching to teal on focus.

**Texture:** the radial halftone dot-grid is the *only* pattern in the system, and it is reserved exclusively for
"network" / cross-link moments (Community, IN-Collectives). It never appears elsewhere.

**Transparency/blur:** used once, functionally — the sticky header is a blurred, semi-transparent paper background
(`backdrop-filter: blur`) so content scrolls beneath it legibly.

**Imagery color vibe:** warm, human, documentary — hands, materials, workshop circles, multigenerational groups.
Not corporate-stock, not saturated/HDR, not black-and-white.

**Corner radii:** `0px` everywhere except `--radius-pill` (999px) and `--radius-circle` (50%).

**Cards:** square, flat-color or outline, no border-radius, no shadow at rest. See `guidelines/brand-card-rule.card.html`
and the four card components for the full anatomy (Solid / Outline / Image / Halftone).

---

## Iconography

No icon system, icon font, or SVG set was provided in any of the source materials. The brand-guideline reference
uses **no icons at all** — hierarchy and meaning are carried entirely by color blocks, type, and a small rotated
dot+label motif on cards (a filled circle + vertical uppercase word along a card's left edge — see any `SolidCard`
or `HalftoneCard`). Where a workshop page needs a small diagrammatic element (e.g. the ME=WE Arc's six stages, or
"DNA / neuron / forest" life-pattern icons mentioned in the ME=WE page copy), treat it as a **photo or illustration
placeholder** — do not hand-draw icons to fill this gap. No emoji, no Unicode glyphs used as icons.

**If you need generic UI icons** (arrow, close, menu) for a prototype, the closest CDN match for this system's flat,
geometric character is **Lucide** (stroke, not filled) — flag any such substitution in your output, since it is not
sourced from the brand itself.

---

## Fonts — substitution note

**Newsreader** and **Archivo** are both genuine, current Google Fonts and match the brand-guideline reference
exactly — no substitution was needed. They're loaded via the Google Fonts CSS2 endpoint in `tokens/fonts.css`
rather than self-hosted binaries. If you'd prefer self-hosted files (for offline builds or stricter CSP), download
both families from fonts.google.com and swap the `@import` for local `@font-face` rules pointing at
`assets/fonts/`.

`--font-mono` has no matching family anywhere in the source materials — it currently falls back to the system
monospace stack. Flag to the user if a monospace need arises (e.g. code samples) and ask which family to add.

---

## Caveats & open items

- **No Figma file or codebase was attached** — every component and screen here is an original build sized to the
  brand's visual language (from the brand-guideline reference + content PDF), not a copy of production code.
- **No real photography was provided.** Every `ImageCard` in the UI kit uses an empty placeholder — do not invent
  or generate photography; ask the user for the real workshop/team photos referenced throughout the content PDF
  (`[PHOTO: …]` slots).
- The content PDF itself has ~12 open `[CONFIRM]` / `[NEEDS INPUT]` items (nav button count, footer year, ME=WE
  Constellation copy, roster gaps, etc.) — see `uploads/pdf-text.txt` "OPEN ITEMS" section. This design system
  proceeds with the PDF's stated defaults (6-button nav including Community; footer 2016–2026).

# Design

The NCS Abuja site leads with real event photography behind the headline, then alternates white and warm stone bands with full NCS green sections. A thin gold line is the only ornament, and a large NCS ABUJA wordmark closes the footer.

Source of truth: `styles.css` (tokens at the top under `:root`).

## Colour

| Token | Value | Role |
| --- | --- | --- |
| `--white` | #ffffff | Page ground, header |
| `--stone` | #eeebe3 | Warm band under the hero and alternating sections |
| `--stone-2` | #f6f4ef | Lighter alternate band |
| `--ink` | #0d120f | Headings, primary text |
| `--ink-2` | #39443e | Body copy |
| `--muted` | #59645e | Secondary text (AA on white and stone) |
| `--black` | #0b0f0c | Institutions section, primary buttons |
| `--green-900` / `--green-950` | #05260f / #03190b | Green fields, footer |
| `--green-700` / `--green-600` | #0b5a2c / #0a7a3b | Links, accents, hover |
| `--green-100` | #d6ecdc | Pale green tint |
| `--gold` / `--gold-soft` | #c9a227 / #e3cb7c | 1px rules; labels on green |

Green fields use the halftone, glow and gold-line textures in `assets/img/bg-*.webp` under a dark green gradient, so white text keeps AA contrast.

## Type

- One family: **Bricolage Grotesque**, self-hosted variable font (`assets/fonts`, weights 400 to 800, optical size 12 to 96). `font-optical-sizing: auto` gives body text the narrow text cut and headlines the display cut.
- Headings: 700, tracking -0.03em (footer wordmark 800, -0.05em), line-height 1.04, balanced wrapping.
- Scale: `.h1` clamp(42px to 84px), `.h2` clamp(34px to 60px), `.h3` clamp(24px to 32px); body 17px, leads 18 to 20px.
- No eyebrow labels, no section numbers, no monospace.

## Shape and depth

- Radius: 18px (`--radius`), 28px (`--radius-lg`) for photos and media; pills (999px) for buttons and chips.
- Shadow: `--shadow` (offset, soft blur) on floating photos and the cookie banner only.
- Rules: 1px gold under headline groups and above column sets; 1px ink at the top of lists.

## Components

- **Header**: white, sticky, logo left, nav centre with an animated green underline, dark "Join NCS" pill right. Below 1180px it becomes a full-screen menu.
- **Hero**: full-width event photos (`.slides`) behind the headline under a dark green gradient; crossfade with a slow zoom every 6.5s, pausing on control hover, focus and hidden tab. `.hero-bar` holds the caption, dots, counter and prev/next arrows.
- **Page hero**: `.page-hero-bg` photo behind the breadcrumb, title and lead on every inner page.
- **Footer wordmark**: `.footer-word`, a large faint NCS ABUJA at the foot of every page.
- **Buttons**: `.btn-dark` (primary), `.btn-outline`, `.btn-light`, `.btn-outline-light`; `.btn-pair` = outline pill + round arrow chip.
- **Lists instead of cards**: `.focus-list`, `.obj-list`, `.weeks`, `.steps`, `.rows`, `.docs`, `.contact-list` use rules and spacing, not boxes.
- **Media**: `.photo-pair`, `.wide-photo`, `.side-media`, `.weeks figure`, `.row-thumb`, `.gallery` (12-column mosaic with lightbox), `.embed` (consent-gated YouTube and Maps with a click-to-load cover).
- **Cookie banner**: bottom-right card; "Allow all" or "Essential only", stored in `localStorage["ncs-abuja-consent"]`. "Cookie settings" in the footer reopens it.

## Motion

- `data-slide="up|left|right"` slides an element in once as it enters the viewport; `data-stagger` staggers a parent's children by 90ms.
- `data-wipe` reveals a photo with a clip-path wipe while the image settles from 1.12 scale.
- On phones, side slides become vertical. Under `prefers-reduced-motion`, everything shows at once and the slider stops auto-advancing.

## Imagery

All photos are real chapter or NCS photographs, graded with one recipe: gentle auto-levels, soft S-curve, +8% saturation, cool-green shadows and warm highlights, Lanczos resample and unsharp mask. Each is exported as `name.webp` (up to 1920px) and `name-sm.webp` (960px) with `srcset`, and carries its origin in metadata. Originals stay in `assets/`.

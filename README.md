# NCS Abuja Chapter Website

A lightweight, static public site for the Nigeria Computer Society Abuja Chapter. It carries the chapter's transformation strategy into a public-facing experience while preserving key content and destinations from the legacy site.

## Run locally

From this directory, run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open <http://127.0.0.1:4173/>. Python 3 is the only local runtime required.

## Pages

- `index.html` — Home, chapter overview, six focus areas, and latest advocacy updates.
- `about.html` — Chapter history, mission, leadership, and governance links.
- `membership.html` — Eligibility, membership categories, professional benefits, and official NCS registration.
- `events.html` — Monthly program cadence, advocacy, and historical annual programs.
- `initiatives.html` — Techies’ Hangout, webinars, Computer-4-Schools, Tech Kids Dev, and Tech Day.
- `library.html` — Searchable annual program PDFs, governance documents, NITDA references, and legacy archive.
- `get-involved.html` — Speaker, sponsor, CSR, volunteer, and registration status.
- `contact.html` — Chapter and national office contact details and Abuja map.

## Project files

- `index.html` contains the home hero carousel and homepage summaries.
- `site-shell.js` renders shared navigation and one NCS-watermarked footer on each route.
- `styles.css` contains the forest-green visual system, original dotted background treatment, responsive layouts, carousel presentation, and interaction states.
- `script.js` controls the mobile navigation, accessible hero carousel, searchable document library, and current copyright year.
- `assets/` contains the NCS Abuja logo and local chapter photographs/backgrounds used on the page.
- `assets/team/` contains the chapter executive portraits from the legacy Chapter Executives page (resized to 480px).
- `.github/skills/` contains the project-local design skills and their supporting references.

## Content and image updates

Update copy in the corresponding page HTML. Navigation labels and shared footer content live in `site-shell.js`. Replace a photograph by changing its local asset path and keep descriptive `alt` text. The hero uses local image backgrounds with slide-specific copy and the original dotted-green texture, and the shared header/footer use the original NCS Abuja logo.

The new site carries the legacy sections for About, executives/governance, membership, events/annual programs, initiatives, participation, downloads, multimedia, and contact. A collapsible legacy-page directory preserves links to the published pages, including inactive organizer/venue tools.

Annual programme PDFs are linked to their original NCS file URLs; older NITDA guidelines point to Internet Archive copies; chapter by-law, chapter policy, and code-of-conduct links point to their original public Google Drive files. These are external source files, not copied into `assets/documents`.

The old site's upcoming/past event pages do not currently expose a usable event feed; two older annual event records are linked. Its meeting registration is closed, webinar form shows a loading state, and team applications are closed. The public pages do not expose a working member login, chapter branch locator, organizer dashboard, or venue management backend. The redesign states these limits and routes inquiries to chapter email instead of presenting nonfunctional mock services. A map is provided for the published Abuja office address; it is not a branch locator.

Forms, member records, expert search, CRM workflows, authentication, and live programme registration require the original backend or a new secured service before they can be presented as operational features.

## Section imagery

Sections follow the legacy site's image arrangement: the home About block uses an overlapping photo pair, followed by the Chairman feature, the values cards, a Techies’ Hangout poster band, a full-width membership banner, and Strategic Objectives beside a photo. Inner pages use photo page headers (set per page with the `--heading-image` inline style), the About page shows the executive portrait grid, and Membership, Initiatives, and Get Involved cards carry photos. All of these stack to a single column on phones. Additional photos were copied from the legacy site's media library (advocacy visits from 2022–2026, shown as a gallery on the Events page). The induction and fellowship photos (`ncs-member-induction.jpg`, `ncs-fellows-*.jpg`) come from the national Nigeria Computer Society website and are credited as such on the Membership page.

## Design notes

The site intentionally retains the chapter's forest-green identity, NCS logo, dotted green texture, and chapter photography while using a clearer editorial hierarchy, more consistent section spacing, readable small-screen type, visible keyboard focus, AA-safe accent contrast, and reduced-motion support.
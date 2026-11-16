# NCS Abuja Chapter Website

A fast static website for the Nigeria Computer Society (NCS) Abuja Chapter. Plain HTML, one stylesheet, two small scripts, self-hosted fonts. No build step.

## Run locally

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Then open <http://127.0.0.1:4173/>.

## Pages

| Page | Contents |
| --- | --- |
| `index.html` | Hero with event slideshow, about, focus areas, monthly programmes, Techies’ Hangout, video, chairman, initiatives, news, gallery |
| `about.html` | History timeline, mission, vision and values, objectives, chapter executives (`#leadership`) |
| `membership.html` | Benefits, member journey, nine grades (`#grades`), induction and fellowship gallery |
| `events.html` | Monthly rhythm, advocacy, visit gallery, video (`#media`), annual programme archive |
| `initiatives.html` | THI, MWS, Computer-4-Schools, Tech Kids Dev, Abuja Tech Week (each has an anchor) |
| `library.html` | Searchable documents, NITDA guidelines and archived pages from the previous site |
| `get-involved.html` | Speak, partner (`#partner`), community, volunteer, expertise for institutions |
| `contact.html` | Office, email, phone, national secretariat, consent-gated map |
| `cookies.html` | Cookie policy and settings |

## Files

- `styles.css`: the design system. See `DESIGN.md` for tokens, components and motion.
- `site-shell.js`: shared header, footer and cookie banner. Edit nav, footer links and contact details here.
- `script.js`: header, mobile menu, hero slider, scroll motion, lightbox, library search, cookie consent and embeds.
- `assets/img/`: graded WebP photos (`name.webp` up to 1920px, `name-sm.webp` 960px) and green background textures.
- `assets/fonts/`: Bricolage Grotesque (self-hosted, so no requests go to Google Fonts).
- `assets/`: original photos, logo and favicon. The originals are kept as sources for regrading.
- `PRODUCT.md`, `DESIGN.md`, `.impeccable/`: design context used by the Impeccable design skill.

## Updating content

- **Hero photo**: copy a `<figure class="slide">` inside `.slides` (set `data-title` and `data-meta`), then add a matching `<button class="hero-dot">` and update the "1 / 5" text.
- **Gallery photo**: add `<figure><img …><figcaption>…</figcaption></figure>` inside a `.gallery`. The lightbox picks it up automatically.
- **News item**: copy a `.news-item` link on the homepage.
- **Library document**: copy an `<li>` inside the right `.docs` list, then update the count in `#library-search-status`.
- **New photo**: export a large `name.webp` and a 960px `name-sm.webp` into `assets/img/`, and reference both with `srcset`.

## Links to the previous website

The old WordPress site at ncsabuja.org.ng has been replaced, so its pages, posts and PDFs no longer exist there. Links to that material point to saved copies on the Internet Archive (web.archive.org) and are labelled "archived". If the chapter republishes any of those documents, replace the archive link with the new address.

## Privacy

The site sets no analytics or advertising cookies. It stores the visitor’s cookie choice in local storage. The YouTube video and Google Map only load after "Allow all" or an explicit click. Keep `cookies.html` up to date if you add any third-party service.

Membership registration happens on ncs.org.ng. Forms, logins and event registration need a backend service before they can be added.

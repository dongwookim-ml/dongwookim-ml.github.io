# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal academic website for Prof. Dongwoo Kim (POSTECH Machine Learning Lab). Static HTML site hosted on GitHub Pages — no build system or package manager.

## Development

**Local preview:** Open `index.html` directly in a browser, or use a local server:
```bash
python -m http.server 8000
```

**Deployment:** Push to `master` branch — GitHub Pages auto-deploys.

## Architecture

### Site layout

- `index.html` — home page: profile, bio, experience/education/awards, recent news. Uses `css/modern.css` and a sidebar + mobile-nav layout.
- `pages/` — sub-pages. Two visual families coexist:
  - **Modern (sidebar layout, `css/modern.css`):** `research.html`, `publication.html`, `team.html`, `join.html`. These four are the ones linked in the main nav.
  - **Legacy (Bootstrap-resume style, `css/custom.css`):** `bio.html`, `contact.html`, `news.html`, `student.html`. Not in the main nav; older standalone pages.

### Styles & scripts

- `css/modern.css` — active stylesheet; CSS variables in `:root`.
- `css/custom.css` — legacy stylesheet used only by the four legacy pages above.
- `js/modern.js` — runtime loaders: `loadNews`, `loadTeam`. Each looks for a target element on the current page and bails if absent.
- `js/scripts.js` — legacy Bootstrap-resume script; not referenced by any current page.
- `index-original.html` — old homepage backup; not linked.

### Data files in `/data/`

- `data/news.js` (`NEWS_DATA` array) — rendered on `index.html` into `<ul id="news-list">` by `loadNews()`.
- `data/team.js` (`TEAM_DATA` object) — rendered on `pages/team.html` by `loadTeam()`.

Each data file has format documentation in a header comment. Publications are not data-driven — see below.

### Other directories

- `images/` — profile photo, icons, team photos.
- `papers_pdf/` — PDF copies of papers linked from `publication.html`.
- `bibtex/` — BibTeX entries for some publications.
- `slides/` — talk slides linked from elsewhere.

### External dependencies (CDN)

- Google Fonts (Inter)
- Font Awesome 5.15.4

## Adding content

- **News:** prepend an object to `NEWS_DATA` in `data/news.js`. Renders on the home page.
- **Team members:** add to the appropriate category in `TEAM_DATA` in `data/team.js`. Renders on `pages/team.html`.
- **Publications:** edit `pages/publication.html` directly (hand-maintained HTML; no data file).

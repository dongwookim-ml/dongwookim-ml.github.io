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
- `pages/` — sub-pages: `research.html`, `publication.html`, `team.html`, `join.html`, all linked in the main nav.

### Styles & scripts

- `css/modern.css` — the stylesheet; CSS variables in `:root`.
- `js/modern.js` — runtime loaders: `loadNews`, `loadTeam`. Each looks for a target element on the current page and bails if absent.

### Data files in `/data/`

- `data/news.js` (`NEWS_DATA` array) — rendered on `index.html` into `<ul id="news-list">` by `loadNews()`.
- `data/team.js` (`TEAM_DATA` object) — rendered on `pages/team.html` by `loadTeam()`.

Each data file has format documentation in a header comment. Publications are not data-driven — see below.

### Other directories

- `images/` — profile photo, icons, team photos.
- `papers_pdf/` — PDF copies of papers. Not linked from current pages, but kept because external sites (e.g., Google Scholar) link to them directly.
- `bibtex/` — BibTeX entries for some publications. Kept for the same reason.
- `slides/` — talk slides linked from elsewhere.

### External dependencies (CDN)

- Google Fonts (Inter)
- Font Awesome 5.15.4

## Adding content

- **News:** prepend an object to `NEWS_DATA` in `data/news.js`. Renders on the home page.
- **Team members:** add to the appropriate category in `TEAM_DATA` in `data/team.js`. Renders on `pages/team.html`.
- **Publications:** edit `pages/publication.html` directly (hand-maintained HTML; no data file).

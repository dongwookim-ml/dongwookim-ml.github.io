# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal academic website for Prof. Dongwoo Kim (POSTECH Machine Learning Lab). This is a static HTML site hosted on GitHub Pages with no build system or package manager.

## Development

**Local preview:** Open `index.html` directly in a browser, or use a local server:
```bash
python -m http.server 8000
```

**Deployment:** Push to `master` branch - GitHub Pages auto-deploys.

## Architecture

### Content Management
Site content is managed through JavaScript data files in `/data/`:
- `data/news.js` - Lab news items (NEWS_DATA array)
- `data/publications.js` - Selected publications (PUBLICATIONS_DATA object)
- `data/team.js` - Team members (TEAM_DATA object)

These files are loaded as global variables and rendered dynamically by `js/modern.js`. Each data file includes format documentation in comments at the top.

### Key Files
- `index.html` - Main single-page site with all sections
- `css/modern.css` - All styling (CSS variables defined in `:root`)
- `js/modern.js` - Dynamic content loading and UI interactions (particles, navbar, scroll animations, research cards)
- `pages/` - Additional standalone pages (bio, contact, full publication list, student info)

### Adding Content
**News:** Add object to beginning of `NEWS_DATA` array in `data/news.js`
**Publications:** Add to `PUBLICATIONS_DATA` in `data/publications.js` (supports arxiv, pdf, github, project links and badges like Oral/Spotlight)
**Team members:** Add to appropriate category in `TEAM_DATA` in `data/team.js`

### External Dependencies (CDN)
- Google Fonts (Inter)
- Font Awesome 5.15.4

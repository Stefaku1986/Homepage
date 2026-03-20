# CLAUDE.md — AI Assistant Guide for Ingenieurbuero Kuehl Homepage

## Project Overview

Static website for **Ingenieurbüro Kühl**, an automotive engineering consulting firm based in Cologne, Germany. The site is hosted on GitHub Pages with a custom domain (`ingenieurbuero-kuehl.de`).

**Key constraint:** This is intentionally a no-build, no-framework project. Do not introduce npm, bundlers, CSS preprocessors, or JS frameworks.

---

## Repository Structure

```
Homepage/
├── index.html          # Landing page / homepage (337 lines)
├── leistungen.html     # Services page
├── ueber-uns.html      # About us page
├── kontakt.html        # Contact page (includes form)
├── danke.html          # Post-form thank you page
├── impressum.html      # Legal imprint (required by German law)
├── datenschutz.html    # Privacy policy (GDPR)
├── css/
│   └── style.css       # Single master stylesheet (1,646 lines)
├── js/
│   ├── main.js         # Core functionality (156 lines)
│   ├── site-config.js  # Public config (analytics token)
│   └── cloudflare-analytics.js  # Analytics loader
├── CNAME               # Custom domain: ingenieurbuero-kuehl.de
├── .nojekyll           # Disables Jekyll on GitHub Pages
└── README.md           # Project documentation (in German)
```

---

## Technology Stack

| Layer       | Technology                                |
|-------------|-------------------------------------------|
| Markup      | Semantic HTML5, `lang="de"`               |
| Styling     | Vanilla CSS3 with custom properties       |
| Scripting   | Vanilla JavaScript ES6 (no frameworks)    |
| Hosting     | GitHub Pages (`main` branch, root folder) |
| Analytics   | Cloudflare Web Analytics (cookie-free)    |
| Domain      | Custom via CNAME                          |

**There is no package.json, build process, or dependency manager.** Files are served directly as-is.

---

## Deployment

- **Platform:** GitHub Pages
- **Branch:** `main` (auto-deploys on push)
- **Domain:** `ingenieurbuero-kuehl.de` (configured via `CNAME`)
- **SSL:** Automatic via GitHub Pages

No build or compilation step is needed. Pushing to `main` deploys immediately.

---

## Development Workflow

### Local Testing

Open HTML files directly in a browser, or run a simple HTTP server to avoid relative-path issues:

```bash
# Python (recommended)
python3 -m http.server 8000

# Node.js alternative
npx serve .
```

### Making Changes

1. Edit HTML, CSS, or JS files directly.
2. **After changing `style.css` or any JS file**, bump the cache-busting version query string in every HTML file that references it:
   ```html
   <!-- Change ?v=20260315-9 to ?v=YYYYMMDD-N -->
   <link rel="stylesheet" href="css/style.css?v=20260316-1">
   <script src="js/main.js?v=20260316-1"></script>
   ```
3. Test in browser (desktop + mobile viewport).
4. Commit and push to `main`.

### Cache Busting Convention

Version format: `?v=YYYYMMDD-N` where `N` is a sequence number for multiple releases on the same day.

---

## JavaScript Architecture (`js/main.js`)

The file uses `'use strict'` and four **IIFE modules** (Immediately Invoked Function Expressions):

| Module              | Lines    | Purpose                                         |
|---------------------|----------|-------------------------------------------------|
| Mobile Navigation   | 3–46     | Hamburger menu with backdrop, Escape key, resize |
| Cookie Banner       | 48–74    | Non-intrusive consent notice via localStorage   |
| Auto Year Update    | 76–83    | Writes current year into `[data-year]` elements |
| Contact Form        | 85–156   | Validates and opens mailto: with pre-filled body |

### Data Attribute Selectors

Never use class or ID selectors for JS hooks. Use data attributes:

| Attribute           | Element          | Purpose                       |
|---------------------|------------------|-------------------------------|
| `data-nav-toggle`   | `<button>`       | Hamburger menu button         |
| `data-nav-backdrop` | `<div>`          | Mobile nav overlay backdrop   |
| `data-mailto-form`  | `<form>`         | Contact form element          |
| `data-form-status`  | `<p>`            | Form status/feedback message  |
| `data-year`         | `<span>`/`<time>`| Replaced with current year    |

### Navigation Toggle State

- Mobile breakpoint: **860px**
- Active state: class `is-open` on `<nav>` and toggle button; class `nav-open` on `<body>`
- Accessibility: `aria-expanded` toggled on the button

### Contact Form Behavior

The form does **not** post to a server. On submit it:
1. Validates fields with `reportValidity()`
2. Builds a formatted German email body from `FormData`
3. Opens the user's email client via `mailto:` URL
4. Falls back to displaying the email address if `mailto:` fails

---

## CSS Design System (`css/style.css`)

### Custom Properties (Variables)

```css
/* Brand colors (dark blue) */
--brand-950, --brand-900, --brand-800, --brand-700

/* Accent colors (orange) */
--accent-600, --accent-500, --accent-100

/* Neutral backgrounds */
--sand-50, --sand-100, --sky-50, --sky-100

/* Text */
--ink-900, --ink-700, --ink-500

/* Layout */
--max-width: 1180px
--header-height: 88px

/* Border radius */
--radius-sm: 12px
--radius-md: 24px
--radius-lg: 36px

/* Typography */
--font-body: "Aptos", "Segoe UI Variable Text", sans-serif
--font-display: "Aptos", "Segoe UI Variable Display", sans-serif

/* Animation */
--transition: 180ms ease
```

### Naming Conventions

- **BEM-inspired**: `.site-header`, `.site-nav`, `.header-shell__inner`
- **Modifier pattern**: `.button--primary`, `.button--ghost`, `.section--dark`
- **State classes**: `.is-open`, `.nav-open`

### Button Variants

`.button` supports these modifiers: `--primary`, `--secondary`, `--ghost`, `--dark`, `--block`

### Section Variants

`.section` supports: default (light), `--tint`, `--dark`

### Responsive Strategy

- Mobile-first CSS
- Fluid typography with `clamp(min, preferred, max)`
- Single major breakpoint at **860px** for navigation layout
- Flexbox and CSS Grid for layouts

---

## HTML Conventions

- Use **semantic HTML5** elements: `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`, `<article>`
- All content is in **German** — keep this consistent
- Use **ARIA attributes** on interactive elements: `aria-label`, `aria-controls`, `aria-expanded`, `aria-current`
- Maintain proper **heading hierarchy** (`h1` → `h2` → `h3`)
- Include a **skip-to-main-content** link on every page
- Decorative SVGs must have `aria-hidden="true"` and no `alt` text
- Use HTML entities for German umlauts: `&auml;` (ä), `&ouml;` (ö), `&uuml;` (ü), `&szlig;` (ß)

---

## Accessibility Requirements

- All interactive elements must have visible focus styles (`:focus-visible`)
- Color contrast must meet WCAG AA standards
- Form fields need `<label>` elements or `aria-label`
- Navigation links get `aria-current="page"` on the active page
- No information conveyed by color alone

---

## Analytics

Cloudflare Web Analytics is used (GDPR-compliant, no cookies):

- Token stored in `js/site-config.js` as `window.SITE_CONFIG.cloudflareWebAnalyticsToken`
- Loader in `js/cloudflare-analytics.js` dynamically injects the Cloudflare beacon script
- The token (`dd9b5444eb2b4671bf18093040059970`) is intentionally public

---

## Legal Pages

German law requires specific pages that must be kept up to date:

- **`impressum.html`** — Business imprint with owner details (review periodically)
- **`datenschutz.html`** — GDPR privacy policy (review when data practices change)

Do not remove or substantially alter these pages without legal review.

---

## Key Constraints & Rules

1. **No npm, no build tools, no frameworks** — this is a deliberate choice for simplicity and performance.
2. **No external CSS or JS libraries** — all styling and behavior is custom.
3. **Bump cache-busting version strings** whenever CSS or JS changes.
4. **All user-facing content is in German** — keep all additions in German.
5. **Contact form uses mailto:** — there is no backend; do not add server-side form handling without major architectural discussion.
6. **Legal pages are required** — `impressum.html` and `datenschutz.html` must remain.
7. **Deployment is automatic** — pushing to `main` deploys immediately to production.

---

## Common Tasks

### Add a new page

1. Copy the structure from an existing page (e.g., `leistungen.html`)
2. Update `<title>`, meta description, `aria-current` on nav link, and `<h1>`
3. Add appropriate breadcrumb navigation
4. Link from relevant existing pages

### Update content

Edit the relevant HTML file directly. No rebuild needed.

### Modify styles

1. Edit `css/style.css`
2. Prefer using existing CSS custom properties
3. Bump version string in all HTML `<link>` tags: `?v=YYYYMMDD-N`

### Add JavaScript behavior

1. Add a new IIFE block to `js/main.js`
2. Use `data-*` attributes for element selection (not classes or IDs)
3. Bump version string in all HTML `<script>` tags: `?v=YYYYMMDD-N`

# Achmad Bayhaqy — Personal Portfolio

> Enterprise Data Strategy · Agentic AI Transformation · Microsoft Fabric Specialist

A professional, executive-grade personal portfolio website for **Achmad Bayhaqy** — senior Data & AI Leader with 12+ years building enterprise data platforms and AI capabilities across a 3,000+ store, 7-country retail ecosystem.

Built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build step, no dependencies. Ready to deploy on GitHub Pages.

---

## Live site

Once deployed via GitHub Pages, the site will be available at:

```
https://<username>.github.io/<repo-name>/
```

For a clean root URL (e.g. `https://bayhaqy.github.io/`), name the repository `<username>.github.io`.

---

## What's inside

| Section | Content |
|---|---|
| **Hero** | Name, role, key metrics (12+ yrs, 60% cloud saving, 3,000+ stores, 200+ students/yr) |
| **About** | Executive summary, impact stats, focus areas |
| **Experience** | Timeline of 7 roles: MAP Active, BPKH (2x), BIG, ADINESIA, Universitas Nusa Mandiri, MAP Group, early career |
| **Expertise** | 6 capability cards + 44-item technology stack |
| **Education** | M.Kom, S.Kom, Computer Engineering diploma |
| **Certifications** | Microsoft, AWS, Google, CEH, BNSP, MTCNA, and more |
| **Publications** | 3 selected papers · SINTA ID 6762248 · ~196 Google Scholar citations |
| **Contact** | Email, phone, LinkedIn, GitHub, blog, location |

---

## Tech stack

- **HTML5** — semantic, accessible markup
- **CSS3** — modern Grid + Flexbox, custom properties, 5 responsive breakpoints
- **Vanilla JS (ES5-safe)** — sticky nav, mobile menu, smooth scroll, IntersectionObserver for active-section highlighting and subtle reveal-on-scroll
- **Fonts** — Inter (sans) + Source Serif 4 (display accents), loaded from Google Fonts
- **No build step** — push to GitHub, enable Pages, done

## Design language

- **Palette**: Navy `#0b1f33` · Slate `#475569` · White `#ffffff` with a subtle blue accent
- **Typography**: Inter for body/UI, Source Serif 4 for italic display accents
- **Aesthetic**: Executive, monochrome-leaning, generous whitespace, no emoji noise, no flashy animations
- **Accessibility**: Semantic landmarks, ARIA labels, keyboard-friendly nav, `prefers-reduced-motion` support, print stylesheet

---

## File structure

```
.
├── index.html      # All page content & semantic structure
├── style.css       # Design tokens, layout, components, responsive rules
├── script.js       # Navigation, smooth scroll, scroll-reveal, mobile menu
└── README.md       # This file
```

No `node_modules`, no `package.json`, no bundler config. Just three static files.

---

## Run locally

Because the site is fully static, you can open it directly:

```bash
# Option 1 — just open the file
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows

# Option 2 — serve locally (recommended, avoids file:// quirks)
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## Deploy to GitHub Pages

### Option A — New repository

1. Go to https://github.com/new
2. Repository name: `bayhaqy-portfolio` (or `<username>.github.io` for a root URL)
3. Visibility: **Public** (Pages on free tier requires public repo)
4. Do **not** initialize with README/license/.gitignore (we'll push our own files)
5. Click **Create repository**

### Option B — Push from local

```bash
# From the folder containing index.html, style.css, script.js, README.md
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/<username>/bayhaqy-portfolio.git
git push -u origin main
```

### Enable Pages

1. Open the repository on GitHub
2. Go to **Settings → Pages**
3. **Source**: Deploy from a branch
4. **Branch**: `main` / `(root)` → **Save**
5. Wait ~30–60 seconds, then visit the URL shown at the top of the Pages settings

---

## Customization guide

All content lives in `index.html` — no data files, no CMS. Edit sections in place.

### Update personal info

- **Name & role**: search for `Achmad Bayhaqy` and the `hero-tagline` paragraph
- **Contact details**: edit the `#contact` section and the `hero-card-links` block
- **Metrics in hero**: edit the four `<li>` items inside `.hero-meta`

### Update styling

CSS custom properties are defined at the top of `style.css`:

```css
:root {
  --navy-900: #0b1f33;   /* primary dark */
  --navy-800: #102a43;   /* header / footer */
  --accent:   #2563eb;   /* links, highlights */
  --gold:     #b08d57;   /* scholarly accents (unused by default) */
  /* ... spacing, type scale, shadows ... */
}
```

Change these once and the whole site updates.

### Add a profile photo

Replace the `AB` initials block in the hero card:

```html
<!-- Before -->
<div class="avatar" aria-hidden="true">AB</div>

<!-- After -->
<img class="avatar" src="assets/profile.jpg" alt="Achmad Bayhaqy" />
```

Then drop `profile.jpg` into an `assets/` folder alongside `index.html`.

### Add a favicon

Place `favicon.ico` (or `favicon.png`) in the repo root. GitHub Pages auto-serves it. Optionally add to `<head>`:

```html
<link rel="icon" type="image/png" href="favicon.png" />
```

---

## Browser support

Tested in current versions of Chrome, Firefox, Safari, and Edge. Uses `backdrop-filter` and `IntersectionObserver` — both with safe fallbacks. Degrades gracefully on IE-less legacy browsers.

---

## Security notes

- **No API keys, tokens, or credentials** are present in any file in this repository.
- **No third-party JavaScript** is loaded — only Google Fonts (CSS) for typography.
- **No analytics or tracking** is included by default. To add privacy-respecting analytics, consider [Plausible](https://plausible.io) or [Umami](https://umami.is) and inject their single-line snippet into the `<head>` of `index.html`.

---

## License

© Achmad Bayhaqy. All rights reserved.

The code in this repository is provided for the personal portfolio of Achmad Bayhaqy. You are welcome to read and learn from the structure and styling, but please do not reproduce the personal content (name, biography, experience, certifications) as your own.

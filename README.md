# Achmad Bayhaqy — Personal Portfolio

> Enterprise Data Strategy · Agentic AI Transformation · Microsoft Fabric Specialist

A professional, executive-grade personal portfolio for **Achmad Bayhaqy** — senior Data & AI Leader with 12+ years building enterprise data platforms and AI capabilities across a 3,000+ store, 7-country retail ecosystem.

Built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build step, no dependencies. Ready to deploy on GitHub Pages.

---

## Live site

**https://bayhaqy.github.io/**

---

## What's inside

| Section | Content |
|---|---|
| **Hero** | Photo, name, role, key metrics, Download CV button |
| **About** | Executive summary, impact stats, focus areas |
| **Experience** | Timeline of 7 roles across enterprise, government, and education |
| **Expertise** | 6 capability cards + 44-item technology stack |
| **Education** | M.Kom, S.Kom, Computer Engineering diploma |
| **Certifications** | Microsoft, AWS, Google, CEH, BNSP, MTCNA |
| **Publications** | 3 selected papers · SINTA ID 6762248 · ~196 Google Scholar citations |
| **Contact** | Flowing chips — email, phone, LinkedIn, GitHub, blog, Scholar, CV download, location |

A downloadable PDF CV (single-column, ATS-safe, 88 KB, 3 pages) is included at `assets/Achmad_Bayhaqy_CV_2026.pdf`.

---

## Tech stack

- **HTML5** — semantic, accessible markup
- **CSS3** — Grid + Flexbox, custom properties, 4 responsive breakpoints, mobile-first
- **Vanilla JS** — sticky nav, mobile menu, smooth scroll, IntersectionObserver for active-section + scroll reveal
- **Fonts** — Inter (sans) + Source Serif 4 (display italics), loaded from Google Fonts
- **PDF CV** — ReportLab with Inter TTF (embedded), single-column ATS-safe layout
- **No build step** — push to GitHub, Pages auto-deploys

## Design language

- **Palette**: White `#FFFFFF` background · Red `#B91C1C` accent (executive red, used sparingly) · Black `#111111` body
- **Typography**: Inter (300–800) for body/UI, Source Serif 4 italic for accent quotes & publication numbers
- **Aesthetic**: Editorial, minimalist, generous whitespace, red as a structural element (rule lines, accent borders, dot bullets) — not decoration
- **Mobile-first**: Hero photo reflows under text on tablet, contact chips stack on mobile, nav collapses to off-canvas menu
- **Accessibility**: Semantic landmarks, ARIA labels, keyboard-friendly nav, `prefers-reduced-motion` support, print stylesheet

---

## File structure

```
.
├── index.html              # All page content & semantic structure
├── style.css               # Design tokens, layout, components, responsive rules
├── script.js               # Navigation, smooth scroll, scroll-reveal, mobile menu
├── README.md               # This file
└── assets/
    ├── profile.png         # Profile photo (896×1195 PNG, ~1.1 MB)
    └── Achmad_Bayhaqy_CV_2026.pdf   # Downloadable CV (3 pages, ~88 KB, ATS-safe)
```

No `node_modules`, no `package.json`, no bundler config. Just three static files plus two assets.

---

## Run locally

```bash
# Option 1 — open directly
open index.html              # macOS
xdg-open index.html          # Linux
start index.html             # Windows

# Option 2 — serve locally (recommended for accurate rendering)
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## Regenerate the PDF CV

The CV PDF is built with ReportLab from `/home/z/my-project/scripts/build_cv_pdf.py`. To regenerate after editing content:

```bash
pip install reportlab pypdf
python3 /home/z/my-project/scripts/build_cv_pdf.py
# Output: ./Achmad_Bayhaqy_CV_2026.pdf
```

CV design rules:
- **Single column** (ATS-safe — no sidebars, no tables, no text boxes)
- **Margins**: 1.6 cm left/right, 1.4 cm top/bottom
- **Body**: Inter Regular 10pt, leading 14.5pt
- **Section titles**: Inter Bold 12.5pt, uppercase, with red `#B91C1C` rule below
- **Body text color**: near-black `#111111` (not pure black — softer on eyes, ATS-readable)
- **Accent color**: red `#B91C1C` for section rules, role bullets, and category labels
- **3 pages** for senior executive (12+ years, multi-role) — appropriate length

---

## Deploy to GitHub Pages

This site is already deployed at **https://bayhaqy.github.io/** via the `bayhaqy/bayhaqy.github.io` repository. To update:

```bash
git add .
git commit -m "Redesign: white/red/black palette, profile photo, CV download"
git push origin main
```

GitHub Pages auto-rebuilds on every push to `main`. Site updates within ~60 seconds.

### First-time setup (for reference)

1. Create a public repo named `<username>.github.io` for a root URL
2. Push the 4 files + `assets/` folder
3. Repo → **Settings → Pages → Source: Deploy from branch → Branch: `main` / `(root)` → Save**

---

## Customization guide

### Update personal info

All content lives in `index.html`. Edit sections in place.

- **Name & role**: search for `Achmad Bayhaqy` and the `hero-tagline` paragraph
- **Photo**: replace `assets/profile.png` (keep 3:4 aspect ratio for best result)
- **CV PDF**: replace `assets/Achmad_Bayhaqy_CV_2026.pdf`
- **Metrics in hero**: edit the four `<li>` items inside `.hero-meta`

### Update styling

CSS custom properties at the top of `style.css`:

```css
:root {
  --red-700:    #B91C1C;   /* primary accent */
  --red-800:    #991B1B;   /* hover */
  --ink:        #111111;   /* body text */
  --ink-mute:   #6B7280;   /* metadata */
  --paper:      #FFFFFF;   /* background */
  --paper-alt:  #FAFAFA;   /* alternate section bg */
  /* ... */
}
```

Change these once and the whole site updates.

### Swap the accent color

Replace `--red-700` and `--red-800` with another executive-safe color:
- Navy `#1E3A8A` / `#1E40AF`
- Forest green `#166534` / `#15803D`
- Burgundy `#7F1D1D` / `#991B1B`
- Charcoal `#1F2937` / `#111827`

---

## Browser support

Tested in current Chrome, Firefox, Safari, and Edge. Uses `backdrop-filter`, `aspect-ratio`, and `IntersectionObserver` — all with safe fallbacks. Print stylesheet included.

---

## Security notes

- **No API keys, tokens, or credentials** in any file
- **No third-party JavaScript** — only Google Fonts (CSS) for typography
- **No analytics or tracking** by default. To add privacy-respecting analytics, inject a Plausible/Umami snippet into the `<head>` of `index.html`

---

## License

© Achmad Bayhaqy. All rights reserved.

The code is provided for the personal portfolio of Achmad Bayhaqy. You are welcome to read and learn from the structure and styling, but please do not reproduce the personal content (name, biography, experience, certifications, photo) as your own.

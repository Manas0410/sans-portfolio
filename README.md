# Aurora — Software Developer Portfolio

An immersive, highly-animated single-page portfolio built with **React + Vite + Tailwind CSS v4**, featuring a custom **Three.js / GLSL** hero scene, smooth scrolling, a bespoke cursor, and scroll-driven animations throughout.

## ✨ Highlights

- **Interactive 3D hero** — a morphing, iridescent GLSL blob + GPU particle field that react to the cursor (`src/components/three/`).
- **Custom dual-layer cursor** with magnetic buttons and context-aware hover states.
- **Smooth scrolling** via Lenis, with a scroll-progress bar and scroll-spy nav.
- **Journey-map experience timeline** with a scroll-filled gradient rail.
- **Skills** with animated proficiency bars, a cursor spotlight, and an infinite marquee.
- **Projects** as 3D tilt cards with parallax glare.
- **Counting preloader** and reveal-on-scroll section headings.

## 🚀 Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build → dist/
npm run preview  # preview the build
```

## 📝 Editing your content

**All content lives in one file:** [`src/data/portfolio.json`](src/data/portfolio.json).

Update your name, role, experience, skills, projects, and contact details there — no component code needs to change. Structure:

| Key          | What it controls                                             |
| ------------ | ----------------------------------------------------------- |
| `meta`       | Name, role, tagline, location, availability                 |
| `hero`       | Kicker, headline lines, rotating words, intro paragraph     |
| `about`      | Lead line, paragraphs, and the animated stat counters       |
| `experience` | The journey-map milestones (role, company, highlights, stack) |
| `skills`     | Skill categories with `name` + `level` (0–100)              |
| `projects`   | Project cards (`featured: true` makes a card span 2 cols)   |
| `contact`    | Email, phone, GitHub, LinkedIn                              |

### Tips

- **Featured projects** (`"featured": true`) render as large, full-width cards.
- Each project's `color` tints its glow and category chip.
- Skill `level` is a percentage that drives the bar width and counters.

## 🛠 Tech stack

React 18 · Vite 6 · Tailwind CSS v4 · Three.js · @react-three/fiber · @react-three/drei · Motion (Framer Motion) · GSAP · Lenis
# sans-portfolio

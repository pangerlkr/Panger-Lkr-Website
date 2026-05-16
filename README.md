# Panger-Lkr-Website

Official source code for **pangerlkr.link** — a cinematic portfolio website for **Pangerkumzuk Longkumer (Panger Lkr)**, built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and scroll-driven HTML5 canvas sequences.

## Overview

This project presents Panger Lkr’s cybersecurity and entrepreneurial profile through an immersive, story-led interface with:

- cinematic scroll sections
- animated overlays and transitions
- portfolio/case-study storytelling
- media recognition and social presence
- a terminal-inspired contact experience

The site is optimized for visual impact while remaining simple to run and extend.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript + React 18
- **Styling:** Tailwind CSS + custom global CSS utilities
- **Animation:** Framer Motion
- **Visual sequences:** HTML5 Canvas image-sequence rendering
- **Package manager:** npm

## Routes

| Route | Purpose |
|---|---|
| `/` | Home page with hero sequence, narrative slides, services, trust framework, and media section |
| `/about` | Detailed profile and venture narrative |
| `/work` | Projects/case studies and dossier-style presentation |
| `/contact` | Full-screen terminal-inspired contact interface |

## Project Structure

```text
Panger-Lkr-Website/
├── public/
│   ├── logo.png
│   ├── pangerlkr.png
│   ├── sequence/        # Home hero image sequence (frame_00 → frame_65)
│   └── sequence1/       # Venture/story sequence (frame_000 → frame_105)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── work/page.tsx
│   │   └── contact/page.tsx
│   └── components/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── ScrollyCanvas.tsx
│       ├── Overlay.tsx
│       ├── HomeStory.tsx
│       ├── Services.tsx
│       ├── Trust.tsx
│       ├── Media.tsx
│       ├── About.tsx
│       ├── VentureStack.tsx
│       ├── SectionScrollyCanvas.tsx
│       ├── WorkHero.tsx
│       ├── Projects.tsx
│       ├── CyberDossier.tsx
│       ├── Contact.tsx
│       └── PageBackground.tsx
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## Key UI Systems

### 1) Scroll-driven Hero Canvas

- `ScrollyCanvas.tsx` preloads **66** frames from `public/sequence`
- scroll progress is mapped to frame index
- canvas renders with cover-crop behavior to preserve cinematic composition

### 2) Venture Story Canvas

- `SectionScrollyCanvas.tsx` renders **106** frames from `public/sequence1`
- integrated into the About page venture stack
- layered with gradient/dimming overlays for text readability

### 3) Motion-led Storytelling Components

- `HomeStory`, `Services`, `Trust`, `WorkHero`, and `Projects` compose the narrative flow
- motion values and transforms are used for reveal, parallax, and sticky progression effects

## Styling & Design Language

Global design tokens and utilities are defined in:

- `src/app/globals.css`
- `tailwind.config.ts`

Primary palette:

- **Background:** `#121212`
- **Accent:** `#C8FF00`
- **Text:** `#F0F0F0`

Reusable utilities include:

- glassmorphism container style (`.glass`)
- accent glow effects (`.glow-accent`)
- text gradient helper (`.text-gradient`)
- scanline animation utility (`.animate-scan`)

## Local Development

### Prerequisites

- Node.js 18+ (recommended LTS)
- npm

### Install

```bash
npm ci
```

### Run locally

```bash
npm run dev
```

Open: `http://localhost:3000`

## Scripts

```bash
npm run dev     # start development server
npm run build   # production build
npm run start   # run production server
npm run lint    # Next.js ESLint check
```

> Note: if ESLint is not initialized yet, `npm run lint` may prompt for initial ESLint setup in some environments.

## Metadata & SEO

Global metadata is configured in `src/app/layout.tsx`, including:

- title and description
- keyword list
- Open Graph defaults
- Twitter card metadata
- site icon (`/logo.png`)

## Content & Brand Reference

For contributor-facing profile, naming, and brand consistency guidance, use:

- `About-Panger-Lkr.md`

This file defines canonical naming, contact handles, and profile context used across the site.

## Deployment

This is a standard Next.js application and can be deployed on platforms like Vercel.

Build command:

```bash
npm run build
```

Start command:

```bash
npm run start
```

## License

No license file is currently included in this repository. Add one if distribution terms are required.

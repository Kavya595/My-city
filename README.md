# MyCity Infra Developers — React + Vite

Premium real estate & construction company website built with React 18 + Vite + Framer Motion.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Tech Stack

| Package | Purpose |
|---|---|
| `react@18` + `react-dom` | UI framework |
| `vite@5` + `@vitejs/plugin-react` | Build tool |
| `react-router-dom@6` | Client-side routing |
| `framer-motion@11` | Animations & transitions |
| `gsap@3` | Available for advanced timeline animations |

## 🎬 Animations Included

- **Page Loader** — Gold shimmer text with animated progress bar
- **Custom Magnetic Cursor** — Dot + lagging ring, hover/click states
- **Particle Canvas** — 60 floating gold particles with mouse-repel physics
- **Page Transitions** — Gold wipe sweep between every route
- **Hero Building SVG** — Stroke draw-on animation on load
- **Floating Numbers** — Data points float upward in hero background
- **Scroll-Triggered Reveals** — Fade/slide/scale per element with staggered delays (Framer Motion `whileInView`)
- **3D Card Tilt** — Project cards tilt on mouse position
- **Infinite Marquee** — Gold ticker scrolling property categories
- **Auto-scrolling Testimonials** — Pauses on hover
- **Rotating Orbital Rings** — Three spinning rings in About section
- **Animated Progress Bars** — Counter + bar animations on scroll
- **Service Accordion** — Hover reveals description + price (Framer AnimatePresence)
- **WhatsApp Pulse** — Ring pulse and float-bounce animation

## 📁 Project Structure

```
src/
├── components/
│   ├── Cursor.jsx       — Custom magnetic cursor
│   ├── Loader.jsx       — Page loader with progress
│   ├── Navbar.jsx       — Sticky nav + mobile menu
│   ├── Footer.jsx       — Footer with social links
│   └── WhatsApp.jsx     — Floating WhatsApp button
├── pages/
│   ├── Home.jsx         — All home page sections
│   └── Pages.jsx        — About, Projects, Gallery, Contact, Legal
├── hooks/
│   └── index.js         — useCursor, useParticles, useTilt, useScrollReveal, useCounter
├── data/
│   └── index.js         — All site data (projects, testimonials, etc.)
├── styles/
│   ├── globals.css      — Variables, reset, utilities
│   ├── cursor.css
│   ├── loader.css
│   ├── navbar.css
│   ├── footer.css
│   ├── whatsapp.css
│   ├── home.css         — Hero, stats, about, marquee, testimonials
│   └── pages.css        — About, Projects, Gallery, Contact, Legal
├── App.jsx              — Router + animated routes
└── main.jsx             — Entry point + Loader wrapper
```

## 🎨 Design

- **Palette:** Near-black `#060608`, Gold `#c9a84c`, Off-white `#f0ede8`
- **Typography:** Cormorant Garamond (display) + Syne (sans) + DM Mono (mono)
- **Theme:** Dark luxury — cinematic, editorial, high-end real estate

## 📱 Pages

| Route | Page |
|---|---|
| `/` | Home (Hero, Stats, About, Projects, Services, Testimonials, Contact) |
| `/about` | About (Timeline, Vision/Mission, Goals, Team) |
| `/projects` | Projects (Tabbed: Ongoing, For Sale, Completed, Upcoming) |
| `/gallery` | Gallery (Masonry grid with filter + lightbox) |
| `/contact` | Contact (Info, Map, Form) |
| `/legal` | Legal (Privacy Policy, Terms, Disclaimer, Cookies) |

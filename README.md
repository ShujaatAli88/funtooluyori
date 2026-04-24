# Funto Oluyori — Real Estate Website

A production-ready, fully responsive real estate agent website built for **Funto Oluyori**, licensed REALTOR® based in Upper Marlboro, MD. Designed with an editorial luxury aesthetic, smooth animations, and a mobile-first approach.

---

## Live Site


> Deploy URL will appear here after Vercel deployment.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 18.3 |
| Build Tool | Vite | 5.3 |
| Routing | React Router DOM | 6.23 |
| Styling | Tailwind CSS | 3.4 |
| Animations | Framer Motion | 11.0 |
| Deployment | Vercel (static) | — |

---

## Project Structure

```
funto-oluyori-website/
├── public/
│   ├── FUNTO OLUYORI-LOGO-1.png     # Navbar logo
│   ├── funto_profile_image.jpg      # Agent portrait
│   ├── listing_1.webp               # Listing photo
│   ├── listing_2.webp
│   └── listing_3.webp
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Fixed nav, glassmorphism on scroll, mobile drawer
│   │   ├── Footer.jsx               # Full footer with links, contact, credentials
│   │   ├── HeroSection.jsx          # Full-viewport hero with animated headline
│   │   ├── StatsBar.jsx             # Animated scroll-triggered stat counters
│   │   ├── ListingCard.jsx          # Property card with hover effects
│   │   ├── TestimonialCard.jsx      # Client review card with star rating
│   │   └── ContactForm.jsx          # Controlled form with success state
│   ├── pages/
│   │   ├── Home.jsx                 # Landing page — all major sections
│   │   ├── About.jsx                # Bio, timeline, certifications
│   │   ├── Listings.jsx             # Filterable property grid (active/sold tabs)
│   │   ├── Testimonials.jsx         # Masonry review grid
│   │   └── Contact.jsx              # Split layout with form
│   ├── data/
│   │   ├── listings.js              # All property data
│   │   └── testimonials.js          # All client review data
│   ├── App.jsx                      # Router, page transitions, layout shell
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Tailwind directives + base styles
├── index.html                       # HTML shell, Google Fonts preload
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── vercel.json                      # SPA rewrite rules
```

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, stats, about snapshot, featured listings, services, testimonials carousel, market data |
| `/about` | About | Full bio, career timeline, certifications, personal story, CTA |
| `/listings` | Listings | Active/Sold tabs, filter by price · beds · type, full property grid |
| `/testimonials` | Testimonials | Masonry grid of all client reviews with summary stats |
| `/contact` | Contact | Split layout — contact info + message form |

---

## Brand Identity

```
Primary:     #1C1C1C  — near black
Secondary:   #C9A96E  — warm gold (CTAs, accents, highlights)
Accent:      #E8DDD0  — soft sand
Background:  #FAF8F5  — warm off-white
Text:        #2D2D2D

Headings:    Playfair Display  (elegant serif)
Body:        DM Sans           (modern, clean sans-serif)
Accent text: Cormorant Garamond italic  (quotes, taglines)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
# Clone the repository
git clone https://github.com/your-username/funto-oluyori-website.git
cd funto-oluyori-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output is generated in the `dist/` folder. Preview locally with:

```bash
npm run preview
```

---

## Deployment — Vercel

This project is configured for zero-config deployment on **Vercel's free tier**.

### One-Click Deploy

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Vercel auto-detects Vite — accept the defaults:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Click **Deploy**

> The `vercel.json` SPA rewrite rule is already included — all routes correctly resolve to `index.html`.

### Environment Variables

None required. This is a fully static frontend project.

---

## Adding / Updating Content

### Listings

Edit [`src/data/listings.js`](src/data/listings.js). Each listing object accepts:

```js
{
  id: 1,
  address: '123 Example Street',
  city: 'City, State ZIP',
  price: '$500,000',
  beds: 3,
  baths: 2,
  sqft: '1,800',
  type: 'Townhouse',           // 'Single Family' | 'Townhouse' | 'Condo' | 'Luxury Estate'
  status: 'For Sale',          // 'For Sale' | 'Sold' | 'Rented' | 'Under Contract'
  image: '/your-image.webp',   // place in /public, or use an absolute URL
  featured: true,              // shows on homepage (keep to 3)
  detailUrl: 'https://...',    // optional — links "View Property" to listing page
}
```

### Testimonials

Edit [`src/data/testimonials.js`](src/data/testimonials.js). Each entry accepts:

```js
{
  id: 1,
  name: 'Client Name',
  city: 'City, State',
  type: 'Buyer',    // 'Buyer' | 'Seller' | 'Investor' | 'Buyer & Seller'
  stars: 5,
  quote: 'Review text...',
}
```

### Images

Place local images in the `/public` folder and reference them with a root-relative path (e.g. `/funto_profile_image.jpg`). External images use full URLs.

---

## Performance

| Metric | Value |
|---|---|
| JS Bundle (gzip) | ~106 KB |
| CSS Bundle (gzip) | ~5.5 KB |
| Lighthouse Target | 90+ Performance, 100 Accessibility |
| Image loading | `lazy` on all non-hero images |
| Fonts | Preloaded via Google Fonts with `display=swap` |

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome / Edge | Latest 2 versions |
| Firefox | Latest 2 versions |
| Safari | Latest 2 versions |
| Mobile Safari (iOS) | iOS 15+ |
| Samsung Internet | Latest |

---

## License

© 2025 Funto Oluyori. All rights reserved.  
This codebase is proprietary. Unauthorized copying, distribution, or modification is prohibited.

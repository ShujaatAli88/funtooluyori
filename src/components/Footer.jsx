import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Listings', to: '/listings' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact Me', to: '/contact' },
]

const credentials = [
  'Licensed Realtor · State of Maryland',
  'License #5014963',
  'REALTOR® Member, NAR',
  'Keller Williams REALTORS® Association',
  'Certified Luxury Home Specialist',
  "Accredited Buyer's Representative",
]

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/funtohomes/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61556228529496',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-background relative overflow-hidden">

      {/* ── Oversized watermark typography ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-heading font-bold uppercase text-white/[0.028] leading-none whitespace-nowrap tracking-tight"
          style={{ fontSize: 'clamp(5rem, 20vw, 16rem)' }}
        >
          FUNTO
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-0">

        {/* ── Brand header row ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-10 pb-10 sm:pb-12">

          {/* Left — identity */}
          <div>
            <div className="flex items-end gap-3 mb-4">
              <span
                className="font-heading font-semibold tracking-wide text-background leading-none"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
              >
                Funto Oluyori
              </span>
              <span className="font-body text-[9px] tracking-[0.28em] uppercase text-secondary mb-0.5 flex-shrink-0">
                Real Estate
              </span>
            </div>
            <p className="font-accent italic text-accent/45 text-sm sm:text-base leading-relaxed max-w-xs sm:max-w-sm">
              "Your trusted partner from first showing to final close."
            </p>
          </div>

          {/* Right — socials + license tag */}
          <div className="flex flex-col items-start sm:items-end gap-3">
            <div className="flex gap-2">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center border border-background/15 text-background/40 hover:bg-secondary hover:border-secondary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 focus:ring-offset-primary"
                >
                  {icon}
                </a>
              ))}
            </div>
            <span className="font-body text-[9px] tracking-[0.22em] uppercase text-background/20">
              Licensed Realtor · State of Maryland
            </span>
          </div>
        </div>

        {/* ── Elegant separator with center dot ── */}
        <div className="flex items-center">
          <div className="flex-1 h-px bg-background/8" />
          <div className="mx-4 w-1.5 h-1.5 rounded-full bg-secondary/50" />
          <div className="flex-1 h-px bg-background/8" />
        </div>

        {/* ── Main three-column grid ── */}
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">

          {/* Navigate */}
          <div>
            <h3 className="flex items-center gap-3 mb-7">
              <span className="w-5 h-px bg-secondary flex-shrink-0" />
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-secondary font-medium">
                Navigate
              </span>
            </h3>
            <ul className="space-y-4">
              {navLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="group flex items-center gap-0 hover:gap-2.5 font-body text-sm text-background/45 hover:text-secondary transition-all duration-300"
                  >
                    <span className="block w-0 group-hover:w-3 h-px bg-secondary transition-all duration-300 flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="flex items-center gap-3 mb-7">
              <span className="w-5 h-px bg-secondary flex-shrink-0" />
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-secondary font-medium">
                Contact
              </span>
            </h3>
            <ul className="space-y-5 font-body text-sm">
              <li>
                <p className="text-[9px] tracking-[0.25em] uppercase text-secondary/55 mb-1">Direct</p>
                <a href="tel:+19808004892" className="text-background/45 hover:text-secondary transition-colors duration-300">
                  (980) 800-4892
                </a>
              </li>
              <li>
                <p className="text-[9px] tracking-[0.25em] uppercase text-secondary/55 mb-1">Email</p>
                <a href="mailto:funto@kw.com" className="text-background/45 hover:text-secondary transition-colors duration-300">
                  funto@kw.com
                </a>
              </li>
              <li>
                <p className="text-[9px] tracking-[0.25em] uppercase text-secondary/55 mb-1">Brokerage</p>
                <p className="text-background/45 leading-relaxed">
                  Keller Williams Preferred Properties<br />
                  1441 McCormick DR, STE 1020<br />
                  Upper Marlboro, MD 20774
                </p>
              </li>
            </ul>
          </div>

          {/* Credentials */}
          <div>
            <h3 className="flex items-center gap-3 mb-7">
              <span className="w-5 h-px bg-secondary flex-shrink-0" />
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-secondary font-medium">
                Credentials
              </span>
            </h3>
            <ul className="space-y-3.5">
              {credentials.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-secondary/55 flex-shrink-0" />
                  <span className="font-body text-sm text-background/45">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-background/8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-[11px] text-background/22 tracking-wide text-center sm:text-left">
            © 2025 Funto Oluyori. All rights reserved.
          </p>
          <p className="font-body text-[11px] text-background/22 tracking-wide text-center sm:text-right">
            Licensed Real Estate Salesperson #5014963 · State of Maryland
          </p>
        </div>
      </div>
    </footer>
  )
}

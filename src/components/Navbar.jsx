import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Listings', to: '/listings' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact Me', to: '/contact' },
]

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isHomePage = location.pathname === '/'
  const isScrolled = scrollY > 60
  const isTransparent = isHomePage && !isScrolled

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">

        {/* ── Utility bar ── */}
        <div
          className={`transition-all duration-500 ${
            isTransparent ? 'bg-black/25 backdrop-blur-sm' : 'bg-primary'
          }`}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 h-8 flex items-center justify-center sm:justify-end gap-5">
            <a
              href="tel:+19808004892"
              className="font-body text-[11px] tracking-[0.1em] text-white/50 hover:text-secondary transition-colors duration-300 flex items-center gap-1.5"
            >
              <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span className="hidden sm:inline">Direct:&nbsp;</span>(980) 800-4892
            </a>
            <span className="hidden sm:block w-px h-3 bg-white/15" />
            <Link
              to="/testimonials#review"
              className="hidden sm:flex items-center gap-1.5 font-body text-[11px] tracking-[0.1em] text-secondary hover:text-secondary/80 transition-colors duration-300"
            >
              <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Leave a Review
            </Link>
          </div>
        </div>

        {/* ── Main nav ── */}
        <div
          className={`transition-all duration-500 relative ${
            isTransparent
              ? 'bg-primary/40 backdrop-blur-md'
              : 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-accent/30'
          }`}
        >
          {!isTransparent && (
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/35 to-transparent" />
          )}

          <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-20 sm:h-24">

            {/* Logo */}
            <Link to="/" className="flex items-center leading-none group h-full">
              <img
                src="/new_logo_funto.png"
                alt="Funto Oluyori Real Estate Logo"
                className="h-20 sm:h-24 w-auto object-contain group-hover:scale-[1.03] transition-all duration-500"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map(({ label, to }) => {
                const isActive = location.pathname === to
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`font-body text-sm tracking-wide transition-all duration-300 relative group py-1 ${
                      isActive
                        ? 'text-secondary'
                        : isTransparent
                        ? 'text-white/80 hover:text-white'
                        : 'text-primary hover:text-secondary'
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${
                        isActive
                          ? 'w-full bg-secondary'
                          : isTransparent
                          ? 'w-0 group-hover:w-full bg-white/60'
                          : 'w-0 group-hover:w-full bg-secondary'
                      }`}
                    />
                    {isActive && (
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-secondary" />
                    )}
                  </Link>
                )
              })}

              {/* CTA button */}
              <Link
                to="/contact"
                className={`ml-1 px-5 py-2.5 font-body text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 min-h-[44px] flex items-center ${
                  isTransparent
                    ? 'border border-secondary/80 text-secondary hover:bg-secondary hover:text-white hover:shadow-lg hover:shadow-secondary/20'
                    : 'bg-secondary text-white hover:bg-secondary/90 hover:shadow-md'
                }`}
              >
                Let's Connect
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 focus:outline-none focus:ring-2 focus:ring-secondary rounded"
            >
              {['top', 'mid', 'bot'].map((key, idx) => (
                <motion.span
                  key={key}
                  animate={
                    idx === 0
                      ? menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
                      : idx === 1
                      ? menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
                      : menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.3 }}
                  className={`block w-6 h-px origin-center transition-colors duration-500 ${
                    isTransparent ? 'bg-white' : 'bg-primary'
                  }`}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-primary flex flex-col md:hidden overflow-hidden"
            >
              <div className="h-[3px] bg-gradient-to-r from-secondary via-secondary/60 to-transparent flex-shrink-0" />

              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center text-background/40 hover:text-secondary transition-colors duration-300 focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="px-8 pt-10 pb-8 border-b border-background/8">
                <p className="font-heading text-lg font-semibold text-background tracking-wide">Funto Oluyori</p>
                <p className="font-body text-[9px] tracking-[0.28em] uppercase text-secondary mt-0.5">Real Estate</p>
              </div>

              <div className="flex flex-col px-8 py-8 gap-1 flex-1">
                {navLinks.map(({ label, to }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Link
                      to={to}
                      className={`group flex items-center gap-0 hover:gap-3 py-3 font-heading text-xl font-medium transition-all duration-300 border-b border-background/5 ${
                        location.pathname === to
                          ? 'text-secondary'
                          : 'text-background/70 hover:text-secondary'
                      }`}
                    >
                      <span className="block w-0 group-hover:w-2 h-px bg-secondary transition-all duration-300 flex-shrink-0" />
                      {label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.48 }}
                  className="mt-6 flex flex-col gap-3"
                >
                  <Link
                    to="/contact"
                    className="block w-full text-center px-6 py-3.5 bg-secondary text-white font-body text-sm font-medium tracking-wide hover:bg-secondary/90 transition-all duration-300 min-h-[44px]"
                  >
                    Let's Connect
                  </Link>
                  <Link
                    to="/testimonials#review"
                    className="flex items-center justify-center gap-2 w-full text-center px-6 py-3 border border-secondary/40 text-secondary font-body text-sm tracking-wide hover:border-secondary hover:bg-secondary/10 transition-all duration-300 min-h-[44px]"
                  >
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Leave a Review
                  </Link>
                </motion.div>
              </div>

              <div className="px-8 py-6 border-t border-background/8 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-body text-[9px] tracking-[0.25em] uppercase text-secondary mb-1">Direct</p>
                    <a href="tel:+19808004892" className="font-body text-sm text-background/55 hover:text-secondary transition-colors">
                      (980) 800-4892
                    </a>
                  </div>
                </div>
                <p className="font-body text-[9px] text-background/22 tracking-widest uppercase">
                  Licensed Realtor · State of Maryland
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

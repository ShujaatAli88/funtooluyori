import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Listings', to: '/listings' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
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

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Determine navbar appearance based on scroll position
  const isScrolled = scrollY > 40
  const isHomePage = location.pathname === '/'

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-accent/40 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-24 sm:h-28">
          {/* Logo */}
          <Link to="/" className="flex items-center leading-none group h-full">
            <img
              src="/new_logo_funto.png"
              alt="Funto Oluyori Real Estate Logo"
              className="h-24 sm:h-28 w-auto object-contain group-hover:scale-[1.03] transition-transform duration-300"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`font-body text-sm tracking-wide transition-colors duration-300 relative group ${
                  location.pathname === to
                    ? 'text-secondary'
                    : isScrolled
                    ? 'text-primary hover:text-secondary'
                    : 'text-primary hover:text-secondary'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-secondary transition-all duration-300 ${
                    location.pathname === to ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-2 px-5 py-2.5 bg-secondary text-white font-body text-sm font-medium tracking-wide rounded-sm hover:bg-secondary/90 hover:shadow-md transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 min-h-[44px] flex items-center"
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
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-px bg-primary origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px bg-primary"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-px bg-primary origin-center"
            />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-primary/40 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-background shadow-2xl flex flex-col pt-20 pb-10 px-8 md:hidden"
            >
              <div className="flex flex-col gap-6 mt-4">
                {navLinks.map(({ label, to }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1 }}
                  >
                    <Link
                      to={to}
                      className={`font-heading text-2xl font-medium transition-colors duration-300 block ${
                        location.pathname === to ? 'text-secondary' : 'text-primary hover:text-secondary'
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                  className="mt-4"
                >
                  <Link
                    to="/contact"
                    className="block w-full text-center px-6 py-3.5 bg-secondary text-white font-body font-medium tracking-wide rounded-sm hover:bg-secondary/90 transition-all duration-300 min-h-[44px]"
                  >
                    Let's Connect
                  </Link>
                </motion.div>
              </div>
              <div className="mt-auto">
                <p className="font-body text-xs text-primary/40 tracking-widest uppercase">
                  Licensed Realtor · Upper Marlboro, MD
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

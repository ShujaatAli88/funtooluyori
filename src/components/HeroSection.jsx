import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DURATION = 6 // seconds per slide

// All IDs confirmed working from this project — maximum quality params
const slides = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2560&q=95',
    alt: 'Contemporary luxury home exterior',
    caption: 'Luxury Exteriors',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2560&q=95',
    alt: 'Grand luxury estate',
    caption: 'Grand Estates',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2560&q=95',
    alt: 'Premium home architecture',
    caption: 'Fine Architecture',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2560&q=95',
    alt: 'Stunning curb appeal',
    caption: 'Premium Properties',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2560&q=95',
    alt: 'Designer open-plan living room',
    caption: 'Refined Interiors',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=2560&q=95',
    alt: "Gourmet chef's kitchen",
    caption: 'Gourmet Kitchens',
  },
]

const pad = (n) => String(n).padStart(2, '0')

export default function HeroSection() {
  const [current, setCurrent] = useState(0)

  const goTo = (i) => setCurrent(i)
  const next = () => setCurrent((c) => (c + 1) % slides.length)
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)

  // Auto-advance
  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), DURATION * 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      className="relative flex flex-col justify-end sm:justify-start overflow-hidden bg-primary"
      style={{ height: '100svh', minHeight: '100vh' }}
    >

      {/* ─── Background images with Ken Burns zoom ─── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={slides[current].id}
            src={slides[current].src}
            alt={slides[current].alt}
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Left-heavy gradient — keeps right side vibrant and visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/55 lg:via-primary/35 to-primary/10" />
        {/* Bottom gradient — mobile text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 sm:via-primary/20 to-transparent" />
        {/* Subtle top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/35 via-transparent to-transparent" />
      </div>

      {/* ─── Decorative vertical gold line (desktop only) ─── */}
      <div
        className="absolute left-12 lg:left-16 top-1/4 bottom-20 w-px bg-secondary/25 z-10 hidden md:block"
        aria-hidden="true"
      />

      {/* ─── Ghosted slide number — top right decorative ─── */}
      <div
        className="absolute top-28 sm:top-32 right-5 sm:right-10 z-10 text-right pointer-events-none select-none"
        aria-hidden="true"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="font-heading leading-none block text-white/[0.07]"
            style={{ fontSize: 'clamp(4rem, 12vw, 9rem)', fontWeight: 700 }}
          >
            {pad(current + 1)}
          </motion.span>
        </AnimatePresence>
        <span className="font-body text-[10px] tracking-[0.35em] text-white/20 uppercase">
          / {pad(slides.length)}
        </span>
      </div>

      {/* ─── Navigation arrows ─── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-secondary hover:border-secondary bg-black/10 hover:bg-black/25 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-secondary hover:border-secondary bg-black/10 hover:bg-black/25 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ─── Main editorial content ─── */}
      <div className="relative z-10 w-full px-5 sm:px-12 lg:px-20 pb-20 pt-28 sm:pt-36 sm:pb-16 max-w-7xl mx-auto">
        <div
          className="max-w-lg sm:max-w-xl lg:max-w-2xl"
          style={{ filter: 'drop-shadow(0 2px 18px rgba(0,0,0,0.65))' }}
        >

          {/* Gold label */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-3 mb-5 sm:mb-7"
          >
            
          </motion.div>

          {/* Headline — editorial split style */}
          <div className="mb-5 sm:mb-7 overflow-hidden">
            {/* Line 1 */}
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-body text-xs sm:text-sm tracking-[0.22em] uppercase text-white/45 leading-none mb-2 sm:mb-3"
              >
                Finding You
              </motion.p>
            </div>
            {/* Line 2 — the big statement */}
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-heading font-semibold text-white leading-[0.88] tracking-tight"
                style={{ fontSize: 'clamp(2.6rem, 8vw, 5.5rem)' }}
              >
                The Home
              </motion.h1>
            </div>
            {/* Line 3 — gold italic accent */}
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.52, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-accent italic text-secondary leading-tight"
                style={{ fontSize: 'clamp(2rem, 6.5vw, 4.5rem)' }}
              >
                You Deserve.
              </motion.p>
            </div>
          </div>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.78 }}
            className="font-body text-white/45 text-sm leading-relaxed mb-8 sm:mb-10 max-w-xs sm:max-w-sm"
          >
            Trusted advisor. Relentless advocate. Results you can count on.
          </motion.p>

        </div>
      </div>

      {/* ─── Scroll cue ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute left-5 sm:left-12 lg:left-20 bottom-20 sm:bottom-24 z-20 hidden sm:flex items-center gap-3"
      >
        <div className="w-px h-7 bg-secondary/45" />
        <span className="font-body text-[9px] tracking-[0.32em] uppercase text-white/28">Scroll to explore</span>
      </motion.div>

      {/* ─── Bottom bar: progress + caption + dots ─── */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Auto-progress bar — resets on slide change via key */}
        <div className="h-[2px] bg-white/8">
          <motion.div
            key={current}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: DURATION, ease: 'linear' }}
            className="h-full bg-secondary"
          />
        </div>

        {/* Caption + dots */}
        <div className="flex items-center justify-between px-5 sm:px-12 lg:px-20 py-3 sm:py-4 bg-black/20 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            <motion.span
              key={current}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.35 }}
              className="font-body text-[9px] sm:text-[10px] tracking-[0.32em] uppercase text-white/30"
            >
              {slides[current].caption}
            </motion.span>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-secondary ${
                  i === current
                    ? 'w-5 sm:w-6 h-1 sm:h-1.5 bg-secondary'
                    : 'w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/25 hover:bg-white/55'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

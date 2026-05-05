import { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import TestimonialCard from './TestimonialCard'
import { supabase } from '../lib/supabase'

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function MultiCarousel({ items }) {
  const [idx, setIdx] = useState(0)
  const trackRef = useRef(null)

  const scrollTo = useCallback((i) => {
    setIdx(i)
    const track = trackRef.current
    if (!track) return
    const card = track.children[i]
    if (card) track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' })
  }, [])

  const prev = () => scrollTo((idx - 1 + items.length) % items.length)
  const next = () => scrollTo((idx + 1) % items.length)

  // Auto-advance every 5s
  useEffect(() => {
    if (items.length < 2) return
    const id = setInterval(() => {
      setIdx(c => {
        const next = (c + 1) % items.length
        const track = trackRef.current
        const card = track?.children[next]
        if (card) track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' })
        return next
      })
    }, 5000)
    return () => clearInterval(id)
  }, [items.length])

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="font-accent italic text-background/50 text-lg leading-relaxed mb-6">
          Client reviews are on their way — be the first to share your experience.
        </p>
        <Link
          to="/testimonials#review"
          className="inline-flex items-center gap-2 font-body text-sm text-secondary hover:gap-4 transition-all duration-300 tracking-wide group"
        >
          Leave a Review
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="flex-none w-[85%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] snap-start"
          >
            <TestimonialCard testimonial={item} />
          </div>
        ))}
      </div>

      {/* Controls */}
      {items.length > 1 && (
        <div className="flex items-center justify-between mt-8">
          {/* Prev / Next arrows */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-9 h-9 rounded-full border border-background/20 text-background/40 hover:border-secondary hover:text-secondary transition-all duration-300 flex items-center justify-center focus:outline-none"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="w-9 h-9 rounded-full border border-background/20 text-background/40 hover:border-secondary hover:text-secondary transition-all duration-300 flex items-center justify-center focus:outline-none"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`rounded-full transition-all duration-300 focus:outline-none ${
                  i === idx
                    ? 'w-6 h-1.5 bg-secondary'
                    : 'w-1.5 h-1.5 bg-background/25 hover:bg-background/50'
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <p className="font-body text-[10px] tracking-[0.2em] text-background/30 tabular-nums">
            {String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </p>
        </div>
      )}
    </div>
  )
}

export default function TestimonialsSection() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReviews() {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(9)
      setItems(data || [])
      setLoading(false)
    }
    fetchReviews()
  }, [])

  return (
    <section className="py-20 sm:py-28 bg-primary">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <FadeUp className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-3">Client Stories</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-background">
              What Clients Are Saying
            </h2>
          </div>
          {items.length > 0 && (
            <div className="flex gap-5 flex-shrink-0">
              <Link
                to="/testimonials"
                className="inline-flex items-center gap-2 font-body text-sm text-secondary hover:gap-4 transition-all duration-300 tracking-wide group focus:outline-none"
              >
                All Reviews
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <span className="w-px h-4 bg-background/15 self-center hidden sm:block" />
              <Link
                to="/testimonials#review"
                className="inline-flex items-center gap-2 font-body text-sm text-background/40 hover:text-secondary transition-colors duration-300 tracking-wide focus:outline-none"
              >
                Leave a Review
              </Link>
            </div>
          )}
        </FadeUp>

        <FadeUp delay={0.1}>
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
            </div>
          ) : (
            <MultiCarousel items={items} />
          )}
        </FadeUp>

      </div>
    </section>
  )
}

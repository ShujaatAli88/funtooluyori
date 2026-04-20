import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TestimonialCard from '../components/TestimonialCard'
import { testimonials } from '../data/testimonials'
import { Link } from 'react-router-dom'

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Testimonials() {
  return (
    <main className="pt-16 sm:pt-20">
      {/* Header */}
      <section className="py-20 sm:py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-4"
          >
            Client Stories
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-semibold text-background mb-4"
          >
            What Clients Are Saying
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="font-accent italic text-accent/70 text-lg"
          >
            Real words from real people whose lives were changed.
          </motion.p>
        </div>
      </section>

      {/* Summary stats */}
      <section className="bg-background border-b border-accent/60 py-10 sm:py-12">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-3 gap-6 sm:gap-10 text-center">
            {[
              { value: '5.0', label: 'Average Rating' },
              { value: '14+', label: 'Happy Clients' },
              { value: '100%', label: 'Would Refer Funto' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-heading text-3xl sm:text-4xl font-semibold text-secondary">{value}</p>
                <p className="font-body text-xs tracking-[0.15em] uppercase text-primary/40 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-2 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
            {testimonials.map((t, i) => (
              <FadeUp key={t.id} delay={Math.min(i * 0.07, 0.4)} className="break-inside-avoid">
                <TestimonialCard testimonial={t} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-secondary/10 text-center border-t border-secondary/20">
        <FadeUp>
          <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-3">Your Turn</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-primary mb-4">
            Ready to Write Your Own Success Story?
          </h2>
          <p className="font-body text-sm text-primary/55 mb-8 max-w-sm mx-auto leading-relaxed">
            Join hundreds of satisfied clients who trusted Funto with one of the biggest decisions of their lives.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-secondary text-white font-body text-sm font-medium tracking-wide hover:bg-secondary/90 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            Let's Get Started
          </Link>
        </FadeUp>
      </section>
    </main>
  )
}

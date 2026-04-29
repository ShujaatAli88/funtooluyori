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

      {/* Placeholder — reviews coming soon */}
      <section className="py-20 sm:py-28 bg-background">
        <FadeUp>
          <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-primary mb-4">
              Client Reviews Coming Soon
            </h2>
            <p className="font-body text-primary/55 leading-relaxed mb-6">
              Check back here soon, or visit our Google Business profile to see the latest client feedback.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Funto+Oluyori+Keller+Williams+Upper+Marlboro"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-body text-sm font-medium tracking-wide hover:bg-secondary/90 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              Visit Google Business Profile
            </a>
          </div>
        </FadeUp>
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

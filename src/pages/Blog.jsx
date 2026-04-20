import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Blog() {
  return (
    <main className="pt-16 sm:pt-20">
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeUp>
            <div className="text-center mb-14">
              <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-3">Blog</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-primary mb-3">Current Market Snapshot</h2>
              <p className="font-body text-sm text-primary/40 max-w-md mx-auto">Upper Marlboro, MD · Data as of Q2 2025 · Source: Keller Williams REALTORS® Realty</p>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <FadeUp delay={0.1}>
              <div className="text-center p-8 bg-accent/20 border border-accent/60">
                <p className="font-body text-xs tracking-[0.15em] uppercase text-primary/40 mb-3">Median Home Price</p>
                <p className="font-heading text-3xl sm:text-4xl font-semibold text-primary mb-2">$585,000</p>
                <span className="inline-flex items-center gap-1 font-body text-xs font-medium text-emerald-600">↑ +4.2% YoY</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="text-center p-8 bg-accent/20 border border-accent/60">
                <p className="font-body text-xs tracking-[0.15em] uppercase text-primary/40 mb-3">Avg. Days on Market</p>
                <p className="font-heading text-3xl sm:text-4xl font-semibold text-primary mb-2">18 Days</p>
                <span className="inline-flex items-center gap-1 font-body text-xs font-medium text-rose-500">↓ -3 days YoY</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="text-center p-8 bg-accent/20 border border-accent/60">
                <p className="font-body text-xs tracking-[0.15em] uppercase text-primary/40 mb-3">List-to-Sale Ratio</p>
                <p className="font-heading text-3xl sm:text-4xl font-semibold text-primary mb-2">101.3%</p>
                <span className="inline-flex items-center gap-1 font-body text-xs font-medium text-emerald-600">↑ +0.8% YoY</span>
              </div>
            </FadeUp>
          </div>
          <FadeUp delay={0.4}>
            <div className="text-center mt-12">
              <Link
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-body text-sm font-medium tracking-wide hover:bg-secondary/90 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                to="/contact"
              >
                Get a Free Home Valuation
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  )
}

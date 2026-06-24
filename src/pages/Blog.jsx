import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { blogPosts } from '../data/blogPosts'

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.68, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >{children}</motion.div>
  )
}

const TYPE = {
  Buyer:              { pill: 'bg-sky-500/15 text-sky-300 border-sky-500/30',       dot: 'bg-sky-400' },
  Seller:             { pill: 'bg-amber-500/15 text-amber-300 border-amber-500/30',  dot: 'bg-amber-400' },
  Investor:           { pill: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', dot: 'bg-emerald-400' },
  'New Construction': { pill: 'bg-purple-500/15 text-purple-300 border-purple-500/30', dot: 'bg-purple-400' },
  'Seller & Buyer':   { pill: 'bg-orange-500/15 text-orange-300 border-orange-500/30', dot: 'bg-orange-400' },
}

const ALL_FILTERS = ['All', 'Buyer', 'Seller', 'Investor', 'New Construction', 'Seller & Buyer']

function FilterTabs({ active, onChange }) {
  const btnRefs = useRef({})
  const containerRef = useRef(null)
  const [ind, setInd] = useState({ left: 0, width: 0, opacity: 0 })

  useEffect(() => {
    const btn = btnRefs.current[active]
    const container = containerRef.current
    if (!btn || !container) return
    const cr = container.getBoundingClientRect()
    const br = btn.getBoundingClientRect()
    setInd({ left: br.left - cr.left, width: br.width, opacity: 1 })
  }, [active])

  return (
    <div className="overflow-x-auto">
      <div ref={containerRef} className="relative inline-flex bg-white/[0.05] border border-white/[0.08] p-1">
        <motion.div
          className="absolute top-1 bottom-1 bg-secondary pointer-events-none"
          animate={{ left: ind.left, width: ind.width, opacity: ind.opacity }}
          transition={{ type: 'spring', stiffness: 520, damping: 42 }}
        />
        {ALL_FILTERS.map(f => (
          <button
            key={f}
            ref={el => btnRefs.current[f] = el}
            onClick={() => onChange(f)}
            className={[
              'relative z-10 px-4 py-2 font-body text-[11px] tracking-[0.14em] uppercase whitespace-nowrap transition-colors duration-150',
              active === f ? 'text-white' : 'text-white/38 hover:text-white/70',
            ].join(' ')}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Full-bleed image card ── */
function StoryCard({ post, index, tall = false }) {
  const { slug, title, client, clientType, date, readTime, image, excerpt } = post
  const t = TYPE[clientType] ?? { pill: 'bg-white/10 text-white/70 border-white/20', dot: 'bg-secondary' }

  return (
    <FadeUp delay={index * 0.06}>
      <Link
        to={`/blog/${slug}`}
        className={[
          'group relative block overflow-hidden',
          tall ? 'h-full min-h-[380px]' : 'aspect-[4/5]',
        ].join(' ')}
      >
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Permanent gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/0" />

        {/* Hover colour wash */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />

        {/* Top-right arrow button */}
        <div className="absolute top-4 right-4 w-9 h-9 border border-white/0 group-hover:border-secondary/60 bg-transparent group-hover:bg-secondary/10 flex items-center justify-center transition-all duration-400">
          <svg
            className="w-4 h-4 text-white/0 group-hover:text-secondary transition-colors duration-300"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 border text-[9px] font-body font-bold tracking-[0.2em] uppercase mb-3 ${t.pill}`}>
            <span className={`w-1 h-1 rounded-full ${t.dot}`} />
            {clientType}
          </span>

          <h3 className="font-heading text-lg sm:text-xl font-semibold text-white leading-snug mb-2 group-hover:text-secondary transition-colors duration-300">
            {title}
          </h3>

          {/* Excerpt: slides up on hover */}
          <p
            className="font-body text-sm text-white/0 group-hover:text-white/65 line-clamp-2 mb-3 transition-colors duration-400"
            style={{ display: 'none' }}
          />

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-secondary/25 border border-secondary/40 flex items-center justify-center">
                <span className="font-heading text-[8px] font-bold text-secondary">
                  {client.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="font-body text-xs text-white/48">{client}</span>
            </div>
            <span className="font-body text-[10px] text-white/30">{readTime}</span>
          </div>
        </div>

        {/* Gold sweep line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
      </Link>
    </FadeUp>
  )
}

/* ── Featured editorial card ── */
function FeaturedCard({ post }) {
  const { slug, title, client, clientType, city, date, readTime, image, excerpt } = post
  const t = TYPE[clientType] ?? { pill: 'bg-white/10 text-white/70 border-white/20', dot: 'bg-secondary' }

  return (
    <FadeUp>
      <Link
        to={`/blog/${slug}`}
        className="group grid grid-cols-1 lg:grid-cols-[1fr_1fr] min-h-[460px] border border-white/[0.07] hover:border-secondary/30 hover:shadow-[0_20px_70px_-15px_rgba(184,150,12,0.2)] transition-all duration-700 overflow-hidden"
      >
        {/* Dark content panel */}
        <div className="relative flex flex-col justify-between bg-[#111] px-10 py-12 sm:px-14 sm:py-14 order-2 lg:order-1 overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-secondary/[0.04] pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-secondary/20 to-transparent" />

          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-body text-[10px] tracking-[0.35em] uppercase text-secondary">Featured Story</span>
              <span className="h-px flex-1 max-w-[40px] bg-white/[0.08]" />
              <span className="font-body text-[10px] text-white/22">{date}</span>
            </div>

            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 border text-[9px] font-body font-bold tracking-[0.2em] uppercase mb-6 ${t.pill}`}>
              <span className={`w-1 h-1 rounded-full ${t.dot}`} />
              {clientType}
            </span>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[2rem] font-semibold text-white leading-[1.15] mb-5 group-hover:text-secondary transition-colors duration-500">
              {title}
            </h2>
            <p className="font-body text-sm text-white/40 leading-relaxed line-clamp-3">
              {excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/[0.07] relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-secondary/15 border border-secondary/30 flex items-center justify-center">
                <span className="font-heading text-[10px] font-bold text-secondary">
                  {client.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-body text-xs font-semibold text-white/80 leading-tight">{client}</p>
                <p className="font-body text-[10px] text-white/28">{city} · {readTime}</p>
              </div>
            </div>
            <span className="font-body text-xs text-secondary flex items-center gap-2 group-hover:gap-3.5 transition-all duration-300">
              Read Story
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>

        {/* Image panel */}
        <div className="relative aspect-[16/10] lg:aspect-auto order-1 lg:order-2 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111]/50 via-transparent to-transparent lg:from-[#111]/30" />
        </div>
      </Link>
    </FadeUp>
  )
}

const marketStats = [
  { label: 'Median Home Price', value: '$585K', change: '+4.2%', trend: 'up' },
  { label: 'Avg. Days on Market', value: '18 Days', change: '-3 days', trend: 'down' },
  { label: 'List-to-Sale Ratio', value: '101.3%', change: '+0.8%', trend: 'up' },
]

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.clientType === activeFilter)

  const featured = activeFilter === 'All' ? filtered[0] : null
  const gridPosts = activeFilter === 'All' ? filtered.slice(1) : filtered

  return (
    <main className="pt-16 sm:pt-20 bg-[#0E0E0E]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#0E0E0E]">
        {/* Featured post image as blurred texture */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: `url(${blogPosts[0].image})`,
            filter: 'blur(24px)',
            opacity: 0.06,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E0E]/20 via-[#0E0E0E]/70 to-[#0E0E0E]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'radial-gradient(circle, #B8960C 1px, transparent 1px)', backgroundSize: '22px 22px' }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-24 sm:pt-36 pb-20 sm:pb-28">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.88, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-2xl"
            >
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-secondary mb-6">
                Keller Williams · Maryland · Client Stories
              </p>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-[5.5rem] font-semibold text-white leading-[0.88] mb-6">
                Real Clients.<br />
                <em className="text-secondary not-italic">Real Results.</em>
              </h1>
              <p className="font-body text-sm sm:text-[15px] text-white/35 leading-relaxed max-w-md">
                Every property tells a story. Explore how Funto has guided buyers, sellers, and investors across Maryland.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.88, delay: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-row lg:flex-col gap-8 lg:gap-5 lg:text-right flex-shrink-0"
            >
              {[
                { value: blogPosts.length + '+', label: 'Success Stories' },
                { value: '5',    label: 'MD Counties'   },
                { value: '100%', label: 'Satisfaction'  },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-heading text-3xl sm:text-4xl font-semibold text-white leading-none mb-1">{value}</p>
                  <p className="font-body text-[10px] tracking-[0.22em] uppercase text-white/24">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stories ── */}
      <section className="bg-[#0E0E0E] pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          {/* Filter + count row */}
          <FadeUp className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 mb-10 border-t border-white/[0.07]">
            <FilterTabs active={activeFilter} onChange={setActiveFilter} />
            <p className="font-body text-[11px] text-white/25 tracking-wide">
              {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
            </p>
          </FadeUp>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
            >

              {/* Featured */}
              {featured && (
                <div className="mb-5 sm:mb-6">
                  <FeaturedCard post={featured} />
                </div>
              )}

              {/* Asymmetric row 1: 2 equal cards */}
              {gridPosts.length > 0 && (
                <div className="space-y-4 sm:space-y-5">
                  {gridPosts.length >= 2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {gridPosts.slice(0, 2).map((p, i) => (
                        <StoryCard key={p.id} post={p} index={i} />
                      ))}
                    </div>
                  )}
                  {gridPosts.length === 1 && (
                    <StoryCard post={gridPosts[0]} index={0} />
                  )}

                  {/* Remaining 3-col */}
                  {gridPosts.length > 2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                      {gridPosts.slice(2).map((p, i) => (
                        <StoryCard key={p.id} post={p} index={i + 2} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {filtered.length === 0 && (
                <div className="text-center py-24">
                  <p className="font-body text-sm text-white/22">No stories match this filter yet.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Market Snapshot ── */}
      <section className="bg-[#0a0a0a] border-t border-white/[0.06] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
              <div>
                <p className="font-body text-[10px] tracking-[0.32em] uppercase text-secondary mb-3">Market Pulse</p>
                <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-white">
                  Maryland Market<br />Snapshot
                </h2>
              </div>
              <p className="font-body text-[10px] tracking-[0.18em] uppercase text-white/16">Q2 2025 · Keller Williams</p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
            {marketStats.map(({ label, value, change, trend }, i) => (
              <FadeUp key={label} delay={i * 0.1}>
                <div className="py-10 sm:px-10 first:pl-0 last:pr-0 group hover:bg-white/[0.015] transition-colors duration-300">
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-white/24 mb-5">{label}</p>
                  <p className="font-heading text-5xl sm:text-[3.5rem] font-semibold text-white leading-none mb-4">{value}</p>
                  <span className={`inline-flex items-center gap-1.5 font-body text-xs font-medium ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${trend === 'up' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                    {change} YoY
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.25}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-12 pt-12 border-t border-white/[0.06]">
              <p className="font-body text-sm text-white/32 max-w-sm leading-relaxed">
                Get a personalized market analysis for your property, at no cost.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-secondary text-white font-body text-sm font-medium tracking-wide hover:bg-secondary/90 hover:shadow-[0_8px_35px_rgba(184,150,12,0.38)] transition-all duration-300 whitespace-nowrap"
              >
                Free Home Valuation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

    </main>
  )
}

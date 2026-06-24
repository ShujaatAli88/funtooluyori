import { useRef } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'
import { blogPosts } from '../data/blogPosts'

/* ── Reading progress bar ── */
function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 })
  return (
    <motion.div
      className="fixed top-16 sm:top-20 left-0 right-0 h-[2px] bg-secondary origin-left z-[200] pointer-events-none"
      style={{ scaleX }}
    />
  )
}

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >{children}</motion.div>
  )
}

const typeStyles = {
  Buyer:              { pill: 'bg-sky-50 text-sky-700 border-sky-200',       dot: 'bg-sky-500' },
  Seller:             { pill: 'bg-amber-50 text-amber-700 border-amber-200',  dot: 'bg-amber-500' },
  Investor:           { pill: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  'New Construction': { pill: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
  'Seller & Buyer':   { pill: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
}

const tagStyles = {
  Buyer:                    'bg-sky-50 text-sky-700 border-sky-200',
  Seller:                   'bg-amber-50 text-amber-700 border-amber-200',
  Investor:                 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'New Construction':       'bg-purple-50 text-purple-700 border-purple-200',
  'Seller & Buyer':         'bg-orange-50 text-orange-700 border-orange-200',
  'First-Time Buyer':       'bg-teal-50 text-teal-700 border-teal-200',
  'Baltimore City':         'bg-rose-50 text-rose-700 border-rose-200',
  Rowhouse:                 'bg-stone-100 text-stone-700 border-stone-300',
  Townhouse:                'bg-stone-100 text-stone-700 border-stone-300',
  Condo:                    'bg-indigo-50 text-indigo-700 border-indigo-200',
  "Prince George's County": 'bg-sky-50 text-sky-700 border-sky-200',
  'Montgomery County':      'bg-green-50 text-green-700 border-green-200',
  'Baltimore County':       'bg-blue-50 text-blue-700 border-blue-200',
  'Howard County':          'bg-violet-50 text-violet-700 border-violet-200',
  'Anne Arundel County':    'bg-cyan-50 text-cyan-700 border-cyan-200',
  Investment:               'bg-emerald-50 text-emerald-700 border-emerald-200',
}

function TagPill({ label }) {
  const style = tagStyles[label] ?? 'bg-accent/60 text-primary border-accent'
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 border text-[10px] font-body font-semibold tracking-[0.15em] uppercase ${style}`}>
      {label}
    </span>
  )
}

/* ── Split-screen hero — image on left, NO scale transform ── */
function SplitHero({ image, title, client, clientType, address, city, county, date, readTime }) {
  const { scrollY } = useScroll()
  // Gentle parallax: translate only, never scale — stays crisp
  const imgY = useTransform(scrollY, [0, 700], [0, 55])
  const t = typeStyles[clientType] ?? { pill: 'bg-white/10 text-white/70 border-white/20', dot: 'bg-secondary' }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr]" style={{ minHeight: '68vh' }}>

      {/* Image half */}
      <div className="relative h-[48vw] max-h-[68vh] lg:h-auto overflow-hidden order-1">
        <motion.img
          src={image}
          alt={title}
          className="absolute w-full object-cover"
          style={{ y: imgY, top: '-4%', height: '108%' }}
        />
        {/* Subtle right-edge fade into dark panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0E0E0E]/30 hidden lg:block" />
      </div>

      {/* Dark content half */}
      <div className="relative bg-[#0E0E0E] flex flex-col justify-end px-10 py-12 sm:px-14 sm:py-16 order-2 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-secondary/[0.04] pointer-events-none" />
        <div className="absolute bottom-10 -left-10 w-32 h-32 rounded-full bg-secondary/[0.03] pointer-events-none" />
        {/* Top gold line (mobile) / left gold line (desktop) */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent lg:hidden" />
        <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-secondary/20 to-transparent hidden lg:block" />

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-body text-[10px] text-white/25 mb-8 tracking-wide">
            <Link to="/" className="hover:text-secondary transition-colors duration-200">Home</Link>
            <span className="text-white/15">/</span>
            <Link to="/blog" className="hover:text-secondary transition-colors duration-200">Stories</Link>
            <span className="text-white/15">/</span>
            <span className="text-white/45 truncate max-w-[140px]">{client}</span>
          </nav>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 border text-[9px] font-body font-bold tracking-[0.2em] uppercase ${t.pill}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
              {clientType}
            </span>
            <span className="font-body text-[11px] text-white/32">{date}</span>
            <span className="text-white/15">·</span>
            <span className="font-body text-[11px] text-white/32">{readTime}</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-white leading-[1.1] mb-6">
            {title}
          </h1>

          <p className="font-body text-xs text-white/30 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 flex-shrink-0 text-secondary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {address}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return <Navigate to="/blog" replace />

  const { title, client, clientType, address, city, county, date, readTime, image, tags, highlights, quote, body } = post
  const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <>
      <ReadingProgress />
      <main className="pt-16 sm:pt-20">

        <SplitHero
          image={image} title={title} client={client}
          clientType={clientType} address={address} city={city}
          county={county} date={date} readTime={readTime}
        />

        {/* ── Article body ── */}
        <div className="bg-[#FAF8F5]">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_288px] gap-14 lg:gap-16 xl:gap-20">

              {/* ── Article ── */}
              <article>

                {/* Tags */}
                <FadeUp>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {tags.map(tag => <TagPill key={tag} label={tag} />)}
                  </div>
                </FadeUp>

                {/* Client bar */}
                <FadeUp delay={0.05}>
                  <div className="flex items-center gap-4 py-5 mb-10 border-y border-[#E8DDD0]">
                    <div className="w-11 h-11 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                      <span className="font-heading text-sm font-bold text-secondary">
                        {client.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-semibold text-[#1C1C1C] leading-tight">{client}</p>
                      <p className="font-body text-xs text-[#1C1C1C]/42 mt-0.5">{city} · {county}</p>
                    </div>
                    <Link to="/blog" className="hidden sm:flex items-center gap-1.5 font-body text-[11px] text-[#1C1C1C]/30 hover:text-secondary transition-colors duration-200 flex-shrink-0">
                      <svg className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      All Stories
                    </Link>
                  </div>
                </FadeUp>

                {/* Body sections with numbered headings */}
                {body.map((section, i) => (
                  <FadeUp key={section.heading} delay={i * 0.05}>
                    <div className={`mb-12 ${i > 0 ? 'pt-10 border-t border-[#E8DDD0]/70' : ''}`}>
                      <div className="flex items-start gap-5 mb-4">
                        <span className="font-body text-[11px] font-semibold text-secondary/55 tracking-[0.22em] mt-[0.45em] flex-shrink-0 select-none">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#1C1C1C] leading-snug">
                          {section.heading}
                        </h2>
                      </div>
                      <p className="font-body text-[15.5px] text-[#1C1C1C]/70 leading-[1.9] pl-10">
                        {section.text}
                      </p>
                    </div>
                  </FadeUp>
                ))}

                {/* Divider */}
                <FadeUp>
                  <div className="flex items-center gap-3 my-12">
                    <div className="flex-1 h-px bg-gradient-to-r from-secondary/25 to-transparent" />
                    <div className="w-2 h-2 rounded-full border-2 border-secondary/45" />
                    <div className="flex-1 h-px bg-gradient-to-l from-secondary/25 to-transparent" />
                  </div>
                </FadeUp>

                {/* Quote */}
                <FadeUp>
                  <blockquote className="relative pl-8 pr-6 py-10 border-l-[3px] border-secondary bg-[#E8DDD0]/30 mb-12">
                    <div className="absolute -top-3 left-5 font-heading text-[86px] leading-none text-secondary/14 select-none pointer-events-none">
                      "
                    </div>
                    <p className="font-accent italic text-xl sm:text-[1.4rem] text-[#1C1C1C]/85 leading-relaxed relative z-10 mb-5">
                      "{quote}"
                    </p>
                    <footer className="flex items-center gap-3 relative z-10">
                      <div className="w-8 h-8 rounded-full bg-secondary/12 border border-secondary/30 flex items-center justify-center">
                        <span className="font-heading text-[10px] font-bold text-secondary">
                          {client.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-body text-sm font-semibold text-[#1C1C1C] leading-tight">{client}</p>
                        <p className="font-body text-xs text-[#1C1C1C]/40">{city} · {clientType}</p>
                      </div>
                    </footer>
                  </blockquote>
                </FadeUp>

                {/* CTA block */}
                <FadeUp>
                  <div className="relative bg-[#0E0E0E] p-8 sm:p-10 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
                    <div className="absolute -bottom-14 -right-14 w-52 h-52 rounded-full bg-secondary/[0.05] pointer-events-none" />
                    <div className="absolute -top-10 -left-10 w-36 h-36 rounded-full bg-secondary/[0.03] pointer-events-none" />

                    <p className="font-body text-[10px] tracking-[0.32em] uppercase text-secondary mb-3">Ready to Write Your Story?</p>
                    <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-white mb-3">
                      Let's Make Your Next Move a Success
                    </h3>
                    <p className="font-body text-sm text-white/38 max-w-md mb-7 leading-relaxed">
                      Whether buying, selling, or investing in Maryland real estate, Funto brings the expertise and market knowledge to get you there.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 relative z-10">
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-secondary text-white font-body text-sm font-medium tracking-wide hover:bg-secondary/90 hover:shadow-[0_8px_25px_rgba(184,150,12,0.4)] transition-all duration-300"
                      >
                        Contact Funto
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                      <Link
                        to="/blog"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/15 text-white/70 font-body text-sm font-medium hover:bg-white/5 hover:text-white transition-all duration-300"
                      >
                        More Stories
                      </Link>
                    </div>
                  </div>
                </FadeUp>

              </article>

              {/* ── Sidebar ── */}
              <aside>
                <div className="sticky top-28 space-y-8">

                  {/* Transaction details card */}
                  <FadeUp delay={0.12}>
                    <div className="border border-[#E8DDD0] overflow-hidden">
                      <div className="bg-[#0E0E0E] px-6 py-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
                        <p className="font-body text-[10px] tracking-[0.25em] uppercase text-secondary/70 mb-1">Transaction Details</p>
                        <p className="font-heading text-xl font-semibold text-white leading-tight">{city}</p>
                        <p className="font-body text-[11px] text-white/28 mt-0.5">{county}</p>
                      </div>
                      <div className="divide-y divide-[#E8DDD0]/60 bg-[#FAF8F5]">
                        {highlights.map(({ label, value }) => (
                          <div key={label} className="px-6 py-3.5 flex items-start justify-between gap-4">
                            <p className="font-body text-[10px] tracking-[0.13em] uppercase text-[#1C1C1C]/36 mt-px flex-shrink-0">{label}</p>
                            <p className="font-body text-sm font-medium text-[#1C1C1C] text-right leading-snug">{value}</p>
                          </div>
                        ))}
                      </div>
                      <div className="px-5 py-4 bg-[#E8DDD0]/30">
                        <Link
                          to="/contact"
                          className="block w-full text-center py-3 bg-secondary text-white font-body text-sm font-medium tracking-wide hover:bg-secondary/90 hover:shadow-[0_6px_20px_rgba(184,150,12,0.3)] transition-all duration-300"
                        >
                          Start Your Journey
                        </Link>
                      </div>
                    </div>
                  </FadeUp>

                  {/* More stories */}
                  {otherPosts.length > 0 && (
                    <FadeUp delay={0.18}>
                      <div>
                        <p className="font-body text-[10px] tracking-[0.28em] uppercase text-[#1C1C1C]/28 mb-5 pb-4 border-b border-[#E8DDD0]">
                          More Stories
                        </p>
                        <div className="space-y-5">
                          {otherPosts.map(p => (
                            <Link
                              key={p.slug}
                              to={`/blog/${p.slug}`}
                              className="group flex gap-3.5 items-start"
                            >
                              <div className="w-[68px] h-[52px] flex-shrink-0 overflow-hidden border border-[#E8DDD0]">
                                <img
                                  src={p.image}
                                  alt={p.client}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-body text-[10px] tracking-[0.15em] uppercase text-secondary mb-0.5">{p.clientType}</p>
                                <p className="font-body text-xs font-medium text-[#1C1C1C] leading-snug line-clamp-2 group-hover:text-secondary transition-colors duration-200">
                                  {p.title}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <Link
                          to="/blog"
                          className="inline-flex items-center gap-1.5 mt-6 font-body text-[11px] font-medium text-secondary tracking-wide hover:gap-3 transition-all duration-200"
                        >
                          View all stories
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </FadeUp>
                  )}

                </div>
              </aside>

            </div>
          </div>
        </div>

      </main>
    </>
  )
}

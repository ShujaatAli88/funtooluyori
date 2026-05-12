import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const StarPath = 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'

const typeMeta = {
  Buyer:    { color: 'text-sky-300',     bg: 'bg-sky-400/10',     border: 'border-sky-400/20' },
  Seller:   { color: 'text-amber-300',   bg: 'bg-amber-400/10',   border: 'border-amber-400/20' },
  Investor: { color: 'text-emerald-300', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
  Renter:   { color: 'text-violet-300',  bg: 'bg-violet-400/10',  border: 'border-violet-400/20' },
}

function Stars({ count, size = 'sm' }) {
  const sz = size === 'lg' ? 'w-5 h-5' : 'w-[15px] h-[15px]'
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <svg key={s} viewBox="0 0 20 20" className={`${sz} ${s <= count ? 'fill-secondary' : 'fill-white/12'}`}>
          <path d={StarPath} />
        </svg>
      ))}
    </div>
  )
}

// large=true  → single spotlight card (Testimonials page)
// large=false → compact grid card (homepage carousel)
export default function TestimonialCard({ testimonial, large = false, onModalChange }) {
  const { name, city, type, stars, quote } = testimonial
  const [modalOpen, setModalOpen] = useState(false)

  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const primaryType = type ? type.split(' & ')[0] : ''
  const meta = typeMeta[primaryType] ?? { color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20' }

  const charLimit  = large ? 280 : 160
  const lineClamp  = large ? 'line-clamp-5' : 'line-clamp-4'
  const isLong     = quote.length > charLimit

  const openModal  = () => { setModalOpen(true);  onModalChange?.(true)  }
  const closeModal = () => { setModalOpen(false); onModalChange?.(false) }

  return (
    <>
      {/* ── Card ── */}
      <article
        onClick={openModal}
        className={[
          'group relative flex flex-col overflow-hidden cursor-pointer',
          large ? 'h-[420px]' : 'h-[300px]',
          'bg-gradient-to-br from-white/[0.08] to-white/[0.02]',
          'backdrop-blur-md',
          'border border-white/[0.08]',
          'hover:border-secondary/40',
          'hover:bg-white/[0.11]',
          large ? 'hover:-translate-y-1' : 'hover:-translate-y-2',
          'hover:shadow-[0_30px_70px_rgba(0,0,0,0.5),0_0_0_1px_rgba(184,150,12,0.15)]',
          'transition-all duration-500 ease-out',
        ].join(' ')}
      >
        {/* Top shimmer */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/80 to-transparent" />

        {/* Hover gold overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
          bg-gradient-to-br from-secondary/[0.04] via-transparent to-transparent pointer-events-none" />

        {/* Watermark */}
        <div className={[
          'absolute -top-2 right-3 font-heading leading-none text-secondary/[0.07]',
          'select-none pointer-events-none group-hover:text-secondary/[0.12] transition-colors duration-500',
          large ? 'text-[160px]' : 'text-[110px]',
        ].join(' ')}>"</div>

        {/* Body */}
        <div className={`relative flex flex-col flex-1 gap-4 overflow-hidden ${large ? 'p-8' : 'p-6'}`}>

          {/* Stars */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <Stars count={stars} size={large ? 'lg' : 'sm'} />
            <span className={`font-body font-semibold tracking-[0.28em] uppercase text-secondary/60 ${large ? 'text-[11px]' : 'text-[9px]'}`}>
              {['','Poor','Fair','Good','Great','Excellent'][stars]}
            </span>
          </div>

          {/* Quote — clamped */}
          <div className="relative flex-1 overflow-hidden">
            <p className={[
              'font-accent italic text-background/75 leading-relaxed',
              lineClamp,
              'group-hover:text-background/90 transition-colors duration-300',
              large ? 'text-[1.2rem]' : 'text-[1.02rem]',
            ].join(' ')}>
              {quote}
            </p>

            {/* Fade + hint for long quotes */}
            {isLong && (
              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#141414] to-transparent
                flex items-end ${large ? 'h-14 pb-1.5' : 'h-10 pb-1'}`}>
                <span className={`font-body tracking-[0.2em] uppercase text-secondary/60 group-hover:text-secondary transition-colors duration-200 ${large ? 'text-[11px]' : 'text-[10px]'}`}>
                  tap to read more ↗
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`flex-shrink-0 border-t border-white/[0.06] bg-black/25 flex items-center gap-3
          ${large ? 'px-8 py-5' : 'px-6 py-3.5'}`}>
          <div className={`rounded-full flex-shrink-0
            bg-gradient-to-br from-secondary/30 to-secondary/10
            border border-secondary/30
            flex items-center justify-center
            shadow-[0_0_12px_rgba(184,150,12,0.2)]
            ${large ? 'w-12 h-12' : 'w-8 h-8'}`}>
            <span className={`font-heading font-bold text-secondary ${large ? 'text-sm' : 'text-[11px]'}`}>{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-body font-semibold text-background/90 leading-tight truncate ${large ? 'text-base' : 'text-[13px]'}`}>{name}</p>
            <p className={`font-body text-background/35 leading-tight truncate mt-0.5 ${large ? 'text-sm' : 'text-[11px]'}`}>{city}</p>
          </div>
          <span className={`flex-shrink-0 font-body font-bold tracking-[0.22em] uppercase
            border ${meta.bg} ${meta.color} ${meta.border}
            ${large ? 'text-[10px] px-3 py-1.5' : 'text-[8px] px-2 py-1'}`}>
            {type}
          </span>
        </div>
      </article>

      {/* ── Full review modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden
                bg-gradient-to-br from-[#1C1C1C] to-[#111111]
                border border-white/[0.09]
                shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent" />
              <div className="absolute top-0 left-4 font-heading text-[160px] leading-none
                text-secondary/[0.05] select-none pointer-events-none -translate-y-4">"</div>

              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center
                  text-white/30 hover:text-secondary border border-white/10 hover:border-secondary/40
                  transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative px-8 pt-10 pb-6">
                <div className="flex items-center gap-2.5 mb-6">
                  <Stars count={stars} size="lg" />
                  <span className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-secondary/70">
                    {['','Poor','Fair','Good','Great','Excellent'][stars]}
                  </span>
                </div>

                <blockquote className="font-accent italic text-background/85 text-lg sm:text-xl leading-relaxed mb-8">
                  "{quote}"
                </blockquote>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent mb-6" />

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex-shrink-0
                    bg-gradient-to-br from-secondary/30 to-secondary/10
                    border border-secondary/40
                    flex items-center justify-center
                    shadow-[0_0_20px_rgba(184,150,12,0.25)]">
                    <span className="font-heading text-sm font-bold text-secondary">{initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-semibold text-background leading-tight">{name}</p>
                    <p className="font-body text-sm text-background/40 mt-0.5">{city}</p>
                  </div>
                  <span className={`font-body text-[9px] font-bold tracking-[0.22em] uppercase
                    px-3 py-1.5 border ${meta.bg} ${meta.color} ${meta.border}`}>
                    {type}
                  </span>
                </div>
              </div>

              <div className="px-8 py-3 bg-black/30 border-t border-white/[0.05]">
                <p className="font-body text-[10px] text-white/20 text-center tracking-[0.15em]">
                  Click anywhere outside to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

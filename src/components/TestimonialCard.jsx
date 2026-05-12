import { useState } from 'react'

const StarPath = 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'

const typeMeta = {
  Buyer:    { color: 'text-sky-300',     bg: 'bg-sky-400/10',      border: 'border-sky-400/20' },
  Seller:   { color: 'text-amber-300',   bg: 'bg-amber-400/10',    border: 'border-amber-400/20' },
  Investor: { color: 'text-emerald-300', bg: 'bg-emerald-400/10',  border: 'border-emerald-400/20' },
  Renter:   { color: 'text-violet-300',  bg: 'bg-violet-400/10',   border: 'border-violet-400/20' },
}

const QUOTE_LIMIT = 180

export default function TestimonialCard({ testimonial }) {
  const { name, city, type, stars, quote } = testimonial
  const [expanded, setExpanded] = useState(false)

  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const primaryType = type ? type.split(' & ')[0] : ''
  const meta = typeMeta[primaryType] ?? { color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20' }

  const isLong = quote.length > QUOTE_LIMIT
  const displayQuote = expanded || !isLong ? quote : quote.slice(0, QUOTE_LIMIT).trimEnd() + '…'

  return (
    <article className="group relative flex flex-col h-full overflow-hidden
      bg-gradient-to-br from-white/[0.08] to-white/[0.02]
      backdrop-blur-md
      border border-white/[0.08]
      hover:border-secondary/40
      hover:bg-white/[0.11]
      hover:-translate-y-2
      hover:shadow-[0_30px_70px_rgba(0,0,0,0.5),0_0_0_1px_rgba(184,150,12,0.15)]
      transition-all duration-500 ease-out
    ">

      {/* Shimmer top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/80 to-transparent" />

      {/* Gold glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
        bg-gradient-to-br from-secondary/[0.04] via-transparent to-transparent pointer-events-none" />

      {/* Watermark quote mark */}
      <div className="absolute -top-2 right-3 font-heading text-[110px] leading-none text-secondary/[0.08]
        select-none pointer-events-none group-hover:text-secondary/[0.12] transition-colors duration-500">
        "
      </div>

      {/* Body */}
      <div className="relative p-6 flex flex-col flex-1 gap-4">

        {/* Stars + rating label */}
        <div className="flex items-center gap-2.5">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(s => (
              <svg key={s} viewBox="0 0 20 20" className={`w-[15px] h-[15px] transition-colors duration-200 ${s <= stars ? 'fill-secondary' : 'fill-white/12'}`}>
                <path d={StarPath} />
              </svg>
            ))}
          </div>
          <span className="font-body text-[9px] font-semibold tracking-[0.28em] uppercase text-secondary/60">
            {['','Poor','Fair','Good','Great','Excellent'][stars]}
          </span>
        </div>

        {/* Quote */}
        <div className="flex-1 flex flex-col">
          <p className="font-accent italic text-background/75 text-[1.05rem] leading-relaxed flex-1
            group-hover:text-background/90 transition-colors duration-300">
            {displayQuote}
          </p>
          {isLong && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="mt-3 self-start font-body text-[10px] tracking-[0.22em] uppercase
                text-secondary/60 hover:text-secondary transition-colors duration-200 focus:outline-none
                border-b border-secondary/25 hover:border-secondary/60 pb-px"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/[0.06] bg-black/25
        flex items-center gap-3">

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full flex-shrink-0
          bg-gradient-to-br from-secondary/30 to-secondary/10
          border border-secondary/30
          flex items-center justify-center
          shadow-[0_0_12px_rgba(184,150,12,0.2)]">
          <span className="font-heading text-xs font-bold text-secondary">{initials}</span>
        </div>

        {/* Name + city */}
        <div className="flex-1 min-w-0">
          <p className="font-body text-[13px] font-semibold text-background/90 leading-tight truncate">{name}</p>
          <p className="font-body text-[11px] text-background/35 leading-tight truncate mt-0.5">{city}</p>
        </div>

        {/* Type badge */}
        <span className={`flex-shrink-0 font-body text-[8px] font-bold tracking-[0.22em] uppercase
          px-2.5 py-1 border ${meta.bg} ${meta.color} ${meta.border}`}>
          {type}
        </span>
      </div>
    </article>
  )
}

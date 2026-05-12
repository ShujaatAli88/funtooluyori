import { useState } from 'react'

const StarPath = 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'

const typeMeta = {
  Buyer:    { color: 'text-sky-700',    bg: 'bg-sky-50',     border: 'border-sky-200' },
  Seller:   { color: 'text-amber-700',  bg: 'bg-amber-50',   border: 'border-amber-200' },
  Investor: { color: 'text-emerald-700',bg: 'bg-emerald-50', border: 'border-emerald-200' },
  Renter:   { color: 'text-violet-700', bg: 'bg-violet-50',  border: 'border-violet-200' },
}

const QUOTE_LIMIT = 180

export default function TestimonialCard({ testimonial }) {
  const { name, city, type, stars, quote } = testimonial
  const [expanded, setExpanded] = useState(false)

  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  // handle multi-type e.g. "Buyer & Seller" — use first type for color
  const primaryType = type ? type.split(' & ')[0] : ''
  const meta = typeMeta[primaryType] ?? { color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20' }

  const isLong = quote.length > QUOTE_LIMIT
  const displayQuote = expanded || !isLong ? quote : quote.slice(0, QUOTE_LIMIT).trimEnd() + '…'

  return (
    <article className="group relative flex flex-col overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 h-full">

      {/* Left gold border */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-secondary/30 via-secondary to-secondary/30 z-10" />

      {/* Main body — flex-1 so it grows and pushes footer to bottom */}
      <div className="pl-7 pr-6 pt-7 pb-5 flex flex-col flex-1 gap-4">

        {/* Stars */}
        <div className="flex items-center gap-2.5">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(s => (
              <svg key={s} viewBox="0 0 20 20" className={`w-[18px] h-[18px] ${s <= stars ? 'fill-secondary' : 'fill-[#E8DDD0]'}`}>
                <path d={StarPath} />
              </svg>
            ))}
          </div>
          <span className="font-body text-[10px] font-semibold tracking-[0.2em] uppercase text-secondary/70">
            {['','Poor','Fair','Good','Great','Excellent'][stars]}
          </span>
        </div>

        {/* Quote */}
        <div className="relative flex-1">
          <span
            aria-hidden="true"
            className="absolute -top-1 -left-1 font-heading text-[56px] leading-none text-secondary/25 select-none pointer-events-none"
          >"</span>

          <p className="relative font-heading text-[1rem] sm:text-[1.05rem] leading-relaxed text-primary/85 font-normal italic pt-6">
            {displayQuote}
          </p>

          {isLong && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="mt-3 font-body text-[11px] tracking-[0.18em] uppercase text-secondary hover:text-secondary/70 transition-colors border-b border-secondary/40 pb-0.5 focus:outline-none"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      </div>

      {/* Footer strip — always pinned to bottom */}
      <div className="pl-7 pr-6 py-4 bg-[#F5F1EC] border-t border-[#E8DDD0] flex items-center gap-3 mt-auto">

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full flex-shrink-0 bg-primary flex items-center justify-center shadow-sm">
          <span className="font-heading text-xs font-bold text-secondary tracking-wide">{initials}</span>
        </div>

        {/* Name + city */}
        <div className="flex-1 min-w-0">
          <p className="font-body text-sm font-semibold text-primary leading-tight truncate">{name}</p>
          <p className="font-body text-[11px] text-primary/40 leading-tight truncate">{city}</p>
        </div>

        {/* Type pill */}
        <span className={`flex-shrink-0 font-body text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-sm border ${meta.bg} ${meta.color} ${meta.border}`}>
          {type}
        </span>
      </div>
    </article>
  )
}

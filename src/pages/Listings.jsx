import { useRef, useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import ListingCard from '../components/ListingCard'
import { listings } from '../data/listings'

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $600K', min: 0, max: 600000 },
  { label: '$600K – $1M', min: 600000, max: 1000000 },
  { label: '$1M – $1.5M', min: 1000000, max: 1500000 },
  { label: '$1.5M+', min: 1500000, max: Infinity },
]

const bedOptions = ['Any', '3+', '4+', '5+']
const typeOptions = ['All Types', 'Single Family', 'Luxury Estate', 'Townhouse', 'Condo']

function parsePrice(str) {
  return parseInt(str.replace(/[^0-9]/g, ''), 10)
}

const selectClass =
  'px-4 py-2.5 bg-white border border-accent text-primary font-body text-sm focus:outline-none focus:border-secondary transition-colors duration-300 cursor-pointer appearance-none min-h-[44px] pr-8'

export default function Listings() {
  const [priceRange, setPriceRange] = useState(0)
  const [minBeds, setMinBeds] = useState('Any')
  const [propType, setPropType] = useState('All Types')
  const [activeTab, setActiveTab] = useState('active')

  const filtered = useMemo(() => {
    const range = priceRanges[priceRange]
    return listings.filter((l) => {
      if (activeTab === 'active' && l.status !== 'For Sale' && l.status !== 'For Rent') return false
      if (activeTab === 'sold' && l.status !== 'Sold' && l.status !== 'Rented') return false
      const price = parsePrice(l.price)
      if (price < range.min || price > range.max) return false
      if (minBeds === '3+' && l.beds < 3) return false
      if (minBeds === '4+' && l.beds < 4) return false
      if (minBeds === '5+' && l.beds < 5) return false
      if (propType !== 'All Types' && l.type !== propType) return false
      return true
    })
  }, [priceRange, minBeds, propType, activeTab])

  return (
    <main className="pt-16 sm:pt-20">
      {/* Header */}
      <section className="py-20 sm:py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=80"
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
            Properties
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-semibold text-background mb-4"
          >
            Listings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="font-accent italic text-accent/70 text-lg"
          >
            Exceptional homes across the Upper Marlboro, MD.
          </motion.p>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-accent/20 py-6">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-6 py-3 font-body text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${
                activeTab === 'active'
                  ? 'bg-secondary text-white shadow-lg'
                  : 'bg-white text-primary border border-accent hover:bg-accent/50'
              }`}
            >
              Active Listings
            </button>
            <button
              onClick={() => setActiveTab('sold')}
              className={`px-6 py-3 font-body text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${
                activeTab === 'sold'
                  ? 'bg-secondary text-white shadow-lg'
                  : 'bg-white text-primary border border-accent hover:bg-accent/50'
              }`}
            >
              Sold Listings
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-accent/40 border-b border-accent/60 py-5 sm:py-6 sticky top-16 sm:top-20 z-30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:gap-4">
            <span className="font-body text-xs tracking-[0.2em] uppercase text-primary/40 hidden sm:block flex-shrink-0">
              Filter:
            </span>
            <div className="relative flex-1 sm:flex-none">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                aria-label="Price range filter"
                className={`${selectClass} w-full sm:w-auto`}
              >
                {priceRanges.map(({ label }, i) => (
                  <option key={label} value={i}>{label}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40">▾</span>
            </div>
            <div className="relative flex-1 sm:flex-none">
              <select
                value={minBeds}
                onChange={(e) => setMinBeds(e.target.value)}
                aria-label="Bedrooms filter"
                className={`${selectClass} w-full sm:w-auto`}
              >
                {bedOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt === 'Any' ? 'Any Beds' : `${opt} Beds`}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40">▾</span>
            </div>
            <div className="relative flex-1 sm:flex-none">
              <select
                value={propType}
                onChange={(e) => setPropType(e.target.value)}
                aria-label="Property type filter"
                className={`${selectClass} w-full sm:w-auto`}
              >
                {typeOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40">▾</span>
            </div>
            {(priceRange !== 0 || minBeds !== 'Any' || propType !== 'All Types') && (
              <button
                onClick={() => { setPriceRange(0); setMinBeds('Any'); setPropType('All Types') }}
                className="font-body text-xs text-secondary underline hover:text-secondary/70 transition-colors min-h-[44px] focus:outline-none"
              >
                Clear Filters
              </button>
            )}
            <span className="font-body text-xs text-primary/40 sm:ml-auto">
              {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
            </span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filtered.map((listing, i) => (
                <FadeUp key={listing.id} delay={i * 0.08}>
                  <ListingCard listing={listing} />
                </FadeUp>
              ))}
            </div>
          ) : (
            <FadeUp className="text-center py-20">
              <p className="font-heading text-2xl text-primary/30 mb-3">No listings match your filters</p>
              <button
                onClick={() => { setPriceRange(0); setMinBeds('Any'); setPropType('All Types') }}
                className="font-body text-sm text-secondary underline focus:outline-none"
              >
                Clear all filters
              </button>
            </FadeUp>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-20 bg-accent/20 text-center border-t border-accent/60">
        <FadeUp>
          <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-3">Don't See Your Dream Home?</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-primary mb-4">
            I Have Access to Off-Market Properties
          </h2>
          <p className="font-body text-sm text-primary/55 mb-8 max-w-md mx-auto leading-relaxed">
            Some of the best homes never hit the public market. Contact me to discuss your specific needs and I'll tap my exclusive network on your behalf.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-body text-sm font-medium tracking-wide hover:bg-secondary/90 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            Request Off-Market Properties
          </a>
        </FadeUp>
      </section>
    </main>
  )
}

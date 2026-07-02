import { motion } from 'framer-motion'

export default function ListingCard({ listing }) {
  const { address, city, price, beds, baths, sqft, type, status, image } = listing

  const statusColors = {
    'For Sale': 'bg-secondary text-white',
    'For Rent': 'bg-blue-600 text-white',
    'Under Contract': 'bg-primary text-white',
    'Sold': 'bg-accent text-primary',
    'Rented': 'bg-primary text-white',
    'Coming Soon': 'bg-primary text-secondary',
  }

  return (
    <motion.article
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(28,28,28,0.12)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group bg-background rounded-sm overflow-hidden border border-accent/60 cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        {image ? (
          <img
            src={image}
            alt={`${address} — ${type}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-primary/80 flex flex-col items-center justify-center gap-3 transition-transform duration-700 group-hover:scale-105">
            <svg
              className="w-10 h-10 text-secondary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 10v9a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-heading text-sm tracking-[0.2em] uppercase text-secondary">
              Photos Coming Soon
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span
          className={`absolute top-4 left-4 px-3 py-1 text-xs font-body font-medium tracking-wide rounded-sm ${
            statusColors[status] || 'bg-secondary text-white'
          }`}
        >
          {status}
        </span>
      </div>

      {/* Info */}
      <div className="p-5 sm:p-6">
        <p className="font-body text-xs tracking-[0.15em] uppercase text-secondary mb-1">{type}</p>
        <h3 className="font-heading text-lg font-semibold text-primary leading-snug mb-0.5">
          {address}
        </h3>
        <p className="font-body text-sm text-primary/75 mb-4">{city}</p>

        <p className="font-heading text-2xl font-semibold text-primary mb-4">{price}</p>

        <div className="flex gap-5 font-body text-sm text-primary/80 mb-5 border-t border-accent pt-4">
          <span>
            <strong className="text-primary font-medium">{beds}</strong> Beds
          </span>
          <span>
            <strong className="text-primary font-medium">{baths}</strong> Baths
          </span>
          <span>
            <strong className="text-primary font-medium">{sqft}</strong> sqft
          </span>
        </div>

        <a
          href={listing.detailUrl || '/contact'}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-3 border border-secondary text-secondary font-body text-sm font-medium tracking-wide hover:bg-secondary hover:text-white transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 min-h-[44px] flex items-center justify-center"
        >
          {status === 'Coming Soon' ? 'Get Notified' : 'View Property'}
        </a>
      </div>
    </motion.article>
  )
}

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const sentence = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
}

const word = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 20, stiffness: 100 },
  },
}

const headline = 'Finding You The Home You Deserve'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=85"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-8 max-w-5xl mx-auto pt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-body text-xs sm:text-sm tracking-[0.3em] uppercase text-secondary mb-6"
        >
          Luxury Real Estate · Upper Marlboro, MD Area Specialist
        </motion.p>

        <motion.h1
          variants={sentence}
          initial="hidden"
          animate="visible"
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-background leading-tight mb-8"
          aria-label={headline}
        >
          {headline.split(' ').map((w, i) => (
            <motion.span key={i} variants={word} className="inline-block mr-3 sm:mr-4">
              {w}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="font-accent italic text-accent/80 text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Trusted advisor. Relentless advocate. Results you can count on.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/listings"
            className="w-full sm:w-auto px-8 py-4 bg-secondary text-white font-body font-medium tracking-wide text-sm hover:bg-secondary/90 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-transparent min-h-[48px] flex items-center justify-center"
          >
            View Listings
          </Link>
          <Link
            to="/about"
            className="w-full sm:w-auto px-8 py-4 border border-background/60 text-background font-body font-medium tracking-wide text-sm hover:bg-background/10 hover:border-background transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-background focus:ring-offset-2 focus:ring-offset-transparent min-h-[48px] flex items-center justify-center"
          >
            About Funto
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-body text-[10px] tracking-[0.25em] uppercase text-background/50">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-background/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import StatsBar from '../components/StatsBar'
import ListingCard from '../components/ListingCard'
import TestimonialCard from '../components/TestimonialCard'
import { listings } from '../data/listings'
import { testimonials } from '../data/testimonials'
import { useState, useEffect } from 'react'

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: 'Buying',
    desc: "From your first search to handing over the keys, I guide you through every step — negotiations, inspections, and closing — with clarity and confidence.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Selling',
    desc: "Strategic pricing, expert staging guidance, and a powerful marketing reach — I position your home to attract qualified buyers and maximize your return.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: 'Investing',
    desc: "Whether you're building a portfolio or exploring your first rental property, I bring the market data and deal analysis expertise to help you invest wisely.",
  },
]

const marketStats = [
  { label: 'Median Home Price', value: '$585,000', change: '+4.2%', trend: 'up' },
  { label: 'Avg. Days on Market', value: '18 Days', change: '-3 days', trend: 'down' },
  { label: 'List-to-Sale Ratio', value: '101.3%', change: '+0.8%', trend: 'up' },
]

const blogPosts = [
  {
    title: 'Home Value Tips',
    excerpt: 'Discover practical strategies to increase your home\'s value and attract potential buyers.',
  },
  {
    title: 'Buyer Advice',
    excerpt: 'Essential tips for first-time home buyers to navigate the market confidently.',
  },
  {
    title: 'Market Updates',
    excerpt: 'Latest trends and insights from the real estate market in Maryland.',
  },
]

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const featured = testimonials.slice(0, 4)

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % featured.length), 5000)
    return () => clearInterval(id)
  }, [featured.length])

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
        onMouseEnter={() => {}}
      >
        {featured.map((t) => (
          <div key={t.id} className="w-full flex-shrink-0 px-1">
            <TestimonialCard testimonial={t} />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary ${
              current === i ? 'bg-secondary w-6' : 'bg-accent/80 hover:bg-secondary/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const featuredListings = listings.filter((l) => l.featured)

  return (
    <main>
      <HeroSection />

      {/* About Snapshot */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeUp>
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="/funto_profile_image.jpg"
                    alt="Funto Oluyori — Real Estate Agent"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/10 -z-10 hidden sm:block" />
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-accent -z-10 hidden sm:block" />
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-4">About Funto</p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary leading-tight mb-6">
                Your Trusted Partner from First Showing to Final Close
              </h2>
              <p className="font-accent italic text-xl text-secondary border-l-2 border-secondary pl-5 mb-6 leading-relaxed">
                "Every client deserves an advocate who treats their goals as if they were my own."
              </p>
              <p className="font-body text-primary/60 leading-relaxed mb-4">
                <strong>Why Work With A Keller Williams Agent?</strong><br /><br />
                Looking to sell your home? As a real estate associate of Keller Williams Realty, you will now have access to over 170,000 associates across the country to help you sell your property. With our technology, we are leading the way in how homes are sold and purchased through online marketing. Through our KWLS, your listing will display on top name sites like Zillow and Trulia to get you the most brand exposure to your home. 
                Looking to purchase a home? With our KW Technology and advanced websites, searching for properties that are active on the MLS is a breeze. Now you can search 24/7, save properties to your profile to view later and schedule showings with me so you can see these properties in person. My job is to make the real estate buying process that much simpler and as a real estate associate of Keller Williams Realty, we are doing just that. 

                Our company prides ourselves in staying on the cutting edge of technology and if you select me as your real estate agent, you will receive all of this and more. You could never find a more dedicated, energetic, or focused agent to represent you. Please give me a call for a no obligation assessment of your needs!
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-body text-sm font-medium text-secondary tracking-wide hover:gap-4 transition-all duration-300 group focus:outline-none focus:underline"
              >
                Learn More About Funto
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 sm:py-28 bg-accent/30">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeUp className="text-center mb-14">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-3">Properties</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-primary">
              Featured Listings
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredListings.map((listing, i) => (
              <FadeUp key={listing.id} delay={i * 0.1}>
                <ListingCard listing={listing} />
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3} className="text-center mt-12">
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary font-body text-sm font-medium tracking-wide hover:bg-primary hover:text-background transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              View All Listings
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* How I Help */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeUp className="text-center mb-14">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-3">Services</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-primary">
              How I Can Help You
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {services.map(({ icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.12}>
                <div className="text-center p-8 border border-accent/60 hover:border-secondary/40 hover:shadow-lg transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5 text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                    {icon}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-primary mb-3">{title}</h3>
                  <p className="font-body text-sm text-primary/55 leading-relaxed">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <StatsBar />

      {/* Featured Listings */}

      <section className="py-20 sm:py-28 bg-accent/30">

        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          <FadeUp className="text-center mb-14">

            <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-3">Properties</p>

            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-primary">

              Featured Listings

            </h2>

          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

            {featuredListings.map((listing, i) => (

              <FadeUp key={listing.id} delay={i * 0.1}>

                <ListingCard listing={listing} />

              </FadeUp>

            ))}

          </div>

          <FadeUp delay={0.3} className="text-center mt-12">

            <Link

              to="/listings"

              className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary font-body text-sm font-medium tracking-wide hover:bg-primary hover:text-background transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"

            >

              View All Listings

            </Link>

          </FadeUp>

        </div>

      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 sm:py-28 bg-primary">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <FadeUp className="text-center mb-12">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-3">Client Stories</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-background">
              What Clients Are Saying
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <TestimonialsCarousel />
          </FadeUp>
          <FadeUp delay={0.2} className="text-center mt-10">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 font-body text-sm text-secondary hover:gap-4 transition-all duration-300 tracking-wide group focus:outline-none focus:underline"
            >
              Read All Reviews
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Blog / News Section */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeUp className="text-center mb-14">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-3">Blog</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-primary mb-3">
              Current Market Snapshot
            </h2>
            <p className="font-body text-sm text-primary/40 max-w-md mx-auto">
              Upper Marlboro, MD · Data as of Q2 2025 · Source: Keller Williams REALTORS® Association
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {marketStats.map(({ label, value, change, trend }, i) => (
              <FadeUp key={label} delay={i * 0.1}>
                <div className="text-center p-8 bg-accent/20 border border-accent/60">
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-primary/40 mb-3">{label}</p>
                  <p className="font-heading text-3xl sm:text-4xl font-semibold text-primary mb-2">{value}</p>
                  <span
                    className={`inline-flex items-center gap-1 font-body text-xs font-medium ${
                      trend === 'up' ? 'text-emerald-600' : 'text-rose-500'
                    }`}
                  >
                    {trend === 'up' ? '↑' : '↓'} {change} YoY
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.3} className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-body text-sm font-medium tracking-wide hover:bg-secondary/90 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              Get a Free Home Valuation
            </Link>
          </FadeUp>
        </div>
      </section>
    </main>
  )
}

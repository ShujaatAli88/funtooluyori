import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

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

const certifications = [
  { abbr: 'REALTOR®', name: 'Member, National Association of REALTORS®' },
  { abbr: 'CLS', name: 'Certified Luxury Home Specialist' },
  { abbr: 'ABR®', name: "Accredited Buyer's Representative" },
  { abbr: 'SRS', name: 'Seller Representative Specialist' },
  { abbr: 'PSA', name: 'Pricing Strategy Advisor' },
  { abbr: 'e-PRO®', name: 'National Association of REALTORS® Technology Certification' },
]

const timeline = [
  { year: '', event: 'Licensed as a Real Estate Salesperson in Upper Marlboro, MD 20774' },
  { year: '', event: 'Achieved top producer status at Keller Williams Upper Marlboro, MD' },
  { year: '', event: 'Earned Certified Luxury Home Specialist designation' },
  { year: '', event: 'Accessed over 170,000 associates across the country to help customers sell their property' }
]

export default function About() {
  return (
    <main className="pt-16 sm:pt-20">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80"
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
            About
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-background mb-6 leading-tight"
          >
            Passion. Precision.<br className="hidden sm:block" /> Partnership.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-accent italic text-accent/70 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed"
          >
            A decade of experience. A lifetime of commitment to excellence.
          </motion.p>
        </div>
      </section>

      {/* Main bio */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">
            <FadeUp>
              <div className="relative sticky top-28">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="/funto_profile_image.jpg"
                    alt="Funto Oluyori, Real Estate Agent"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 w-28 h-28 bg-secondary/15 -z-10 hidden sm:block" />
                <div className="absolute -top-5 -left-5 w-20 h-20 bg-accent -z-10 hidden sm:block" />

                {/* Floating stat */}
                <div className="absolute bottom-6 left-6 bg-background/95 backdrop-blur-sm px-5 py-4 shadow-xl">
                  <p className="font-heading text-3xl font-semibold text-secondary">5014963</p>
                  <p className="font-body text-xs text-primary/50 tracking-wide uppercase mt-0.5">License #</p>
                </div>
              </div>
            </FadeUp>

            <div className="flex flex-col gap-8">
              <FadeUp delay={0.1}>
                <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-1">Biography</p>
                <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-primary leading-snug mb-6">
                  Meet Funto Oluyori
                </h2>
                <p className="font-body text-primary/65 leading-relaxed mb-4">
                  When you work with me, you will receive a knowledgeable and professional real estate agent, a committed ally to negotiate on your behalf, the systems in place to streamline buying your home and the backing of a trusted company, Keller Williams Realty. 

                  Why Work With A Keller Williams Agent? 

                  Looking to sell your home? As a real estate associate of Keller Williams Realty, you will now have access to over 170,000 associates across the country to help you sell your property. With our technology, we are leading the way in how homes are sold and purchased through online marketing. Through our KWLS, your listing will display on top name sites like Zillow and Trulia to get you the most brand exposure to your home. 

                  Looking to purchase a home? With our KW Technology and advanced websites, searching for properties that are active on the MLS is a breeze. Now you can search 24/7, save properties to your profile to view later and schedule showings with me so you can see these properties in person. My job is to make the real estate buying process that much simpler and as a real estate associate of Keller Williams Realty, we are doing just that. 

                  Our company prides ourselves in staying on the cutting edge of technology and if you select me as your real estate agent, you will receive all of this and more. You could never find a more dedicated, energetic, or focused agent to represent you. Please give me a call for a no obligation assessment of your needs!
                </p>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="border-l-2 border-secondary pl-5 py-1">
                  <p className="font-accent italic text-xl text-primary/70 leading-relaxed">
                    "My goal is to simplify the complexities of the real estate journey by combining high-energy advocacy with industry-leading technology. I am dedicated to providing my clients with a seamless, stress-free experience whether that means leveraging the massive reach of the Keller Williams network to sell a home at top value or using advanced MLS tools to find a buyer's perfect match"
                  </p>
                  <p className="font-body text-sm text-secondary mt-3 font-medium">— Funto Oluyori</p>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 sm:py-28 bg-accent/20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <FadeUp className="text-center mb-14">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-3">Journey</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-primary">
              Career Milestones
            </h2>
          </FadeUp>
          <div className="relative">
            <div className="absolute left-[15px] sm:left-1/2 top-0 bottom-0 w-px bg-accent hidden sm:block" aria-hidden="true" />
            <div className="flex flex-col gap-8">
              {timeline.map(({ year, event }, i) => (
                <FadeUp key={year} delay={i * 0.08}>
                  <div className={`flex items-center gap-6 sm:gap-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                      <p className="font-body text-xs tracking-[0.2em] uppercase text-secondary mb-1">{year}</p>
                      <p className="font-body text-sm sm:text-base text-primary/70 leading-relaxed">{event}</p>
                    </div>
                    <div className="hidden sm:flex w-4 h-4 rounded-full bg-secondary border-4 border-background shadow-md flex-shrink-0 z-10" aria-hidden="true" />
                    <div className="flex-1 hidden sm:block" />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeUp className="text-center mb-14">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-3">Credentials</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-primary">
              Certifications & Designations
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map(({ abbr, name }, i) => (
              <FadeUp key={abbr} delay={i * 0.07}>
                <div className="flex items-center gap-4 p-5 border border-accent/60 hover:border-secondary/40 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 flex-shrink-0 bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-300">
                    <span className="font-heading text-xs font-bold text-secondary">{abbr}</span>
                  </div>
                  <p className="font-body text-sm text-primary/70 leading-snug">{name}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Why Real Estate */}
      <section className="py-20 sm:py-28 bg-primary text-background">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <FadeUp className="text-center mb-10">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-3">Personal Story</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-background mb-6">
              Why Real Estate?
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="font-body text-background/65 leading-relaxed mb-4">
                  Growing up, home wasn't just a building it was security, identity, and belonging. Watching her family navigate the challenges of homeownership planted a seed in Funto that would define her life's work.
                </p>
                <p className="font-body text-background/65 leading-relaxed mb-4">
                  "When I help a family close on their first home, I'm not just handing over keys," she says. "I'm handing over a future. That feeling never gets old no matter how many times I've done it."
                </p>
                <p className="font-body text-background/65 leading-relaxed">
                  That sense of purpose drives Funto every day. It's why she approaches every listing, every showing, and every negotiation with the care of someone who understands what's truly at stake.
                </p>
              </div>
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="house-of-dream-idea-real-estate-illustration-ai-generative-free-photo.jpg"
                  alt="Community and homeownership"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 bg-background text-center">
        <FadeUp>
          <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-3">Ready to Begin?</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-primary mb-6 max-w-lg mx-auto">
            Let's Find Your Perfect Home Together
          </h2>
          <p className="font-body text-primary/55 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
            Reach out for a complimentary consultation — no pressure, just a conversation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-secondary text-white font-body text-sm font-medium tracking-wide hover:bg-secondary/90 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            Get in Touch
          </Link>
        </FadeUp>
      </section>
    </main>
  )
}

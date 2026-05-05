import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import TestimonialCard from '../components/TestimonialCard'
import ReviewForm from '../components/ReviewForm'
import { supabase } from '../lib/supabase'

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Testimonials() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReviews() {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
      setReviews(data || [])
      setLoading(false)
    }
    fetchReviews()
  }, [])

  return (
    <main className="pt-16 sm:pt-20">

      {/* Header */}
      <section className="py-20 sm:py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80"
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
            Client Stories
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-semibold text-background mb-4"
          >
            What Clients Are Saying
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="font-accent italic text-accent/70 text-lg"
          >
            Real words from real people whose lives were changed.
          </motion.p>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
            </div>
          ) : reviews.length > 0 ? (
            <>
              <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
                <div>
                  <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-2">
                    {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                  </p>
                  <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-primary">
                    Client Experiences
                  </h2>
                </div>
                <a
                  href="#review"
                  className="inline-flex items-center gap-2 font-body text-sm text-secondary hover:gap-4 transition-all duration-300 tracking-wide group self-start sm:self-auto"
                >
                  Leave a Review
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </FadeUp>

              {/* Featured first review */}
              <FadeUp className="mb-6 sm:mb-8">
                <div className="relative bg-primary overflow-hidden">
                  <div className="absolute inset-0 opacity-5">
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=60" alt="" aria-hidden="true" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
                  <div className="relative z-10 p-8 sm:p-12 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 items-center">
                    <div>
                      {/* Stars */}
                      <div className="flex gap-1 mb-5">
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} viewBox="0 0 20 20" className={`w-5 h-5 ${s <= reviews[0].stars ? 'fill-secondary' : 'fill-background/10'}`}>
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      {/* Quote */}
                      <p className="font-heading italic text-xl sm:text-2xl lg:text-3xl text-background/90 leading-relaxed mb-6">
                        "{reviews[0].quote}"
                      </p>
                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                          <span className="font-heading text-secondary text-sm font-bold">
                            {reviews[0].name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-body text-sm font-semibold text-background">{reviews[0].name}</p>
                          <p className="font-body text-xs text-background/40">{reviews[0].city} · {reviews[0].type}</p>
                        </div>
                      </div>
                    </div>
                    {/* Featured label */}
                    <div className="hidden sm:flex flex-col items-center gap-2 self-start">
                      <span className="font-body text-[9px] tracking-[0.3em] uppercase text-secondary border border-secondary/30 px-3 py-1.5">
                        Featured
                      </span>
                    </div>
                  </div>
                </div>
              </FadeUp>

              {/* Masonry grid for remaining reviews */}
              {reviews.length > 1 && (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8">
                  {reviews.slice(1).map((review, i) => (
                    <FadeUp key={review.id} delay={i * 0.06} className="break-inside-avoid mb-6 sm:mb-8">
                      <TestimonialCard testimonial={review} />
                    </FadeUp>
                  ))}
                </div>
              )}
            </>
          ) : (
            <FadeUp>
              <div className="max-w-lg mx-auto text-center py-12">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-primary mb-3">
                  Be the First to Review
                </h2>
                <p className="font-body text-primary/70 leading-relaxed">
                  Share your experience and help others find their perfect home with Funto.
                </p>
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* Leave a review */}
      <section id="review" className="relative py-20 sm:py-28 bg-primary overflow-hidden">

        {/* Decorative orbs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary/8 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/3 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* Left: Inspiring copy */}
            <FadeUp>
              <div className="text-center lg:text-left">
                {/* Giant decorative quote */}
                <div
                  className="hidden lg:block font-heading text-[160px] leading-none text-secondary/10 select-none -mb-12"
                  aria-hidden="true"
                >"</div>

                <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-5">Share Your Story</p>

                <h2 className="font-heading text-4xl sm:text-5xl lg:text-5xl font-semibold text-background leading-tight mb-6">
                  Your Words<br />
                  <span className="text-secondary">Change Lives.</span>
                </h2>

                <p className="font-body text-background/55 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0 text-base">
                  Every review you leave gives a family the confidence to take the most important financial step of their lives. Your experience is more powerful than any advertisement.
                </p>

                {/* Promise cards */}
                <div className="flex flex-col gap-3 max-w-sm mx-auto lg:mx-0">
                  {[
                    { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', text: 'Your privacy is respected' },
                    { icon: 'M13 10V3L4 14h7v7l9-11h-7z', text: 'Published instantly, no delays' },
                    { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', text: 'Helps future clients feel at home' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                        </svg>
                      </div>
                      <p className="font-body text-sm text-background/50">{text}</p>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="mt-10 pt-10 border-t border-background/8 hidden lg:block">
                  <p className="font-accent italic text-background/35 text-sm leading-relaxed">
                    "I strive to earn and maintain your trust through transparent communication, sound advice, and unwavering dedication."
                  </p>
                  <p className="font-body text-secondary text-xs mt-3 tracking-wide">— Funto Oluyori</p>
                </div>
              </div>
            </FadeUp>

            {/* Right: Form card */}
            <FadeUp delay={0.18}>
              <div className="relative">
                {/* Glow behind card */}
                <div className="absolute inset-0 bg-secondary/15 blur-2xl scale-95 rounded-sm pointer-events-none" />

                <div className="relative bg-background overflow-hidden shadow-2xl">
                  {/* Gold top accent */}
                  <div className="h-1.5 bg-gradient-to-r from-secondary/40 via-secondary to-secondary/40" />

                  <div className="px-7 pt-7 pb-3 border-b border-accent/40 bg-white">
                    <p className="font-body text-[10px] tracking-[0.28em] uppercase text-secondary mb-1">Testimonial Form</p>
                    <h3 className="font-heading text-2xl font-semibold text-primary">Leave a Review</h3>
                  </div>

                  <div className="p-7 sm:p-8">
                    <ReviewForm />
                  </div>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

    </main>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ContactForm from '../components/ContactForm'
import TestimonialsSection from '../components/TestimonialsSection'

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

export default function Contact() {
  return (
    <main className="pt-16 sm:pt-20">
      {/* Header */}
      <section className="py-20 sm:py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
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
            Connect
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl font-semibold text-background mb-4"
          >
            Let's Start the Conversation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="font-accent italic text-accent/70 text-lg"
          >
            No pressure. Just possibilities.
          </motion.p>
        </div>
      </section>

      {/* Split content */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left — image + quote + contact info (desktop only) */}
            <FadeUp className="hidden lg:block">
              {/* Image with decorative frame */}
              <div className="relative mb-10">
                <div className="absolute -top-4 -left-4 w-[calc(75%+1rem)] h-[calc(75%+1rem)] border border-secondary/30 pointer-events-none" />
                <div className="aspect-[3/4] overflow-hidden relative group">
                  <img
                    src="/funto_profile_image.jpg"
                    alt="Funto Oluyori"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent pt-16 pb-5 px-6">
                    <p className="font-heading text-lg font-semibold text-white leading-tight">Funto Oluyori</p>
                    <p className="font-body text-[10px] tracking-[0.25em] uppercase text-secondary mt-1">
                      Licensed Realtor · State of Maryland
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-secondary/20" />
              </div>

              {/* Quote */}
              <blockquote className="pl-5 border-l-2 border-secondary/40">
                <p className="font-accent italic text-primary/55 text-base leading-relaxed">
                  "Whether you're buying your first home or your fifth investment property, I'm here to guide you every step of the way."
                </p>
                <footer className="mt-4 flex items-center gap-2">
                  <div className="h-px w-5 bg-secondary" />
                  <span className="font-body text-[10px] tracking-[0.25em] uppercase text-secondary">Funto Oluyori</span>
                </footer>
              </blockquote>

            </FadeUp>

            {/* Right — form */}
            <FadeUp delay={0.15}>
              <div className="bg-white border border-accent/60 shadow-sm overflow-hidden">
                <div className="h-1 bg-secondary" />
                <div className="p-6 sm:p-10">
                  <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-primary mb-2">
                    Send a Message
                  </h2>
                  <p className="font-body text-sm text-primary/50 mb-8 leading-relaxed">
                    Fill out the form and I'll respond within one business day.
                  </p>
                  <ContactForm />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* Location strip */}
      <section className="py-14 bg-accent/20 border-t border-accent/60">
        <FadeUp>
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-3">Location</p>
            <h3 className="font-heading text-2xl font-semibold text-primary mb-2">
              Serving the State of Maryland
            </h3>
            <p className="font-body text-sm text-primary/55 mt-1">
              Brokerage office located in Upper Marlboro, MD
            </p>
          </div>
        </FadeUp>
      </section>
    </main>
  )
}

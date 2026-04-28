import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ContactForm from '../components/ContactForm'

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

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: 'Phone',
    value: '(980) 800-4892',
    href: 'tel:+19808004892',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email',
    value: 'funto@kw.com',
    href: 'mailto:funto@kw.com',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: 'Office',
    value: '1441 McCormick DR STE 1020\nUpper Marlboro, MD 20774',
    sub: 'License #5014963',
    href: null,
  },
]

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/funto_oluyori/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]

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

            {/* Left — image + contact info */}
            <FadeUp>
              {/* Image block — desktop only */}
              <div className="relative mb-10 hidden lg:block">
                {/* Offset border frame behind the image */}
                <div className="absolute -top-4 -left-4 w-[calc(75%+1rem)] h-[calc(75%+1rem)] border border-secondary/30 pointer-events-none" />

                <div className="aspect-[3/4] overflow-hidden relative group">
                  <img
                    src="/funto_profile_image.jpg"
                    alt="Funto Oluyori — Contact"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {/* Gradient name badge */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent pt-16 pb-5 px-6">
                    <p className="font-heading text-lg font-semibold text-white leading-tight">Funto Oluyori</p>
                    <p className="font-body text-[10px] tracking-[0.25em] uppercase text-secondary mt-1">
                      Licensed Realtor · MD
                    </p>
                  </div>
                </div>

                {/* Bottom-right accent block */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-secondary/20" />
              </div>

              {/* Contact info rows */}
              <div className="space-y-5">
                {contactInfo.map(({ icon, label, value, sub, href }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 p-4 border border-accent/50 hover:border-secondary/40 transition-colors duration-300"
                  >
                    <div className="w-9 h-9 flex-shrink-0 bg-secondary/10 flex items-center justify-center text-secondary">
                      {icon}
                    </div>
                    <div className="min-w-0">
                      <p className="font-body text-[10px] tracking-[0.2em] uppercase text-primary/40 mb-0.5">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className="font-body text-sm text-primary hover:text-secondary transition-colors duration-300 leading-relaxed"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-body text-sm text-primary/75 leading-relaxed whitespace-pre-line">{value}</p>
                      )}
                      {sub && (
                        <p className="font-body text-[11px] text-primary/35 tracking-wide mt-1.5">{sub}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="mt-8 pt-8 border-t border-accent/60">
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-primary/40 mb-4">Follow Along</p>
                <div className="flex items-center gap-3">
                  {socials.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-full border border-accent flex items-center justify-center text-primary/40 hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Right — form */}
            <FadeUp delay={0.15}>
              <div className="bg-white border border-accent/60 shadow-sm overflow-hidden">
                {/* Colored accent bar at top */}
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

      {/* Office location strip */}
      <section className="py-14 bg-accent/20 border-t border-accent/60">
        <FadeUp>
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-3">Location</p>
            <h3 className="font-heading text-2xl font-semibold text-primary mb-2">
              Upper Marlboro, MD
            </h3>
          </div>
        </FadeUp>
      </section>
    </main>
  )
}

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
    href: 'tel:+14045550100',
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
    value: '1441 McCormick DR STE 1020\nUpper Marlboro, MD 20774\nLicense #5014963',
    href: null,
  }
]

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'LinkedIn', href: '#' },
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
            {/* Left — contact info */}
            <FadeUp>
              <div className="relative mb-8 hidden lg:block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/funto_profile_image.jpg"
                    alt="Funto Oluyori — Contact"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-secondary/15 -z-10" />
              </div>

              <div className="space-y-6">
                {contactInfo.map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 flex-shrink-0 bg-secondary/10 flex items-center justify-center text-secondary mt-0.5">
                      {icon}
                    </div>
                    <div>
                      <p className="font-body text-xs tracking-[0.15em] uppercase text-primary/40 mb-0.5">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className="font-body text-sm text-primary hover:text-secondary transition-colors duration-300 leading-relaxed"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-body text-sm text-primary/70 leading-relaxed whitespace-pre-line">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-accent/60">
                <p className="font-body text-xs tracking-[0.2em] uppercase text-primary/40 mb-4">Follow Funto</p>
                <div className="flex gap-3">
                  {socials.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="px-4 py-2 border border-accent text-primary/50 font-body text-xs hover:border-secondary hover:text-secondary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary min-h-[44px] flex items-center"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Right — form */}
            <FadeUp delay={0.15}>
              <div className="bg-white border border-accent/60 p-6 sm:p-10 shadow-sm">
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-primary mb-2">
                  Send a Message
                </h2>
                <p className="font-body text-sm text-primary/50 mb-8 leading-relaxed">
                  Fill out the form below and I'll respond within one business day.
                </p>
                <ContactForm />
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
            {/* <p className="font-body text-sm text-primary/50">
              Serving Buckhead · Midtown · Sandy Springs · Decatur · Vinings · Alpharetta · And Beyond
            </p> */}
          </div>
        </FadeUp>
      </section>
    </main>
  )
}

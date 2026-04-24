import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Services() {
  return (
    <main className="pt-16 sm:pt-20">
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <FadeUp>
            <div className="text-center mb-14">
              <p className="font-body text-xs tracking-[0.25em] uppercase text-secondary mb-3">Services</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-primary">How I Can Help You</h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            <FadeUp delay={0.1}>
              <div className="text-center p-8 border border-accent/60 hover:border-secondary/40 hover:shadow-lg transition-all duration-500 group">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5 text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-primary mb-3">Buying</h3>
                <p className="font-body text-sm text-primary/55 leading-relaxed">From your first search to handing over the keys, I guide you through every step — negotiations, inspections, and closing — with clarity and confidence.</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="text-center p-8 border border-accent/60 hover:border-secondary/40 hover:shadow-lg transition-all duration-500 group">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5 text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-primary mb-3">Selling</h3>
                <p className="font-body text-sm text-primary/55 leading-relaxed">Strategic pricing, expert staging guidance, and a powerful marketing reach — I position your home to attract qualified buyers and maximize your return.</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="text-center p-8 border border-accent/60 hover:border-secondary/40 hover:shadow-lg transition-all duration-500 group">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5 text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-primary mb-3">Investing</h3>
                <p className="font-body text-sm text-primary/55 leading-relaxed">Whether you're building a portfolio or exploring your first rental property, I bring the market data and deal analysis expertise to help you invest wisely.</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.4}>
              <div className="text-center p-8 border border-accent/60 hover:border-secondary/40 hover:shadow-lg transition-all duration-500 group">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5 text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-semibold text-primary mb-3">Renting</h3>
                <p className="font-body text-sm text-primary/55 leading-relaxed">Finding the right rental shouldn't be stressful. I connect tenants with quality homes that match their lifestyle and budget while simplifying applications and lease negotiations.</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  )
}

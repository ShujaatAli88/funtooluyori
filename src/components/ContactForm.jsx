import { useState } from 'react'
import { motion } from 'framer-motion'

const inputClass =
  'w-full px-4 py-3 bg-white border border-accent font-body text-sm text-primary placeholder-primary/30 focus:outline-none focus:border-secondary transition-colors duration-300 min-h-[48px]'

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    intent: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-8"
      >
        <div className="w-14 h-14 rounded-full bg-secondary/15 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl text-primary mb-3">Message Sent!</h3>
        <p className="font-body text-primary/60 text-sm leading-relaxed max-w-xs mx-auto">
          Thank you for reaching out. Funto will be in touch within 24 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block font-body text-xs tracking-[0.15em] uppercase text-primary/50 mb-1.5">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-body text-xs tracking-[0.15em] uppercase text-primary/50 mb-1.5">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block font-body text-xs tracking-[0.15em] uppercase text-primary/50 mb-1.5">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="(404) 555-0000"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="intent" className="block font-body text-xs tracking-[0.15em] uppercase text-primary/50 mb-1.5">
          I Am Interested In *
        </label>
        <select
          id="intent"
          name="intent"
          required
          value={form.intent}
          onChange={handleChange}
          className={`${inputClass} appearance-none cursor-pointer`}
        >
          <option value="" disabled>Select an option...</option>
          <option value="buying">Buying a Home</option>
          <option value="selling">Selling a Home</option>
          <option value="both">Buying &amp; Selling</option>
          <option value="investing">Real Estate Investing</option>
          <option value="other">General Inquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block font-body text-xs tracking-[0.15em] uppercase text-primary/50 mb-1.5">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me a little about what you're looking for..."
          className={`${inputClass} resize-none min-h-[120px]`}
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full py-4 bg-secondary text-white font-body font-medium tracking-wide text-sm hover:bg-secondary/90 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 min-h-[52px]"
      >
        Send Message
      </motion.button>

      <p className="font-body text-xs text-primary/30 text-center">
        Your information is kept private and never shared.
      </p>
    </form>
  )
}

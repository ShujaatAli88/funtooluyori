import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MAX_MESSAGE = 500
const SUBMIT_URL = 'https://formsubmit.co/ajax/funto@kw.com'

function Label({ htmlFor, children, required }) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-center gap-1.5 font-body text-[11px] tracking-[0.18em] uppercase text-primary/80 mb-2 font-medium"
    >
      {children}
      {required && <span className="text-secondary text-[10px] leading-none">●</span>}
    </label>
  )
}

function FieldCheck({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          key="check"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.18 }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.span>
      )}
    </AnimatePresence>
  )
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', intent: '', message: '' })
  const [focused, setFocused] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'message' && value.length > MAX_MESSAGE) return
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const res = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          interest: form.intent,
          message: form.message,
          _subject: `New inquiry from ${form.name} — Funto Oluyori RE`,
          _replyto: form.email,
          _captcha: 'false',
        }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const filled = (key) => form[key].trim().length > 0
  const requiredKeys = ['name', 'email', 'intent', 'message']
  const filledCount = requiredKeys.filter(filled).length
  const progress = filledCount / requiredKeys.length

  const inputCls = (key) =>
    `w-full px-4 py-3 font-body text-sm text-primary placeholder-primary/30 focus:outline-none transition-all duration-200 min-h-[48px] border ${
      focused === key
        ? 'bg-white border-secondary ring-2 ring-secondary/10'
        : 'bg-accent/40 border-accent'
    }`

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center mx-auto mb-5"
        >
          <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="font-heading text-2xl text-primary mb-3">Message Sent!</h3>
        <p className="font-body text-primary/60 text-sm leading-relaxed max-w-xs mx-auto">
          Thank you for reaching out. Funto will be in touch within 24 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Progress bar */}
      <div className="mb-1">
        <div className="flex justify-between items-center mb-2">
          <span className="font-body text-[10px] tracking-[0.2em] uppercase text-primary/65">Progress</span>
          <span className="font-body text-[10px] text-secondary/70 tabular-nums">
            {filledCount} / {requiredKeys.length} required
          </span>
        </div>
        <div className="h-px bg-accent rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-secondary w-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{ transformOrigin: 'left center' }}
          />
        </div>
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" required>Full Name</Label>
          <div className="relative">
            <input
              id="name" name="name" type="text" required
              value={form.name} onChange={handleChange}
              onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
              placeholder="Jane Smith"
              className={`${inputCls('name')} pr-10`}
            />
            <FieldCheck show={filled('name') && focused !== 'name'} />
          </div>
        </div>

        <div>
          <Label htmlFor="email" required>Email Address</Label>
          <div className="relative">
            <input
              id="email" name="email" type="email" required
              value={form.email} onChange={handleChange}
              onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
              placeholder="jane@example.com"
              className={`${inputCls('email')} pr-10`}
            />
            <FieldCheck show={filled('email') && focused !== 'email'} />
          </div>
        </div>
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="phone">
          Phone
          <span className="normal-case tracking-normal font-normal text-primary/30 ml-1">(optional)</span>
        </Label>
        <div className="relative">
          <input
            id="phone" name="phone" type="tel"
            value={form.phone} onChange={handleChange}
            onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
            placeholder="(404) 555-0000"
            className={`${inputCls('phone')} pr-10`}
          />
          <FieldCheck show={filled('phone') && focused !== 'phone'} />
        </div>
      </div>

      {/* Intent */}
      <div>
        <Label htmlFor="intent" required>I Am Interested In</Label>
        <div className="relative">
          <select
            id="intent" name="intent" required
            value={form.intent} onChange={handleChange}
            onFocus={() => setFocused('intent')} onBlur={() => setFocused(null)}
            className={`${inputCls('intent')} appearance-none cursor-pointer pr-10`}
          >
            <option value="" disabled>Select an option...</option>
            <option value="buying">Buying a Home</option>
            <option value="selling">Selling a Home</option>
            <option value="both">Buying &amp; Selling</option>
            <option value="investing">Real Estate Investing</option>
            <option value="other">General Inquiry</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary/35">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>

      {/* Message */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <Label htmlFor="message" required>Message</Label>
          <span
            className={`font-body text-[10px] tabular-nums transition-colors duration-200 ${
              form.message.length > MAX_MESSAGE * 0.85 ? 'text-secondary' : 'text-primary/60'
            }`}
          >
            {form.message.length} / {MAX_MESSAGE}
          </span>
        </div>
        <textarea
          id="message" name="message" required
          rows={5} value={form.message} onChange={handleChange}
          onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
          placeholder="Tell me a little about what you're looking for..."
          className={`${inputCls('message')} resize-none min-h-[120px]`}
        />
      </div>

      <div className="border-t border-accent/60 pt-1" />

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-body text-xs text-red-500 text-center -mt-2"
          >
            Something went wrong. Please try again or email funto@kw.com directly.
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={loading ? {} : { scale: 1.015 }}
        whileTap={loading ? {} : { scale: 0.985 }}
        className="group w-full py-4 bg-secondary text-white font-body font-medium tracking-widest text-sm uppercase hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 min-h-[52px] flex items-center justify-center gap-2.5 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          <>
            Send Message
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </motion.button>

      <p className="font-body text-[11px] text-primary/60 text-center">
        Your information is kept private and never shared.
      </p>
    </form>
  )
}

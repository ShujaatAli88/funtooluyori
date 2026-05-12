import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

const typeOptions = ['Buyer', 'Seller', 'Investor', 'Renter']
const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!']

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  const active = hovered || value

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            whileHover={{ scale: 1.25, y: -2 }}
            whileTap={{ scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="focus:outline-none"
          >
            <motion.svg
              className={`w-10 h-10 transition-colors duration-100 ${
                star <= active ? 'text-secondary fill-current drop-shadow-sm' : 'text-primary/15 fill-current'
              }`}
              viewBox="0 0 20 20"
              animate={star <= active ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          </motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {active > 0 && (
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2"
          >
            <span className="font-heading text-xl font-semibold text-secondary">
              {ratingLabels[active]}
            </span>
            {active === 5 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="font-body text-xs text-secondary/60"
              >
                — We love to hear it!
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputCls = 'w-full px-4 py-3.5 bg-white border-2 border-accent/60 font-body text-sm text-primary placeholder-primary/25 focus:outline-none focus:border-secondary transition-all duration-300 rounded-none'

export default function ReviewForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', city: '', type: [], stars: 0, quote: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.stars === 0) return
    setStatus('submitting')
    const { error } = await supabase.from('testimonials').insert([{
      name: form.name.trim(),
      city: form.city.trim(),
      type: form.type.join(' & '),
      stars: form.stars,
      quote: form.quote.trim(),
    }])
    if (error) {
      setStatus('error')
    } else {
      setStatus('success')
      setForm({ name: '', city: '', type: [], stars: 0, quote: '' })
      onSuccess?.()  // trigger parent to re-fetch reviews
    }
  }

  const isValid = form.name && form.city && form.type.length > 0 && form.stars > 0 && form.quote.trim().length > 0

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-14 px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-secondary/10 border-2 border-secondary/30 flex items-center justify-center mx-auto mb-6"
        >
          <svg className="w-9 h-9 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="font-heading text-3xl font-semibold text-primary mb-3">Thank You!</h3>
        <p className="font-body text-primary/60 leading-relaxed max-w-xs mx-auto">
          Your review has been shared. It means more than you know.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 font-body text-xs tracking-[0.2em] uppercase text-secondary hover:text-secondary/70 transition-colors border-b border-secondary/30 pb-0.5"
        >
          Submit another review
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

      {/* Name + City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="group">
          <label className="font-body text-[10px] tracking-[0.22em] uppercase text-primary/50 mb-2 block font-semibold group-focus-within:text-secondary transition-colors duration-300">
            Full Name <span className="text-secondary">*</span>
          </label>
          <input
            name="name" type="text" required
            value={form.name} onChange={handleChange}
            placeholder="Jane Smith"
            className={inputCls}
          />
        </div>
        <div className="group">
          <label className="font-body text-[10px] tracking-[0.22em] uppercase text-primary/50 mb-2 block font-semibold group-focus-within:text-secondary transition-colors duration-300">
            City Served <span className="text-secondary">*</span>
          </label>
          <input
            name="city" type="text" required
            value={form.city} onChange={handleChange}
            placeholder="e.g. Upper Marlboro, MD"
            className={inputCls}
          />
        </div>
      </div>

      {/* Type */}
      <div>
        <label className="font-body text-[10px] tracking-[0.22em] uppercase text-primary/50 mb-1 block font-semibold">
          I worked with Funto as <span className="text-secondary">*</span>
        </label>
        <p className="font-body text-[10px] text-primary/35 italic mb-3">Select all that apply</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {typeOptions.map((opt) => (
            <motion.button
              key={opt}
              type="button"
              onClick={() => setForm((f) => ({
                ...f,
                type: f.type.includes(opt) ? f.type.filter(t => t !== opt) : [...f.type, opt]
              }))}
              whileTap={{ scale: 0.97 }}
              className={`py-3 font-body text-sm font-medium border-2 transition-all duration-250 focus:outline-none ${
                form.type.includes(opt)
                  ? 'bg-secondary text-white border-secondary shadow-md shadow-secondary/20'
                  : 'bg-white text-primary/60 border-accent/60 hover:border-secondary/50 hover:text-secondary'
              }`}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stars */}
      <div>
        <label className="font-body text-[10px] tracking-[0.22em] uppercase text-primary/50 mb-3 block font-semibold">
          Your Rating <span className="text-secondary">*</span>
        </label>
        <StarPicker value={form.stars} onChange={(v) => setForm((f) => ({ ...f, stars: v }))} />
      </div>

      {/* Review */}
      <div className="group">
        <label className="font-body text-[10px] tracking-[0.22em] uppercase text-primary/50 mb-2 block font-semibold group-focus-within:text-secondary transition-colors duration-300">
          Your Review <span className="text-secondary">*</span>
        </label>
        <textarea
          name="quote" required
          value={form.quote} onChange={handleChange}
          placeholder="Tell others about your experience — what made Funto stand out?"
          rows={5}
          maxLength={500}
          className={`${inputCls} resize-none`}
        />
        <div className="flex justify-between items-center mt-1.5">
          <p className="font-body text-[10px] text-primary/35 italic">Be honest — your story helps someone make a life-changing decision.</p>
          <p className={`font-body text-[10px] tabular-nums ${form.quote.length > 425 ? 'text-secondary font-semibold' : 'text-primary/30'}`}>
            {form.quote.length}/500
          </p>
        </div>
      </div>

      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-body text-sm text-red-500 text-center bg-red-50 py-3 border border-red-100"
        >
          Something went wrong — please try again.
        </motion.p>
      )}

      <motion.button
        type="submit"
        disabled={!isValid || status === 'submitting'}
        whileHover={isValid ? { scale: 1.01 } : {}}
        whileTap={isValid ? { scale: 0.99 } : {}}
        className="w-full py-4 bg-secondary text-white font-body text-sm font-semibold tracking-[0.12em] uppercase hover:bg-secondary/90 transition-all duration-300 disabled:opacity-35 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 min-h-[54px] flex items-center justify-center gap-3 shadow-lg shadow-secondary/20"
      >
        {status === 'submitting' ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Submit My Review
          </>
        )}
      </motion.button>
    </form>
  )
}

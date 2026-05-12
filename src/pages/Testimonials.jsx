import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import TestimonialCard from '../components/TestimonialCard'
import ReviewForm from '../components/ReviewForm'
import { supabase } from '../lib/supabase'

const typeOptions = ['Buyer', 'Seller', 'Investor', 'Renter']
const StarPath = 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, transition: { duration: 0.28, ease: 'easeIn' } }),
}

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >{children}</motion.div>
  )
}

export default function Testimonials() {
  const [reviews, setReviews]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [current, setCurrent]     = useState(0)
  const [paused, setPaused]       = useState(false)
  const [direction, setDirection] = useState(1)

  const [isAdmin, setIsAdmin]               = useState(false)
  const [editingReview, setEditingReview]   = useState(null)
  const [editForm, setEditForm]             = useState(null)
  const [editStatus, setEditStatus]         = useState('idle')

  const fetchReviews = useCallback(async () => {
    const { data } = await supabase
      .from('testimonials').select('*').order('created_at', { ascending: false })
    setReviews(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchReviews()
    setIsAdmin(sessionStorage.getItem('adminAuth') === 'true')
  }, [fetchReviews])

  // Auto-rotate every 3s, pause when hovered or modal open
  useEffect(() => {
    if (paused || reviews.length <= 1) return
    const t = setInterval(() => {
      setDirection(1)
      setCurrent(c => (c + 1) % reviews.length)
    }, 3000)
    return () => clearInterval(t)
  }, [reviews.length, paused])

  const go = (dir) => {
    setDirection(dir)
    setCurrent(c => (c + dir + reviews.length) % reviews.length)
  }

  const openEdit  = (r) => {
    setEditingReview(r)
    setEditForm({ name: r.name, city: r.city, type: r.type ? r.type.split(' & ') : [], stars: r.stars, quote: r.quote })
    setEditStatus('idle')
  }
  const closeEdit = () => { setEditingReview(null); setEditForm(null); setEditStatus('idle') }

  const handleEditSave = async () => {
    setEditStatus('saving')
    const { error } = await supabase.from('testimonials')
      .update({ name: editForm.name.trim(), city: editForm.city.trim(), type: editForm.type.join(' & '), stars: editForm.stars, quote: editForm.quote.trim() })
      .eq('id', editingReview.id)
    if (error) { setEditStatus('error') } else { await fetchReviews(); closeEdit() }
  }

  const handleEditDelete = async () => {
    if (!window.confirm('Delete this review? This cannot be undone.')) return
    setEditStatus('deleting')
    await supabase.from('testimonials').delete().eq('id', editingReview.id)
    await fetchReviews(); setCurrent(0); closeEdit()
  }

  const review = reviews[current]

  return (
    <main className="pt-16 sm:pt-20">

      {/* ── Header ── */}
      <section className="py-20 sm:py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80" alt="" aria-hidden className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-transparent to-primary/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="font-body text-xs tracking-[0.35em] uppercase text-secondary mb-4">
            Client Stories
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-background mb-5 leading-tight">
            What Clients Are Saying
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            className="font-accent italic text-accent/70 text-xl">
            Real words from real people whose lives were changed.
          </motion.p>
        </div>
      </section>

      {/* ── Single large card carousel ── */}
      <section className="py-20 sm:py-28 bg-primary">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-10 h-10 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
            </div>

          ) : reviews.length > 0 ? (
            <>
              {/* Title row */}
              <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <p className="font-body text-xs tracking-[0.28em] uppercase text-secondary mb-2">
                    {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                  </p>
                  <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-background">
                    Client Experiences
                  </h2>
                </div>
                <div className="flex items-center gap-5 self-start sm:self-auto">
                  {isAdmin && (
                    <button onClick={() => { sessionStorage.removeItem('adminAuth'); setIsAdmin(false) }}
                      className="font-body text-xs tracking-[0.15em] uppercase text-red-400 hover:text-red-600 transition-colors">
                      Exit Admin
                    </button>
                  )}
                  <a href="#review" className="inline-flex items-center gap-2 font-body text-sm text-secondary hover:gap-4 transition-all duration-300 tracking-wide group">
                    Leave a Review
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </FadeUp>

              {/* Card + navigation */}
              <FadeUp>
                <div
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                  {/* Animated card */}
                  <div className="relative">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={current}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                      >
                        <TestimonialCard
                          testimonial={review}
                          large
                          onModalChange={setPaused}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Admin edit button overlay */}
                    {isAdmin && (
                      <button onClick={() => openEdit(review)}
                        className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5
                          bg-secondary/20 hover:bg-secondary/40 text-secondary font-body
                          text-[10px] tracking-[0.15em] uppercase transition-colors border border-secondary/20">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-5 px-1">

                    {/* Prev / Next */}
                    <div className="flex items-center gap-2">
                      {[{ dir: -1, d: 'M15 19l-7-7 7-7' }, { dir: 1, d: 'M9 5l7 7-7 7' }].map(({ dir, d }) => (
                        <button key={dir} onClick={() => go(dir)}
                          aria-label={dir === -1 ? 'Previous' : 'Next'}
                          className="w-9 h-9 flex items-center justify-center
                            border border-white/10 text-white/30
                            hover:border-secondary/60 hover:text-secondary
                            transition-all duration-300">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={d} />
                          </svg>
                        </button>
                      ))}
                    </div>

                    {/* Dots */}
                    <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-[220px]">
                      {reviews.map((_, i) => (
                        <button key={i} aria-label={`Review ${i + 1}`}
                          onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                          className={`rounded-full transition-all duration-300 ${
                            i === current
                              ? 'w-5 h-1.5 bg-secondary shadow-[0_0_6px_rgba(184,150,12,0.8)]'
                              : 'w-1.5 h-1.5 bg-white/15 hover:bg-white/35'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Counter */}
                    <p className="font-body text-xs text-white/25 tabular-nums">
                      {String(current + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
                    </p>
                  </div>
                </div>
              </FadeUp>
            </>

          ) : (
            <FadeUp>
              <div className="max-w-lg mx-auto text-center py-12">
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-background mb-3">Be the First to Review</h2>
                <p className="font-body text-background/50 leading-relaxed">Share your experience and help others find their perfect home with Funto.</p>
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* ── Leave a review ── */}
      <section id="review" className="relative py-20 sm:py-28 bg-primary overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary/8 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-secondary/5 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            <FadeUp>
              <div className="text-center lg:text-left">
                <div className="hidden lg:block font-heading text-[160px] leading-none text-secondary/10 select-none -mb-12" aria-hidden>"</div>
                <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-5">Share Your Story</p>
                <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-background leading-tight mb-6">
                  Your Words<br /><span className="text-secondary">Change Lives.</span>
                </h2>
                <p className="font-body text-background/55 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                  Every review you leave gives a family the confidence to take the most important financial step of their lives.
                </p>
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
                <div className="mt-10 pt-10 border-t border-background/8 hidden lg:block">
                  <p className="font-accent italic text-background/35 text-sm leading-relaxed">
                    "I strive to earn and maintain your trust through transparent communication, sound advice, and unwavering dedication."
                  </p>
                  <p className="font-body text-secondary text-xs mt-3 tracking-wide">— Funto Oluyori</p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.18}>
              <div className="relative">
                <div className="absolute inset-0 bg-secondary/15 blur-2xl scale-95 pointer-events-none" />
                <div className="relative bg-background overflow-hidden shadow-2xl">
                  <div className="h-1.5 bg-gradient-to-r from-secondary/40 via-secondary to-secondary/40" />
                  <div className="px-7 pt-7 pb-3 border-b border-accent/40 bg-white">
                    <p className="font-body text-[10px] tracking-[0.28em] uppercase text-secondary mb-1">Testimonial Form</p>
                    <h3 className="font-heading text-2xl font-semibold text-primary">Leave a Review</h3>
                  </div>
                  <div className="p-7 sm:p-8">
                    <ReviewForm onSuccess={fetchReviews} />
                  </div>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── Admin Edit Modal ── */}
      <AnimatePresence>
        {editingReview && editForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/80 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) closeEdit() }}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full max-w-lg bg-background shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">

              <div className="flex items-center justify-between px-6 py-4 bg-primary">
                <div>
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-secondary">Admin</p>
                  <h3 className="font-heading text-xl text-background">Edit Review</h3>
                </div>
                <button onClick={closeEdit} className="text-background/40 hover:text-secondary transition-colors p-1">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  {[['Name','name'],['City','city']].map(([label, field]) => (
                    <div key={field}>
                      <label className="font-body text-[10px] tracking-[0.2em] uppercase text-primary/50 mb-1.5 block font-semibold">{label}</label>
                      <input value={editForm[field]} onChange={(e) => setEditForm(f => ({ ...f, [field]: e.target.value }))}
                        className="w-full px-3 py-2.5 border-2 border-accent/60 font-body text-sm text-primary focus:outline-none focus:border-secondary transition-colors" />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-primary/50 mb-2 block font-semibold">Role</label>
                  <div className="grid grid-cols-4 gap-2">
                    {typeOptions.map(opt => (
                      <button key={opt} type="button"
                        onClick={() => setEditForm(f => ({ ...f, type: f.type.includes(opt) ? f.type.filter(t => t !== opt) : [...f.type, opt] }))}
                        className={`py-2.5 font-body text-sm font-medium border-2 transition-all ${editForm.type.includes(opt) ? 'bg-secondary text-white border-secondary' : 'bg-white text-primary/60 border-accent/60 hover:border-secondary/50'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-primary/50 mb-2 block font-semibold">Rating</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(s => (
                      <button key={s} type="button" onClick={() => setEditForm(f => ({ ...f, stars: s }))} className="focus:outline-none">
                        <svg viewBox="0 0 20 20" className={`w-8 h-8 transition-colors ${s <= editForm.stars ? 'fill-secondary' : 'fill-primary/15'}`}>
                          <path d={StarPath} />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-body text-[10px] tracking-[0.2em] uppercase text-primary/50 mb-1.5 block font-semibold">Review Text</label>
                  <textarea value={editForm.quote} onChange={(e) => setEditForm(f => ({ ...f, quote: e.target.value }))} rows={4}
                    className="w-full px-3 py-2.5 border-2 border-accent/60 font-body text-sm text-primary focus:outline-none focus:border-secondary transition-colors resize-none" />
                </div>

                {editStatus === 'error' && (
                  <p className="font-body text-sm text-red-500 bg-red-50 px-4 py-3 border border-red-100">Something went wrong. Please try again.</p>
                )}
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-t border-accent/40 bg-white">
                <button onClick={handleEditDelete} disabled={editStatus === 'deleting' || editStatus === 'saving'}
                  className="font-body text-sm text-red-500 hover:text-red-700 transition-colors disabled:opacity-40">
                  {editStatus === 'deleting' ? 'Deleting…' : 'Delete Review'}
                </button>
                <div className="flex items-center gap-3">
                  <button onClick={closeEdit} className="font-body text-sm text-primary/50 hover:text-primary transition-colors px-2 py-1">Cancel</button>
                  <button onClick={handleEditSave} disabled={editStatus === 'saving' || editStatus === 'deleting' || editForm.type.length === 0}
                    className="px-6 py-2.5 bg-secondary text-white font-body text-sm font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-40">
                    {editStatus === 'saving' ? 'Saving…' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  )
}

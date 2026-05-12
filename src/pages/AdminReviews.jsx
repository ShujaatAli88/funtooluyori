import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ADMIN_PASSWORD = 'KWFunto2024'

export default function AdminReviews() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuth', 'true')
      navigate('/testimonials')
    } else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <main className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-secondary mb-2">Admin Access</p>
          <h1 className="font-heading text-3xl font-semibold text-background">Reviews Panel</h1>
          <p className="font-body text-background/35 text-sm mt-2">Enter your password to manage client reviews.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false) }}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3.5 bg-white/5 border-2 border-background/10 text-background font-body text-sm placeholder-background/20 focus:outline-none focus:border-secondary transition-colors"
          />
          {error && (
            <p className="font-body text-sm text-red-400">Incorrect password. Please try again.</p>
          )}
          <button
            type="submit"
            className="w-full py-4 bg-secondary text-white font-body text-sm font-semibold tracking-[0.1em] uppercase hover:bg-secondary/90 transition-colors"
          >
            Access Reviews
          </button>
        </form>
      </div>
    </main>
  )
}

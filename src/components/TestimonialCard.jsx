export default function TestimonialCard({ testimonial, variant = 'default' }) {
  const { name, city, type, stars, quote } = testimonial

  return (
    <article
      className={`bg-background border border-accent/60 p-7 sm:p-8 flex flex-col gap-5 ${
        variant === 'featured' ? 'sm:p-10' : ''
      }`}
    >
      {/* Stars */}
      <div className="flex gap-1" aria-label={`${stars} out of 5 stars`}>
        {Array.from({ length: stars }).map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 text-secondary fill-current"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="font-accent italic text-primary/70 text-base sm:text-lg leading-relaxed flex-1">
        "{quote}"
      </blockquote>

      {/* Client */}
      <footer className="flex items-center gap-3 pt-2 border-t border-accent">
        <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
          <span className="font-heading text-secondary text-sm font-semibold">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-body text-sm font-semibold text-primary">{name}</p>
          <p className="font-body text-xs text-primary/40 mt-0.5">
            {city} · {type}
          </p>
        </div>
      </footer>
    </article>
  )
}

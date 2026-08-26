/**
 * Eyebrow + title + optional lead paragraph.
 * align: 'left' | 'center'   invert: use on dark backgrounds
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
  invert = false,
  className = '',
}) {
  const alignment =
    align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'

  return (
    <div className={`flex max-w-2xl flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <span
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.14em] ${
            invert ? 'text-brand-200' : 'text-brand-700'
          }`}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={`text-3xl font-bold leading-tight sm:text-4xl ${
          invert ? 'text-white' : 'text-ink-900'
        }`}
      >
        {title}
      </h2>

      {lead && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            invert ? 'text-brand-100' : 'text-ink-600'
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  )
}

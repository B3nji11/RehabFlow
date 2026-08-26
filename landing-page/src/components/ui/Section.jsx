import Container from './Container.jsx'

/**
 * A page section with consistent vertical spacing.
 * tone: 'white' | 'muted' | 'brand'
 */
const tones = {
  white: 'bg-white',
  muted: 'bg-ink-50',
  brand: 'bg-brand-800 text-brand-50',
}

export default function Section({
  id,
  tone = 'white',
  className = '',
  children,
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-20 sm:py-28 ${tones[tone]} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  )
}

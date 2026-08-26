/**
 * Every CTA on the page is one of these. Renders an <a> because the whole site
 * is static - buttons go somewhere, they never submit anything.
 *
 * variant: 'primary' | 'secondary' | 'inverse' | 'link'
 * size:    'sm' | 'md' | 'lg'
 */
const variants = {
  primary:
    'bg-brand-700 text-white shadow-sm hover:bg-brand-800 active:bg-brand-900',
  secondary:
    'bg-white text-ink-900 ring-1 ring-ink-200 hover:bg-ink-50 hover:ring-ink-300',
  inverse: 'bg-white text-brand-800 shadow-sm hover:bg-brand-50',
  link: 'text-brand-700 hover:text-brand-800 underline-offset-4 hover:underline px-0 py-0',
}

const sizes = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  href = '#',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 whitespace-nowrap'
  const padding = variant === 'link' ? '' : sizes[size]

  return (
    <a
      href={href}
      className={`${base} ${padding} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}

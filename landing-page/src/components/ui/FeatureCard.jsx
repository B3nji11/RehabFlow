import Icon from './Icon.jsx'

/** Icon + title + body. Used by every feature grid on the page. */
export default function FeatureCard({ icon, title, children, className = '' }) {
  return (
    <div
      className={`group rounded-2xl border border-ink-200 bg-white p-6 transition-shadow duration-200 hover:shadow-[0_8px_30px_-12px_rgba(14,28,37,0.18)] ${className}`}
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <h3 className="mt-5 text-base font-semibold text-ink-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-600">{children}</p>
    </div>
  )
}

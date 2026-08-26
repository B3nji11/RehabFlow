import Icon from './Icon.jsx'

/**
 * One person in the leadership section.
 *
 * Props come straight from the `founders` array in config/site.js:
 *   { name, role, bio, photo?, linkedin? }
 *
 * `photo` is optional - without one the card shows the person's initials in a
 * brand-coloured circle, so the grid looks finished before the headshots exist.
 * To add a photo: drop the file in src/assets, import it in config/site.js and
 * set it as `photo`.
 */
function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default function FounderCard({
  name,
  role,
  bio,
  photo,
  linkedin,
  className = '',
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 transition-shadow duration-200 hover:shadow-[0_8px_30px_-12px_rgba(14,28,37,0.18)] ${className}`}
    >
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="h-16 w-16 rounded-full object-cover ring-1 ring-ink-200"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-lg font-bold text-brand-700 ring-1 ring-brand-100"
        >
          {initials(name)}
        </span>
      )}

      <div className="mt-5 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-ink-900">{name}</h3>
          <p className="mt-0.5 text-sm font-medium text-brand-700">{role}</p>
        </div>

        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="shrink-0 rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-ink-50 hover:text-brand-700"
          >
            <Icon name="linkedin" className="h-5 w-5" />
          </a>
        )}
      </div>

      {bio && (
        <p className="mt-3 text-sm leading-relaxed text-ink-600">{bio}</p>
      )}
    </div>
  )
}

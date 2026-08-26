/**
 * Inline SVG icon set - no icon library, no extra dependency, no network call.
 * Add a new one by dropping another entry into `paths`.
 */
const paths = {
  camera: (
    <>
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.2a1 1 0 0 0 .84-.46l.92-1.42A1 1 0 0 1 10.3 3.7h3.4a1 1 0 0 1 .84.42l.92 1.42a1 1 0 0 0 .84.46h1.2A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5z" />
      <circle cx="12" cy="12.2" r="3.4" />
    </>
  ),
  activity: <path d="M3 12.5h3.6l2.6-7 3.8 13 2.6-6h5.4" />,
  chart: (
    <>
      <path d="M4 19.5V5" />
      <path d="M4 19.5h16" />
      <path d="M8.5 16V11" />
      <path d="M13 16V7.5" />
      <path d="M17.5 16v-3" />
    </>
  ),
  clipboard: (
    <>
      <path d="M9 4.5h6a1 1 0 0 1 1 1V7H8V5.5a1 1 0 0 1 1-1z" />
      <path d="M8 6H6.8A1.8 1.8 0 0 0 5 7.8v11.4A1.8 1.8 0 0 0 6.8 21h10.4a1.8 1.8 0 0 0 1.8-1.8V7.8A1.8 1.8 0 0 0 17.2 6H16" />
      <path d="M9 12.5h6" />
      <path d="M9 16h4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6.2v5.1c0 4.3 2.9 8.1 7 9.2 4.1-1.1 7-4.9 7-9.2V6.2z" />
      <path d="M9.4 12.2l1.9 1.9 3.4-3.6" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2.8" width="10" height="18.4" rx="2.4" />
      <path d="M10.8 18.4h2.4" />
    </>
  ),
  users: (
    <>
      <circle cx="9.6" cy="8.4" r="3.2" />
      <path d="M3.8 19.6a5.8 5.8 0 0 1 11.6 0" />
      <path d="M16.2 6.1a3.2 3.2 0 0 1 0 5.9" />
      <path d="M17.6 14.6a5.8 5.8 0 0 1 2.6 5" />
    </>
  ),
  check: <path d="M5 12.6 9.6 17 19 7.4" />,
  arrowRight: (
    <>
      <path d="M4.5 12h14" />
      <path d="m13 6.5 5.5 5.5L13 17.5" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.4" width="16" height="15" rx="2.2" />
      <path d="M4 10h16" />
      <path d="M8.5 3.5v3.6" />
      <path d="M15.5 3.5v3.6" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M9.7 9.6a2.3 2.3 0 1 1 3.1 2.2c-.6.2-.9.8-.9 1.5" />
      <path d="M12 16.6h.01" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="3" />
      <path d="M8 10.6v6" />
      <path d="M8 7.9h.01" />
      <path d="M12.2 16.6v-6" />
      <path d="M12.2 13.4a2.6 2.6 0 0 1 5.2 0v3.2" />
    </>
  ),
  gauge: (
    <>
      <path d="M4.4 17a8.4 8.4 0 1 1 15.2 0" />
      <path d="M12 17l3.6-4.6" />
    </>
  ),
}

export default function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.7 }) {
  const path = paths[name]
  if (!path) return null

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {path}
    </svg>
  )
}

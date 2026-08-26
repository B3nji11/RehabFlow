import Icon from '../ui/Icon.jsx'

/* Illustrative mock of the patient view: a camera frame with the pose skeleton
   drawn over it and live feedback underneath. CSS + SVG only. */

export default function PhoneMock({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`relative mx-auto w-[248px] rounded-[2.2rem] border-[10px] border-ink-900 bg-ink-900 shadow-[0_30px_70px_-30px_rgba(14,28,37,0.6)] ${className}`}
    >
      <div className="overflow-hidden rounded-[1.5rem] bg-ink-800">
        {/* camera view */}
        <div className="relative h-[300px] bg-linear-to-b from-ink-700 to-ink-900">
          <svg
            viewBox="0 0 120 160"
            className="absolute inset-0 h-full w-full"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* skeleton */}
            <g className="text-brand-300" strokeWidth="2.4">
              <path d="M60 42v30" />
              <path d="M60 50 44 64" />
              <path d="M60 50l16 14" />
              <path d="M60 72 48 96" />
              <path d="M60 72l12 24" />
              <path d="M48 96 44 126" />
              <path d="M72 96l4 30" />
            </g>
            <g className="text-brand-200" fill="currentColor" stroke="none">
              {[
                [60, 36],
                [44, 64],
                [76, 64],
                [48, 96],
                [72, 96],
                [44, 126],
                [76, 126],
              ].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.6" />
              ))}
            </g>
            {/* highlighted knee angle */}
            <g className="text-white" strokeWidth="1.4" strokeDasharray="3 3">
              <path d="M48 96 62 96" />
            </g>
          </svg>

          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            Tracking
          </span>

          <span className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/95 px-3 py-2 text-[11px] font-medium text-ink-800 shadow-sm">
            <span className="flex items-center gap-2">
              <Icon name="check" className="h-3.5 w-3.5 text-brand-600" />
              Good depth — hold for 2 seconds
            </span>
          </span>
        </div>

        {/* rep counter */}
        <div className="flex items-center justify-between bg-white px-4 py-3">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-ink-400">
              Squat · set 2
            </p>
            <p className="text-sm font-bold text-ink-900">8 / 12 reps</p>
          </div>
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700">
            Form 88
          </span>
        </div>
      </div>
    </div>
  )
}

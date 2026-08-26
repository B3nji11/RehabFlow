import Icon from '../ui/Icon.jsx'

/* Illustrative mock of the physiotherapist dashboard, drawn in CSS + SVG.
   Not a screenshot - swap it for a real one once the dashboard exists. */

const week = [
  { day: 'M', done: 82 },
  { day: 'T', done: 100 },
  { day: 'W', done: 46 },
  { day: 'T', done: 92 },
  { day: 'F', done: 100 },
  { day: 'S', done: 0 },
  { day: 'S', done: 68 },
]

const exercises = [
  { name: 'Bodyweight squat', reps: '3 × 12', score: 88 },
  { name: 'Sit-to-stand', reps: '3 × 10', score: 74 },
  { name: 'Heel slide', reps: '2 × 15', score: 95 },
]

function scoreTone(score) {
  if (score >= 85) return 'bg-brand-100 text-brand-800'
  if (score >= 70) return 'bg-amber-100 text-amber-800'
  return 'bg-rose-100 text-rose-700'
}

export default function DashboardMock({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-[0_24px_70px_-30px_rgba(14,28,37,0.45)] ${className}`}
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-300" />
        <span className="ml-3 rounded-md bg-white px-2.5 py-1 text-[11px] font-medium text-ink-400 ring-1 ring-ink-200">
          Patient overview
        </span>
      </div>

      <div className="p-5 sm:p-6">
        {/* patient row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
              AL
            </span>
            <div>
              <p className="text-sm font-semibold text-ink-900">A. Lim</p>
              <p className="text-xs text-ink-500">ACL rehab · week 6 of 12</p>
            </div>
          </div>
          <span className="hidden rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100 sm:inline">
            On track
          </span>
        </div>

        {/* stat tiles */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { label: 'Adherence', value: '84%', hint: 'last 7 days' },
            { label: 'Form score', value: '86', hint: 'avg. this week' },
            { label: 'Flagged reps', value: '12', hint: 'needs review' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-ink-100 bg-ink-50/60 p-3"
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-ink-500">
                {stat.label}
              </p>
              <p className="mt-1 text-xl font-bold text-ink-900">{stat.value}</p>
              <p className="text-[11px] text-ink-400">{stat.hint}</p>
            </div>
          ))}
        </div>

        {/* weekly bars */}
        <div className="mt-5 rounded-xl border border-ink-100 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-ink-700">
              Sessions completed
            </p>
            <p className="text-[11px] text-ink-400">This week</p>
          </div>
          <div className="mt-4 flex h-24 items-end gap-2">
            {week.map((d, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-20 w-full items-end rounded-md bg-ink-100">
                  <div
                    className="w-full rounded-md bg-brand-500"
                    style={{ height: `${Math.max(d.done, 4)}%` }}
                  />
                </div>
                <span className="text-[10px] text-ink-400">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* exercise list */}
        <ul className="mt-4 space-y-2">
          {exercises.map((ex) => (
            <li
              key={ex.name}
              className="flex items-center justify-between rounded-xl border border-ink-100 px-4 py-3"
            >
              <span className="flex items-center gap-3">
                <Icon name="activity" className="h-4 w-4 text-brand-600" />
                <span className="text-sm font-medium text-ink-800">
                  {ex.name}
                </span>
                <span className="hidden text-xs text-ink-400 sm:inline">
                  {ex.reps}
                </span>
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${scoreTone(
                  ex.score,
                )}`}
              >
                {ex.score}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

import Section from '../ui/Section.jsx'
import Reveal from '../ui/Reveal.jsx'
import FounderCard from '../ui/FounderCard.jsx'
import { founders } from '../../config/site.js'

/* Vision + mission. Deliberately two short blocks - this page is a statement
   of intent, not an essay. */
const blocks = [
  {
    title: 'Our vision',
    body: 'Home rehabilitation that is measured rather than assumed, where every prescribed exercise leaves a record a physiotherapist can act on.',
  },
  {
    title: 'Our mission',
    body: 'To put objective movement feedback in the patient’s living room and the evidence it produces in the clinician’s hands — without adding hardware to either.',
  },
]

export default function WhyWeExist() {
  return (
    <Section>
      <Reveal>
        <h2 className="max-w-2xl text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
          Recovery happens where the physiotherapist isn’t
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">
          A physiotherapist gets an hour. The recovery takes the remaining hours —
          alone, unmeasured, and unreported until the next appointment.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {blocks.map((block, i) => (
          <Reveal key={block.title} delay={i * 100}>
            <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                {block.title}
              </span>
              <p className="mt-4 text-lg leading-relaxed text-ink-700">
                {block.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Leadership. Cards are driven by the `founders` array in config/site.js */}
      <div className="mt-20">
        <Reveal>
          <h2 className="text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
            Who is building it
          </h2>
        </Reveal>

        <div
          className={`mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4`}
        >
          {founders.map((person, i) => (
            <Reveal key={person.name} delay={i * 90}>
              <FounderCard {...person} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}

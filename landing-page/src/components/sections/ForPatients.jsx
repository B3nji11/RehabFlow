import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import Icon from '../ui/Icon.jsx'
import PhoneMock from '../mocks/PhoneMock.jsx'

const points = [
  {
    icon: 'camera',
    title: 'Corrections while it still matters',
    body: 'The camera tracks the joints that count for the movement and flags a rep the moment the angle drifts out of range.',
  },
  {
    icon: 'activity',
    title: 'Reps counted for them',
    body: 'No tallying on a notepad. Sets, reps and hold times are logged as they happen.',
  },
  {
    icon: 'phone',
    title: 'Nothing to wear, nothing to buy',
    body: 'A phone camera and enough floor space. No straps, no sensors, no wearables to charge.',
  },
]

export default function ForPatients() {
  return (
    <Section id="for-patients" tone="muted">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <SectionHeading
            align="left"
            eyebrow="For patients"
            title="Like having someone in the room"
            lead="Most people do not abandon their exercises because they stopped caring. They stop because they are not sure they are doing them right."
          />

          <ul className="mt-10 space-y-7">
            {points.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-700 ring-1 ring-ink-200">
                  <Icon name={p.icon} className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink-900">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-ink-600">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <PhoneMock />
        </Reveal>
      </div>
    </Section>
  )
}

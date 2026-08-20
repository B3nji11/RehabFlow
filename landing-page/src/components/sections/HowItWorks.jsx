import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import Icon from '../ui/Icon.jsx'

const steps = [
  {
    icon: 'clipboard',
    title: 'Prescribe',
    body: 'Build the programme in the dashboard — exercises, sets, reps, target range — and assign it to your patient in a couple of clicks.',
  },
  {
    icon: 'camera',
    title: 'Perform',
    body: 'At home, the patient props up a phone and works through the programme. RehabFlow reads their joint angles rep by rep and cues them as they go.',
  },
  {
    icon: 'chart',
    title: 'Review',
    body: 'Adherence, form scores and flagged reps are waiting in your dashboard — so the next session starts from evidence, not recollection.',
  },
]

export default function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Reveal>
        <SectionHeading
          eyebrow="How it works"
          title="Three steps, one continuous loop"
          lead="Prescribe in the clinic, perform at home, review before the next visit."
        />
      </Reveal>

      <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 110}>
            <li className="relative flex flex-col">
              {/* connector line between steps on desktop */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-14 top-6 hidden h-px w-[calc(100%-2rem)] bg-linear-to-r from-brand-200 to-transparent md:block"
                />
              )}

              <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-sm">
                <Icon name={step.icon} className="h-5 w-5" />
              </span>

              <span className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                Step {i + 1}
              </span>
              <h3 className="mt-2 text-xl font-bold text-ink-900">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-600">{step.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}

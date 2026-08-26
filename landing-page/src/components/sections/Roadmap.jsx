import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import FeatureCard from '../ui/FeatureCard.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import { contact } from '../../config/site.js'

const stages = [
  {
    icon: 'camera',
    label: 'Now',
    title: 'Teaching the model to see a movement',
    body: 'Form analysis on a first set of exercises, trained on physiotherapy data we record and label ourselves.',
  },
  {
    icon: 'chart',
    label: 'Next',
    title: 'The clinic dashboard, then the patient app',
    body: 'Programmes, adherence and form trends first — then the app that feeds them.',
  },
  {
    icon: 'users',
    label: 'After that',
    title: 'More movements, chosen with clinics',
    body: 'Widening to the protocols physiotherapists actually prescribe, in the order they need them.',
  },
]

export default function Roadmap() {
  return (
    <Section tone="muted">
      <Reveal>
        <SectionHeading
          eyebrow="Where we are going"
          title="What we are building, in order"
        />
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {stages.map((stage, i) => (
          <Reveal key={stage.label} delay={i * 90}>
            <FeatureCard
              icon={stage.icon}
              eyebrow={stage.label}
              title={stage.title}
              className="h-full"
            >
              {stage.body}
            </FeatureCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={220}>
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-ink-200 bg-white p-7 text-center">
          <h3 className="text-base font-semibold text-ink-900">
            We would rather build this with clinics than at them
          </h3>
          <p className="mt-3 leading-relaxed text-ink-600">
            We are early, and we would rather say so. If you run a practice and
            have opinions about what this should be, that is the conversation we
            want.
          </p>
          <Button
            href={`mailto:${contact.email}`}
            variant="secondary"
            className="mt-6"
          >
            Email us
            <Icon name="arrowRight" className="h-4 w-4" />
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}

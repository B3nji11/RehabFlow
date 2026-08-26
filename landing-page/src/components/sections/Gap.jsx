import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import FeatureCard from '../ui/FeatureCard.jsx'
import Reveal from '../ui/Reveal.jsx'

const problems = [
  {
    icon: 'question',
    title: 'Patients are guessing',
    body: 'A printed sheet cannot tell someone their form mistakes.',
  },
  {
    icon: 'calendar',
    title: 'The week in between is invisible',
    body: 'You find out what happened at the next appointment, from memory.',
  },
  {
    icon: 'gauge',
    title: 'Progress is anecdotal',
    body: 'Without movement data, adjusting a programme comes down to how the patient says they feel.',
  },
]

export default function Gap() {
  return (
    <Section tone="muted">
      <Reveal>
        <SectionHeading
          eyebrow="The problem"
          title="The hour in your clinic isn't the hard part."
          lead="Recovery happens at home, where nothing is watched and nothing is recorded."
        />
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {problems.map((p, i) => (
          <Reveal key={p.title} delay={i * 90}>
            <FeatureCard icon={p.icon} title={p.title} className="h-full">
              {p.body}
            </FeatureCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

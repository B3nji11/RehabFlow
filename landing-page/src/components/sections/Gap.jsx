import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import FeatureCard from '../ui/FeatureCard.jsx'
import Reveal from '../ui/Reveal.jsx'

const problems = [
  {
    icon: 'question',
    title: 'Patients are guessing',
    body: 'A printed sheet or a video link cannot tell someone their knee is caving in on rep nine. Away from the clinic, small errors go uncorrected and become habits.',
  },
  {
    icon: 'calendar',
    title: 'The week in between is invisible',
    body: 'You find out what actually happened at the next appointment, from memory. Missed sessions and bad technique only surface once progress has already stalled.',
  },
  {
    icon: 'gauge',
    title: 'Progress is anecdotal',
    body: 'Without objective movement data, adjusting a programme comes down to how the patient says they feel that morning.',
  },
]

export default function Gap() {
  return (
    <Section tone="muted">
      <Reveal>
        <SectionHeading
          eyebrow="The problem"
          title="The hour in your clinic isn't the hard part. The other 167 are."
          lead="Recovery happens at home, where nobody is watching the movement and nothing is being recorded."
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

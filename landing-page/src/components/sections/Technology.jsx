import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import FeatureCard from '../ui/FeatureCard.jsx'
import Reveal from '../ui/Reveal.jsx'

const cards = [
  {
    icon: 'camera',
    title: 'Pose landmarks',
    body: 'A pose model locates the body joints in every frame of the camera feed.',
  },
  {
    icon: 'gauge',
    title: 'Joint angles as the signal',
    body: 'Those landmarks become the angles that define the movement — knee, hip, trunk.',
  },
  {
    icon: 'shield',
    title: 'Trained on data we label ourselves',
    body: 'Correct and incorrect executions of the same exercise, labelled in-house the way a clinician would judge them.',
  },
]

export default function Technology() {
  return (
    <Section id="technology" tone="muted">
      <Reveal>
        <SectionHeading
          eyebrow="Under the hood"
          title="How the form analysis works"
          lead="No wearables, no manual scoring — just the camera you already own."
        />
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 90}>
            <FeatureCard icon={c.icon} title={c.title} className="h-full">
              {c.body}
            </FeatureCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import FeatureCard from '../ui/FeatureCard.jsx'
import Reveal from '../ui/Reveal.jsx'

const cards = [
  {
    icon: 'camera',
    title: 'Pose landmarks, not guesswork',
    body: 'A pose model locates the body joints in each frame of the camera feed, giving a 3D skeleton to measure rather than a flat picture.',
  },
  {
    icon: 'gauge',
    title: 'Joint angles as the signal',
    body: 'Those landmarks are reduced to the angles that define the movement — knee, hip, trunk — which is what the classifier actually reads.',
  },
  {
    icon: 'shield',
    title: 'Trained on data we label ourselves',
    body: 'The models learn from physiotherapy movement data we record and label in-house - correct and incorrect executions of the same exercise - so the scoring reflects how a clinician actually judges the movement.',
  },
]

export default function Technology() {
  return (
    <Section id="technology" tone="muted">
      <Reveal>
        <SectionHeading
          eyebrow="Under the hood"
          title="How the form analysis works"
          lead="No wearables and no manual scoring — just the camera you already own and a model that has seen the movement done both ways."
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

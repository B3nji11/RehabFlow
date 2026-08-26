import Section from '../ui/Section.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import DashboardMock from '../mocks/DashboardMock.jsx'
import { links } from '../../config/site.js'

const points = [
  {
    icon: 'users',
    title: 'Your caseload on one screen',
    body: 'See who is keeping up and who has gone quiet.',
  },
  {
    icon: 'chart',
    title: 'Form quality over time',
    body: 'Track a movement week to week, not from one rep in front of you.',
  },
  {
    icon: 'clipboard',
    title: 'Adjust from evidence',
    body: 'Change sets, reps or targets on what the data actually shows.',
  },
]

export default function ForClinics() {
  return (
    <Section id="for-clinics">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <DashboardMock />
        </Reveal>

        <Reveal delay={120}>
          <SectionHeading
            align="left"
            eyebrow="For physiotherapists"
            title="See the other six days of the week"
            lead="Home rehab stops being a black box you have to ask about."
          />

          <ul className="mt-10 space-y-7">
            {points.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
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

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={links.signup} size="lg">
              Create a clinic account
            </Button>
            <Button href={links.login} variant="secondary" size="lg">
              Log in
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

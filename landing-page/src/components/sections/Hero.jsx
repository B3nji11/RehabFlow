import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import Reveal from '../ui/Reveal.jsx'
import DashboardMock from '../mocks/DashboardMock.jsx'
import { links } from '../../config/site.js'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white pt-16 sm:pt-20">
      {/* soft accent wash behind the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-linear-to-b from-brand-50 to-white"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-200">
              <Icon name="activity" className="h-3.5 w-3.5" />
              For private physiotherapy clinics
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.08] text-ink-900 sm:text-5xl lg:text-[3.4rem]">
              Rehab doesn&rsquo;t stop when the appointment does.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
              AI form analysis coaches your patients through their home
              exercises. Your dashboard shows what actually happened in between
              &mdash; adherence, form quality, the reps that went wrong.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={links.signup} size="lg">
                Get started
                <Icon name="arrowRight" className="h-4 w-4" />
              </Button>
              <Button href="#how-it-works" variant="secondary" size="lg">
                See how it works
              </Button>
            </div>

            <p className="mt-5 text-sm text-ink-500">
              Already using RehabFlow?{' '}
              <a
                href={links.login}
                className="font-semibold text-brand-700 underline-offset-4 hover:underline"
              >
                Log in to your dashboard
              </a>
            </p>
          </Reveal>

          <Reveal delay={120}>
            <DashboardMock />
          </Reveal>
        </div>

        {/* Claim-free product facts. No datasets, no logos, no statistics. */}
        <div className="mt-16 border-t border-ink-100 py-8 sm:mt-20">
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              'Works with any phone camera',
              'No wearables or sensors',
              'Programmes set by your physiotherapist',
            ].map((fact) => (
              <li
                key={fact}
                className="flex items-center gap-2 text-sm font-medium text-ink-500"
              >
                <Icon name="check" className="h-4 w-4 text-brand-600" />
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

import Section from '../ui/Section.jsx'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import Reveal from '../ui/Reveal.jsx'
import { links } from '../../config/site.js'

export default function CTASection() {
  return (
    <Section tone="brand" className="relative overflow-hidden">
      <Reveal className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
          Close the gap between appointments
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-brand-100">
          Set up your clinic and assign your first programme.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href={links.signup} variant="inverse" size="lg">
            Get started
            <Icon name="arrowRight" className="h-4 w-4" />
          </Button>
          <Button
            href={links.demo}
            size="lg"
            className="bg-transparent text-white ring-1 ring-brand-300 hover:bg-brand-700"
          >
            Book a demo
          </Button>
        </div>

        <p className="mt-6 text-sm text-brand-200">
          Existing clinic?{' '}
          <a
            href={links.login}
            className="font-semibold text-white underline-offset-4 hover:underline"
          >
            Log in
          </a>
        </p>
      </Reveal>
    </Section>
  )
}

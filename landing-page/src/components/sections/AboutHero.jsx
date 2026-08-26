import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-4 sm:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-linear-to-b from-brand-50 to-white"
      />

      <Container className="relative">
        <Reveal className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
            About
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.1] text-ink-900 sm:text-5xl">
            Closing the gap between the clinic and the living room
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-ink-600">
            RehabFlow is an early-stage company building software for private
            physiotherapy clinics. We work on one problem: the days between
            appointments, where recovery actually happens and nobody is
            watching.
          </p>
        </Reveal>
      </Container>
    </section>
  )
}

import { useEffect, useState } from 'react'
import Container from '../ui/Container.jsx'
import Button from '../ui/Button.jsx'
import Logo from '../ui/Logo.jsx'
import Icon from '../ui/Icon.jsx'
import { links, nav } from '../../config/site.js'

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'border-b border-ink-100 bg-white/90 backdrop-blur-sm'
          : 'border-b border-transparent bg-white'
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#top" aria-label="RehabFlow home">
          <Logo />
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-ink-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button href={links.login} variant="link" className="text-sm">
            Log in
          </Button>
          <Button href={links.signup}>Get started</Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 ring-1 ring-ink-200 md:hidden"
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-ink-100 bg-white md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button href={links.signup} size="lg">
                Get started
              </Button>
              <Button href={links.login} variant="secondary" size="lg">
                Log in
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}

import Container from '../ui/Container.jsx'
import Logo from '../ui/Logo.jsx'
import { contact, footerNav } from '../../config/site.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink-100 bg-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
              A digital platform for private physiotherapy clinics — AI form
              analysis for patients at home, and a progress dashboard for the
              physiotherapists treating them.
            </p>
          </div>

          {footerNav.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-900">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-ink-500 transition-colors hover:text-brand-700"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-400">
            &copy; {year} RehabFlow. All rights reserved.
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="text-sm text-ink-500 transition-colors hover:text-brand-700"
          >
            {contact.email}
          </a>
        </div>
      </Container>
    </footer>
  )
}

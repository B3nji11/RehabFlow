# RehabFlow — landing page

Static marketing site. **No backend.** It builds to plain HTML/CSS/JS and links
out to the physiotherapist dashboard once that exists.

## Run it

```bash
cd landing-page
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/  (deploy this folder anywhere: Vercel, Netlify, S3, nginx)
npm run preview  # serve the built dist/ locally
```

Requires Node 20.19+ or 22.12+ (Vite 8).

## Stack

| | |
|---|---|
| React | 19.2 |
| Vite | 8.2 |
| Tailwind CSS | 4.3 (via `@tailwindcss/vite` — no `tailwind.config.js`, no PostCSS config) |

Tailwind v4 is CSS-first: the design tokens live in the `@theme` block at the
top of `src/index.css`. Change a colour there and it changes site-wide.

## Wiring up the app (the only file you need to touch)

`src/config/site.js` holds every outbound link:

```js
export const links = {
  login:  '#',   // -> dashboard login
  signup: '#',   // -> clinic sign-up
  app:    '#',   // -> dashboard root
  demo:   '#',   // -> demo booking
  ...
}
```

Replace the `#` placeholders and every CTA on the page updates. Nav items and
footer columns are defined in the same file.

## Brand

The palette in `src/index.css` is sampled from the logo:

| token | hex | where it comes from |
|---|---|---|
| `--color-brand-400` | `#35c6ba` | bright teal of the running figure |
| `--color-brand-700` | `#0c7570` | buttons and links — 5.5:1 on white, passes WCAG AA |
| `--color-brand-800` | `#125f66` | deep teal of the lower infinity loop; the CTA band |
| `--color-ink-800`   | `#2f3e43` | the grey of the "rehab" wordmark |

Logo assets (transparent PNGs, trimmed, retina-sized):

- `src/assets/rehabflow-wordmark.png` — mark + wordmark, used in the header and footer
- `src/assets/rehabflow-mark.png` — symbol only
- `public/favicon.png`, `public/apple-touch-icon.png`

`<Logo />` renders the wordmark; `<Logo variant="mark" />` renders the symbol.
Both assets are dark-on-light — if the logo ever needs to sit on a dark
background, export a white version and add it as a third variant in
`ui/Logo.jsx` rather than CSS-filtering this one.

## Structure

```
landing-page/
├── index.html              page shell, <title>, meta/OG tags, font preload
├── vite.config.js
├── public/                 favicons (served as-is from the site root)
└── src/
    ├── index.css           Tailwind import + @theme design tokens + base styles
    ├── main.jsx            React entry
    ├── App.jsx             section order lives here
    ├── assets/             logo files (imported, so Vite hashes them)
    ├── config/site.js      links, nav, footer  ← edit this one
    └── components/
        ├── ui/             Button, Section, SectionHeading, Container,
        │                   FeatureCard, Icon, Logo, Reveal (scroll animation)
        ├── sections/       NavBar, Hero, Gap, HowItWorks, ForPatients,
        │                   ForClinics, Technology, CTASection, Footer
        └── mocks/          DashboardMock, PhoneMock — CSS/SVG product
                            illustrations, NOT screenshots
```

Reordering the page = reordering the JSX in `App.jsx`. Adding an icon = adding
one entry to the `paths` object in `ui/Icon.jsx` (no icon library dependency).

## Before this goes public

- [ ] Replace the `#` placeholders in `src/config/site.js`
- [ ] Confirm `hello@rehabflows.com` is a real inbox (used in the footer)
- [ ] Swap `mocks/DashboardMock.jsx` and `mocks/PhoneMock.jsx` for real product
      screenshots once the dashboard and patient app exist
- [ ] Build the About / Privacy / Terms pages, or delete those footer rows
- [ ] Set the real production URL in the OG tags in `index.html`
- [ ] Delete the now-unused `public/favicon.svg` placeholder
- [ ] **Check the one claim on the page that is about the future, not the
      present:** the third card in `sections/Technology.jsx` says the models are
      trained on movement data recorded and labelled in-house. The `ml/`
      pipeline currently trains on public datasets, so that has to be true
      before the page is published — or reword the card.

The page contains no statistics, testimonials or client logos, invented or
otherwise. Add them only when you have real ones.

## Notes

- No `localStorage`, no analytics, no cookies — nothing to disclose yet. Add a
  banner if you add tracking.
- Animations are gated behind `prefers-reduced-motion` in `index.css`.
- Anchor scrolling accounts for the sticky header via `scroll-padding-top`.

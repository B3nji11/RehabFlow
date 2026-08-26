/* ---------------------------------------------------------------------------
   THE ONE FILE TO EDIT WHEN THE APP GOES LIVE.

   Every call-to-action on the page reads its href from here, so wiring the
   landing page to the real dashboard is a three-line change - no hunting
   through components.
--------------------------------------------------------------------------- */

export const links = {
  // TODO: point at the physiotherapist dashboard login  e.g. 'https://app.rehabflows.com/login'
  login: '#',
  // TODO: point at clinic sign-up                       e.g. 'https://app.rehabflows.com/signup'
  signup: '#',
  // TODO: point at the dashboard root                   e.g. 'https://app.rehabflows.com'
  app: '#',
  // TODO: demo booking (Cal.com / Calendly / a mailto: is fine to start)
  demo: '#',
  // TODO: patient mobile app stores, once published
  appStore: '#',
  playStore: '#',
}

export const contact = {
  email: 'jordon.lye@rehabflows.com', // TODO: confirm this inbox exists before launch
}

// Section anchors are written root-absolute ('/#id') so the same nav works
// from the home page and from /about/.
/* ---------------------------------------------------------------------------
   Leadership shown on /about/, rendered by ui/FounderCard.jsx.

   photo    optional. Drop the image in src/assets, import it at the top of
            this file, and set it here. Without one the card falls back to the
            person's initials in a brand circle.
   linkedin optional. Delete the key to hide the icon.
--------------------------------------------------------------------------- */
export const founders = [
  {
    name: 'Jordon Lye',
    role: 'Founder', 
    bio: 'XXXXXXXXXXXXXXXXXXX',
    photo: null,
    linkedin: '', 
  },
  {
    name: 'Kaiser Ho',
    role: 'Co-Founder',
    bio: 'XXXXXXXXXXXXXXXXXXXX',
    photo: null,
    linkedin: ''
  },
  {
    name: 'Aidan',
    role: 'Co-Founder',
    bio: 'XXXXXXXXXXXXXXXXXXXX',
    photo: null,
    linkedin: ''
  },
  {
    name: 'Kai Jin',
    role: 'Co-Founder',
    bio: 'XXXXXXXXXXXXXXXXXXXX',
    photo: null,
    linkedin: ''
  }
]

export const nav = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'For patients', href: '/#for-patients' },
  { label: 'For clinics', href: '/#for-clinics' },
  { label: 'Technology', href: '/#technology' },
  { label: 'About', href: '/about/' }
]

export const footerNav = [
  {
    title: 'Product',
    items: [
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'For patients', href: '/#for-patients' },
      { label: 'For clinics', href: '/#for-clinics' },
      { label: 'Technology', href: '/#technology' },
    ],
  },
  {
    title: 'Clinics',
    items: [
      { label: 'Book a demo', href: links.demo },
      { label: 'Sign up', href: links.signup },
      { label: 'Log in', href: links.login },
    ],
  },
  {
    title: 'Company',
    items: [
      // TODO: build these pages, or delete the rows until they exist
      { label: 'About', href: '/about/' },
      { label: 'Contact', href: `mailto:${contact.email}` },
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
]

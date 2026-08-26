import NavBar from './components/sections/NavBar.jsx'
import AboutHero from './components/sections/AboutHero.jsx'
import WhyWeExist from './components/sections/WhyWeExist.jsx'
import Roadmap from './components/sections/Roadmap.jsx'
import CTASection from './components/sections/CTASection.jsx'
import Footer from './components/sections/Footer.jsx'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main>
        <AboutHero />
        <WhyWeExist />
        <Roadmap />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

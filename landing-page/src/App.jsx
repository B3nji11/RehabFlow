import NavBar from './components/sections/NavBar.jsx'
import Hero from './components/sections/Hero.jsx'
import Gap from './components/sections/Gap.jsx'
import HowItWorks from './components/sections/HowItWorks.jsx'
import ForPatients from './components/sections/ForPatients.jsx'
import ForClinics from './components/sections/ForClinics.jsx'
import Technology from './components/sections/Technology.jsx'
import CTASection from './components/sections/CTASection.jsx'
import Footer from './components/sections/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main>
        <Hero />
        <Gap />
        <HowItWorks />
        <ForPatients />
        <ForClinics />
        <Technology />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

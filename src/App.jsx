import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'

function App() {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <main className="relative">
        <Hero />
        <Services />
        <Portfolio />
        <Contact />
        <footer className="bg-black/80 border-t border-emerald-500/10 py-10">
          <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
            <p className="text-emerald-300/70 text-sm">© {new Date().getFullYear()} NEON AGENCY</p>
            <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App

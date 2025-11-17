import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'

function App() {
  return (
    <div className="bg-black text-white relative">
      {/* subtle grain across the whole app */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] opacity-10 mix-blend-soft-light bg-[length:200px_200px] bg-repeat"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'256\' height=\'256\' viewBox=\'0 0 256 256\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'256\' height=\'256\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      <Navbar />
      <main className="relative z-[2]">
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

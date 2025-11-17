import { useState } from 'react'
import { Menu } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const scrollToId = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16">
        <div className="relative h-full flex items-center justify-between rounded-2xl border border-emerald-400/15 bg-white/5 backdrop-blur-2xl shadow-[0_0_40px_rgba(16,185,129,0.15)] px-4">
          <div onClick={() => scrollToId('home')} className="cursor-pointer select-none">
            <span className="text-emerald-400 font-semibold tracking-widest">NEON</span>
            <span className="text-white ml-1">AGENCY</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {[
              { id: 'services', label: 'Сервисы' },
              { id: 'work', label: 'Портфолио' },
              { id: 'contact', label: 'Контакт' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="text-emerald-200/80 hover:text-emerald-200 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button className="md:hidden text-emerald-300" onClick={() => setOpen((v) => !v)}>
            <Menu />
          </button>
          {/* top glass highlight */}
          <div className="pointer-events-none absolute left-4 right-4 -top-6 h-10 rounded-2xl bg-white/10 blur-2xl" />
        </div>
      </div>
      {open && (
        <div className="md:hidden mx-auto max-w-7xl px-4">
          <div className="mt-2 rounded-2xl border border-emerald-400/15 bg-white/5 backdrop-blur-2xl">
            <div className="px-4 py-3 space-y-2">
              {[
                { id: 'services', label: 'Сервисы' },
                { id: 'work', label: 'Портфолио' },
                { id: 'contact', label: 'Контакт' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToId(item.id)}
                  className="block w-full text-left text-emerald-200/80 hover:text-emerald-200"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-emerald-500/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div onClick={() => scrollToId('home')} className="cursor-pointer">
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
              className="text-emerald-300/80 hover:text-emerald-300 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button className="md:hidden text-emerald-300" onClick={() => setOpen((v) => !v)}>
          <Menu />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-emerald-500/10 bg-black/70">
          <div className="px-4 py-3 space-y-2">
            {[
              { id: 'services', label: 'Сервисы' },
              { id: 'work', label: 'Портфолио' },
              { id: 'contact', label: 'Контакт' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="block w-full text-left text-emerald-300/80 hover:text-emerald-300"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

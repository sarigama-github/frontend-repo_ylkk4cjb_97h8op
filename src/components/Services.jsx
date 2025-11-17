import { motion } from 'framer-motion'
import { Star, Rocket, LineChart } from 'lucide-react'

const services = [
  {
    icon: Rocket,
    title: 'Запуск и масштабирование',
    desc: 'Go-to-market, performance-маркетинг, аналитика и A/B тесты',
  },
  {
    icon: Star,
    title: 'Брендинг и 3D визуал',
    desc: 'Айдентика, UI-киты, 3D-сцены и микро-анимации интерфейса',
  },
  {
    icon: LineChart,
    title: 'Стратегия роста',
    desc: 'Аудит воронки, CRO, контент-стратегии и SEO',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative bg-black py-24">
      <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent,rgba(16,185,129,0.06))]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-semibold text-white"
        >
          Сервисы
        </motion.h2>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-white/[0.03] backdrop-blur-xl p-6 hover:border-emerald-400/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            >
              <s.icon className="h-6 w-6 text-emerald-300" />
              <h3 className="mt-3 text-white font-medium">{s.title}</h3>
              <p className="mt-2 text-emerald-200/80 text-sm">{s.desc}</p>
              {/* glass shine */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="pointer-events-none absolute left-4 right-4 -top-6 h-10 rounded-2xl bg-white/10 blur-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

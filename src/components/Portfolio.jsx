import { motion } from 'framer-motion'

const projects = [
  {
    title: 'NeonPay',
    tag: 'Fintech',
    img: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'OmniCloud',
    tag: 'SaaS',
    img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop',
  },
  {
    title: 'Volt Mobility',
    tag: 'Mobility',
    img: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
  },
]

export default function Portfolio() {
  return (
    <section id="work" className="relative bg-black py-24">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(16,185,129,0.06))]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-semibold text-white"
        >
          Кейсы
        </motion.h2>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/5"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">{p.title}</h3>
                  <p className="text-emerald-300/80 text-sm">{p.tag}</p>
                </div>
                <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

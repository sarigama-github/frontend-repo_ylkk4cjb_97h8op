import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="relative bg-black py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-semibold text-white"
        >
          Свяжитесь с нами
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-10 grid md:grid-cols-3 gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            alert('Спасибо! Мы свяжемся с вами в ближайшее время.')
          }}
        >
          <input className="md:col-span-1 px-4 py-3 rounded-lg bg-white/5 border border-emerald-500/20 text-white placeholder:text-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" placeholder="Имя" />
          <input type="email" className="md:col-span-1 px-4 py-3 rounded-lg bg-white/5 border border-emerald-500/20 text-white placeholder:text-emerald-300/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" placeholder="Email" />
          <button className="md:col-span-1 px-6 py-3 rounded-lg bg-emerald-500 text-black font-medium shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:shadow-[0_0_50px_rgba(16,185,129,0.8)] transition-shadow">Отправить</button>
        </motion.form>

        <p className="mt-6 text-emerald-300/70 text-sm">Мы отвечаем в течение 24 часов.</p>
      </div>
    </section>
  )
}

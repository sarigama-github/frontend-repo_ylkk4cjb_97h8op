import Spline from '@splinetool/react-spline'
import { motion, useScroll, useTransform, useMotionValue, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 60])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const glow = useTransform(scrollYProgress, [0, 1], [0.4, 1])

  // Interactive hover tilt
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)

  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    // ease back to 0 when not interacting
    const controlsX = animate(tiltX, 0, { duration: 0.6, ease: 'easeOut' })
    const controlsY = animate(tiltY, 0, { duration: 0.6, ease: 'easeOut' })
    return () => {
      controlsX.stop()
      controlsY.stop()
    }
  }, [])

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width // 0..1
    const y = (e.clientY - rect.top) / rect.height // 0..1
    const maxTilt = 8 // deg
    tiltY.set((x - 0.5) * maxTilt) // rotateY
    tiltX.set((0.5 - y) * maxTilt) // rotateX
  }

  const handleLeave = () => {
    animate(tiltX, 0, { duration: 0.6, ease: 'easeOut' })
    animate(tiltY, 0, { duration: 0.6, ease: 'easeOut' })
  }

  return (
    <section id="home" ref={ref} className="relative h-[100svh] overflow-hidden bg-black">
      {/* 3D Canvas Layer */}
      <div
        className="absolute inset-0 z-0 [perspective:900px]"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <motion.div
          style={{ rotateX: tiltX, rotateY: tiltY, scale }}
          className="h-full w-full will-change-transform"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        >
          {!fallback ? (
            <Spline
              scene="https://prod.spline.design/FduaNp3csZktbOi3/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
              onError={() => setFallback(true)}
            />
          ) : (
            // Fallback animated glassy shape
            <div className="absolute inset-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vmin] h-[120vmin] rounded-[40%] bg-[conic-gradient(from_180deg,rgba(16,185,129,0.25),transparent_30%,rgba(16,185,129,0.15),transparent_70%)] blur-3xl"
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Neon/Glass overlays */}
      <motion.div
        style={{ rotateZ: rotate, opacity: glow }}
        className="pointer-events-none absolute -right-24 top-24 z-[1] w-80 h-80 rounded-full blur-3xl bg-emerald-500/20"
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.18),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.14),transparent_40%)]" />

      {/* Glass hero content card */}
      <div className="relative z-20 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full max-w-2xl rounded-3xl border border-emerald-400/20 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(16,185,129,0.18)] p-8 sm:p-10"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight text-white drop-shadow-[0_0_40px_rgba(16,185,129,0.25)]">
              Digital-агентство
              <span className="block text-emerald-400">для эпохи неона</span>
            </h1>

            <p className="mt-6 max-w-xl text-emerald-200/90">
              Создаём бренды и продукты с технологичной эстетикой: стратегия, перфоманс, 3D и интерактив.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <a href="#contact" className="px-6 py-3 rounded-xl bg-emerald-500 text-black font-medium shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:shadow-[0_0_50px_rgba(16,185,129,0.9)] transition-shadow">Начать проект</a>
              <a href="#work" className="px-6 py-3 rounded-xl border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 transition-colors">Портфолио</a>
            </div>

            {/* subtle glass highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl [mask-image:linear-gradient(to_bottom,white,transparent_80%)]">
              <div className="absolute -top-16 left-10 right-10 h-32 rounded-3xl bg-white/10 blur-2xl" />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

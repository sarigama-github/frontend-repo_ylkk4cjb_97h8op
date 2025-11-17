import Spline from '@splinetool/react-spline'
import { motion, useScroll, useTransform, useMotionValue, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45])
  const glow = useTransform(scrollYProgress, [0, 1], [0.4, 1])

  // Interactive hover tilt
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)

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
    const maxTilt = 6 // deg
    tiltY.set((x - 0.5) * maxTilt) // rotateY
    tiltX.set((0.5 - y) * maxTilt) // rotateX
  }

  const handleLeave = () => {
    animate(tiltX, 0, { duration: 0.6, ease: 'easeOut' })
    animate(tiltY, 0, { duration: 0.6, ease: 'easeOut' })
  }

  return (
    <section id="home" ref={ref} className="relative h-[100svh] overflow-hidden bg-black">
      {/* Perspective container for 3D tilt */}
      <div
        className="absolute inset-0 [perspective:900px]"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <motion.div
          style={{ rotateX: tiltX, rotateY: tiltY }}
          className="h-full w-full will-change-transform"
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        >
          <Spline scene="https://prod.spline.design/FduaNp3csZktbOi3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </motion.div>
      </div>

      {/* Gradient overlays for neon feel */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.25),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.18),transparent_40%)]" />

      {/* Heading content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight text-white drop-shadow-[0_0_40px_rgba(16,185,129,0.25)]"
          >
            Digital-агентство
            <span className="block text-emerald-400">для эпохи неона</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
            className="mt-6 max-w-xl text-emerald-200/80"
          >
            Создаём бренды и продукты с технологичной эстетикой: стратегия, перфоманс, 3D и интерактив.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="mt-10 flex items-center gap-4"
          >
            <a href="#contact" className="px-6 py-3 rounded-lg bg-emerald-500 text-black font-medium shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:shadow-[0_0_50px_rgba(16,185,129,0.8)] transition-shadow">Начать проект</a>
            <a href="#work" className="px-6 py-3 rounded-lg border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 transition-colors">Портфолио</a>
          </motion.div>
        </div>
      </div>

      {/* Subtle parallax glow controlled by scroll */}
      <motion.div
        style={{ rotateZ: rotate, opacity: glow }}
        className="pointer-events-none absolute -right-24 top-24 w-72 h-72 rounded-full blur-3xl bg-emerald-500/20"
      />
    </section>
  )
}

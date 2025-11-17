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

  const sceneUrl = import.meta.env.VITE_SPLINE_SCENE || 'https://prod.spline.design/6c8bvk0f2c7wDc9y/scene.splinecode'

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
              scene={sceneUrl}
              style={{ width: '100%', height: '100%' }}
              onError={() => setFallback(true)}
            />
          ) : (
            // Fallback: faceted red crystal-like shape with neon glow
            <div className="absolute inset-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative w-[80vmin] h-[80vmin]">
                  {/* Outer glow */}
                  <div className="absolute inset-0 rounded-[30%] blur-3xl bg-[radial-gradient(closest-side,rgba(239,68,68,0.35),transparent_70%)]" />
                  {/* Faceted core */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[46vmin] h-[60vmin] [clip-path:polygon(50%_0%,80%_20%,100%_55%,70%_100%,30%_100%,0%_55%,20%_20%)] bg-gradient-to-b from-red-500/90 via-red-500/70 to-red-400/50 shadow-[0_0_60px_rgba(239,68,68,0.35),inset_0_0_40px_rgba(255,255,255,0.12)] backdrop-blur-xl" />
                  {/* Highlight shards */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vmin] h-[52vmin] [clip-path:polygon(50%_3%,75%_22%,90%_56%,65%_96%,35%_96%,10%_56%,25%_22%)] bg-white/6" />
                  <div className="absolute left-1/2 top-[32%] -translate-x-1/2 w-[22vmin] h-[10vmin] rotate-6 [clip-path:polygon(0_0,100%_0,70%_100%,30%_100%)] bg-white/14 blur-[2px]" />
                  {/* Inner glow pulse */}
                  <motion.div
                    aria-hidden
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[24vmin] h-[24vmin] rounded-full bg-red-400/30 blur-2xl"
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.05, 0.9] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Neon/Glass overlays */}
      <motion.div
        style={{ rotateZ: rotate, opacity: glow }}
        className="pointer-events-none absolute -right-24 top-24 z-[1] w-80 h-80 rounded-full blur-3xl bg-red-500/20"
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.18),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_bottom_left,rgba(239,68,68,0.14),transparent_40%)]" />

      {/* Glass hero content card */}
      <div className="relative z-20 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full max-w-2xl rounded-3xl border border-emerald-400/20 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(16,185,129,0.18)] p-8 sm:p-10"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold leading-tight text-white drop-shadow-[0_0_40px_rgba(239,68,68,0.25)]">
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

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import data from '../data/portfolio.json'

// A refined, minimal preloader: a monogram mark, the name revealing
// letter by letter, a slim progress line, and a discreet counter.
// Wipes upward in panels to reveal the hero.
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const name = data.meta.name

  useEffect(() => {
    let current = 0
    const tick = () => {
      const step = Math.max(2, Math.round((100 - current) / 14))
      current = Math.min(100, current + step)
      setCount(current)
      if (current < 100) setTimeout(tick, 40 + Math.random() * 35)
      else setTimeout(() => setDone(true), 350)
    }
    const id = setTimeout(tick, 200)
    return () => clearTimeout(id)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* soft glow behind */}
          <div className="pointer-events-none absolute h-[40vw] w-[40vw] rounded-full bg-violet/15 blur-[120px]" />

          {/* monogram */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-8"
          >
            <svg width="76" height="76" viewBox="0 0 100 100" className="overflow-visible">
              <defs>
                <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#7c3aed" />
                  <stop offset="0.5" stopColor="#06b6d4" />
                  <stop offset="1" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <motion.path
                d="M30 72 L50 26 L70 72 M38 58 L62 58"
                fill="none"
                stroke="url(#pg)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              />
            </svg>
          </motion.div>

          {/* name reveal */}
          <div className="relative mb-12 flex overflow-hidden">
            {name.split('').map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display text-2xl font-bold tracking-wide md:text-3xl"
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            ))}
          </div>

          {/* progress line + counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex w-64 items-center gap-4 md:w-80"
          >
            <div className="h-px flex-1 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-violet via-cyan to-pink"
                style={{ width: `${count}%` }}
              />
            </div>
            <span className="w-10 text-right font-mono text-xs tabular-nums text-mist">
              {count.toString().padStart(2, '0')}
            </span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-5 font-mono text-[10px] uppercase tracking-[0.4em] text-mist/60"
          >
            {data.meta.role}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import HeroScene from './three/HeroScene'
import Magnetic from './Magnetic'
import { scrollTo } from '../hooks/useSmoothScroll'
import data from '../data/portfolio.json'

const reveal = {
  hidden: { y: '120%' },
  show: (i) => ({
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 + i * 0.12 },
  }),
}

function RotatingWord({ words }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % words.length), 2400)
    return () => clearInterval(id)
  }, [words.length])
  return (
    <span className="relative inline-block align-top overflow-hidden">
      <motion.span
        key={i}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block text-gradient"
      >
        {words[i]}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  const { hero, meta } = data

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* glow backdrop */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/3 h-[60vw] w-[60vw] -translate-x-1/2 rounded-full bg-violet/20 blur-[140px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[40vw] w-[40vw] rounded-full bg-cyan/10 blur-[120px]" />
      </div>

      <HeroScene />

      {/* legibility veil: light touch so the centered blob stays vivid
          while the copy on top remains readable */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-ink/90 via-ink/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-1/3 bg-gradient-to-t from-ink/90 to-transparent" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex min-h-screen flex-col justify-center px-6 pointer-events-none"
      >
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-mist">
              {hero.kicker}
            </span>
          </motion.div>

          <h1 className="font-display text-[12.5vw] md:text-[8.5vw] lg:text-[6.6vw] font-extrabold leading-[0.95] tracking-tight max-w-[15ch]">
            {hero.headline.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.12em]">
                <motion.span
                  custom={i}
                  variants={reveal}
                  initial="hidden"
                  animate="show"
                  className="inline-block whitespace-nowrap"
                >
                  {i === 1 ? (
                    <RotatingWord words={hero.rotatingWords} />
                  ) : i === 2 ? (
                    <span className="text-stroke">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 max-w-xl text-lg text-mist leading-relaxed"
          >
            {hero.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4 pointer-events-auto"
          >
            <Magnetic strength={0.5}>
              <button
                onClick={() => scrollTo('#projects')}
                data-cursor="link"
                className="group relative overflow-hidden rounded-full bg-ghost px-8 py-4 font-medium text-ink"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View my work
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </button>
            </Magnetic>
            <Magnetic strength={0.5}>
              <button
                onClick={() => scrollTo('#contact')}
                data-cursor="link"
                className="rounded-full border border-white/15 px-8 py-4 font-medium text-ghost transition-colors hover:border-white/40"
              >
                Get in touch
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollTo('#about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        data-cursor="link"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
          Scroll
        </span>
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-white/20 pt-2">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1.5 rounded-full bg-cyan"
          />
        </span>
      </motion.button>
    </section>
  )
}

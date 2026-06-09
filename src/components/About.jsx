import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import SectionHeading from './SectionHeading'
import data from '../data/portfolio.json'

function Counter({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState('0')

  // split numeric prefix from suffix (e.g. "12M+" -> 12 + "M+")
  const match = value.match(/^([\d.]+)(.*)$/)
  const target = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : value

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1400
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      const current = target * eased
      setDisplay(Number.isInteger(target) ? Math.round(current).toString() : current.toFixed(1))
      if (p < 1) requestAnimationFrame(tick)
      else setDisplay(match ? match[1] : value)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

export default function About() {
  const { about } = data
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="01" title="About me" />

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="font-display text-3xl md:text-4xl font-bold leading-snug"
            >
              {about.lead}
            </motion.p>

            <div className="mt-8 space-y-6">
              {about.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: 0.1 * i }}
                  className="text-mist text-lg leading-relaxed"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/5">
              {about.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative bg-ink-soft p-8 transition-colors hover:bg-haze"
                  data-cursor="default"
                >
                  <div className="font-display text-4xl md:text-5xl font-extrabold text-gradient">
                    <Counter value={s.value} />
                  </div>
                  <div className="mt-2 text-sm text-mist">{s.label}</div>
                  <span className="absolute right-6 top-6 h-1.5 w-1.5 rounded-full bg-cyan opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

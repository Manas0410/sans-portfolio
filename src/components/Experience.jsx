import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import SectionHeading from './SectionHeading'
import data from '../data/portfolio.json'

function Milestone({ item, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.35'],
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1])
  const x = useTransform(scrollYProgress, [0, 1], [40, 0])
  const dotScale = useTransform(scrollYProgress, [0, 1], [0.4, 1])
  const dotGlow = useTransform(
    scrollYProgress,
    [0, 1],
    ['0 0 0px rgba(124,58,237,0)', '0 0 24px rgba(124,58,237,0.9)']
  )

  return (
    <div ref={ref} className="relative pl-20 md:pl-28">
      {/* node */}
      <motion.div
        style={{ scale: dotScale, boxShadow: dotGlow }}
        className="absolute left-[26px] md:left-[42px] top-2 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-cyan bg-ink"
      />

      <motion.div
        style={{ opacity, x }}
        className="group glass rounded-2xl p-7 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]"
        data-cursor="default"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="font-mono text-xs tracking-widest text-cyan">
            {item.year}
          </span>
          <span className="text-xs text-mist">{item.location}</span>
        </div>

        <h3 className="mt-3 font-display text-2xl font-bold">
          {item.role}
        </h3>
        <p className="text-mist">
          <span className="text-ghost font-medium">{item.company}</span>
        </p>

        <p className="mt-4 text-mist leading-relaxed">{item.summary}</p>

        <ul className="mt-4 space-y-2">
          {item.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm text-mist/90">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-pink" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-mist transition-colors group-hover:border-cyan/30 group-hover:text-ghost"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  const lineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 0.6', 'end 0.6'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          title="The journey"
          subtitle="Every role a new altitude. Here's the path that shaped how I build."
        />

        <div ref={lineRef} className="relative">
          {/* base rail */}
          <div className="absolute left-[26px] md:left-[42px] top-0 h-full w-px -translate-x-1/2 bg-white/8" />
          {/* animated fill */}
          <motion.div
            style={{ scaleY: fill }}
            className="absolute left-[26px] md:left-[42px] top-0 h-full w-px -translate-x-1/2 origin-top bg-gradient-to-b from-violet via-cyan to-pink"
          />

          <div className="space-y-12">
            {data.experience.map((item, i) => (
              <Milestone key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import SectionHeading from './SectionHeading'
import data from '../data/portfolio.json'

function SkillBar({ name, level, delay }) {
  return (
    <div className="group" data-cursor="default">
      <div className="flex items-baseline justify-between">
        <span className="font-medium transition-colors group-hover:text-gradient">
          {name}
        </span>
        <span className="font-mono text-xs text-mist">{level}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: level / 100 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full origin-left rounded-full bg-gradient-to-r from-violet via-cyan to-pink"
        />
      </div>
    </div>
  )
}

function SpotlightCard({ category, items, index }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: -200, y: -200 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-3xl border border-white/8 bg-ink-soft p-8"
    >
      {/* cursor spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, rgba(124,58,237,0.12), transparent 70%)`,
        }}
      />
      <div className="relative">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-xs text-cyan">0{index + 1}</span>
          <h3 className="font-display text-xl font-bold">{category}</h3>
        </div>
        <div className="space-y-5">
          {items.map((item, i) => (
            <SkillBar
              key={item.name}
              name={item.name}
              level={item.level}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const marquee = data.skills.flatMap((c) => c.items.map((i) => i.name))

  return (
    <section id="skills" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index="03"
          title="Toolkit"
          subtitle="The technologies I reach for to turn ideas into shipped reality."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {data.skills.map((cat, i) => (
            <SpotlightCard
              key={cat.category}
              category={cat.category}
              items={cat.items}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* infinite marquee */}
      <div className="relative mt-20 flex overflow-hidden border-y border-white/8 py-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="flex shrink-0 items-center gap-8 pr-8"
        >
          {[...marquee, ...marquee].map((skill, i) => (
            <span
              key={i}
              className="font-display text-3xl font-bold text-mist/40 transition-colors hover:text-gradient"
            >
              {skill}
              <span className="ml-8 text-cyan/30">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

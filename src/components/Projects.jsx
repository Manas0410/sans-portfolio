import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import SectionHeading from './SectionHeading'
import data from '../data/portfolio.json'

function TiltCard({ project, index }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  })
  const glare = useTransform(
    [mx, my],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.08), transparent 60%)`
  )

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  const big = project.featured

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      className={big ? 'md:col-span-2' : ''}
      style={{ perspective: 1200 }}
    >
      <motion.a
        ref={ref}
        href={project.link}
        target="_blank"
        rel="noreferrer"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor="view"
        data-cursor-label="View"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative block h-full overflow-hidden rounded-3xl border border-white/8 bg-ink-soft p-8 md:p-10"
      >
        {/* tinted glow */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
          style={{ background: project.color }}
        />
        {/* glare */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
        />

        <div
          className="relative flex h-full flex-col"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="flex items-center justify-between">
            <span
              className="rounded-full px-3 py-1 font-mono text-xs"
              style={{
                color: project.color,
                background: `${project.color}1a`,
              }}
            >
              {project.category}
            </span>
            <span className="font-mono text-xs text-mist">{project.year}</span>
          </div>

          <h3
            className={`mt-6 font-display font-extrabold leading-none tracking-tight ${
              big ? 'text-5xl md:text-6xl' : 'text-3xl'
            }`}
          >
            {project.title}
          </h3>

          <p className="mt-4 max-w-xl text-mist leading-relaxed">
            {project.description}
          </p>

          <div className="mt-auto flex items-center justify-between pt-8">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-mist"
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 text-lg transition-all duration-300 group-hover:bg-ghost group-hover:text-ink group-hover:rotate-45">
              ↗
            </span>
          </div>
        </div>
      </motion.a>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          title="Selected work"
          subtitle="A handful of projects I'm proud of. Each one a problem worth solving."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {data.projects.map((p, i) => (
            <TiltCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

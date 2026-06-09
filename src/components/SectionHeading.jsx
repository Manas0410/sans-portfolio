import { motion } from 'motion/react'

// Reveal-on-scroll heading with an index tag and a wiping underline.
export default function SectionHeading({ index, title, subtitle, align = 'left' }) {
  const isCenter = align === 'center'
  return (
    <div className={`mb-16 ${isCenter ? 'text-center mx-auto max-w-2xl' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className={`flex items-center gap-3 mb-4 ${isCenter ? 'justify-center' : ''}`}
      >
        <span className="font-mono text-xs text-cyan tracking-[0.3em] uppercase">
          {index}
        </span>
        <span className="h-px w-12 bg-gradient-to-r from-cyan to-transparent" />
      </motion.div>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: '110%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-7xl font-extrabold tracking-tight"
        >
          {title}
        </motion.h2>
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-5 text-mist text-lg max-w-xl ${isCenter ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

// A bespoke dual-layer cursor: a snappy dot + a lagging ring that grows
// and reads `data-cursor` hints from hovered elements.
export default function Cursor() {
  const [hidden, setHidden] = useState(true)
  const [variant, setVariant] = useState('default')
  const [label, setLabel] = useState('')

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const ringX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.6 })
  const dotX = useSpring(x, { stiffness: 1100, damping: 50 })
  const dotY = useSpring(y, { stiffness: 1100, damping: 50 })

  const raf = useRef(0)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (hidden) setHidden(false)
    }
    const leave = () => setHidden(true)
    const enter = () => setHidden(false)

    const over = (e) => {
      const el = e.target.closest('[data-cursor]')
      if (el) {
        setVariant(el.dataset.cursor)
        setLabel(el.dataset.cursorLabel || '')
      } else {
        setVariant('default')
        setLabel('')
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
      cancelAnimationFrame(raf.current)
    }
  }, [hidden, x, y])

  const ringSize = variant === 'link' ? 64 : variant === 'view' ? 88 : 40

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden lg:block">
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-white/40 mix-blend-difference flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: hidden ? 0 : 1,
          backgroundColor:
            variant === 'view' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0)',
          borderColor:
            variant === 'default' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0)',
        }}
        transition={{ duration: 0.25 }}
      >
        {label && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-black font-semibold">
            {label}
          </span>
        )}
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 h-2 w-2 rounded-full bg-white mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: hidden || variant === 'view' ? 0 : 1 }}
      />
    </div>
  )
}

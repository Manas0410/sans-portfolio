import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react'
import { scrollTo } from '../hooks/useSmoothScroll'
import Magnetic from './Magnetic'
import data from '../data/portfolio.json'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Journey' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const go = (id) => {
    setOpen(false)
    scrollTo(`#${id}`)
  }
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    sections.forEach((s) => obs.observe(s))

    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => {
      obs.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      {/* top scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-violet via-cyan to-pink"
        style={{ scaleX: progress }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          <button
            onClick={() => scrollTo('#home')}
            data-cursor="link"
            className="font-display text-xl font-extrabold tracking-tight"
          >
            <span className="text-gradient">{data.meta.firstName}</span>
            <span className="text-ghost">{data.meta.lastName[0]}.</span>
          </button>

          <div
            className={`hidden md:flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-500 ${
              scrolled ? 'glass' : ''
            }`}
          >
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(`#${link.id}`)}
                data-cursor="link"
                className="relative px-4 py-1.5 text-sm font-medium text-mist transition-colors hover:text-ghost"
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/8"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    active === link.id ? 'text-ghost' : ''
                  }`}
                >
                  {link.label}
                </span>
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <Magnetic>
              <button
                onClick={() => scrollTo('#contact')}
                data-cursor="link"
                className="group relative overflow-hidden rounded-full border border-white/15 px-5 py-2 text-sm font-medium"
              >
                <span className="relative z-10 transition-colors group-hover:text-ink">
                  Let's talk
                </span>
                <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-cyan to-violet transition-transform duration-400 group-hover:translate-y-0" />
              </button>
            </Magnetic>
          </div>

          {/* hamburger (mobile) */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="relative z-[110] flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 rounded-full bg-ghost"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="h-0.5 w-6 rounded-full bg-ghost"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 rounded-full bg-ghost"
            />
          </button>
        </div>
      </motion.nav>

      {/* mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[95] flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-xl md:hidden"
          >
            <div className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-violet/20 blur-[120px]" />
            <nav className="relative flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.08 + i * 0.06 }}
                  onClick={() => go(link.id)}
                  className="group flex items-baseline gap-4 py-2 text-left"
                >
                  <span className="font-mono text-xs text-cyan">0{i + 1}</span>
                  <span
                    className={`font-display text-4xl font-extrabold tracking-tight transition-colors ${
                      active === link.id ? 'text-gradient' : 'text-ghost group-hover:text-mist'
                    }`}
                  >
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

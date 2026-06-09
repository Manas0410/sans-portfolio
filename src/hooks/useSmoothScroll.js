import { useEffect } from 'react'
import Lenis from 'lenis'

// Global Lenis instance so other modules (cursor, nav, gsap) can reach it.
export let lenis = null

export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
      lenis = null
    }
  }, [])
}

export function scrollTo(target) {
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.4 })
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }
}

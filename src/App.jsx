import { useState } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

export default function App() {
  const [ready, setReady] = useState(false)
  useSmoothScroll()

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <div className="noise" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  )
}

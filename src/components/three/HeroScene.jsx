import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import AuroraBlob from './AuroraBlob'
import Particles from './Particles'

function Rig({ pointer }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (pointer.current.x * 0.5 - camera.position.x) * 0.04
    camera.position.y += (pointer.current.y * 0.5 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

// Responsive scale: smaller blob on phones, full size on desktop.
function useResponsiveScale() {
  const [scale, setScale] = useState(1.4)
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      if (w < 640) setScale(1.0)
      else if (w < 1024) setScale(1.2)
      else setScale(1.45)
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])
  return scale
}

export default function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 })
  const scale = useResponsiveScale()

  const handlePointer = (e) => {
    pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
    pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
  }

  return (
    <div className="absolute inset-0" onPointerMove={handlePointer}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#7c3aed" />
          <pointLight position={[-5, -3, 2]} intensity={1} color="#06b6d4" />
          <AuroraBlob pointer={pointer} scale={scale} />
          <Particles mouse={pointer} count={800} />
          <Rig pointer={pointer} />
        </Suspense>
      </Canvas>
    </div>
  )
}

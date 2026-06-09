import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// A drifting field of glowing particles wrapped around the blob.
export default function Particles({ count = 700, mouse }) {
  const ref = useRef()

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // distribute on a sphere shell with some thickness
      const r = 3 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      sizes[i] = Math.random() * 0.06 + 0.01
    }
    return { positions, sizes }
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#9bd9ff') },
    }),
    []
  )

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.03
    ref.current.rotation.x = mouse.current.y * 0.15
    ref.current.rotation.z = mouse.current.x * 0.15
    ref.current.material.uniforms.uTime.value += delta
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={/* glsl */ `
          attribute float aSize;
          uniform float uTime;
          varying float vTwinkle;
          void main(){
            vTwinkle = sin(uTime * 2.0 + position.x * 4.0 + position.y * 2.0) * 0.5 + 0.5;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aSize * 300.0 / -mv.z;
            gl_Position = projectionMatrix * mv;
          }
        `}
        fragmentShader={/* glsl */ `
          uniform vec3 uColor;
          varying float vTwinkle;
          void main(){
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, d) * (0.3 + vTwinkle * 0.7);
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
      />
    </points>
  )
}

'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/panger__lkr' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/pangerlkr' },
  { label: 'GitHub', href: 'https://github.com/pangerlkr' },
  { label: 'X (Twitter)', href: 'https://x.com/panger__lkr' },
]

function GenerativeArtScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<any>(null)

  useEffect(() => {
    let THREE: any
    let frameId: number
    let renderer: any
    let currentMount: HTMLDivElement | null = null

    async function init() {
      THREE = await import('three')
      currentMount = mountRef.current
      if (!currentMount) return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        75,
        currentMount.clientWidth / currentMount.clientHeight,
        0.1,
        1000
      )
      camera.position.z = 3

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
      renderer.setPixelRatio(window.devicePixelRatio)
      currentMount.appendChild(renderer.domElement)

      const geometry = new THREE.IcosahedronGeometry(1.2, 64)
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          pointLightPos: { value: new THREE.Vector3(0, 0, 5) },
          color: { value: new THREE.Color('#C8FF00') },
        },
        vertexShader: `
          uniform float time;
          varying vec3 vNormal;
          varying vec3 vPosition;

          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
          vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
          float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);
            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);
            vec4 s0 = floor(b0) * 2.0 + 1.0;
            vec4 s1 = floor(b1) * 2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
            p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
            vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m*m, vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
          }

          void main() {
            vNormal = normal;
            vPosition = position;
            float displacement = snoise(position * 2.0 + time * 0.5) * 0.2;
            vec3 newPosition = position + normal * displacement;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform vec3 pointLightPos;
          varying vec3 vNormal;
          varying vec3 vPosition;

          void main() {
            vec3 normal = normalize(vNormal);
            vec3 lightDir = normalize(pointLightPos - vPosition);
            float diffuse = max(dot(normal, lightDir), 0.0);
            float fresnel = 1.0 - dot(normal, vec3(0.0, 0.0, 1.0));
            fresnel = pow(fresnel, 2.0);
            vec3 finalColor = color * diffuse + color * fresnel * 0.5;
            gl_FragColor = vec4(finalColor, 0.85);
          }
        `,
        wireframe: true,
        transparent: true,
      })

      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      const pointLight = new THREE.PointLight(0xffffff, 1, 100)
      pointLight.position.set(0, 0, 5)
      lightRef.current = pointLight
      scene.add(pointLight)

      const animate = (t: number) => {
        material.uniforms.time.value = t * 0.0003
        mesh.rotation.y += 0.0005
        mesh.rotation.x += 0.0002
        renderer.render(scene, camera)
        frameId = requestAnimationFrame(animate)
      }
      animate(0)

      const handleResize = () => {
        if (!currentMount) return
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight)
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (!lightRef.current || !THREE) return
        const x = (e.clientX / window.innerWidth) * 2 - 1
        const y = -(e.clientY / window.innerHeight) * 2 + 1
        const vec = new THREE.Vector3(x, y, 0.5).unproject(camera)
        const dir = vec.sub(camera.position).normalize()
        const dist = -camera.position.z / dir.z
        const pos = camera.position.clone().add(dir.multiplyScalar(dist))
        lightRef.current.position.copy(pos)
        material.uniforms.pointLightPos.value = pos
      }

      window.addEventListener('resize', handleResize)
      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        cancelAnimationFrame(frameId)
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('mousemove', handleMouseMove)
        if (currentMount && renderer.domElement.parentNode === currentMount) {
          currentMount.removeChild(renderer.domElement)
        }
        renderer.dispose()
      }
    }

    let cleanup: (() => void) | undefined
    init().then((fn) => { cleanup = fn })

    return () => { cleanup?.() }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />
}

export default function Contact() {
  const [formStatus, setFormStatus] = useState('AWAITING_INPUT')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [confirm, setConfirm] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col md:flex-row"
    >
      {/* Left — Three.js scene */}
      <div className="relative w-full md:w-1/2 h-[45vh] md:h-screen shrink-0 overflow-hidden">
        {mounted && <GenerativeArtScene />}

        {/* Gradient fade into right panel on desktop */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-transparent to-[#050505] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none md:hidden" />

        {/* Left panel label */}
        <div className="absolute bottom-8 left-8 flex flex-col gap-1 z-10">
          <span
            className="text-[9px] tracking-[0.3em] uppercase font-mono"
            style={{ color: 'rgba(200,255,0,0.35)', textShadow: '0 0 8px rgba(200,255,0,0.2)' }}
          >
            SIGNAL_ACTIVE
          </span>
          <span
            className="text-[9px] tracking-[0.25em] uppercase font-mono"
            style={{ color: 'rgba(200,255,0,0.2)' }}
          >
            NEXUS_2.4.1 // SECURE_LINE
          </span>
        </div>
      </div>

      {/* Right — Terminal form */}
      <div
        className="relative flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 md:py-20 font-mono overflow-y-auto"
        style={{ color: '#C8FF00', textShadow: '0 0 5px rgba(200,255,0,0.4)' }}
      >
        {/* CRT scanlines overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06] z-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.3) 50%)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Subtle flicker */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ background: 'rgba(200,255,0,0.015)' }}
          animate={{ opacity: [1, 0.6, 1, 0.8, 1] }}
          transition={{ duration: 0.25, repeat: Infinity, repeatType: 'reverse' }}
        />

        <div className="relative z-10 max-w-xl w-full mx-auto flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#C8FF00]/15">
            <div>
              <p className="text-[9px] tracking-[0.3em] opacity-40 mb-2 uppercase">
                OS_VER: NEXUS_2.4.1 // SECURE_LINE
              </p>
              <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
                <span className="opacity-40">&gt;</span> Initialize_Contact
              </h1>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <p className="text-[9px] tracking-[0.25em] opacity-40 uppercase mb-1">Status Report</p>
              <motion.p
                key={formStatus}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-bold bg-[#C8FF00]/8 px-3 py-1 rounded inline-block"
                style={{ boxShadow: '0 0 10px rgba(200,255,0,0.1)' }}
              >
                {formStatus}
              </motion.p>
            </div>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-7">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[0.25em] opacity-45">
                &gt; TARGET_IDENTIFIER // NAME
              </label>
              <div className="flex items-center gap-3 border-b border-[#C8FF00]/15 pb-2 focus-within:border-[#C8FF00]/40 transition-colors">
                <span className="text-base font-bold opacity-40 shrink-0">~$</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFormStatus('VERIFYING_IDENTITY')}
                  onBlur={() => setFormStatus('AWAITING_INPUT')}
                  className="bg-transparent border-none outline-none w-full text-[#C8FF00] placeholder:text-[#C8FF00]/20 font-mono text-base caret-[#C8FF00] focus:ring-0"
                  placeholder="_"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[0.25em] opacity-45">
                &gt; RETURN_PATH // EMAIL
              </label>
              <div className="flex items-center gap-3 border-b border-[#C8FF00]/15 pb-2 focus-within:border-[#C8FF00]/40 transition-colors">
                <span className="text-base font-bold opacity-40 shrink-0">~$</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFormStatus('ESTABLISHING_HANDSHAKE')}
                  onBlur={() => setFormStatus('AWAITING_INPUT')}
                  className="bg-transparent border-none outline-none w-full text-[#C8FF00] placeholder:text-[#C8FF00]/20 font-mono text-base caret-[#C8FF00] focus:ring-0"
                  placeholder="_"
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[0.25em] opacity-45">
                &gt; PAYLOAD // MESSAGE_BODY
              </label>
              <div className="flex items-start gap-3 border-b border-[#C8FF00]/15 pb-2 focus-within:border-[#C8FF00]/40 transition-colors">
                <span className="text-base font-bold opacity-40 shrink-0 mt-1">~$</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setFormStatus('ENCIPHERING_DATA')}
                  onBlur={() => setFormStatus('AWAITING_INPUT')}
                  rows={4}
                  className="bg-transparent border-none outline-none w-full text-[#C8FF00] placeholder:text-[#C8FF00]/20 font-mono text-base caret-[#C8FF00] resize-none focus:ring-0"
                  placeholder="_"
                />
              </div>
            </div>

            {/* Submit row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-4 border-t border-[#C8FF00]/15">
              <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setConfirm(!confirm)}
              >
                <div
                  className={`w-4 h-4 border border-[#C8FF00] flex items-center justify-center transition-colors shrink-0 ${confirm ? 'bg-[#C8FF00]' : 'bg-transparent'}`}
                >
                  {confirm && <span className="text-[#020a02] text-[8px] font-black leading-none">X</span>}
                </div>
                <span className="text-[9px] tracking-[0.2em] uppercase opacity-55 group-hover:opacity-90 transition-opacity">
                  Confirm Human Verification
                </span>
              </div>

              <button
                type="submit"
                onMouseEnter={() => setFormStatus('READY_TO_TRANSMIT')}
                onMouseLeave={() => setFormStatus('AWAITING_INPUT')}
                className="border border-[#C8FF00] text-[#C8FF00] hover:bg-[#C8FF00] hover:text-[#020a02] font-black px-6 py-2.5 text-[9px] tracking-[0.3em] uppercase transition-all duration-300 w-full sm:w-auto"
                style={{ boxShadow: '0 0 12px rgba(200,255,0,0.15)' }}
              >
                Execute [Enter]
              </button>
            </div>
          </form>

          {/* Direct comms */}
          <div className="pt-6 border-t border-[#C8FF00]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <p className="text-[9px] tracking-[0.25em] opacity-35 uppercase">&gt; DIRECT_COMMS</p>
              <p className="text-[10px] tracking-widest opacity-70">
                <span className="opacity-50">EML:</span> contact@pangerlkr.link
              </p>
              <p className="text-[10px] tracking-widest opacity-70">
                <span className="opacity-50">TEL:</span> +91 81328 72135
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="text-[9px] tracking-[0.25em] opacity-35 uppercase">&gt; SOCIAL_HANDSHAKE</p>
              <div className="flex flex-wrap gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] tracking-widest hover:bg-[#C8FF00] hover:text-[#020a02] px-2 py-1 transition-colors uppercase border border-[#C8FF00]/20 hover:border-[#C8FF00]"
                  >
                    [{s.label}]
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

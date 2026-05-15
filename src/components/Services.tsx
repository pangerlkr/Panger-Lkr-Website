'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const SERVICES = [
  {
    title: 'Cybersecurity Awareness',
    description: 'Empowering individuals and organizations with the knowledge to identify and prevent digital threats through specialized training.',
    icon: '01',
    color: '#C8FF00'
  },
  {
    title: 'Vulnerability Assessment',
    description: 'Deep-dive analysis of system architectures to uncover and patch critical security gaps before they are exploited.',
    icon: '02',
    color: '#FF3B30'
  },
  {
    title: 'Phishing Simulations',
    description: 'Realistic social engineering tests to build stronger human-centric security habits and organizational resilience.',
    icon: '03',
    color: '#007AFF'
  },
  {
    title: 'Security Consulting',
    description: 'Strategic guidance for businesses to implement robust, trust-based protection frameworks tailored to their mission.',
    icon: '04',
    color: '#AF52DE'
  }
]

function ServiceCard({ service, index, total }: { service: typeof SERVICES[0], index: number, total: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Calculate relative progress for this specific card's position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // As the card "collapses" (next card comes over), it scales down slightly
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6])

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0 px-6">
      <motion.div
        style={{ scale, opacity }}
        className="max-w-4xl w-full glass p-10 md:p-16 rounded-[40px] border border-white/5 relative group"
      >
        {/* Accent indicator */}
        <div 
          className="absolute top-0 left-10 w-20 h-1 rounded-b-full transition-all duration-500" 
          style={{ backgroundColor: service.color }}
        />

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1">
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-black mb-6 block">
              Protocol {service.icon}
            </span>
            <h3 className="text-3xl md:text-6xl font-black text-white leading-tight mb-8 tracking-tighter">
              {service.title}
            </h3>
            <p className="text-white/50 text-sm md:text-lg leading-relaxed max-w-xl">
              {service.description}
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end gap-2 font-mono text-[10px] text-white/20">
            <span>SEC_LEVEL: HIGH</span>
            <span>ENCRYPTED: TRUE</span>
            <span>STATUS: ACTIVE</span>
          </div>
        </div>

        {/* Bottom index indicator */}
        <div className="mt-12 flex items-center gap-6">
          <div className="h-px flex-1 bg-white/5" />
          <span className="text-xs font-black text-white/10 uppercase tracking-widest">
            {index + 1} / {total}
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export default function Services() {
  return (
    <section className="bg-black relative">
      <div className="max-w-6xl mx-auto py-32 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="mb-12 text-center"
        >
          <span className="text-xs tracking-[0.4em] uppercase text-accent font-black mb-4 block">Core Expertise</span>
          <h2 className="text-4xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter">
            Architectural <br /><span className="text-gradient">Defense.</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} total={SERVICES.length} />
        ))}
      </div>
    </section>
  )
}

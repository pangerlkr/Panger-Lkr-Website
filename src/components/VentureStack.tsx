'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useState, useRef } from 'react'
import SectionScrollyCanvas from './SectionScrollyCanvas'

const VENTURES = [
  {
    id: 1,
    title: 'NEXUSCIPHERGUARD',
    role: 'Founder',
    focus: 'Regional Security Ecosystem',
    description: 'Pioneering cybersecurity awareness and strategic consulting in North-East India. Protecting the digital backbone of the region.',
    color: '#C8FF00'
  },
  {
    id: 2,
    title: 'AEGIS MIND TECH',
    role: 'Acquisition',
    focus: 'Technical Operations',
    description: 'Strategic expansion into the Bangalore tech corridor. Scaling engineering capabilities and digital infrastructure.',
    color: '#FF3B30'
  },
  {
    id: 3,
    title: 'MMB CYBER SCHOOL',
    role: 'Advisor',
    focus: 'Digital Literacy',
    description: 'Building a culture of defensive mindset. Educating the next generation of digital defenders through non-profit advisory.',
    color: '#007AFF'
  }
]

function VentureCard({ venture, index, total, scrollYProgress }: { venture: typeof VENTURES[0], index: number, total: number, scrollYProgress: any }) {
  // Define range for this specific card
  const start = index * (1 / total)
  const end = (index + 1) * (1 / total)
  
  // Collapse effect (scale down as we scroll towards the end of this card's range)
  const scale = useTransform(scrollYProgress, [start, end], [1, 0.9])
  const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0.3])
  
  // Subtle lift as it comes in
  const y = useTransform(scrollYProgress, [start, start + 0.1], [100, 0])

  return (
    <div className="h-screen flex items-center justify-center sticky top-0 px-6">
      <motion.div
        style={{ scale, opacity, y, borderColor: `${venture.color}33` }}
        className="w-[320px] md:w-[600px] glass p-10 md:p-16 rounded-[40px] flex flex-col justify-between border-2 relative z-10"
      >
        <div className="absolute top-8 right-10 text-4xl opacity-10 font-black italic">
          {venture.id.toString().padStart(2, '0')}
        </div>
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-accent font-black">
              {venture.role} — {venture.focus}
            </span>
          </motion.div>

          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-5xl font-black text-white leading-tight mb-8 tracking-tighter"
          >
            {venture.title}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <p className="text-white/40 text-xs md:text-sm leading-relaxed max-w-sm">
              {venture.description}
            </p>
            {/* Ambient scanline for storytelling */}
            <div className="absolute -left-4 top-0 bottom-0 w-px bg-accent/20" />
          </motion.div>
        </div>

        <div className="flex items-center gap-4 mt-12">
          <div className="h-px flex-1 bg-white/10" />
          <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: venture.color }} />
        </div>
      </motion.div>
    </div>
  )
}

export default function VentureStack() {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: element ? { current: element } : undefined,
    offset: ["start start", "end end"]
  })

  return (
    <div ref={setElement} className="relative min-h-[300vh] w-full">
      {/* Background Cinematic Sequence */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-0">
        <SectionScrollyCanvas scrollYProgress={scrollYProgress} />
      </div>

      <div className="relative z-10">
        {VENTURES.map((venture, i) => (
          <VentureCard 
            key={venture.id} 
            venture={venture} 
            index={i} 
            total={VENTURES.length} 
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  )
}

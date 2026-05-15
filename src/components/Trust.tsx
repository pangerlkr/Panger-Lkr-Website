'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const PILLARS = [
  {
    title: 'Unwavering Integrity',
    description: 'We believe that security starts with the absolute verification of every data point. Trust is earned through consistent, verifiable integrity.',
    label: 'Foundation',
    accent: '#C8FF00'
  },
  {
    title: 'Structural Resilience',
    description: 'Digital ecosystems must be designed to withstand failure. We build architectures that are not just strong, but adaptively resilient.',
    label: 'Architecture',
    accent: '#FF3B30'
  },
  {
    title: 'Human-Centric Defense',
    description: 'Technology is only as secure as the people who operate it. We prioritize human behavior as the first and final line of defense.',
    label: 'Mindset',
    accent: '#007AFF'
  }
]

function PillarCard({ pillar, index, total, scrollYProgress }: { pillar: any, index: number, total: number, scrollYProgress: any }) {
  const start = index * (1 / total)
  const end = (index + 1) * (1 / total)
  
  const rawScale = useTransform(scrollYProgress, [start, end], [1, 0.9])
  const scale = useSpring(rawScale, { stiffness: 100, damping: 30 })
  const opacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0.4])

  return (
    <div className="h-screen flex items-center justify-center sticky top-0 px-6">
      <motion.div
        style={{ scale, opacity, borderColor: `${pillar.accent}33` }}
        className="max-w-5xl w-full aspect-[21/9] md:aspect-[3/1] glass rounded-[50px] p-12 md:p-20 flex flex-col justify-center border-2 relative overflow-hidden"
      >
        <div 
          className="absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-10 rounded-full"
          style={{ backgroundColor: pillar.accent }}
        />

        <div className="relative z-10">
          <span className="text-[10px] tracking-[0.5em] uppercase text-accent font-black mb-6 block">
            {pillar.label} — Pillar {index + 1}
          </span>
          <h3 className="text-3xl md:text-6xl font-black text-white leading-none mb-8 tracking-tighter">
            {pillar.title}
          </h3>
          <p className="text-white/40 text-sm md:text-lg max-w-2xl leading-relaxed">
            {pillar.description}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
          <motion.div 
            className="h-full"
            style={{ 
              width: useTransform(scrollYProgress, [start, end], ["0%", "100%"]), 
              backgroundColor: pillar.accent 
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default function Trust() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  return (
    <div ref={containerRef} className="relative bg-[#121212]">
      <div className="h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs tracking-[0.4em] uppercase text-white/20 mb-8 block font-black"
          >
            The Philosophy
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-12"
          >
            Security is the <br /><span className="text-gradient">Currency of Trust.</span>
          </motion.h2>
          <div className="h-24 w-px bg-gradient-to-b from-accent to-transparent mx-auto" />
        </div>
      </div>

      <div className="relative">
        {PILLARS.map((pillar, i) => (
          <PillarCard 
            key={i} 
            pillar={pillar} 
            index={i} 
            total={PILLARS.length} 
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      <div className="h-[50vh] flex items-center justify-center border-t border-white/5">
        <p className="text-[10px] tracking-[0.5em] uppercase text-white/10 font-bold">
          Panger Lkr · Strategic Cybersecurity
        </p>
      </div>
    </div>
  )
}

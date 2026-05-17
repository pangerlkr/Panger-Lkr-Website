'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const SLIDES = [
  {
    id: '01',
    label: 'Origin',
    title: 'From the Foothills of Nagaland.',
    description: 'Starting with a vision to bring world-class security awareness to regional landscapes, where digital growth often outpaces defense.',
    color: '#C8FF00'
  },
  {
    id: '02',
    label: 'Mission',
    title: 'NEXUSCIPHERGUARD India.',
    description: 'Building a regional powerhouse for cybersecurity consulting, specialized in vulnerability assessment and human-centric security.',
    color: '#FF3B30'
  },
  {
    id: '03',
    label: 'Vision',
    title: 'The Cyber Architect.',
    description: 'Designing resilient ecosystems that bridge the gap between complex technology and sustainable security practices.',
    color: '#007AFF'
  }
]

export default function HomeStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Horizontal movement based on vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"])

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div style={{ x }} className="flex w-[300vw]">
          {SLIDES.map((slide, i) => (
            <div key={slide.id} className="w-screen h-screen flex items-center justify-center px-6 md:px-20 relative">
              {/* Background Large Number */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
                <span className="text-[40vw] font-black">{slide.id}</span>
              </div>

              <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="text-xs tracking-[0.4em] uppercase text-accent font-black mb-6 block">{slide.label}</span>
                  <h2 className="text-4xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter">
                    {slide.title}
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="glass p-6 md:p-8 rounded-[28px] border-l-4"
                  style={{ borderLeftColor: slide.color }}
                >
                  <p className="text-white/50 text-sm md:text-base leading-relaxed italic">
                    &ldquo;{slide.description}&rdquo;
                  </p>
                </motion.div>
              </div>
              
              {/* Progress dots */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-4">
                {SLIDES.map((_, dotIdx) => (
                  <div 
                    key={dotIdx}
                    className={`h-1.5 rounded-full transition-all duration-500 ${dotIdx === i ? 'w-12 bg-accent' : 'w-2 bg-white/10'}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

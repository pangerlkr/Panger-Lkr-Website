'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CARDS = [
  {
    title: 'NEXUSCIPHERGUARD India',
    subtitle: 'Founder & Visionary',
    description: 'Leading a regional cybersecurity revolution through awareness and strategic consulting.',
    icon: '🛡️',
    color: '#C8FF00'
  },
  {
    title: 'Aegis Mind Technologies',
    subtitle: 'Strategic Acquisition',
    description: 'Scaling technical operations and expanding digital reach beyond regional boundaries.',
    icon: '🛰️',
    color: '#FF3B30'
  },
  {
    title: 'MMB Cyber School',
    subtitle: 'Cybersecurity Advisor',
    description: 'Empowering the next generation through digital literacy and defensive mindset education.',
    icon: '🎓',
    color: '#007AFF'
  }
]

export default function ThreeDSlider() {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((prev) => (prev + 1) % CARDS.length)
  const prev = () => setIndex((prev) => (prev - 1 + CARDS.length) % CARDS.length)

  return (
    <div className="relative h-[500px] w-full flex items-center justify-center perspective-1200 overflow-hidden py-20">
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-20 z-30 pointer-events-none">
        <button 
          onClick={prev}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all pointer-events-auto"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button 
          onClick={next}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all pointer-events-auto"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <div className="relative w-[300px] h-[400px] preserve-3d">
        <AnimatePresence mode="popLayout">
          {CARDS.map((card, i) => {
            const isCenter = i === index
            const isLeft = i === (index - 1 + CARDS.length) % CARDS.length
            const isRight = i === (index + 1) % CARDS.length

            if (!isCenter && !isLeft && !isRight) return null

            let x = 0
            let rotateY = 0
            let z = 0
            let opacity = 0
            let scale = 0.8

            if (isCenter) {
              x = 0
              rotateY = 0
              z = 100
              opacity = 1
              scale = 1
            } else if (isLeft) {
              x = -250
              rotateY = 45
              z = -100
              opacity = 0.4
            } else if (isRight) {
              x = 250
              rotateY = -45
              z = -100
              opacity = 0.4
            }

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.8, x: 0, rotateY: 0 }}
                animate={{ 
                  opacity, 
                  scale, 
                  x, 
                  rotateY, 
                  z,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 glass p-8 rounded-[40px] flex flex-col justify-between border border-white/10"
                style={{ 
                  boxShadow: isCenter ? `0 20px 40px -10px ${card.color}22` : 'none',
                  borderColor: isCenter ? `${card.color}44` : 'rgba(255,255,255,0.1)'
                }}
              >
                <div className="text-4xl mb-6">{card.icon}</div>
                <div>
                  <h4 className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-black mb-2">{card.subtitle}</h4>
                  <h3 className="text-2xl font-black text-white leading-tight mb-4">{card.title}</h3>
                  <p className="text-white/40 text-[11px] leading-relaxed">{card.description}</p>
                </div>
                
                <div 
                  className="w-12 h-1.5 rounded-full mt-8" 
                  style={{ background: card.color }}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

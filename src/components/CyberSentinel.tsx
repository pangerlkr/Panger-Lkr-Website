'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function CyberSentinel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // Mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for eye movement
  const springConfig = { damping: 25, stiffness: 150 }
  const eyeX = useSpring(mouseX, springConfig)
  const eyeY = useSpring(mouseY, springConfig)

  // Transformations for the "pupil" and "scanner"
  const pupilX = useTransform(eyeX, [-200, 200], [-15, 15])
  const pupilY = useTransform(eyeY, [-200, 200], [-15, 15])
  
  const outerRotate = useTransform(eyeX, [-200, 200], [-20, 20])
  const outerScale = useTransform(eyeY, [-200, 200], [0.95, 1.05])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-square flex items-center justify-center cursor-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
    >
      {/* Decorative background grid/target */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-full h-px bg-accent/30 absolute" />
        <div className="h-full w-px bg-accent/30 absolute" />
        <div className="w-1/2 h-1/2 border border-accent/20 rounded-full animate-pulse" />
        <div className="w-3/4 h-3/4 border border-accent/10 rounded-full" />
      </div>

      {/* The Sentinel Orb */}
      <motion.div
        style={{ 
          rotateX: useTransform(eyeY, [-200, 200], [10, -10]),
          rotateY: useTransform(eyeX, [-200, 200], [-10, 10]),
          scale: outerScale,
          rotate: outerRotate
        }}
        className="relative w-48 h-48 md:w-64 md:h-64 perspective-1000"
      >
        {/* Outer Ring */}
        <motion.div 
          animate={{ 
            rotate: isHovered ? 180 : 0,
            borderColor: isHovered ? '#C8FF00' : 'rgba(200, 255, 0, 0.2)'
          }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-accent/20 flex items-center justify-center transition-colors duration-500"
        />

        {/* Middle Shell */}
        <motion.div 
          animate={{ 
            scale: isHovered ? 1.05 : 1,
            rotate: isHovered ? -90 : 0
          }}
          className="absolute inset-4 rounded-full border border-white/10 glass flex items-center justify-center"
        >
          {/* Scanning Line */}
          <motion.div 
            animate={{ 
              top: ['0%', '100%', '0%'],
              opacity: isHovered ? 0.8 : 0.2
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-0.5 bg-accent/30 blur-[2px] z-10"
          />
        </motion.div>

        {/* The Eye / Core */}
        <motion.div 
          className="absolute inset-16 rounded-full bg-[#121212] border-2 border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center"
        >
          {/* Pupil / Iris */}
          <motion.div
            style={{ x: pupilX, y: pupilY }}
            className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent/10 flex items-center justify-center"
          >
            <motion.div 
              animate={{ 
                scale: isClicked ? 0.8 : isHovered ? 1.2 : 1,
                backgroundColor: isClicked ? '#fff' : '#C8FF00'
              }}
              className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-accent shadow-[0_0_20px_#C8FF00]"
            />
            
            {/* Iris details */}
            <div className="absolute inset-0 rounded-full border border-accent/20 animate-spin-slow" />
          </motion.div>

          {/* Glare */}
          <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-white/20 blur-[2px]" />
        </motion.div>
      </motion.div>

      {/* Floating UI Elements */}
      <motion.div 
        animate={{ 
          x: useTransform(eyeX, [-200, 200], [-20, 20]).get(),
          y: useTransform(eyeY, [-200, 200], [-20, 20]).get()
        }}
        className="absolute top-10 right-10 flex flex-col items-end gap-2 pointer-events-none"
      >
        <span className="text-[8px] font-black text-accent tracking-[0.3em] uppercase opacity-50">Sentinel v2.0</span>
        <div className="flex gap-1">
          <div className={`w-1 h-1 rounded-full ${isHovered ? 'bg-accent animate-ping' : 'bg-white/20'}`} />
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="w-1 h-1 rounded-full bg-white/20" />
        </div>
      </motion.div>

      <motion.div 
        animate={{ 
          x: useTransform(eyeX, [-200, 200], [20, -20]).get(),
          y: useTransform(eyeY, [-200, 200], [20, -20]).get()
        }}
        className="absolute bottom-10 left-10 flex flex-col gap-1 pointer-events-none"
      >
        <span className="text-[8px] font-black text-white/30 tracking-[0.2em] uppercase">Status: {isHovered ? 'Active' : 'Standby'}</span>
        <div className="h-0.5 w-16 bg-white/10 overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="h-full w-full bg-accent/40"
          />
        </div>
      </motion.div>
    </div>
  )
}

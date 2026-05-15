'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

const LOGS = [
  "INITIALIZING PORTFOLIO DATABASE...",
  "SEARCHING FOR ACTIVE VENTURES...",
  "VULNERABILITY SCAN: COMPLETE.",
  "PROJECT 01: NEXUSCIPHERGUARD LOADED.",
  "DECRYPTING ARCHITECTURAL LOGS...",
  "PROJECT 02: AEGIS MIND TECH ACQUISITION VERIFIED.",
  "PROJECT 03: MMB CYBER SCHOOL ADVISORY SYNCED.",
  "SYSTEM STATUS: ALL VENTURES OPERATIONAL.",
  "END OF DOSSIER."
]

export default function CyberDossier({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  })

  return (
    <div ref={ref} className="relative py-20 px-6 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        {/* Main Content Area */}
        <div className="space-y-32">
          {/* Operational Methodology Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="glass p-12 rounded-[40px] border-l-4 border-accent"
          >
            <h3 className="text-xs tracking-[0.4em] uppercase text-accent font-black mb-6">Operational Methodology</h3>
            <p className="text-white/50 text-base md:text-2xl font-light leading-relaxed">
              Every strategic venture and technical project follows a strict architectural protocol: <span className="text-white font-bold">Discovery</span>, <span className="text-white font-bold">Analysis</span>, and <span className="text-white font-bold">Reinforcement</span>.
            </p>
          </motion.div>
          
          {/* Dynamic Content (Projects) */}
          <div className="relative">
            {children}
          </div>
        </div>

        {/* Sticky Dossier Side Panel */}
        <div className="hidden lg:block">
          <div className="sticky top-32 glass p-8 rounded-3xl border border-white/5 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-black">System Logs</span>
              </div>
              <span className="text-[8px] font-mono text-white/10">v2.0.4</span>
            </div>
            
            <div className="space-y-4 font-mono text-[9px] leading-relaxed">
              {LOGS.map((log, i) => {
                // Concentrate logs reveal in the first 60% of scroll
                const start = (i / LOGS.length) * 0.6
                const opacity = useTransform(scrollYProgress, [start, start + 0.02], [0.05, 1])
                const x = useTransform(scrollYProgress, [start, start + 0.02], [-10, 0])
                
                return (
                  <motion.div key={i} style={{ opacity, x }} className="flex gap-3">
                    <span className="text-accent/30">[{i.toString().padStart(2, '0')}]</span>
                    <span className="text-white/40">{log}</span>
                  </motion.div>
                )
              })}
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="flex justify-between text-[8px] uppercase tracking-widest text-white/20 mb-2">
                <span>Dossier Integrity</span>
                <span>SYSTEM ACTIVE</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-accent glow-accent" 
                  style={{ 
                    width: useSpring(useTransform(scrollYProgress, [0, 0.8], ["10%", "100%"]), { stiffness: 100, damping: 20 }) 
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

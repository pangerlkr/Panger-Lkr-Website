'use client'

import { motion } from 'framer-motion'

export default function WorkHero() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Decorative scanline background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,255,0,0.05)_0%,transparent_70%)]" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/5" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-white/5" />
      </div>

      <div className="max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-[10px] tracking-[0.4em] uppercase text-accent font-black">
            The Portfolio
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black text-white leading-[0.9] mb-10 tracking-tighter"
        >
          Selected <br /><span className="text-gradient">Case Studies.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/40 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          An archive of strategic ventures, cybersecurity initiatives, and digital architectural breakthroughs. Each project is a testament to the mindset that security is an ongoing process, not a destination.
        </motion.p>
      </div>

      {/* Scrolling tech labels */}
      <div className="absolute bottom-10 left-0 w-full overflow-hidden whitespace-nowrap opacity-10 pointer-events-none">
        <div className="flex animate-[scroll_30s_linear_infinite] gap-12 text-[10px] tracking-[0.5em] uppercase font-black text-white">
          <span>Vulnerability Assessment</span>
          <span>Offensive Security</span>
          <span>Digital Infrastructure</span>
          <span>Strategic Acquisition</span>
          <span>Risk Management</span>
          <span>Vulnerability Assessment</span>
          <span>Offensive Security</span>
          <span>Digital Infrastructure</span>
        </div>
      </div>
    </section>
  )
}

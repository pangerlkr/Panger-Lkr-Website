'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import VentureStack from './VentureStack'
import SectionScrollyCanvas from './SectionScrollyCanvas'

const SKILLS = [
  'Vulnerability Assessment',
  'Offensive Security',
  'Phishing Simulation',
  'Digital Risk Analysis',
  'Security Consulting',
  'Cyber Awareness',
  'Infrastructure Security',
  'NEXUSCIPHERGUARD',
]

const STATS = [
  { value: 'Founder', label: 'NEXUSCIPHERGUARD India' },
  { value: 'Strategic', label: 'Aegis Mind Tech Acquisition' },
  { value: 'Advisor', label: 'MMB Cyber School' },
]

export default function About() {
  const bioRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: bioScroll } = useScroll({
    target: bioRef,
    offset: ["start end", "end start"]
  })
  
  const scaleY = useSpring(bioScroll, { stiffness: 150, damping: 20 })

  return (
    <section id="about" className="relative bg-[#121212] py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Intro Section / Biography */}
        <div ref={bioRef} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-48 relative">
          {/* Storyline Progress (Left Side) */}
          <div className="absolute -left-12 top-0 bottom-0 w-px bg-white/5 hidden xl:block">
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="w-px h-full bg-accent glow-accent" 
            />
          </div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-accent font-black mb-6 block">Origin Story</span>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-[0.9] mb-10 tracking-tighter">
              Panger Lkr. <br />
              <span className="text-gradient">Cyber Architect.</span>
            </h1>
            <div className="space-y-8 text-white/50 text-sm md:text-base leading-relaxed max-w-xl">
              <p>
                A cybersecurity professional, entrepreneur, and builder from Nagaland, India. I work where technology, security, and human behavior intersect.
              </p>
              <p>
                My approach is shaped by a simple truth: most systems fail not due to "movie-style hacking," but through overlooked vulnerabilities and misplaced trust.
              </p>
              <div className="relative pl-8 border-l border-white/10 group">
                <p className="text-white/80 font-bold italic py-2 group-hover:text-accent transition-colors duration-400">
                  "Security is not a product. It is a process and a mindset."
                </p>
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
              </div>
            </div>
          </motion.div>

          {/* Image / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-[60px] overflow-hidden glass border border-white/10 group">
              <img 
                src="/pangerlkr.png" 
                alt="Panger Lkr" 
                className="w-full h-full object-cover object-top grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-600 scale-110 group-hover:scale-100"
              />
              {/* Scanline overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent h-1/2 w-full animate-scan pointer-events-none" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-accent/20 rounded-tr-[70px] pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-accent/20 rounded-bl-[70px] pointer-events-none" />
          </motion.div>
        </div>

        {/* 3D Strategic Stack (Storytelling Mode) */}
        <div className="mb-48 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="text-center mb-16"
          >
            <span className="text-xs tracking-[0.4em] uppercase text-white/30 font-black mb-4 block">Section II — Strategic Ecosystem</span>
            <h2 className="text-3xl md:text-6xl font-black text-white">Ventures & <span className="text-gradient text-3xl md:text-5xl">Digital Influence.</span></h2>
          </motion.div>
          
          <VentureStack />
        </div>

        {/* Journey & Acquisition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <h3 className="text-xs tracking-[0.3em] uppercase text-accent font-black mb-8">Entrepreneurial Journey</h3>
            <div className="space-y-8">
              <div className="glass p-8 rounded-2xl border-l-2 border-l-accent">
                <h4 className="text-white font-bold mb-3 uppercase text-xs tracking-wider">NEXUSCIPHERGUARD India</h4>
                <p className="text-white/40 text-xs leading-relaxed">
                  A cybersecurity-focused initiative delivering awareness programs, consulting, and vulnerability solutions. Building a regional cybersecurity force in Nagaland.
                </p>
              </div>
              <div className="glass p-8 rounded-2xl border-l-2 border-l-white/20">
                <h4 className="text-white font-bold mb-3 uppercase text-xs tracking-wider">Strategic Acquisition</h4>
                <p className="text-white/40 text-xs leading-relaxed">
                  Acquired <span className="text-white/60 font-medium italic">Aegis Mind Technologies (Bangalore)</span> to strengthen technical capabilities and expand operational reach beyond regional boundaries.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xs tracking-[0.3em] uppercase text-white/30 font-black mb-8">Leadership & Vision</h3>
            <div className="space-y-6 text-white/50 text-sm leading-relaxed">
              <p>
                As a <span className="text-white/80 font-bold">Cybersecurity Advisor at MMB Cyber School</span>, I provide technical guidance for digital literacy and cybersecurity awareness initiatives.
              </p>
              <p>
                My strategic vision is to build a robust cybersecurity ecosystem in North-East India, creating ventures that deliver long-term structural value and establish security as a core business layer.
              </p>
              <div className="bg-accent/5 p-6 rounded-xl border border-accent/10 mt-8">
                <p className="text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-2">Philosophy</p>
                <p className="text-white/70 italic text-sm">
                  &ldquo;Security is not a tool you install. It is a mindset you enforce.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Arsenal / Skills */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-xs tracking-[0.3em] uppercase text-white/30 font-black mb-4">Technical Arsenal</h3>
            <div className="h-px w-full bg-white/5 relative">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100px' }}
                viewport={{ once: false, amount: 0.2 }}
                className="absolute top-0 left-0 h-px bg-accent" 
              />
            </div>
          </motion.div>
          
          <div className="flex flex-wrap gap-4">
            {SKILLS.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: i * 0.05 }}
                className="px-6 py-3 rounded-xl glass text-[10px] tracking-widest uppercase font-black text-white/40 hover:text-accent hover:border-accent/30 transition-all duration-300 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: i * 0.1 }}
              className="relative group overflow-hidden"
            >
              <div className="glass p-10 rounded-3xl text-center hover:bg-white/5 transition-all duration-500 relative z-10 border border-white/5 hover:border-accent/20">
                <p className="text-accent font-black text-3xl mb-2 uppercase tracking-tighter group-hover:scale-110 transition-transform duration-500">
                  {stat.value}
                </p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-black group-hover:text-white/60 transition-colors">
                  {stat.label}
                </p>
              </div>
              {/* Subtle pulse glow behind stat */}
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.03] blur-3xl transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

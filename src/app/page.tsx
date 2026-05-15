'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Services from '@/components/Services'
import Trust from '@/components/Trust'
import Media from '@/components/Media'
import Footer from '@/components/Footer'
import HomeStory from '@/components/HomeStory'

// Dynamically import heavy canvas component — no SSR
const ScrollyCanvas = dynamic(() => import('@/components/ScrollyCanvas'), { ssr: false })
const Overlay = dynamic(() => import('@/components/Overlay'), { ssr: false })

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <main className="bg-[#121212] min-h-screen">
      <Navbar />

      {/* ─── HERO / SCROLLY SECTION ─────────────────── */}
      <div ref={scrollContainerRef} className="relative" style={{ height: '500vh' }}>
        <ScrollyCanvas />
        <Overlay containerRef={scrollContainerRef as React.RefObject<HTMLDivElement>} />
      </div>

      {/* ─── STORYTELLING SLIDE ─────────────────────── */}
      <HomeStory />

      {/* ─── PROFESSIONAL SERVICES ──────────────────── */}
      <Services />

      {/* ─── PHILOSOPHY / TRUST ─────────────────────── */}
      <Trust />

      {/* ─── MEDIA RECOGNITION ──────────────────────── */}
      <Media />

      {/* ─── IMPACT STATS ───────────────────────────── */}
      <section className="py-32 px-6 md:px-12 bg-[#121212] border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          {[
            { label: 'Cybersecurity Vision', value: 'National Reach' },
            { label: 'Regional Focus', value: 'North-East India' },
            { label: 'Venture Ecosystem', value: 'Strategic Impact' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-4xl font-black text-accent mb-2 uppercase tracking-tighter">{stat.value}</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center bg-[#121212] border-t border-white/5">
        <a 
          href="/work" 
          className="inline-flex items-center gap-4 text-white/50 hover:text-accent transition-colors text-xs tracking-[0.3em] uppercase font-bold"
        >
          Explore Projects & Ventures
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </section>

      <Footer />
    </main>
  )
}

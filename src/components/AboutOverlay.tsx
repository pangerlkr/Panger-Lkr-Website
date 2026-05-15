'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

interface TextSection {
  id: number
  text: string
  sub?: string
  align: 'center' | 'left' | 'right'
  visibleRange: [number, number]
  yRange: [number, number]
}

const SECTIONS: TextSection[] = [
  {
    id: 1,
    text: 'Panger Lkr.\nCyber Architect.',
    sub: 'Designing Digital Resilience',
    align: 'center',
    visibleRange: [0, 0.25],
    yRange: [0, -50],
  },
  {
    id: 2,
    text: 'I build secure\nexperiences.',
    align: 'left',
    visibleRange: [0.3, 0.55],
    yRange: [30, -30],
  },
  {
    id: 3,
    text: 'Bridging trust\nand technology.',
    align: 'right',
    visibleRange: [0.6, 0.85],
    yRange: [30, -30],
  },
]

function Section({ section, scrollYProgress }: { section: TextSection; scrollYProgress: any }) {
  const [vStart, vEnd] = section.visibleRange
  const fadeInEnd = vStart + (vEnd - vStart) * 0.3
  const fadeOutStart = vEnd - (vEnd - vStart) * 0.3

  const opacity = useTransform(
    scrollYProgress,
    [vStart, fadeInEnd, fadeOutStart, vEnd],
    [0, 1, 1, 0]
  )
  const y = useTransform(scrollYProgress, [vStart, vEnd], section.yRange)

  const alignClass =
    section.align === 'center'
      ? 'items-center text-center'
      : section.align === 'left'
      ? 'items-start text-left'
      : 'items-end text-right'

  const paddingClass =
    section.align === 'center'
      ? 'px-6'
      : section.align === 'left'
      ? 'pl-8 md:pl-24'
      : 'pr-8 md:pr-24'

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center ${alignClass} ${paddingClass} pointer-events-none`}
    >
      <h2
        className="font-black leading-[0.9] tracking-tighter whitespace-pre-line"
        style={{
          fontSize: 'clamp(2.5rem, 7vw, 6rem)',
          background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.4) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {section.text}
      </h2>

      {section.sub && (
        <p className="mt-6 font-black tracking-[0.4em] uppercase text-accent text-xs md:text-sm">
          {section.sub}
        </p>
      )}
    </motion.div>
  )
}

export default function AboutOverlay({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ height: '500vh', zIndex: 10 }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {SECTIONS.map((s) => (
          <Section key={s.id} section={s} scrollYProgress={scrollYProgress} />
        ))}
        
        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-black">Scroll to Explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
      </div>
    </div>
  )
}

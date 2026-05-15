'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface TextSection {
  id: number
  text: string
  sub?: string
  align: 'center' | 'left' | 'right'
  // Range [start, end] within [0,1] scroll of the 500vh container
  visibleRange: [number, number]
  yRange: [number, number] // parallax Y offset range in px
}

const SECTIONS: TextSection[] = [
  {
    id: 1,
    text: 'Panger Lkr.',
    sub: 'Cybersecurity Professional',
    align: 'center',
    visibleRange: [0, 0.22],
    yRange: [0, -60],
  },
  {
    id: 2,
    text: 'I protect digital\ntrust.',
    align: 'left',
    visibleRange: [0.25, 0.52],
    yRange: [40, -40],
  },
  {
    id: 3,
    text: 'Building a safer\ndigital world.',
    align: 'right',
    visibleRange: [0.55, 0.82],
    yRange: [40, -40],
  },
]

function Section({ section, scrollYProgress }: { section: TextSection; scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
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
      ? 'pl-8 md:pl-20'
      : 'pr-8 md:pr-20'

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center ${alignClass} ${paddingClass} pointer-events-none`}
    >
      {/* Accent line */}
      {section.align !== 'center' && (
        <motion.div
          className="h-px w-12 bg-accent mb-6"
          style={{ marginLeft: section.align === 'right' ? 'auto' : undefined }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      )}

      <h2
        className="font-black leading-[0.92] tracking-tight whitespace-pre-line"
        style={{
          fontSize: 'clamp(2.8rem, 8vw, 7rem)',
          background: 'linear-gradient(160deg, #F0F0F0 0%, rgba(240,240,240,0.55) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {section.text}
      </h2>

      {section.sub && (
        <p
          className="mt-4 font-light tracking-[0.3em] uppercase text-accent"
          style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)' }}
        >
          {section.sub}
        </p>
      )}
    </motion.div>
  )
}

export default function Overlay({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div className="absolute inset-0" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ zIndex: 10 }}>
        {SECTIONS.map((s) => (
          <Section key={s.id} section={s} scrollYProgress={scrollYProgress} />
        ))}

        {/* Scroll indicator — only at top */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.12], [1, 0]),
          }}
        >
          <span className="text-xs tracking-[0.25em] uppercase text-white/40">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </div>
    </div>
  )
}

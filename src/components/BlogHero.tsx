'use client'

import { motion } from 'framer-motion'

export default function BlogHero() {
  return (
    <section className="px-6 md:px-12 py-20 md:py-28 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6 max-w-3xl"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-semibold">
            Intel &amp; Perspective
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] text-white">
            Articles
          </h1>
          <p className="text-white/40 text-base leading-relaxed max-w-xl">
            Thoughts on cybersecurity, offensive tactics, defensive strategy, and building
            resilient systems — grounded in practice, not theory.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

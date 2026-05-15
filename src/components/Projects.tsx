'use client'

import { motion } from 'framer-motion'

interface Project {
  id: number
  number: string
  title: string
  category: string
  description: string
  tags: string[]
  year: string
  link?: string
  accent: string
}

const PROJECTS: Project[] = [
  {
    id: 1,
    number: '01',
    title: 'NEXUSCIPHERGUARD India',
    category: 'Cybersecurity Initiative',
    description:
      'A cybersecurity force delivering awareness, consulting, and risk assessment solutions. Building a robust security ecosystem in North-East India.',
    tags: ['Cybersecurity', 'Consulting', 'Founding', 'Advisory'],
    year: '2024 - Present',
    accent: '#C8FF00',
  },
  {
    id: 2,
    number: '02',
    title: 'Aegis Mind Technologies',
    category: 'Strategic Acquisition',
    description:
      'Acquired Bangalore-based tech firm to expand technical capabilities and scale operations beyond regional boundaries.',
    tags: ['Acquisition', 'Tech Ops', 'Scaling', 'Development'],
    year: '2024',
    accent: '#FF3B30',
  },
  {
    id: 3,
    number: '03',
    title: 'MMB Cyber School',
    category: 'Cybersecurity Advisory',
    description:
      'Providing strategic and technical guidance for digital literacy and cybersecurity awareness at a non-profit level.',
    tags: ['Education', 'Advisory', 'Social Impact'],
    year: '2023 - Present',
    accent: '#007AFF',
  },
  {
    id: 4,
    number: '04',
    title: 'pangerlkr.link',
    category: 'Digital Identity Hub',
    description:
      'Cinematic personal portfolio and digital identity hub built with Next.js, Framer Motion, and HTML5 Canvas.',
    tags: ['Next.js', 'Framer Motion', 'Canvas', 'Design'],
    year: '2024',
    accent: '#AF52DE',
  },
]

const cardVariants = {
  offscreen: { opacity: 0, y: 60 },
  onscreen: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      custom={index}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.1 }}
      variants={cardVariants}
      whileHover="hover"
      className="group relative overflow-hidden rounded-2xl glass cursor-pointer"
      style={{ '--card-accent': project.accent } as React.CSSProperties}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          boxShadow: `inset 0 0 60px -20px ${project.accent}33, 0 0 40px -10px ${project.accent}22`,
        }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: project.accent }}
      />

      <div className="relative p-8 md:p-10 flex flex-col h-full">
        {/* Header row */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <span
              className="text-xs font-mono tracking-widest uppercase"
              style={{ color: project.accent }}
            >
              {project.number}
            </span>
            <p className="text-xs tracking-widest uppercase text-white/30 mt-1">
              {project.category}
            </p>
          </div>
          <span className="text-xs font-mono text-white/20">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-4 text-white/90">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-white/40 mb-8 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium border"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <motion.div
          className="absolute bottom-8 right-8 w-10 h-10 rounded-full border flex items-center justify-center text-white/30 group-hover:text-[#121212] group-hover:bg-accent group-hover:border-accent transition-all duration-500"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="work" className="relative bg-transparent py-10 px-0">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="mb-20"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-8 bg-accent" />
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
            Selected Work
          </span>
        </div>
        <h2
          className="font-black tracking-tight leading-none"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          <span className="text-gradient">Case Studies</span>
        </h2>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

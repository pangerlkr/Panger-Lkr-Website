'use client'

import { motion } from 'framer-motion'
import type { Article } from '@/lib/articles'

interface ArticleCardProps {
  article: Article
  index: number
  featured?: boolean
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ArticleCard({ article, index, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <motion.a
        href={`/blog/${article.slug}`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="group col-span-2 flex flex-col md:flex-row gap-0 rounded-2xl overflow-hidden border border-white/5 hover:border-accent/20 transition-all duration-300"
      >
        <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-between p-8 md:p-10 bg-[#181818]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              {article.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] tracking-[0.25em] uppercase text-accent/70 font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight group-hover:text-accent transition-colors duration-200">
              {article.title}
            </h2>
            <p className="text-white/40 text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>
          </div>
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase text-white/25">
              <span>{formatDate(article.publishedAt)}</span>
              <span className="w-px h-3 bg-white/10" />
              <span>{article.readingTime} min read</span>
            </div>
            <span className="text-xs text-accent/50 group-hover:text-accent transition-colors duration-200 tracking-widest uppercase">
              Read →
            </span>
          </div>
        </div>
      </motion.a>
    )
  }

  return (
    <motion.a
      href={`/blog/${article.slug}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col rounded-2xl overflow-hidden border border-white/5 hover:border-accent/20 transition-all duration-300"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col flex-1 justify-between p-6 bg-[#181818]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-[0.25em] uppercase text-accent/60 font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-lg font-black tracking-tight text-white leading-snug group-hover:text-accent transition-colors duration-200">
            {article.title}
          </h2>
          <p className="text-white/35 text-xs leading-relaxed line-clamp-2">{article.excerpt}</p>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-3 text-[9px] tracking-widest uppercase text-white/20">
            <span>{formatDate(article.publishedAt)}</span>
            <span className="w-px h-3 bg-white/10" />
            <span>{article.readingTime} min</span>
          </div>
          <span className="text-[10px] text-accent/40 group-hover:text-accent transition-colors duration-200 tracking-widest uppercase">
            Read →
          </span>
        </div>
      </div>
    </motion.a>
  )
}

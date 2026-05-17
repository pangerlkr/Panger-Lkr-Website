'use client'

import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackground from '@/components/PageBackground'
import { getArticleBySlug, getPublishedArticles } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'

interface Props {
  params: { slug: string }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={key++}
          className="text-xl md:text-2xl font-black tracking-tight text-white mt-10 mb-4"
        >
          {line.replace('## ', '')}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-lg font-bold tracking-tight text-white mt-8 mb-3">
          {line.replace('### ', '')}
        </h3>
      )
    } else if (line.startsWith('> ')) {
      elements.push(
        <blockquote
          key={key++}
          className="border-l-2 border-accent pl-5 my-6 text-white/60 italic text-base leading-relaxed"
        >
          {line.replace('> ', '')}
        </blockquote>
      )
    } else if (line.startsWith('- **')) {
      const match = line.match(/^- \*\*(.+?)\*\*[:\s—–-]*(.*)$/)
      if (match) {
        elements.push(
          <li key={key++} className="flex gap-2 text-white/50 text-sm leading-relaxed mb-2 ml-4">
            <span className="text-accent/60 mt-1 shrink-0">–</span>
            <span>
              <strong className="text-white/80 font-semibold">{match[1]}</strong>
              {match[2] ? `: ${match[2]}` : ''}
            </span>
          </li>
        )
      }
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="flex gap-2 text-white/50 text-sm leading-relaxed mb-2 ml-4">
          <span className="text-accent/60 mt-1 shrink-0">–</span>
          <span>{line.replace('- ', '')}</span>
        </li>
      )
    } else if (line.trim() === '') {
      elements.push(<div key={key++} className="h-2" />)
    } else {
      const parsed = line
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white/80 font-semibold">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em class="text-white/60">$1</em>')
      elements.push(
        <p
          key={key++}
          className="text-white/50 text-sm md:text-base leading-[1.85] mb-0"
          dangerouslySetInnerHTML={{ __html: parsed }}
        />
      )
    }
  }

  return elements
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const related = getPublishedArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)

  return (
    <main className="relative min-h-screen overflow-hidden">
      <PageBackground />
      <Navbar />

      <div className="pt-24">
        {/* Cover image */}
        <div className="w-full h-[40vh] md:h-[55vh] overflow-hidden">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent pointer-events-none" />
        </div>

        {/* Article header */}
        <div className="px-6 md:px-12 max-w-3xl mx-auto -mt-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center gap-3">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] tracking-[0.3em] uppercase text-accent font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase text-white/25">
              <span>{formatDate(article.publishedAt)}</span>
              <span className="w-px h-3 bg-white/10" />
              <span>{article.readingTime} min read</span>
            </div>
            <p className="text-white/50 text-base leading-relaxed border-l-2 border-white/10 pl-4">
              {article.excerpt}
            </p>
          </motion.div>
        </div>

        {/* Article body */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="px-6 md:px-12 max-w-3xl mx-auto py-12 flex flex-col gap-1"
        >
          {renderContent(article.content)}
        </motion.div>

        {/* Back link */}
        <div className="px-6 md:px-12 max-w-3xl mx-auto pb-12">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white/30 hover:text-accent transition-colors duration-200"
          >
            ← Back to Articles
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 mx-6 md:mx-12" />

        {/* Related articles */}
        {related.length > 0 && (
          <section className="px-6 md:px-12 py-16 md:py-24">
            <div className="max-w-7xl mx-auto flex flex-col gap-10">
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/25 font-semibold">
                More Articles
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((a, i) => (
                  <ArticleCard key={a.id} article={a} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <Footer />
    </main>
  )
}

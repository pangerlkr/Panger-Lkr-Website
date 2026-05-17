'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageBackground from '@/components/PageBackground'
import BlogHero from '@/components/BlogHero'
import ArticleCard from '@/components/ArticleCard'
import { getPublishedArticles } from '@/lib/articles'

export default function BlogPage() {
  const articles = getPublishedArticles()
  const [featured, ...rest] = articles

  return (
    <main className="relative min-h-screen overflow-hidden">
      <PageBackground />
      <Navbar />

      <div className="pt-24">
        <BlogHero />

        <section className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            {/* Featured article */}
            {featured && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ArticleCard article={featured} index={0} featured />
              </div>
            )}

            {/* Remaining articles grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i + 1} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}

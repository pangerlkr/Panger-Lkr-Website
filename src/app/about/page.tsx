'use client'

import Navbar from '@/components/Navbar'
import About from '@/components/About'
import Media from '@/components/Media'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#121212]">
      <Navbar />
      
      <div className="pt-24">
        <About />
        <Media />
      </div>

      <Footer />
    </main>
  )
}

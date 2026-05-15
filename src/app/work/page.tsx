'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'
import PageBackground from '@/components/PageBackground'
import WorkHero from '@/components/WorkHero'
import CyberDossier from '@/components/CyberDossier'

export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <PageBackground />
      <Navbar />
      
      <div className="pt-24">
        <WorkHero />
        
        <div className="max-w-7xl mx-auto">
          <CyberDossier>
            <Projects />
          </CyberDossier>
        </div>
      </div>

      <Footer />
    </main>
  )
}

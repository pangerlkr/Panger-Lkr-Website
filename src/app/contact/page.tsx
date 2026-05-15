'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import PageBackground from '@/components/PageBackground'

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <PageBackground />
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pt-20"
      >
        <Contact />
      </motion.div>

      <Footer />
    </main>
  )
}

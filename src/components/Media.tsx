'use client'

import { motion } from 'framer-motion'

const RECOGNITIONS = [
  {
    source: 'Mokokchung Times',
    title: 'Nagaland Youth Icons Participate at Viksit Bharat Young Leaders Dialogue 2025',
    url: 'https://mokokchungtimes.com/nagaland-youth-icons-participate-at-viksit-bharat-young-leaders-dialogue-2025/',
    date: '2025'
  },
  {
    source: 'Prime Time Alert',
    title: 'Pangerkumzuk Longkumer: The Cybersecurity Pioneer Defending Every Byte',
    url: 'https://primetimealert.com/2025/03/03/pangerkumzuk-longkumer-the-cybersecurity-pioneer-defending-every-byte/',
    date: '2025'
  },
  {
    source: 'Morung Express',
    title: 'NEIMUN 2025 Marks 10 Years of Youth Diplomacy and Leadership',
    url: 'https://morungexpress.com/neimun-2025-marks-10-years-of-youth-diplomacy-and-leadership',
    date: '2025'
  },
  {
    source: 'Hindustan Insider',
    title: 'NEXUSCIPHERGUARD India: Leading Cybersecurity Firm in Nagaland & Northeast India',
    url: 'https://hindustaninsider.in/2025/03/03/nexuscipherguard-india-leading-cybersecurity-firm-in-nagaland-northeast-india/',
    date: '2025'
  },
  {
    source: 'East Mojo',
    title: 'Digital Growth Sans Security is a Risk Nagaland Cannot Afford',
    url: 'https://eastmojo.com/news/2026/05/02/digital-growth-sans-security-is-a-risk-nagaland-cannot-afford/',
    date: '2026'
  },
  {
    source: 'Grokipedia',
    title: 'Pangerkumzuk Longkumer — Digital Biography',
    url: 'https://grokipedia.com/page/Pangerkumzuk_Longkumer',
    date: '2025'
  },
  {
    source: 'DoorDarshan Nagaland',
    title: 'Live Interview / Feature on Cybersecurity Awareness',
    url: 'https://www.youtube.com/watch?v=0qxuvhAYZqE',
    date: '2024'
  }
]

export default function Media() {
  return (
    <section className="bg-[#121212] py-32 px-6 md:px-12 lg:px-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-bold mb-4 block">Recognition</span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Media & <br /><span className="text-gradient">Press Coverage.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1200 preserve-3d">
          {RECOGNITIONS.map((item, i) => (
            <motion.a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, rotateX: -30, y: 50, z: -100 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ 
                scale: 1.05, 
                translateZ: 20,
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
              }}
              className="group glass p-8 rounded-2xl flex flex-col justify-between hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-accent/40 preserve-3d"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-black">{item.source}</span>
                  <span className="text-[10px] text-white/20 font-mono">{item.date}</span>
                </div>
                <h3 className="text-lg font-bold text-white/80 group-hover:text-white leading-snug mb-8">
                  {item.title}
                </h3>
              </div>
              
              <div className="relative z-10 flex items-center gap-2 text-[10px] tracking-widest uppercase text-white/20 group-hover:text-accent transition-colors font-bold">
                Read Article
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 transition-transform">
                  <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative bg-[#121212] pt-32 pb-16 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-white/10">
                <img 
                  src="/logo.png" 
                  alt="Panger Lkr Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-black tracking-tight text-white uppercase">Panger Lkr</span>
            </div>
            <p className="text-white/30 text-xs leading-relaxed max-w-xs mb-8">
              Cybersecurity professional and entrepreneur focused on protecting digital trust through awareness and strategic implementation.
            </p>
          </div>

          {/* Nav Col */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-white font-black mb-6">Navigation</h4>
            <nav className="flex flex-col gap-4">
              <a href="/work" className="text-[10px] tracking-widest uppercase text-white/30 hover:text-accent transition-colors font-bold">Work</a>
              <a href="/about" className="text-[10px] tracking-widest uppercase text-white/30 hover:text-accent transition-colors font-bold">About</a>
              <a href="/contact" className="text-[10px] tracking-widest uppercase text-white/30 hover:text-accent transition-colors font-bold">Contact</a>
            </nav>
          </div>

          {/* Social Col */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-white font-black mb-6">Social</h4>
            <nav className="flex flex-col gap-4">
              <a href="https://linkedin.com/in/pangerlkr" className="text-[10px] tracking-widest uppercase text-white/30 hover:text-accent transition-colors font-bold">LinkedIn</a>
              <a href="https://x.com/panger__lkr" className="text-[10px] tracking-widest uppercase text-white/30 hover:text-accent transition-colors font-bold">Twitter</a>
              <a href="https://github.com/pangerlkr" className="text-[10px] tracking-widest uppercase text-white/30 hover:text-accent transition-colors font-bold">GitHub</a>
            </nav>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[9px] text-white/20 tracking-[0.3em] uppercase font-bold">
            © {new Date().getFullYear()} Pangerkumzuk Longkumer
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-black">Digital Hub Active</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

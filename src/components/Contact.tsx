'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/panger__lkr' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/pangerlkr' },
  { label: 'GitHub', href: 'https://github.com/pangerlkr' },
  { label: 'X (Twitter)', href: 'https://x.com/panger__lkr' },
]

export default function Contact() {
  const [phase, setPhase] = useState<'initial' | 'flowIn' | 'zoom'>('initial')
  const [formStatus, setFormStatus] = useState('AWAITING_INPUT')
  const [activeField, setActiveField] = useState<string | null>(null)
  
  // Input states for the terminal typing effect
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [confirm, setConfirm] = useState(false)

  // Handle the entry sequence
  useEffect(() => {
    // 1. Flow in the desk and PC
    const t1 = setTimeout(() => setPhase('flowIn'), 200)
    // 2. Zoom into the screen
    const t2 = setTimeout(() => setPhase('zoom'), 1500)
    
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const handleFocus = (field: string, status: string) => {
    setActiveField(field)
    setFormStatus(status)
  }

  return (
    <section id="contact" className="relative w-full h-[100dvh] bg-[#050505] overflow-hidden flex flex-col items-center justify-end perspective-1000 -mt-20">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,255,0,0.03)_0%,transparent_60%)] pointer-events-none" />

      {/* The Desk */}
      <motion.div 
        className="absolute bottom-0 w-[150%] h-64 bg-gradient-to-t from-[#000000] to-[#111111] border-t border-white/5"
        initial={{ y: 300, opacity: 0 }}
        animate={{ 
          y: phase === 'initial' ? 300 : (phase === 'zoom' ? 500 : 0), 
          opacity: phase === 'initial' ? 0 : (phase === 'zoom' ? 0 : 1) 
        }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{ transform: 'rotateX(70deg)', transformOrigin: 'bottom' }}
      >
        {/* Desk texture/grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </motion.div>

      {/* The Monitor Assembly */}
      <motion.div
        className="absolute origin-bottom flex flex-col items-center justify-end z-10"
        initial={{ y: 500, scale: 0.5, opacity: 0 }}
        animate={{
          y: phase === 'initial' ? 500 : (phase === 'zoom' ? 0 : 60),
          scale: phase === 'initial' ? 0.5 : (phase === 'zoom' ? 1 : 0.8),
          opacity: 1,
          width: phase === 'zoom' ? '100vw' : '500px',
          height: phase === 'zoom' ? '100dvh' : '400px',
          bottom: phase === 'zoom' ? 0 : 120, // Sit on the desk
        }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Monitor Bezel */}
        <motion.div 
          className="w-full h-full bg-[#1a1a1a] flex flex-col items-center justify-center relative overflow-hidden"
          animate={{
            borderRadius: phase === 'zoom' ? '0px' : '32px',
            borderWidth: phase === 'zoom' ? '0px' : '24px',
            borderBottomWidth: phase === 'zoom' ? '0px' : '40px',
            borderColor: '#222',
            boxShadow: phase === 'zoom' ? 'none' : '0 20px 50px rgba(0,0,0,0.8), inset 0 2px 10px rgba(255,255,255,0.05)',
          }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Brand plate on bezel */}
          <motion.div 
            className="absolute bottom-[-30px] text-[8px] tracking-[0.3em] font-black text-white/10 uppercase"
            animate={{ opacity: phase === 'zoom' ? 0 : 1 }}
          >
            NEXUS_TERM_9000
          </motion.div>

          {/* Screen Inner Canvas */}
          <div className="w-full h-full bg-[#020a02] rounded-[8px] relative overflow-hidden flex flex-col font-mono" style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)' }}>
            
            {/* CRT Effects */}
            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-10 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
            {/* Flicker/Vignette */}
            <div className="absolute inset-0 pointer-events-none z-40 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)] mix-blend-multiply" />
            <motion.div 
              className="absolute inset-0 pointer-events-none z-40 bg-[#C8FF00] mix-blend-overlay"
              animate={{ opacity: [0.01, 0.03, 0.01, 0.04, 0.01] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatType: 'reverse' }}
            />

            {/* Terminal Content (Only interactable when zoomed) */}
            <div className="p-6 md:p-12 lg:p-20 w-full h-full overflow-y-auto text-[#C8FF00] z-30 flex flex-col pt-24 md:pt-32" style={{ textShadow: '0 0 5px rgba(200,255,0,0.5)' }}>
              
              {/* Boot sequence header */}
              <div className="mb-10 border-b border-[#C8FF00]/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] tracking-widest opacity-60 mb-2">OS_VER: NEXUS_2.4.1 // SECURE_LINE</p>
                  <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-tight">
                    <span className="opacity-50">&gt;</span> Initialize_Contact
                  </h1>
                </div>
                <div className="text-right">
                  <p className="text-[10px] tracking-widest opacity-60 uppercase mb-1">Status Report</p>
                  <p className="text-sm font-bold bg-[#C8FF00]/10 px-3 py-1 rounded inline-block animate-pulse">
                    {formStatus}
                  </p>
                </div>
              </div>

              {/* Form Content */}
              <motion.form 
                animate={{ opacity: phase === 'zoom' ? 1 : 0, filter: phase === 'zoom' ? 'blur(0px)' : 'blur(4px)' }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className={`max-w-3xl flex-1 flex flex-col gap-8 ${phase !== 'zoom' && 'pointer-events-none'}`}
              >
                {/* Name */}
                <div className="group">
                  <label className="text-[10px] uppercase tracking-[0.2em] opacity-50 mb-2 block">&gt; TARGET_IDENTIFIER // NAME</label>
                  <div className="flex items-center gap-3">
                    <span className="text-lg md:text-xl font-bold opacity-50">~$</span>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => handleFocus('name', 'VERIFYING_IDENTITY')}
                      onBlur={() => setFormStatus('AWAITING_INPUT')}
                      className="bg-transparent border-none outline-none w-full text-[#C8FF00] placeholder:text-[#C8FF00]/20 font-mono text-lg md:text-xl caret-[#C8FF00] focus:ring-0" 
                      placeholder="_"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <label className="text-[10px] uppercase tracking-[0.2em] opacity-50 mb-2 block">&gt; RETURN_PATH // EMAIL</label>
                  <div className="flex items-center gap-3">
                    <span className="text-lg md:text-xl font-bold opacity-50">~$</span>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => handleFocus('email', 'ESTABLISHING_HANDSHAKE')}
                      onBlur={() => setFormStatus('AWAITING_INPUT')}
                      className="bg-transparent border-none outline-none w-full text-[#C8FF00] placeholder:text-[#C8FF00]/20 font-mono text-lg md:text-xl caret-[#C8FF00] focus:ring-0" 
                      placeholder="_"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="group flex-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] opacity-50 mb-2 block">&gt; PAYLOAD // MESSAGE_BODY</label>
                  <div className="flex items-start gap-3 h-full">
                    <span className="text-lg md:text-xl font-bold opacity-50 mt-1">~$</span>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onFocus={() => handleFocus('message', 'ENCIPHERING_DATA')}
                      onBlur={() => setFormStatus('AWAITING_INPUT')}
                      className="bg-transparent border-none outline-none w-full h-full min-h-[150px] text-[#C8FF00] placeholder:text-[#C8FF00]/20 font-mono text-lg md:text-xl caret-[#C8FF00] resize-none focus:ring-0" 
                      placeholder="_"
                    />
                  </div>
                </div>

                {/* Verification */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-4 border-t border-[#C8FF00]/20 pt-8">
                  <div className="flex items-center gap-4 cursor-pointer" onClick={() => setConfirm(!confirm)}>
                    <div className={`w-5 h-5 border-2 border-[#C8FF00] flex items-center justify-center transition-colors ${confirm ? 'bg-[#C8FF00]' : 'bg-transparent'}`}>
                      {confirm && <span className="text-[#020a02] text-xs font-black">X</span>}
                    </div>
                    <span className="text-[10px] tracking-[0.2em] uppercase opacity-70 hover:opacity-100 transition-opacity">
                      Confirm Human Verification
                    </span>
                  </div>

                  <button 
                    type="submit"
                    onMouseEnter={() => setFormStatus('READY_TO_TRANSMIT')}
                    onMouseLeave={() => setFormStatus('AWAITING_INPUT')}
                    className="border-2 border-[#C8FF00] text-[#C8FF00] hover:bg-[#C8FF00] hover:text-[#020a02] font-black px-8 py-3 text-xs tracking-[0.3em] uppercase transition-all duration-300 w-full sm:w-auto"
                    style={{ boxShadow: '0 0 15px rgba(200,255,0,0.2)' }}
                  >
                    Execute [Enter]
                  </button>
                </div>
              </motion.form>

              {/* Direct Comms & Socials inside terminal */}
              <div className="mt-16 pt-8 border-t border-[#C8FF00]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10">
                <div className="space-y-2">
                  <p className="text-[10px] tracking-[0.2em] opacity-50 uppercase block">&gt; DIRECT_COMMS</p>
                  <p className="text-xs tracking-widest"><span className="opacity-50">EML:</span> contact@pangerlkr.link</p>
                  <p className="text-xs tracking-widest"><span className="opacity-50">TEL:</span> +91 81328 72135</p>
                </div>
                
                <div className="space-y-2 text-left md:text-right">
                  <p className="text-[10px] tracking-[0.2em] opacity-50 uppercase block">&gt; SOCIAL_HANDSHAKE</p>
                  <div className="flex gap-4">
                    {SOCIALS.map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-xs tracking-widest hover:bg-[#C8FF00] hover:text-[#020a02] px-2 py-1 transition-colors uppercase">
                        [{s.label}]
                      </a>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
        
        {/* Monitor Stand (hide on zoom) */}
        <motion.div 
          className="w-40 bg-[#151515] border-t border-[#333]"
          animate={{ opacity: phase === 'zoom' ? 0 : 1, height: phase === 'zoom' ? 0 : 70 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}
        />
        <motion.div 
          className="w-56 bg-[#0f0f0f] rounded-t-lg border-t border-[#222]"
          animate={{ opacity: phase === 'zoom' ? 0 : 1, height: phase === 'zoom' ? 0 : 16 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </section>
  )
}


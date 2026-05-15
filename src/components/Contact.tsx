'use client'

import { motion } from 'framer-motion'

const SOCIALS = [
  { 
    label: 'Instagram', 
    href: 'https://instagram.com/panger__lkr', 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    )
  },
  { 
    label: 'LinkedIn', 
    href: 'https://linkedin.com/in/pangerlkr', 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    )
  },
  { 
    label: 'GitHub', 
    href: 'https://github.com/pangerlkr', 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    )
  },
  { 
    label: 'Facebook', 
    href: 'https://facebook.com/lkr.panger', 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    )
  },
  { 
    label: 'X (Twitter)', 
    href: 'https://x.com/panger__lkr', 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z"/>
      </svg>
    )
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-[#121212] pt-8 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(200,255,0,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Divider */}
        <div className="h-px w-full bg-white/8 mb-24" />

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-accent mb-4">Let&apos;s talk</p>
          <h2
            className="font-black leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
          >
            <span
              style={{
                background: 'linear-gradient(160deg, #F0F0F0 0%, rgba(240,240,240,0.3) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Say Hello.
            </span>
          </h2>
        </motion.div>

        {/* Contact Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xs tracking-[0.3em] uppercase text-accent font-black mb-8">Get in touch</h3>
            <div className="space-y-8">
              <a
                href="mailto:contact@pangerlkr.link"
                className="group flex items-center gap-6 p-6 rounded-2xl glass hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-white/20 font-bold mb-1">Email</p>
                  <p className="text-white/80 font-medium">contact@pangerlkr.link</p>
                </div>
              </a>

              <a
                href="tel:+918132872135"
                className="group flex items-center gap-6 p-6 rounded-2xl glass hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:scale-110 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-white/20 font-bold mb-1">Phone</p>
                  <p className="text-white/80 font-medium">+91 81328 72135</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass p-8 md:p-10 rounded-3xl"
          >
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true" 
              data-netlify-honeypot="bot-field"
              className="space-y-6"
            >
              {/* Netlify Hidden Fields */}
              <input type="hidden" name="form-name" value="contact" />
              <div className="hidden">
                <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] tracking-widest uppercase text-white/30 font-bold ml-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] tracking-widest uppercase text-white/30 font-bold ml-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] tracking-widest uppercase text-white/30 font-bold ml-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="How can we help?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                />
              </div>
              <div className="flex items-center gap-3 ml-1">
                <input
                  type="checkbox"
                  id="confirm"
                  name="confirm"
                  required
                  className="w-4 h-4 rounded bg-white/5 border-white/10 text-accent focus:ring-accent focus:ring-offset-[#121212] transition-colors"
                />
                <label htmlFor="confirm" className="text-[10px] tracking-widest uppercase text-white/30 font-bold">
                  I am human and agree to be contacted.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-[#121212] font-bold py-4 rounded-xl text-xs tracking-[0.2em] uppercase hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(200,255,0,0.2)]"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex items-center justify-center gap-6 flex-wrap mb-24"
        >
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              id={`social-${s.label.toLowerCase().replace(' ', '-')}`}
              aria-label={s.label}
              className="glass w-14 h-14 rounded-2xl flex items-center justify-center text-white/30 hover:text-accent hover:border-accent/30 transition-all duration-300 hover:scale-110 active:scale-95"
            >
              {s.icon}
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-white/20 tracking-widest uppercase">
            © {new Date().getFullYear()} Pangerkumzuk Longkumer · Founder of NEXUSCIPHERGUARD India
          </p>
        </div>
      </div>
    </section>
  )
}

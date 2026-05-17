import { NextRequest, NextResponse } from 'next/server'
import { otpStore } from '@/lib/otpStore'

const RESEND_API_KEY = 're_9nfY45vC_GjTN9dthEF2s86bh9tG7hmEV'
const FROM = 'NEXUS_TERM <noreply@pangerlkr.link>'
const OTP_TTL_MS = 10 * 60 * 1000 // 10 minutes

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000))
    const expiresAt = Date.now() + OTP_TTL_MS

    otpStore.set(email.toLowerCase(), { otp, expiresAt, verified: false })

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        subject: 'NEXUS_TERM // VERIFICATION_CODE',
        html: `
          <div style="background:#020a02;color:#C8FF00;font-family:monospace;padding:40px;max-width:480px;margin:0 auto;border:1px solid rgba(200,255,0,0.2);">
            <p style="font-size:11px;letter-spacing:0.3em;opacity:0.5;margin:0 0 16px;">OS_VER: NEXUS_2.4.1 // SECURE_LINE</p>
            <h2 style="font-size:22px;font-weight:900;letter-spacing:0.05em;margin:0 0 24px;text-transform:uppercase;">&gt; VERIFICATION_CODE</h2>
            <p style="font-size:13px;opacity:0.6;margin:0 0 16px;">Enter this code to complete email verification:</p>
            <div style="font-size:42px;font-weight:900;letter-spacing:0.3em;text-shadow:0 0 12px rgba(200,255,0,0.6);margin:24px 0;border:1px solid rgba(200,255,0,0.3);padding:20px;text-align:center;">${otp}</div>
            <p style="font-size:10px;opacity:0.4;margin:16px 0 0;letter-spacing:0.15em;">CODE EXPIRES IN 10 MINUTES. DO NOT SHARE.</p>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 })
  }
}

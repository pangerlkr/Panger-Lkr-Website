import { NextRequest, NextResponse } from 'next/server'
import { otpStore } from '@/lib/otpStore'

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json()

    if (!email || !otp) {
      return NextResponse.json({ error: 'Missing fields.' }, { status: 400 })
    }

    const record = otpStore.get(email.toLowerCase())

    if (!record) {
      return NextResponse.json({ error: 'No OTP found for this email.' }, { status: 400 })
    }

    if (record.verified) {
      return NextResponse.json({ error: 'OTP already used.' }, { status: 400 })
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(email.toLowerCase())
      return NextResponse.json({ error: 'OTP expired. Please request a new one.' }, { status: 400 })
    }

    if (record.otp !== String(otp).trim()) {
      return NextResponse.json({ error: 'Incorrect code.' }, { status: 400 })
    }

    // Mark verified
    otpStore.set(email.toLowerCase(), { ...record, verified: true })

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 })
  }
}

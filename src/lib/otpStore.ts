interface OtpRecord {
  otp: string
  expiresAt: number
  verified: boolean
}

// Module-level map persists across requests in the same Node.js process.
// Entries are cleaned up on next access for the same email.
export const otpStore = new Map<string, OtpRecord>()

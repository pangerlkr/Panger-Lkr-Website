import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY = 're_9nfY45vC_GjTN9dthEF2s86bh9tG7hmEV'
const FROM = 'PANGER_LKR <noreply@pangerlkr.link>'
const TO = 'contact@pangerlkr.link'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields.' }, { status: 400 })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `NEXUS_TERM // NEW_MESSAGE from ${name}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>PANGER_LKR // New Contact Message</title>
</head>
<body style="margin:0;padding:0;background:#050505;font-family:Consolas,Monaco,'Courier New',monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#050505;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="680" cellpadding="0" cellspacing="0" border="0"
          style="background:#020802;border:1px solid #243f00;box-shadow:0 0 40px rgba(187,255,0,0.08);">
          <tr>
            <td style="padding:45px 55px 20px 55px;">
              <div style="margin-bottom:35px;">
                <img src="https://pangerlkr.link/logo.png" alt="PANGER_LKR" width="180"
                  style="display:block;max-width:180px;height:auto;border:0;" />
              </div>
              <div style="color:#728500;font-size:13px;letter-spacing:4px;margin-bottom:18px;">
                PANGER_LKR // CONTACT_GATEWAY
              </div>
              <div style="font-size:40px;font-weight:700;color:#dfff00;line-height:1.2;letter-spacing:2px;">
                &gt; NEW_INBOUND_MESSAGE
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 55px;">
              <div style="height:1px;background:#243f00;"></div>
            </td>
          </tr>
          <tr>
            <td style="padding:45px 55px;">
              <div style="margin-bottom:24px;">
                <div style="color:#728500;font-size:11px;letter-spacing:3px;margin-bottom:6px;">SENDER_ID</div>
                <div style="color:#dfff00;font-size:18px;">${name}</div>
              </div>
              <div style="margin-bottom:24px;">
                <div style="color:#728500;font-size:11px;letter-spacing:3px;margin-bottom:6px;">RETURN_PATH</div>
                <div style="color:#dfff00;font-size:18px;">${email}</div>
              </div>
              <div style="margin-bottom:24px;">
                <div style="color:#728500;font-size:11px;letter-spacing:3px;margin-bottom:10px;">PAYLOAD</div>
                <div style="color:#cfe96e;font-size:16px;line-height:1.8;background:#010701;border:1px solid #355e00;padding:24px;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background:#010401;border-top:1px solid #243f00;padding:35px 55px;">
              <div style="color:#3e4715;font-size:12px;letter-spacing:3px;">
                &copy; 2026 PANGER_LKR // CONTACT_GATEWAY
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('Resend error:', err)
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal error.' }, { status: 500 })
  }
}

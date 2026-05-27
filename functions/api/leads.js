/**
 * Cloudflare Pages Function — POST /api/leads
 *
 * Receives a lead form submission, emails it via Resend.
 * Cloudflare Workers have no persistent filesystem; the email IS the
 * notification system. Add Cloudflare D1 / KV bindings if you need
 * queryable storage (see wrangler.toml comments).
 *
 * Required env vars (set in Cloudflare Pages → Settings → Environment Variables):
 *   RESEND_API_KEY
 *   FROM_EMAIL      (verified sender on resend.com, e.g. leads@azazirealestate.com)
 *   NOTIFY_EMAIL    (default: michael.azazi@gmail.com)
 */

const NOTIFY_EMAIL = 'michael.azazi@gmail.com'

function buildLeadEmailHtml(lead) {
  const isBuyer = lead.type === 'buyer'
  const accentColor = '#19469D'

  const rows = Object.entries(lead)
    .filter(([k]) => !['id', 'timestamp'].includes(k))
    .map(([key, val]) => {
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())
      return `
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#374151;background:#F9FAFB;border-bottom:1px solid #E5E7EB;width:40%">${label}</td>
          <td style="padding:8px 12px;color:#111827;border-bottom:1px solid #E5E7EB">${val || '—'}</td>
        </tr>`
    })
    .join('')

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:system-ui,sans-serif;background:#F3F4F6">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.1)">
    <div style="background:${accentColor};padding:28px 32px">
      <p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;text-transform:uppercase;letter-spacing:1px">Michael Azazi Real Estate LLC</p>
      <h1 style="margin:8px 0 0;color:#fff;font-size:22px;font-weight:700">New ${isBuyer ? '🏠 Buyer' : '💰 Seller'} Lead</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:14px">${new Date(lead.timestamp).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
    </div>
    <div style="padding:24px 32px">
      <table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden">${rows}</table>
      <div style="margin-top:24px;padding:16px;background:#EEF2FF;border-radius:8px;border-left:4px solid ${accentColor}">
        <p style="margin:0;font-size:13px;color:#4338CA;font-weight:600">⚡ Follow up within 5 minutes to maximize conversion!</p>
      </div>
    </div>
    <div style="padding:16px 32px;background:#F9FAFB;border-top:1px solid #E5E7EB">
      <p style="margin:0;font-size:12px;color:#9CA3AF;text-align:center">Sent by azazirealestate.com · Lead ID: ${lead.id}</p>
    </div>
  </div>
</body></html>`
}

export async function onRequestPost({ request, env }) {
  // CORS preflight is handled by onRequestOptions below
  try {
    const body = await request.json()
    const { name, email, phone, type, ...rest } = body

    if (!name || !email || !type) {
      return Response.json({ error: 'name, email, and type are required' }, { status: 400 })
    }

    const lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toISOString(),
      type,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      ...rest,
    }

    // Send email via Resend REST API (no SDK needed in Workers)
    const resendKey = env.RESEND_API_KEY
    if (resendKey) {
      const subject = `New ${type === 'buyer' ? '🏠 Buyer' : '💰 Seller'} Lead — ${lead.name}`
      const fromEmail = env.FROM_EMAIL || 'onboarding@resend.dev'
      const toEmail = env.NOTIFY_EMAIL || NOTIFY_EMAIL

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: lead.email,
          subject,
          html: buildLeadEmailHtml(lead),
        }),
      })
    }

    return Response.json({ success: true, id: lead.id }, { status: 201 })
  } catch (err) {
    console.error('POST /api/leads error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

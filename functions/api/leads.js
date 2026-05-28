/**
 * Cloudflare Pages Function — POST /api/leads
 *
 * Required env vars (Cloudflare Pages → Settings → Environment Variables):
 *   RESEND_API_KEY
 *   NOTIFICATION_EMAIL   recipient address
 *
 * Optional:
 *   FROM_EMAIL           verified Resend sender (defaults to onboarding@resend.dev)
 */

const FALLBACK_NOTIFY = 'michael.azazi@gmail.com'
const ACCENT = '#19469D'

// Human-readable labels for every survey question id
const LABELS = {
  // seller
  reason:          'Reason for selling',
  urgency:         'Urgency to sell',
  moveByDate:      'Move-by date',
  loanBalance:     'Loan balance',
  needToBuy:       'Needs to buy after selling',
  priceRange:      'Estimated home value',
  realtorCriteria: 'Most important in a realtor',
  situation:       'Seller situation',
  agent:           'Currently working with an agent',
  // buyer
  cobuyerName:     'Co-buyer / spouse name',
  timeline:        'Purchase timeline',
  priceMin:        'Minimum budget',
  priceMax:        'Maximum budget',
  bedsBathsSqft:   'Min beds / baths / sqft',
  areas:           'Preferred areas',
  homeStyle:       'Home style preference',
  preapproved:     'Met with a lender',
  loanType:        'Loan type',
  needToSell:      'Has home to sell first',
  viewingTimes:    'Best times to view homes',
  dealBreakers:    'Must-have deal breakers',
  realtorQualities:'Qualities wanted in a realtor',
  // shared
  personality:     'Personality type',
  notes:           'Additional notes',
}

function formatValue(val) {
  if (Array.isArray(val)) return val.join(', ')
  return val || '—'
}

function answerRows(answers) {
  return Object.entries(answers)
    .map(([key, val]) => {
      const label = LABELS[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())
      return `
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#374151;background:#F9FAFB;border-bottom:1px solid #E5E7EB;width:42%;vertical-align:top">${label}</td>
          <td style="padding:8px 12px;color:#111827;border-bottom:1px solid #E5E7EB;white-space:pre-wrap">${formatValue(val)}</td>
        </tr>`
    })
    .join('')
}

function buildHtml({ id, timestamp, type, name, phone, email, answers }) {
  const isBuyer = type === 'buyer'
  const dateStr = new Date(timestamp).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:system-ui,sans-serif;background:#F3F4F6">
  <div style="max-width:620px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.1)">

    <div style="background:${ACCENT};padding:28px 32px">
      <p style="margin:0;color:rgba(255,255,255,0.75);font-size:12px;text-transform:uppercase;letter-spacing:1px">Michael Azazi Real Estate, Brokered by eXp Realty</p>
      <h1 style="margin:8px 0 0;color:#fff;font-size:22px;font-weight:700">New ${isBuyer ? '🏠 Buyer' : '💰 Seller'} Lead</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:13px">${dateStr}</p>
    </div>

    <div style="padding:24px 32px">

      <h2 style="margin:0 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#6B7280">Contact</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden;margin-bottom:28px">
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#374151;background:#F9FAFB;border-bottom:1px solid #E5E7EB;width:42%">Name</td>
          <td style="padding:8px 12px;color:#111827;border-bottom:1px solid #E5E7EB">${name}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#374151;background:#F9FAFB;border-bottom:1px solid #E5E7EB">Phone</td>
          <td style="padding:8px 12px;color:#111827;border-bottom:1px solid #E5E7EB">${phone || '—'}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#374151;background:#F9FAFB">Email</td>
          <td style="padding:8px 12px;color:#111827"><a href="mailto:${email}" style="color:${ACCENT}">${email}</a></td>
        </tr>
      </table>

      <h2 style="margin:0 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;color:#6B7280">Survey Answers</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden">
        ${answerRows(answers || {})}
      </table>

      <div style="margin-top:24px;padding:16px;background:#EEF2FF;border-radius:8px;border-left:4px solid ${ACCENT}">
        <p style="margin:0;font-size:13px;color:#4338CA;font-weight:600">⚡ Follow up within 5 minutes to maximize conversion!</p>
      </div>
    </div>

    <div style="padding:16px 32px;background:#F9FAFB;border-top:1px solid #E5E7EB">
      <p style="margin:0;font-size:12px;color:#9CA3AF;text-align:center">Sent by azazirealestate.com · Lead ID: ${id}</p>
    </div>
  </div>
</body></html>`
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json()
    const { name, email, phone, type, answers } = body

    if (!name || !email || !type) {
      return Response.json({ error: 'name, email, and type are required' }, { status: 400 })
    }

    const lead = {
      id:        `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toISOString(),
      type,
      name:      name.trim(),
      email:     email.trim().toLowerCase(),
      phone:     phone?.trim() || '',
      answers:   answers || {},
    }

    const resendKey = env.RESEND_API_KEY
    if (resendKey) {
      const toEmail   = env.NOTIFICATION_EMAIL || FALLBACK_NOTIFY
      const fromEmail = env.FROM_EMAIL || 'onboarding@resend.dev'
      const subject   = `New ${type === 'buyer' ? '🏠 Buyer' : '💰 Seller'} Lead — ${lead.name}`

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization:  `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from:     fromEmail,
          to:       [toEmail],
          reply_to: lead.email,
          subject,
          html:     buildHtml(lead),
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error('Resend error:', res.status, err)
      }
    }

    return Response.json({ success: true, id: lead.id }, { status: 201 })
  } catch (err) {
    console.error('POST /api/leads error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin':  '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

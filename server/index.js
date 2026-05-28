import express from 'express'
import cors from 'cors'
import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { Resend } from 'resend'
import 'dotenv/config'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const app = express()
const PORT = process.env.PORT || 3001

// ── Resend client ──────────────────────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY)
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'michael.azazi@gmail.com'
// For Resend free tier, use your verified domain. While testing you can use:
// from: 'onboarding@resend.dev'
const FROM_EMAIL = process.env.FROM_EMAIL || 'leads@azazirealestate.com'

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

// ── Helpers ────────────────────────────────────────────────────────────────
const LEADS_FILE = join(__dirname, 'leads.json')
const LISTINGS_FILE = join(ROOT, 'listings.json')

async function readLeads() {
  if (!existsSync(LEADS_FILE)) {
    await writeFile(LEADS_FILE, '[]', 'utf8')
    return []
  }
  const raw = await readFile(LEADS_FILE, 'utf8')
  return JSON.parse(raw)
}

async function saveLeads(leads) {
  await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8')
}

function buildLeadEmailHtml(lead) {
  const isBuyer = lead.type === 'buyer'
  const typeLabel = isBuyer ? '🏠 Buyer' : '💰 Seller'
  const accentColor = '#19469D'

  const rows = Object.entries(lead)
    .filter(([k]) => !['id', 'timestamp'].includes(k))
    .map(([key, val]) => {
      const label = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, s => s.toUpperCase())
      return `
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#374151;background:#F9FAFB;border-bottom:1px solid #E5E7EB;width:40%">${label}</td>
          <td style="padding:8px 12px;color:#111827;border-bottom:1px solid #E5E7EB">${val || '—'}</td>
        </tr>`
    })
    .join('')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:system-ui,-apple-system,sans-serif;background:#F3F4F6">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.1)">

    <!-- Header -->
    <div style="background:${accentColor};padding:28px 32px">
      <p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;text-transform:uppercase;letter-spacing:1px">Michael Azazi Real Estate, Brokered by eXp Realty</p>
      <h1 style="margin:8px 0 0;color:#fff;font-size:22px;font-weight:700">New ${typeLabel} Lead</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:14px">${new Date(lead.timestamp).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
    </div>

    <!-- Body -->
    <div style="padding:24px 32px">
      <p style="margin:0 0 20px;font-size:15px;color:#6B7280">
        A new ${isBuyer ? 'buyer' : 'seller'} just submitted a lead on your website. Their details are below.
      </p>

      <table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden">
        ${rows}
      </table>

      <div style="margin-top:24px;padding:16px;background:#EEF2FF;border-radius:8px;border-left:4px solid ${accentColor}">
        <p style="margin:0;font-size:13px;color:#4338CA;font-weight:600">⚡ Follow up within 5 minutes to maximize conversion!</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:16px 32px;background:#F9FAFB;border-top:1px solid #E5E7EB">
      <p style="margin:0;font-size:12px;color:#9CA3AF;text-align:center">
        Sent by azazirealestate.com · Lead ID: ${lead.id}
      </p>
    </div>

  </div>
</body>
</html>`
}

// ── Routes ─────────────────────────────────────────────────────────────────

// POST /api/leads — save lead + send email
app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, phone, type, ...rest } = req.body

    // Basic validation
    if (!name || !email || !type) {
      return res.status(400).json({ error: 'name, email, and type are required' })
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

    // 1. Save to leads.json
    const leads = await readLeads()
    leads.push(lead)
    await saveLeads(leads)

    // 2. Send email via Resend
    const subject = `New ${type === 'buyer' ? '🏠 Buyer' : '💰 Seller'} Lead — ${lead.name}`
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        reply_to: lead.email,
        subject,
        html: buildLeadEmailHtml(lead),
      })
    } catch (emailErr) {
      // Email failure is non-fatal — lead is already saved
      console.error('Resend error (lead saved):', emailErr.message)
    }

    res.status(201).json({ success: true, id: lead.id })
  } catch (err) {
    console.error('POST /api/leads error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /api/listings — read listings.json
app.get('/api/listings', async (req, res) => {
  try {
    const raw = await readFile(LISTINGS_FILE, 'utf8')
    res.json(JSON.parse(raw))
  } catch (err) {
    console.error('GET /api/listings error:', err)
    res.status(500).json({ error: 'Could not load listings' })
  }
})

// GET /api/config — public runtime config (YouTube URL, etc.)
app.get('/api/config', (_req, res) => {
  res.json({
    youtubeUrl: process.env.YOUTUBE_URL || '',
    agentName: process.env.AGENT_NAME || 'Michael Azazi',
    agentPhone: process.env.AGENT_PHONE || '',
    agentEmail: process.env.AGENT_EMAIL || 'michael.azazi@gmail.com',
  })
})

// ── Start ──────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🏠  Azazi Real Estate API`)
  console.log(`    http://localhost:${PORT}`)
  console.log(`    Leads → ${LEADS_FILE}`)
  console.log(`    Notify → ${NOTIFY_EMAIL}\n`)
})

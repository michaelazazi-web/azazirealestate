/**
 * Cloudflare Pages Function — GET /api/config
 *
 * Returns public runtime configuration (YouTube URL, agent info, etc.).
 * Set these in Cloudflare Pages → Settings → Environment Variables.
 *
 * Required env vars:
 *   YOUTUBE_URL    — full YouTube URL or video ID to embed
 *
 * Optional:
 *   AGENT_NAME     — defaults to "Michael Azazi"
 *   AGENT_PHONE    — agent's phone number
 *   AGENT_EMAIL    — defaults to "michael.azazi@gmail.com"
 */

export async function onRequestGet({ env }) {
  return Response.json({
    youtubeUrl: env.YOUTUBE_URL || '',
    agentName: env.AGENT_NAME || 'Michael Azazi',
    agentPhone: env.AGENT_PHONE || '',
    agentEmail: env.AGENT_EMAIL || 'michael.azazi@gmail.com',
  })
}

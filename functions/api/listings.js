/**
 * Cloudflare Pages Function — GET /api/listings
 *
 * Serves the listings.json data. The file is imported at build time
 * so it's bundled into the Worker — no filesystem access needed.
 *
 * To update listings in production: edit listings.json and redeploy.
 */

import listings from '../../listings.json'

export async function onRequestGet() {
  return Response.json(listings, {
    headers: {
      'Cache-Control': 'public, max-age=300', // cache for 5 minutes
    },
  })
}

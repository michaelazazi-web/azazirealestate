export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        ...body,
        from: "appointments@azazirealestate.com",
        to: "michael@azazirealestate.com",
      }),
    });

    const data = await res.json().catch(() => null);
    return Response.json(data, { status: res.status });
  } catch (err) {
    console.error("POST /api/send-email error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

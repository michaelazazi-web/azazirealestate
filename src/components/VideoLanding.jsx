import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import probateTranscript from "../content/probate-transcript.txt?raw";
import expiredTranscript from "../content/expired-transcript.txt?raw";
import fsboTranscript from "../content/fsbo-transcript.txt?raw";

// Paste each unlisted YouTube video ID here (the part after "watch?v=").
// Until an ID is filled in, the page shows a "video coming soon" placeholder.
const VIDEO_PAGES = {
  probate: {
    youtubeId: "9IBRGvwgk5c",
    indexable: false,
    title: "Handling a Loved One's Home Through Probate? | Michael Azazi Real Estate",
    eyebrow: "Probate Real Estate · Charlotte Metro",
    headline: "Handling a Loved One's Home Through Probate?",
    sub: "Clear answers, no pressure, and someone in your corner while you work through it.",
    intro:
      "If you've recently lost someone and are now responsible for their home, you don't have to figure this out alone. This short video walks through how probate real estate works and what your options really are.",
    cta: "Schedule a Private Conversation",
    ctaNote: "No sales pitch. No obligation. Just answers about your situation.",
    transcript: probateTranscript,
    disclaimer:
      "Michael Azazi is a licensed real estate broker, not an attorney. Nothing on this page is legal or tax advice. Please consult an estate attorney about legal questions regarding probate.",
  },
  expired: {
    youtubeId: "VGuz9-cQqeU",
    indexable: false,
    title: "Your Home Didn't Sell | Michael Azazi Real Estate",
    eyebrow: "For Homeowners Whose Listing Expired",
    headline: "Your Home Didn't Sell. Here's What Most Sellers Never Get Told.",
    sub: "Before you decide whether to relist, understand what really happened.",
    intro:
      "If your listing expired and nobody could give you a straight answer about why, this video is for you. No pressure to relist. Just clarity.",
    cta: "Schedule a Second-Opinion Call",
    ctaNote: "Find out what kept your home from selling and what could be done differently.",
    transcript: expiredTranscript,
    disclaimer:
      "If your home is currently listed with another brokerage, please disregard this page. It is not a solicitation of your listing.",
  },
  fsbo: {
    youtubeId: "pYEMvmLkX3Y",
    indexable: false,
    title: "Selling Your Home Yourself? | Michael Azazi Real Estate",
    eyebrow: "For Homeowners Selling On Their Own",
    headline: "Selling Your Home Yourself? Watch This First.",
    sub: "What most homeowners don't get told about pricing, positioning, and negotiating on their own.",
    intro:
      "Selling without an agent can make sense. This video shares what to watch for so that whatever you decide, you decide with clarity.",
    cta: "Get a Free Second Opinion",
    ctaNote: "No pressure, no obligation. Keep selling it yourself if that's still the right fit.",
    transcript: fsboTranscript,
    disclaimer: "",
    resource: {
      eyebrow: "Free Resource",
      title: "The For Sale By Owner Marketing Tool Kit",
      text: "Ten practical steps for pricing, preparing, marketing, and negotiating your home on your own, plus the NC and SC disclosure forms you'll need. Free, no obligation.",
      file: "/downloads/FSBO-Marketing-Tool-Kit-Michael-Azazi.pdf",
      leadType: "fsbo-guide",
    },
  },
};

const C = {
  bg: "#F5F7FC",
  card: "#FFFFFF",
  blue: "#2563EB",
  blueMid: "#1D4ED8",
  blueLight: "#3B6FEF",
  white: "#ffffff",
  ink: "#11162B",
  body: "rgba(17,22,43,0.82)",
  muted: "rgba(17,22,43,0.6)",
  border: "rgba(17,22,43,0.1)",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@300;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; background: ${C.bg}; color: ${C.ink}; -webkit-font-smoothing: antialiased; }

  .vl-nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 40px; border-bottom: 1px solid ${C.border}; background: ${C.card}; }
  .vl-brand { display: flex; align-items: center; gap: 14px; text-decoration: none; color: ${C.ink}; }
  .vl-brand-name { display: flex; align-items: center; gap: 8px; font-family: 'Manrope', sans-serif; font-size: 15px; font-weight: 800; letter-spacing: 0.5px; }
  .vl-phone { font-family: 'Manrope', sans-serif; font-size: 15px; font-weight: 800; color: ${C.ink}; text-decoration: none; }
  .vl-phone:hover { color: ${C.blue}; }

  .vl-bg { background: radial-gradient(ellipse at 75% 0%, rgba(37,99,235,0.08) 0%, transparent 55%); }
  .vl-main { max-width: 900px; margin: 0 auto; padding: 72px 24px 64px; position: relative; }
  .vl-eyebrow { position: relative; font-size: 10px; font-weight: 400; letter-spacing: 4px; text-transform: uppercase; color: ${C.blue}; display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .vl-eyebrow::before { content: ''; width: 20px; height: 1px; background: ${C.blue}; }
  .vl-headline { position: relative; font-family: 'Manrope', sans-serif; font-weight: 800; font-size: clamp(30px, 5vw, 52px); line-height: 1.1; margin-bottom: 14px; color: ${C.ink}; }
  .vl-sub { position: relative; font-family: 'Manrope', sans-serif; font-weight: 300; font-size: clamp(17px, 2.2vw, 22px); color: ${C.blue}; line-height: 1.4; margin-bottom: 20px; }
  .vl-intro { position: relative; font-size: 16px; line-height: 1.8; color: ${C.body}; max-width: 680px; margin-bottom: 36px; }

  .vl-video { position: relative; width: 100%; aspect-ratio: 16 / 9; border-radius: 8px; overflow: hidden; background: #0c0f24; border: 1px solid ${C.border}; box-shadow: 0 20px 50px rgba(17,22,43,0.18); }
  .vl-video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
  .vl-video-placeholder { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.7); font-size: 13px; letter-spacing: 2px; text-transform: uppercase; }

  .vl-cta-wrap { text-align: center; margin: 40px 0 56px; }
  .vl-cta { display: inline-block; background: ${C.blue}; color: ${C.white}; text-decoration: none; font-size: 13px; letter-spacing: 2.5px; text-transform: uppercase; padding: 18px 40px; border-radius: 4px; transition: all 0.2s; }
  .vl-cta:hover { background: ${C.blueMid}; transform: translateY(-1px); }
  .vl-cta-note { margin-top: 14px; font-size: 14px; color: ${C.muted}; }

  .vl-res { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 8px; padding: 32px; margin-bottom: 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: center; }
  .vl-res .vl-res-eyebrow { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: ${C.blue}; margin-bottom: 10px; }
  .vl-res h2 { font-family: 'Manrope', sans-serif; font-weight: 800; font-size: 22px; line-height: 1.2; color: ${C.ink}; margin-bottom: 10px; }
  .vl-res p { font-size: 14px; line-height: 1.7; color: ${C.body}; }
  .vl-res form { display: flex; flex-direction: column; gap: 10px; }
  .vl-res input { padding: 12px 14px; font-size: 15px; border: 1px solid ${C.border}; border-radius: 6px; font-family: inherit; }
  .vl-res button, .vl-res .vl-dl { background: ${C.blue}; color: ${C.white}; border: none; border-radius: 4px; padding: 14px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; text-align: center; text-decoration: none; font-family: inherit; }
  .vl-res button:disabled { opacity: 0.6; cursor: default; }
  .vl-res small { font-size: 11px; color: ${C.muted}; line-height: 1.5; }
  @media (max-width: 700px) { .vl-res { grid-template-columns: 1fr; padding: 24px; } }
  .vl-transcript { border-top: 1px solid ${C.border}; padding-top: 24px; }
  .vl-transcript summary { cursor: pointer; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: ${C.blue}; list-style: none; }
  .vl-transcript summary::-webkit-details-marker { display: none; }
  .vl-transcript summary::before { content: '+ '; }
  .vl-transcript[open] summary::before { content: '\\2212  '; }
  .vl-transcript-body { margin-top: 20px; }
  .vl-transcript-body p { font-size: 15px; line-height: 1.85; color: ${C.body}; margin-bottom: 14px; }

  .vl-disclaimer { margin-top: 40px; font-size: 13px; line-height: 1.7; color: ${C.muted}; border-left: 2px solid ${C.blue}; padding-left: 14px; }

  .vl-footer { background: ${C.card}; border-top: 1px solid ${C.border}; padding: 36px 24px; font-size: 12px; font-weight: 400; color: ${C.muted}; letter-spacing: 0.5px; text-align: center; line-height: 2; }
  .vl-footer a { color: ${C.blue}; text-decoration: none; }
  .vl-footer-logos { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 16px; }

  @media (max-width: 600px) {
    .vl-nav { padding: 12px 16px; }
    .vl-brand-name { font-size: 11px; }
    .vl-brand > img { height: 38px !important; width: 38px !important; }
    .vl-phone { font-size: 12px; }
    .vl-main { padding: 48px 20px 48px; }
    .vl-cta { padding: 16px 24px; font-size: 12px; }
  }
`;

function ResourceDownload({ r }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  async function submit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("sending");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, type: r.leadType, answers: { resource: r.title, page: window.location.pathname } }),
      });
    } catch (err) {
      console.error(err);
    }
    setStatus("done");
  }

  return (
    <section className="vl-res">
      <div>
        <p className="vl-res-eyebrow">{r.eyebrow}</p>
        <h2>{r.title}</h2>
        <p>{r.text}</p>
      </div>
      {status === "done" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <p><strong>Thanks, {name.split(" ")[0]}.</strong> Your guide is ready.</p>
          <a className="vl-dl" href={r.file} target="_blank" rel="noopener" download>Download the Free Guide</a>
        </div>
      ) : (
        <form onSubmit={submit}>
          <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required autoComplete="name" />
          <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
          <button type="submit" disabled={status === "sending"}>{status === "sending" ? "One moment..." : "Get the Free Guide"}</button>
          <small>Michael may follow up by email about your home sale. No spam, and you can opt out anytime.</small>
        </form>
      )}
    </section>
  );
}

export default function VideoLanding({ page }) {
  const p = VIDEO_PAGES[page];

  useEffect(() => {
    const prevTitle = document.title;
    document.title = p.title;
    let robots = null;
    if (!p.indexable) {
      robots = document.createElement("meta");
      robots.name = "robots";
      robots.content = "noindex";
      document.head.appendChild(robots);
    }
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
      if (robots) robots.remove();
    };
  }, [p]);

  const paragraphs = p.transcript.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);

  return (
    <>
      <style>{styles}</style>

      <nav className="vl-nav">
        <Link to="/" className="vl-brand">
          <img src="/images/logo.png" alt="Michael Azazi Real Estate" style={{ height: 52, width: 52, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          <div>
            <span className="vl-brand-name">
              Michael Azazi Real Estate
              <img src="/images/equal.png" alt="Equal Housing Opportunity" style={{ height: 16, width: "auto", opacity: 0.7 }} />
            </span>
            <img src="/images/eXp Realty - Black.svg.svg" alt="eXp Realty" style={{ height: 13, width: "auto", marginTop: 4 }} />
          </div>
        </Link>
        <a href="tel:7044941953" className="vl-phone">(704) 494-1953</a>
      </nav>

      <div className="vl-bg">
      <main className="vl-main">
        <p className="vl-eyebrow">{p.eyebrow}</p>
        <h1 className="vl-headline">{p.headline}</h1>
        <p className="vl-sub">{p.sub}</p>
        <p className="vl-intro">{p.intro}</p>

        <div className="vl-video">
          {p.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${p.youtubeId}?rel=0&modestbranding=1&playsinline=1`}
              title={p.headline}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="vl-video-placeholder">Video coming soon</div>
          )}
        </div>

        <div className="vl-cta-wrap">
          <Link to={`/schedule?source=${page}`} className="vl-cta">{p.cta}</Link>
          <p className="vl-cta-note">{p.ctaNote}</p>
        </div>

        {p.resource && <ResourceDownload r={p.resource} />}

        <details className="vl-transcript">
          <summary>Read the transcript</summary>
          <div className="vl-transcript-body">
            {paragraphs.map((t, i) => <p key={i}>{t}</p>)}
          </div>
        </details>

        <p className="vl-disclaimer">
          {p.disclaimer && <>{p.disclaimer} </>}
          This video uses an AI-generated presentation of Michael Azazi.
        </p>
      </main>
      </div>

      <footer className="vl-footer">
        <div>Michael Azazi Real Estate · Brokered by eXp Realty · Licensed in NC &amp; SC</div>
        <div>
          Michael: <a href="tel:7044941953">(704) 494-1953</a> · eXp Realty: <a href="tel:7042488230">(704) 248-8230</a> · <a href="mailto:michael@azazirealestate.com">michael@azazirealestate.com</a>
        </div>
        <div>Not intended to solicit currently listed properties or buyers under existing representation agreements</div>
        <div>Opinions are my own and not the views of eXp Realty</div>
        <div className="vl-footer-logos">
          <img src="/images/equal.png" alt="Equal Housing Opportunity" style={{ height: 32, width: "auto", opacity: 0.55 }} />
          <img src="/images/trans_realtor.png" alt="REALTOR®" style={{ height: 32, width: "auto", opacity: 0.55 }} />
        </div>
      </footer>
    </>
  );
}

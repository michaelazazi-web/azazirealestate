import { useEffect } from "react";
import { Link } from "react-router-dom";
import probateTranscript from "../content/probate-transcript.txt?raw";
import expiredTranscript from "../content/expired-transcript.txt?raw";
import fsboTranscript from "../content/fsbo-transcript.txt?raw";

// Paste each unlisted YouTube video ID here (the part after "watch?v=").
// Until an ID is filled in, the page shows a "video coming soon" placeholder.
const VIDEO_PAGES = {
  probate: {
    youtubeId: "",
    indexable: true,
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
    youtubeId: "",
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
    youtubeId: "",
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
  },
};

const C = {
  navy: "#0c0f24",
  navyMid: "#161929",
  navyLight: "#1e2340",
  blue: "#506caa",
  blueMid: "#3d5a96",
  blueLight: "#91a3c9",
  white: "#ffffff",
  muted: "rgba(255,255,255,0.6)",
  border: "rgba(255,255,255,0.1)",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;800&family=Roboto:wght@100;400&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Roboto', sans-serif; background: ${C.navy}; color: ${C.white}; -webkit-font-smoothing: antialiased; }

  .vl-nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 40px; border-bottom: 1px solid ${C.border}; background: ${C.navy}; }
  .vl-brand { display: flex; align-items: center; gap: 14px; text-decoration: none; color: ${C.white}; }
  .vl-brand-name { display: flex; align-items: center; gap: 8px; font-family: 'Manrope', sans-serif; font-size: 15px; font-weight: 800; letter-spacing: 0.5px; }
  .vl-phone { font-family: 'Manrope', sans-serif; font-size: 15px; font-weight: 800; color: ${C.white}; text-decoration: none; }
  .vl-phone:hover { color: ${C.blueLight}; }

  .vl-bg { background: radial-gradient(ellipse at 75% 0%, rgba(80,108,170,0.22) 0%, transparent 55%); }
  .vl-main { max-width: 900px; margin: 0 auto; padding: 72px 24px 64px; position: relative; }
  .vl-eyebrow { position: relative; font-size: 10px; font-weight: 400; letter-spacing: 4px; text-transform: uppercase; color: ${C.blueLight}; display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .vl-eyebrow::before { content: ''; width: 20px; height: 1px; background: ${C.blue}; }
  .vl-headline { position: relative; font-family: 'Manrope', sans-serif; font-weight: 800; font-size: clamp(30px, 5vw, 52px); line-height: 1.1; margin-bottom: 14px; }
  .vl-sub { position: relative; font-family: 'Manrope', sans-serif; font-weight: 300; font-size: clamp(17px, 2.2vw, 22px); color: ${C.blueLight}; line-height: 1.4; margin-bottom: 20px; }
  .vl-intro { position: relative; font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.8); max-width: 680px; margin-bottom: 36px; }

  .vl-video { position: relative; width: 100%; aspect-ratio: 16 / 9; border-radius: 8px; overflow: hidden; background: ${C.navyLight}; border: 1px solid ${C.border}; box-shadow: 0 24px 60px rgba(0,0,0,0.45); }
  .vl-video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
  .vl-video-placeholder { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: ${C.muted}; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; }

  .vl-cta-wrap { text-align: center; margin: 40px 0 56px; }
  .vl-cta { display: inline-block; background: ${C.blue}; color: ${C.white}; text-decoration: none; font-size: 13px; letter-spacing: 2.5px; text-transform: uppercase; padding: 18px 40px; border-radius: 4px; transition: all 0.2s; }
  .vl-cta:hover { background: ${C.blueMid}; transform: translateY(-1px); }
  .vl-cta-note { margin-top: 14px; font-size: 14px; color: ${C.muted}; }

  .vl-transcript { border-top: 1px solid ${C.border}; padding-top: 24px; }
  .vl-transcript summary { cursor: pointer; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: ${C.blueLight}; list-style: none; }
  .vl-transcript summary::-webkit-details-marker { display: none; }
  .vl-transcript summary::before { content: '+ '; }
  .vl-transcript[open] summary::before { content: '\\2212  '; }
  .vl-transcript-body { margin-top: 20px; }
  .vl-transcript-body p { font-size: 15px; line-height: 1.85; color: rgba(255,255,255,0.75); margin-bottom: 14px; }

  .vl-disclaimer { margin-top: 40px; font-size: 13px; line-height: 1.7; color: ${C.muted}; border-left: 2px solid ${C.blue}; padding-left: 14px; }

  .vl-footer { background: #080a18; border-top: 1px solid ${C.border}; padding: 36px 24px; font-size: 11px; font-weight: 100; color: rgba(255,255,255,0.45); letter-spacing: 0.5px; text-align: center; line-height: 2; }
  .vl-footer a { color: rgba(255,255,255,0.55); text-decoration: none; }
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
          <img src="/images/logo.png" alt="Michael Azazi Real Estate" style={{ height: 52, width: 52, borderRadius: "50%", objectFit: "cover", mixBlendMode: "screen", flexShrink: 0 }} />
          <div>
            <span className="vl-brand-name">
              Michael Azazi Real Estate
              <img src="/images/equal.png" alt="Equal Housing Opportunity" style={{ height: 16, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.7 }} />
            </span>
            <img src="/images/exp-logo-white.svg" alt="eXp Realty" style={{ height: 13, width: "auto", marginTop: 4 }} />
          </div>
        </Link>
        <a href="tel:7046593564" className="vl-phone">(704) 659-3564</a>
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
          Michael: <a href="tel:7046593564">(704) 659-3564</a> · eXp Realty: <a href="tel:7042488230">(704) 248-8230</a> · <a href="mailto:michael@azazirealestate.com">michael@azazirealestate.com</a>
        </div>
        <div>Not intended to solicit currently listed properties or buyers under existing representation agreements</div>
        <div>Opinions are my own and not the views of eXp Realty</div>
        <div className="vl-footer-logos">
          <img src="/images/equal.png" alt="Equal Housing Opportunity" style={{ height: 32, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.4 }} />
          <img src="/images/trans_realtor.png" alt="REALTOR®" style={{ height: 32, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.4 }} />
        </div>
      </footer>
    </>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import useDocMeta from "../useDocMeta";

const C = {
  navy:      "#F5F7FC",
  navyMid:   "#FFFFFF",
  navyLight: "#FFFFFF",
  blue:      "#2563EB",
  blueMid:   "#1D4ED8",
  blueLight: "#3B6FEF",
  white:     "#ffffff",
  ink:       "#11162B",
  muted:     "rgba(17,22,43,0.6)",
  border:    "rgba(17,22,43,0.1)",
};

const VIDEOS = [
  {
    id: "expired",
    title: "Why Your Home Didn't Sell (and How to Fix It)",
    description: "If your listing expired, here's what most sellers never get told about why homes sit, and what to do differently next time.",
    youtubeUrl: "https://www.youtube-nocookie.com/embed/VGuz9-cQqeU?rel=0&modestbranding=1&playsinline=1",
    page: "/home-didnt-sell",
    category: "general",
  },
  {
    id: "probate",
    title: "Managing a Home During Probate",
    description: "Recently lost a loved one and responsible for their home? How probate real estate works, what your options are, and how to avoid costly mistakes.",
    youtubeUrl: "https://www.youtube-nocookie.com/embed/9IBRGvwgk5c?rel=0&modestbranding=1&playsinline=1",
    page: "/probate-video",
    category: "probate",
  },
  {
    id: "fsbo",
    title: "What FSBO Sellers Need to Know",
    description: "Selling your home yourself? What to watch for on pricing, positioning, and negotiating so you decide with clarity.",
    youtubeUrl: "https://www.youtube-nocookie.com/embed/pYEMvmLkX3Y?rel=0&modestbranding=1&playsinline=1",
    page: "/selling-on-your-own",
    category: "fsbo",
  },
];

const TABS = [
  { key: "general", label: "Selling" },
  { key: "probate", label: "Probate" },
  { key: "fsbo", label: "FSBO" },
];

export default function Videos() {
  useDocMeta(
    "Watch & Learn | Michael Azazi Real Estate Videos",
    "Charlotte Metro market updates, probate real estate, and FSBO education videos from REALTOR® Michael Azazi."
  );
  const [activeTab, setActiveTab] = useState("general");

  const filtered = VIDEOS.filter(v => v.category === activeTab);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@300;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Roboto', sans-serif; background: ${C.navy}; color: ${C.ink}; -webkit-font-smoothing: antialiased; }
        .vid-tab-btn { transition: color 0.2s, border-color 0.2s; }
        .vid-tab-btn:hover { color: ${C.ink} !important; }
        .vid-back:hover { color: ${C.ink} !important; }
        .vid-card { transition: border-color 0.2s, box-shadow 0.2s; }
        .vid-card:hover { border-color: ${C.blueLight} !important; box-shadow: 0 4px 24px rgba(37,99,235,0.2); }
        .vid-cta:hover { color: ${C.ink} !important; }
        @media (max-width: 600px) {
          .vid-main { padding: 40px 20px !important; }
          .vid-header { padding: 16px 20px !important; }
          .vid-banner { padding: 14px 20px !important; }
        }
      `}</style>

      {/* Header */}
      <header className="vid-header" style={{
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", gap: 24,
        padding: "20px 48px",
        background: C.navy,
        borderBottom: `1px solid ${C.border}`,
      }}>
        <Link to="/" className="vid-back" style={{
          fontFamily: "'Roboto', sans-serif",
          fontSize: 11, fontWeight: 400, letterSpacing: "2px",
          textTransform: "uppercase", color: C.muted,
          textDecoration: "none", whiteSpace: "nowrap",
        }}>
          ← Home
        </Link>
        <span style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 15, fontWeight: 800,
          letterSpacing: "0.5px", color: C.ink,
          flex: 1, textAlign: "center",
        }}>
          Michael Azazi Real Estate
        </span>
        <a href="tel:7044941953" style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 18, fontWeight: 800,
          color: C.ink, textDecoration: "none",
          whiteSpace: "nowrap",
        }}>
          (704) 494-1953
        </a>
      </header>

      {/* Main */}
      <main className="vid-main" style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 40px" }}>

        {/* Page header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: 10, fontWeight: 400, letterSpacing: "4px",
            textTransform: "uppercase", color: C.blueLight,
            marginBottom: 16,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ display: "inline-block", width: 20, height: 1, background: C.blue, flexShrink: 0 }} />
            Videos
          </p>
          <h1 style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "clamp(26px, 3.5vw, 44px)", fontWeight: 800,
            color: C.ink, marginBottom: 10, lineHeight: 1.1,
          }}>
            Watch & Learn
          </h1>
          <p style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: 16, fontWeight: 400,
            color: C.muted, maxWidth: 500, lineHeight: 1.8,
          }}>
            Market insights, tips for buyers and sellers, and real estate education — straight from Michael.
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: 0,
          borderBottom: `1px solid ${C.border}`,
          marginBottom: 40,
        }}>
          {TABS.map(tab => (
            <button
              key={tab.key}
              className="vid-tab-btn"
              onClick={() => setActiveTab(tab.key)}
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: 11, fontWeight: 400, letterSpacing: "2px",
                textTransform: "uppercase",
                padding: "12px 28px",
                background: "none", border: "none", cursor: "pointer",
                color: activeTab === tab.key ? C.ink : C.muted,
                borderBottom: activeTab === tab.key ? `2px solid ${C.blue}` : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ background: C.navyLight, border: `1px solid ${C.border}`, borderRadius: 8, padding: "48px 32px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, fontWeight: 800, color: C.ink, marginBottom: 10 }}>Probate video coming soon</p>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>In the meantime, the probate guide walks through how inherited property sales work in NC and SC.</p>
            <Link to="/probate" style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: C.blue, textDecoration: "none" }}>Read the Probate Guide →</Link>
          </div>
        )}

        {/* Video grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {filtered.map(video => (
            <div key={video.id} className="vid-card" style={{
              background: C.navyLight,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              overflow: "hidden",
            }}>
              <div style={{ position: "relative", paddingBottom: "56.25%", background: C.navyMid }}>
                <iframe
                  src={video.youtubeUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute", top: 0, left: 0,
                    width: "100%", height: "100%",
                    border: "none",
                  }}
                />
              </div>
              <div style={{ padding: "20px 24px" }}>
                <h3 style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 17, fontWeight: 800,
                  color: C.ink, marginBottom: 8, lineHeight: 1.3,
                }}>
                  {video.title}
                </h3>
                <p style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: 14, fontWeight: 400,
                  color: C.muted, lineHeight: 1.7,
                }}>
                  {video.description}
                </p>
                <Link to={video.page} style={{ display: "inline-block", marginTop: 14, fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: C.blue, textDecoration: "none" }}>
                  Watch &amp; Schedule a Call →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: C.navyMid,
        borderTop: `1px solid ${C.border}`,
        padding: "36px 24px",
        fontFamily: "'Roboto', sans-serif",
        fontSize: 11, fontWeight: 400,
        color: C.muted,
        letterSpacing: "0.5px",
        textAlign: "center",
        lineHeight: 2,
      }}>
        <div>Michael Azazi Real Estate · with eXp Realty · Charlotte Metro · NC &amp; SC</div>
        <div>
          <a href="tel:7044941953" style={{ color: C.blueLight, textDecoration: "none" }}>(704) 494-1953</a>
          {" · "}
          <a href="mailto:michael@azazirealestate.com" style={{ color: C.blueLight, textDecoration: "none" }}>michael@azazirealestate.com</a>
        </div>
      </footer>
    </>
  );
}

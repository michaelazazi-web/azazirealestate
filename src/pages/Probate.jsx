import { Link } from "react-router-dom";
import useDocMeta from "../useDocMeta";
import {
  PROBATE_META, NC_STEPS, SC_SUMMARY, SERVICES, CHOOSING, PROBATE_FAQ, DISCLAIMER,
} from "./probateContent";

// This page is pre-rendered to static HTML at build time (scripts/prerender.mjs),
// so it must not touch window/document during render.

const C = {
  bg:     "#F5F7FC",
  card:   "#FFFFFF",
  blue:   "#2563EB",
  blueLt: "#3B6FEF",
  tint:   "#EEF3FF",
  ink:    "#11162B",
  muted:  "rgba(17,22,43,0.66)",
  border: "rgba(17,22,43,0.1)",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@300;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; background: ${C.bg}; color: ${C.ink}; -webkit-font-smoothing: antialiased; }
  .pb-header { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; gap: 24px; padding: 20px 48px; background: ${C.bg}; border-bottom: 1px solid ${C.border}; }
  .pb-back { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${C.muted}; text-decoration: none; white-space: nowrap; }
  .pb-back:hover { color: ${C.ink}; }
  .pb-brand { font-family: 'Manrope', sans-serif; font-size: 15px; font-weight: 800; flex: 1; text-align: center; }
  .pb-phone { font-family: 'Manrope', sans-serif; font-size: 18px; font-weight: 800; color: ${C.ink}; text-decoration: none; white-space: nowrap; }
  .pb-main { max-width: 860px; margin: 0 auto; padding: 64px 40px 32px; }
  .pb-eyebrow { font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: ${C.blueLt}; margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
  .pb-eyebrow::before { content: ""; display: inline-block; width: 20px; height: 1px; background: ${C.blue}; }
  .pb-h1 { font-family: 'Manrope', sans-serif; font-size: clamp(28px, 4vw, 46px); font-weight: 800; line-height: 1.1; margin-bottom: 20px; }
  .pb-lede { font-size: 17px; line-height: 1.8; color: ${C.muted}; margin-bottom: 28px; }
  .pb-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 56px; }
  .pb-btn { display: inline-block; padding: 14px 26px; border-radius: 6px; font-size: 14px; font-weight: 600; text-decoration: none; }
  .pb-btn-primary { background: ${C.blue}; color: #fff; }
  .pb-btn-primary:hover { background: #1D4ED8; }
  .pb-btn-outline { border: 1px solid ${C.blue}; color: ${C.blue}; }
  .pb-section { margin-bottom: 56px; }
  .pb-h2 { font-family: 'Manrope', sans-serif; font-size: clamp(22px, 2.6vw, 30px); font-weight: 800; line-height: 1.2; margin-bottom: 16px; }
  .pb-p { font-size: 16px; line-height: 1.8; color: ${C.muted}; margin-bottom: 16px; }
  .pb-steps { list-style: none; counter-reset: step; display: grid; gap: 16px; }
  .pb-step { counter-increment: step; background: ${C.card}; border: 1px solid ${C.border}; border-radius: 8px; padding: 20px 24px 20px 64px; position: relative; }
  .pb-step::before { content: counter(step); position: absolute; left: 22px; top: 20px; width: 28px; height: 28px; border-radius: 50%; background: ${C.tint}; color: ${C.blue}; font-weight: 700; font-size: 14px; display: flex; align-items: center; justify-content: center; }
  .pb-h3 { font-family: 'Manrope', sans-serif; font-size: 17px; font-weight: 800; margin-bottom: 6px; line-height: 1.35; }
  .pb-step p, .pb-card p { font-size: 15px; line-height: 1.75; color: ${C.muted}; }
  .pb-list { list-style: none; display: grid; gap: 10px; }
  .pb-list li { position: relative; padding-left: 26px; font-size: 16px; line-height: 1.7; color: ${C.muted}; }
  .pb-list li::before { content: ""; position: absolute; left: 4px; top: 11px; width: 8px; height: 8px; border-radius: 50%; background: ${C.blue}; }
  .pb-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
  .pb-card { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 8px; padding: 20px 22px; }
  .pb-callout { background: ${C.tint}; border-radius: 8px; padding: 24px 28px; }
  .pb-faq { border-top: 1px solid ${C.border}; }
  .pb-faq details { border-bottom: 1px solid ${C.border}; padding: 18px 0; }
  .pb-faq summary { cursor: pointer; font-weight: 600; font-size: 16px; line-height: 1.5; list-style: none; }
  .pb-faq summary::-webkit-details-marker { display: none; }
  .pb-faq summary::after { content: "+"; float: right; color: ${C.blue}; font-weight: 700; margin-left: 12px; }
  .pb-faq details[open] summary::after { content: "\\2212"; }
  .pb-faq details p { margin-top: 10px; font-size: 15px; line-height: 1.75; color: ${C.muted}; }
  .pb-disclaimer { font-size: 13px; line-height: 1.7; color: ${C.muted}; border-top: 1px solid ${C.border}; padding-top: 20px; }
  .pb-footer { background: ${C.card}; border-top: 1px solid ${C.border}; padding: 36px 24px; font-size: 11px; color: ${C.muted}; letter-spacing: 0.5px; text-align: center; line-height: 2; }
  .pb-footer a { color: ${C.blueLt}; text-decoration: none; }
  .pb-footer img { height: 28px; width: auto; opacity: 0.55; margin-top: 8px; }
  @media (max-width: 600px) {
    .pb-header { padding: 16px 16px; gap: 12px; }
    .pb-brand { display: none; }
    .pb-main { padding: 40px 16px 24px; }
    .pb-step { padding: 18px 18px 18px 56px; }
    .pb-step::before { left: 16px; }
  }
`;

export default function Probate() {
  useDocMeta(PROBATE_META.title, PROBATE_META.description);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <header className="pb-header">
        <Link to="/" className="pb-back">← Home</Link>
        <span className="pb-brand">Michael Azazi Real Estate</span>
        <a href="tel:7044941953" className="pb-phone">(704) 494-1953</a>
      </header>

      <main className="pb-main">
        <p className="pb-eyebrow">Probate &amp; Inherited Property</p>
        <h1 className="pb-h1">Probate Real Estate Agent in Charlotte, NC</h1>
        <p className="pb-lede">
          Selling a home after losing someone is hard enough without guessing at the process. I'm Michael Azazi,
          a Certified Probate Expert (CPE) and REALTOR® with eXp Realty, licensed in North Carolina and
          South Carolina. I help personal representatives, executors, and heirs sell inherited and estate
          property across the Charlotte Metro area, working alongside your estate attorney from start to closing.
        </p>
        <div className="pb-ctas">
          <Link to="/schedule" className="pb-btn pb-btn-primary">Schedule a Free Probate Consultation</Link>
          <a href="tel:7044941953" className="pb-btn pb-btn-outline">Call or Text (704) 494-1953</a>
        </div>

        <section className="pb-section">
          <h2 className="pb-h2">Who I help</h2>
          <p className="pb-p">
            Executors and administrators handling an estate for the first time. Heirs who live out of state and
            need someone they trust on the ground in Charlotte. Families who disagree about whether to keep,
            rent, or sell. Estate attorneys whose clients need a real estate partner who understands the court
            timeline.
          </p>
        </section>

        <section className="pb-section">
          <h2 className="pb-h2">How selling a house in probate works in North Carolina</h2>
          <p className="pb-p">Every estate is different, but most North Carolina probate home sales follow this order.</p>
          <ol className="pb-steps">
            {NC_STEPS.map((s) => (
              <li key={s.h} className="pb-step">
                <h3 className="pb-h3">{s.h}</h3>
                <p>{s.p}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="pb-section">
          <h2 className="pb-h2">Selling estate property in South Carolina</h2>
          <div className="pb-callout"><p className="pb-p" style={{ marginBottom: 0 }}>{SC_SUMMARY}</p></div>
        </section>

        <section className="pb-section">
          <h2 className="pb-h2">What I handle for the estate</h2>
          <ul className="pb-list">
            {SERVICES.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </section>

        <section className="pb-section">
          <h2 className="pb-h2">How to choose a probate real estate agent in Charlotte</h2>
          <p className="pb-p">
            Whoever you hire, these are the questions worth asking before you sign a listing agreement for an estate property.
          </p>
          <div className="pb-grid">
            {CHOOSING.map((c) => (
              <div key={c.h} className="pb-card">
                <h3 className="pb-h3">{c.h}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-section">
          <h2 className="pb-h2">Probate real estate questions</h2>
          <div className="pb-faq">
            {PROBATE_FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="pb-section pb-callout">
          <h2 className="pb-h2">Talk it through first</h2>
          <p className="pb-p">
            A consultation is free and there is no obligation. We can talk about the property, the family's goals,
            and where the estate is in the process, then decide on next steps together.
          </p>
          <div className="pb-ctas" style={{ marginBottom: 0 }}>
            <Link to="/schedule" className="pb-btn pb-btn-primary">Schedule a Consultation</Link>
            <a href="mailto:michael@azazirealestate.com" className="pb-btn pb-btn-outline">Email Michael</a>
          </div>
        </section>

        <p className="pb-disclaimer">{DISCLAIMER}</p>
      </main>

      <footer className="pb-footer">
        <div>Michael Azazi Real Estate · with eXp Realty · Charlotte Metro · NC &amp; SC</div>
        <div>
          <a href="tel:7044941953">(704) 494-1953</a>{" · "}
          <a href="mailto:michael@azazirealestate.com">michael@azazirealestate.com</a>
        </div>
        <div>Opinions are my own and not the views of eXp Realty</div>
        <img src="/images/equal.png" alt="Equal Housing Opportunity" />
      </footer>
    </>
  );
}

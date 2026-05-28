import { useState } from "react";

const C = {
  navy: "#0C0F24",
  navyLight: "#31303F",
  blue: "#19469D",
  blueMid: "#506CAA",
  blueLight: "#91A3C9",
  bluePale: "#E9EDF4",
  grayMid: "#686672",
  grayLight: "#D4D3D6",
  white: "#FFFFFF",
  offWhite: "#F5F6FA",
  muted: "#506CAA",
  border: "rgba(25,70,157,0.2)",
  borderFaint: "rgba(12,15,36,0.1)",
  pageBg: "#F5F6FA",
  sectionAlt: "#FFFFFF",
  cardBg: "#FFFFFF",
  navBg: "#FFFFFF",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,600;0,700;1,300&family=Barlow+Condensed:wght@500;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Barlow', sans-serif; background: ${C.pageBg}; color: ${C.navy}; }
  .site-wrapper { min-height: 100vh; }

  .nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 18px 40px;
    background: ${C.navBg};
    border-bottom: 1px solid ${C.border};
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }
  .nav-brand {
    display: flex; align-items: center; gap: 14px;
  }
  .nav-brand-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    line-height: 1.15;
  }
  .nav-brand-name { font-size: 18px; color: ${C.navy}; display: block; }
  .nav-brand-sub  { font-size: 13px; color: ${C.blue};  display: block; }
  .nav-links { display: flex; gap: 32px; }
  .nav-link {
    font-size: 11px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: ${C.muted};
    cursor: pointer; background: none; border: none; transition: color 0.2s;
  }
  .nav-link:hover { color: ${C.navy}; }
  @media (max-width: 600px) { .nav { padding: 16px 20px; } .nav-links { gap: 18px; } }

  .hero {
    position: relative; min-height: 88vh;
    display: flex; flex-direction: column;
    justify-content: center; align-items: flex-start;
    padding: 80px 40px;
    background: ${C.navy};
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 75% 40%, rgba(25,70,157,0.35) 0%, transparent 55%),
      radial-gradient(ellipse at 10% 85%, rgba(80,108,170,0.15) 0%, transparent 45%);
    pointer-events: none;
  }
  .hero-grid-line {
    position: absolute; top: 0; bottom: 0;
    width: 1px; background: rgba(25,70,157,0.3);
    right: 38%;
  }
  .hero-eyebrow {
    font-size: 11px; font-weight: 600; letter-spacing: 4px;
    text-transform: uppercase; color: ${C.blueLight};
    margin-bottom: 24px;
    display: flex; align-items: center; gap: 12px;
  }
  .hero-eyebrow::before {
    content: ''; display: block; width: 32px; height: 2px; background: ${C.blue};
  }
  .hero-headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(52px, 8vw, 96px);
    font-weight: 700; line-height: 0.95;
    text-transform: uppercase; color: ${C.white};
    max-width: 640px; margin-bottom: 28px;
  }
  .hero-headline em {
    font-style: italic; font-family: 'Barlow', sans-serif;
    font-weight: 300; color: ${C.blueLight};
    display: block; font-size: 0.72em;
    text-transform: none; letter-spacing: 1px;
  }
  .hero-sub {
    font-size: 17px; font-weight: 300; color: ${C.grayLight};
    max-width: 440px; line-height: 1.75; margin-bottom: 44px;
  }
  .hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; }
  .hero-headshot { display: block; }
  @media (max-width: 768px) { .hero-headshot { display: none; } }

  .btn-primary {
    background: ${C.blue}; color: ${C.white};
    font-family: 'Barlow', sans-serif;
    font-size: 12px; font-weight: 700; letter-spacing: 2.5px;
    text-transform: uppercase; padding: 16px 36px;
    border: none; cursor: pointer; transition: all 0.22s;
  }
  .btn-primary:hover { background: ${C.blueMid}; transform: translateY(-1px); }

  .btn-outline {
    background: transparent; color: ${C.white};
    font-family: 'Barlow', sans-serif;
    font-size: 12px; font-weight: 700; letter-spacing: 2.5px;
    text-transform: uppercase; padding: 16px 36px;
    border: 1px solid rgba(255,255,255,0.25); cursor: pointer; transition: all 0.22s;
  }
  .btn-outline:hover { border-color: ${C.blueLight}; color: ${C.blueLight}; }

  .proof-strip {
    display: flex; justify-content: center; gap: 0;
    background: ${C.white};
    border-bottom: 1px solid ${C.bluePale};
    flex-wrap: wrap;
  }
  .proof-item {
    text-align: center; padding: 28px 40px;
    border-right: 1px solid ${C.bluePale};
    flex: 1; min-width: 120px;
  }
  .proof-item:last-child { border-right: none; }
  .proof-num {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px; font-weight: 700; color: ${C.blue}; letter-spacing: 1px;
  }
  .proof-label {
    font-size: 10px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: ${C.grayMid}; margin-top: 5px;
  }

  .section { padding: 80px 40px; max-width: 1100px; margin: 0 auto; }
  .section-eyebrow {
    font-size: 10px; font-weight: 600; letter-spacing: 4px;
    text-transform: uppercase; color: ${C.blue};
    margin-bottom: 14px;
    display: flex; align-items: center; gap: 10px;
  }
  .section-eyebrow::before { content: ''; display: block; width: 24px; height: 1px; background: ${C.blue}; }
  .section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(28px, 4vw, 46px); font-weight: 700;
    text-transform: uppercase; color: ${C.navy}; margin-bottom: 14px;
  }
  .section-sub {
    font-size: 16px; font-weight: 300; color: ${C.grayMid};
    max-width: 520px; line-height: 1.75;
  }

  .about-section { background: ${C.white}; }
  .about-inner {
    display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
  }
  @media (max-width: 700px) { .about-inner { grid-template-columns: 1fr; gap: 32px; } }
  .about-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: ${C.bluePale}; border: 1px solid ${C.border};
    padding: 8px 16px; font-size: 11px; font-weight: 600;
    letter-spacing: 2px; text-transform: uppercase; color: ${C.blue};
    margin-bottom: 12px; margin-right: 8px;
  }

  .listings-section { background: ${C.pageBg}; padding: 2px 0; }
  .listings-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px; margin-top: 48px;
  }
  .listing-card {
    background: ${C.white}; border: 1px solid ${C.bluePale};
    overflow: hidden; transition: box-shadow 0.2s, border-color 0.2s;
    box-shadow: 0 1px 4px rgba(12,15,36,0.06);
  }
  .listing-card:hover { border-color: ${C.blueLight}; box-shadow: 0 4px 16px rgba(25,70,157,0.12); }
  .listing-img {
    width: 100%; aspect-ratio: 16/9;
    background: linear-gradient(135deg, ${C.bluePale} 0%, #dde3f0 100%);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .listing-img-placeholder {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 700; letter-spacing: 3px;
    text-transform: uppercase; color: ${C.blueLight};
  }
  .listing-status {
    position: absolute; top: 14px; left: 14px;
    font-size: 9px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; padding: 5px 10px;
  }
  .status-active { background: ${C.blue}; color: ${C.white}; }
  .status-pending { background: ${C.grayLight}; color: ${C.grayMid}; }
  .listing-body { padding: 22px 24px; }
  .listing-price {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 26px; font-weight: 700; color: ${C.navy}; margin-bottom: 4px;
  }
  .listing-address { font-size: 14px; font-weight: 400; color: ${C.navyLight}; margin-bottom: 12px; }
  .listing-specs { font-size: 11px; font-weight: 400; color: ${C.grayMid}; letter-spacing: 0.5px; }
  .listing-cta {
    display: inline-block; margin-top: 16px;
    font-size: 11px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: ${C.blue}; cursor: pointer;
    background: none; border: none; padding: 0; transition: color 0.2s;
  }
  .listing-cta:hover { color: ${C.navyLight}; }
  .listings-empty {
    grid-column: 1/-1; text-align: center; padding: 64px 24px;
    border: 1px dashed ${C.blueLight}; color: ${C.grayMid};
    font-size: 14px; font-weight: 300;
  }

  .reviews-section-wrap { background: ${C.white}; }
  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px; margin-top: 48px;
  }
  .review-card {
    background: ${C.pageBg}; border: 1px solid ${C.bluePale};
    padding: 28px; display: flex; flex-direction: column; gap: 14px;
    box-shadow: 0 1px 4px rgba(12,15,36,0.05);
    transition: box-shadow 0.2s, border-color 0.2s;
  }
  .review-card:hover { border-color: ${C.blueLight}; box-shadow: 0 4px 16px rgba(25,70,157,0.1); }
  .review-stars { font-size: 16px; color: ${C.blue}; letter-spacing: 2px; }
  .review-quote { font-size: 14px; font-weight: 300; color: ${C.navyLight}; line-height: 1.75; flex: 1; }
  .review-footer { border-top: 1px solid ${C.bluePale}; padding-top: 14px; }
  .review-name { font-size: 13px; font-weight: 600; color: ${C.navy}; letter-spacing: 0.5px; }
  .review-meta { font-size: 11px; font-weight: 300; color: ${C.grayMid}; margin-top: 3px; }
  .review-date { font-size: 10px; font-weight: 300; color: ${C.grayLight}; margin-top: 2px; letter-spacing: 1px; text-transform: uppercase; }
  .reviews-aggregate { display: flex; align-items: center; gap: 12px; margin-top: 40px; padding-top: 28px; border-top: 1px solid ${C.bluePale}; }
  .reviews-score { font-family: 'Barlow Condensed', sans-serif; font-size: 36px; font-weight: 700; color: ${C.navy}; }
  .reviews-stars { font-size: 18px; color: ${C.blue}; letter-spacing: 3px; }
  .reviews-label { font-size: 11px; font-weight: 300; color: ${C.grayMid}; letter-spacing: 1px; }

  .yt-section { background: ${C.navy}; }
  .yt-inner { max-width: 900px; margin: 0 auto; padding: 80px 40px; }
  .yt-section .section-eyebrow { color: ${C.blueLight}; }
  .yt-section .section-eyebrow::before { background: ${C.blueLight}; }
  .yt-section .section-title { color: ${C.white}; }
  .yt-section .section-sub { color: ${C.grayLight}; }
  .yt-embed-wrapper {
    position: relative; padding-bottom: 56.25%;
    height: 0; overflow: hidden; margin-top: 48px;
    border: 1px solid rgba(25,70,157,0.4);
  }
  .yt-embed-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }
  .yt-no-video {
    margin-top: 48px; padding: 64px 24px;
    border: 1px dashed rgba(255,255,255,0.1);
    text-align: center; color: ${C.grayMid}; font-size: 14px; font-weight: 300;
  }
  .yt-no-video p { margin-top: 8px; font-size: 12px; color: ${C.blueLight}; }

  .survey-section-wrap { background: ${C.white}; }
  .survey-section { max-width: 700px; margin: 0 auto; padding: 80px 24px; }
  .survey-header { text-align: center; margin-bottom: 48px; }
  .survey-card {
    background: ${C.pageBg}; border: 1px solid ${C.bluePale};
    padding: 48px 40px; box-shadow: 0 2px 12px rgba(12,15,36,0.07);
  }
  @media (max-width: 520px) { .survey-card { padding: 32px 20px; } }
  .type-toggle { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-bottom: 36px; }
  .type-btn {
    padding: 16px; border: 1px solid ${C.bluePale};
    background: ${C.white}; color: ${C.grayMid};
    font-family: 'Barlow', sans-serif;
    font-size: 12px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; cursor: pointer; transition: all 0.2s; text-align: center;
  }
  .type-btn:hover { border-color: ${C.blue}; color: ${C.blue}; }
  .type-btn.active { background: ${C.blue}; border-color: ${C.blue}; color: ${C.white}; }
  .form-group { margin-bottom: 22px; }
  .form-label {
    display: block; font-size: 10px; font-weight: 700; letter-spacing: 2.5px;
    text-transform: uppercase; color: ${C.blue}; margin-bottom: 9px;
  }
  .form-input, .form-select, .form-textarea {
    width: 100%; background: ${C.white};
    border: 1px solid ${C.bluePale}; color: ${C.navy};
    font-family: 'Barlow', sans-serif; font-size: 15px; font-weight: 400;
    padding: 13px 16px; outline: none; transition: border-color 0.2s; appearance: none;
  }
  .form-input::placeholder { color: ${C.grayLight}; }
  .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: ${C.blue}; }
  .form-select option { background: ${C.white}; color: ${C.navy}; }
  .form-textarea { resize: vertical; min-height: 90px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 520px) { .form-row { grid-template-columns: 1fr; } }
  .radio-group { display: flex; flex-direction: column; gap: 10px; }
  .radio-option {
    display: flex; align-items: center; gap: 12px;
    cursor: pointer; color: ${C.navyLight}; font-size: 14px; font-weight: 400;
  }
  .radio-option input { accent-color: ${C.blue}; width: 16px; height: 16px; cursor: pointer; }
  .divider { height: 1px; background: ${C.bluePale}; margin: 28px 0; }
  .submit-btn {
    width: 100%; background: ${C.blue}; color: ${C.white};
    font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    padding: 20px; border: none; cursor: pointer; margin-top: 12px; transition: all 0.22s;
  }
  .submit-btn:hover { background: ${C.navy}; }
  .success-card {
    background: ${C.pageBg}; border: 1px solid ${C.bluePale};
    padding: 64px 40px; text-align: center;
  }
  .success-icon { font-size: 36px; margin-bottom: 20px; color: ${C.blue}; }
  .success-card h3 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 32px; font-weight: 700; text-transform: uppercase;
    color: ${C.navy}; margin-bottom: 12px;
  }
  .success-card p { font-size: 15px; font-weight: 300; color: ${C.grayMid}; line-height: 1.75; }
  .footer {
    background: ${C.navy}; padding: 32px 24px;
    font-size: 11px; font-weight: 300; color: rgba(255,255,255,0.4); letter-spacing: 1px;
    display: flex; align-items: center; justify-content: center; gap: 0; flex-wrap: wrap;
  }

  .required-star { color: #C0392B; margin-left: 2px; }
`;

const REVIEWS = [
  {
    name: "Fernando H.",
    role: "Buyer",
    date: "February 2026",
    quote: "We can't be more grateful to Michael for all the help he gave us in our first home purchase process. We never felt pressure and we always had accompaniment from him. We are looking forward to working with him again. 100% recommended!",
  },
  {
    name: "Adrian G.",
    role: "Seller",
    date: "December 2025",
    quote: "Michael was the best realtor for the sale of our home and build of our new home. Couldn't have asked for a better experience.",
  },
  {
    name: "Kathy R.",
    role: "Buyer",
    date: "October 2025",
    quote: "Michael Azazi was very professional, knowledgeable and always available to help whenever needed. He was proactive and was always looking out for our best interest.",
  },
  {
    name: "Amy B.",
    role: "Seller",
    date: "September 2025",
    quote: "Michael Azazi kept us updated on all events requested by our buyers. Michael was always professional, courteous and easy to work with; highly recommend.",
  },
  {
    name: "Kathy B.",
    role: "Facebook Review",
    date: "2025",
    quote: "He's very knowledgeable about real estate. He works hard for his clients to try and get everything they want and need. Kind and very easy to work with.",
  },
  {
    name: "Tim D.",
    role: "Facebook Review",
    date: "2025",
    quote: "I would recommend Michael highly. He is very ambitious and knowledgeable. He tries hard to get everything his clients need and want. He's very respectful and a go getter.",
  },
];

const SAMPLE_LISTINGS = [
  { id: 1, status: "Active", price: "$325,000", address: "4590 Deer Run, Rock Hill, NC 29732", specs: "3 bd · 2 ba · 1,893 sqft · Built 1983", mlsLink: "#", image: "/images/4590DeerRun.jpeg" },
  { id: 2, status: "Active", price: "$350,000", address: "404 W Kerr St, Salisbury, NC 28144", specs: "7 bd · 4 ba · 4,899 sqft · Built 1900", mlsLink: "#", image: "/images/404WKerr.jpeg" },
  { id: 3, status: "Active", price: "$250,000", address: "505 E 6th St #1003, Charlotte, NC 28202", specs: "1 bd · 1 ba · 774 sqft · Built 2006", mlsLink: "#", image: "/images/505E6th.jpeg" },
];

const YOUTUBE_URL = "";

function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^&?/\s]{11})/);
  return match ? match[1] : null;
}

const sellerQuestions = [
  { id: "reason", label: "What is your reason for selling?", type: "textarea", placeholder: "e.g. relocating, downsizing, estate sale, investment..." },
  { id: "urgency", label: "How urgent is your need to sell?", type: "radio", options: ["1 — Just curious (6 months or longer)", "2 — Planning ahead (61–180 days)", "3 — Getting serious (31–60 days)", "4 — Soon (15–30 days)", "5 — Immediately (within 14 days)"] },
  { id: "moveByDate", label: "It would be best to be moved by:", type: "text", placeholder: "Target date or month" },
  { id: "loanBalance", label: "Approximate loan balance on the property:", type: "text", placeholder: "e.g. $150,000 or none" },
  { id: "needToBuy", label: "Do you need to buy a home after selling?", type: "radio", options: ["Yes", "No", "Not sure yet"] },
  { id: "priceRange", label: "Estimated value range of your home:", type: "select", options: ["Under $200K", "$200K–$350K", "$350K–$500K", "$500K–$750K", "$750K+", "Not sure"] },
  { id: "realtorCriteria", label: "What matters most to you when choosing a realtor?", type: "radio", options: ["Getting the highest price", "Strong marketing program", "Communication and availability", "Local market expertise"] },
  { id: "situation", label: "What best describes your situation?", type: "radio", options: ["Standard sale", "Inherited property / estate", "Divorce or life change", "Relocation", "Investment property", "Other"] },
  { id: "personality", label: "If your best friend described you, which fits best?", type: "radio", options: ["Direct and to the point", "Social and outgoing", "Steady and dependable", "Cautious and perfectly accurate"] },
  { id: "agent", label: "Are you currently working with an agent?", type: "radio", options: ["No, I'm not", "Yes, but open to options", "Yes, I have representation"] },
  { id: "notes", label: "Anything else you'd like Michael to know?", type: "textarea", placeholder: "Optional" },
];

const buyerQuestions = [
  { id: "cobuyerName", label: "Co-buyer / spouse name (if applicable):", type: "text", placeholder: "Full name" },
  { id: "timeline", label: "When do you need to buy?", type: "radio", options: ["Within 1 month", "1–3 months", "3–6 months", "6 months to 1 year", "Just looking, not planning to buy yet"] },
  { id: "moveByDate", label: "It would be best if I could be moved by:", type: "text", placeholder: "Target date or month" },
  { id: "priceMin", label: "Minimum budget:", type: "text", placeholder: "e.g. $250,000" },
  { id: "priceMax", label: "Maximum budget:", type: "text", placeholder: "e.g. $400,000" },
  { id: "bedsBathsSqft", label: "Minimum bedrooms / bathrooms / square footage:", type: "text", placeholder: "e.g. 3 bed / 2 bath / 1,500 sqft" },
  { id: "areas", label: "Preferred areas in Charlotte Metro:", type: "text", placeholder: "e.g. South Charlotte, Ballantyne, Concord" },
  { id: "homeStyle", label: "Home style preference:", type: "multi_select", options: ["New construction", "Ranch", "2-Story", "Tri-level", "Condo / Townhome", "Open to anything"] },
  { id: "preapproved", label: "Have you met with a lender to pre-qualify?", type: "radio", options: ["Yes", "No, but I'm ready to", "No, I'd like help with that"] },
  { id: "loanType", label: "If pre-approved, what type of loan?", type: "radio", options: ["Cash", "Conventional", "FHA", "VA", "USDA", "Not sure yet"] },
  { id: "needToSell", label: "Do you have a home to sell before purchasing?", type: "radio", options: ["Yes", "No", "Maybe"] },
  { id: "viewingTimes", label: "Best times to view homes:", type: "multi_select", options: ["Weekday mornings", "Weekday afternoons", "Weekday evenings", "Weekend mornings", "Weekend afternoons", "Weekend evenings"] },
  { id: "dealBreakers", label: "3 must-have deal breakers in your next home:", type: "textarea", placeholder: "e.g. good school district, large backyard, no HOA" },
  { id: "realtorQualities", label: "3 most important qualities you want in your realtor:", type: "textarea", placeholder: "e.g. honest, responsive, negotiation skills" },
  { id: "personality", label: "If your best friend described you, which fits best?", type: "radio", options: ["Direct and to the point", "Social and outgoing", "Steady and dependable", "Cautious and perfectly accurate"] },
  { id: "notes", label: "Anything else you'd like Michael to know?", type: "textarea", placeholder: "Optional" },
];

function SurveyField({ q, value, onChange }) {
  if (q.type === "text") return (
    <div className="form-group">
      <label className="form-label">{q.label}</label>
      <input className="form-input" placeholder={q.placeholder} value={value || ""} onChange={e => onChange(q.id, e.target.value)} />
    </div>
  );
  if (q.type === "select") return (
    <div className="form-group">
      <label className="form-label">{q.label}</label>
      <select className="form-select" value={value || ""} onChange={e => onChange(q.id, e.target.value)}>
        <option value="">Select one</option>
        {q.options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
  if (q.type === "radio") return (
    <div className="form-group">
      <label className="form-label">{q.label}</label>
      <div className="radio-group">
        {q.options.map(o => (
          <label key={o} className="radio-option">
            <input type="radio" name={q.id} value={o} checked={value === o} onChange={() => onChange(q.id, o)} />
            {o}
          </label>
        ))}
      </div>
    </div>
  );
  if (q.type === "multi_select") return (
    <div className="form-group">
      <label className="form-label">{q.label}</label>
      <div className="radio-group">
        {q.options.map(o => (
          <label key={o} className="radio-option">
            <input
              type="checkbox"
              value={o}
              checked={Array.isArray(value) && value.includes(o)}
              onChange={e => {
                const prev = Array.isArray(value) ? value : [];
                onChange(q.id, e.target.checked ? [...prev, o] : prev.filter(v => v !== o));
              }}
            />
            {o}
          </label>
        ))}
      </div>
    </div>
  );
  if (q.type === "textarea") return (
    <div className="form-group">
      <label className="form-label">{q.label}</label>
      <textarea className="form-textarea" placeholder={q.placeholder} value={value || ""} onChange={e => onChange(q.id, e.target.value)} />
    </div>
  );
  return null;
}

export default function App() {
  const [tab, setTab] = useState("seller");
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const questions = tab === "seller" ? sellerQuestions : buyerQuestions;
  const ytId = getYouTubeId(YOUTUBE_URL);

  const handleAnswer = (id, val) => setAnswers(prev => ({ ...prev, [id]: val }));
  const handleContact = (f, v) => setContact(prev => ({ ...prev, [f]: v }));

  const [valuation, setValuation] = useState({ address: "", city: "", name: "", phone: "", email: "" });
  const [valuationSubmitted, setValuationSubmitted] = useState(false);
  const handleValuationChange = (f, v) => setValuation(prev => ({ ...prev, [f]: v }));
  const handleValuationSubmit = async () => {
    if (!valuation.name || !valuation.phone || !valuation.email || !valuation.address) return alert("Please fill in all fields.");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: valuation.name, phone: valuation.phone, email: valuation.email, type: "valuation", answers: { address: valuation.address, city: valuation.city } }),
      });
    } catch(e) { console.error(e); }
    setValuationSubmitted(true);
  };

  const handleSubmit = async () => {
    if (!contact.name || !contact.phone || !contact.email) return alert("Please enter your name, phone number, and email address.");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: contact.name, phone: contact.phone, email: contact.email, type: tab, answers }),
      });
    } catch(e) { console.error(e); }
    setSubmitted(true);
    setTimeout(() => document.querySelector(".survey-section")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const scrollTo = (selector, type) => {
    if (type) setTab(type);
    setTimeout(() => document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="site-wrapper">

        <nav className="nav">
          <div className="nav-brand">
            <img src="/images/logo.png" alt="Michael Azazi Real Estate" style={{height:"48px",width:"auto",display:"block"}} />
            <div className="nav-brand-text">
              <span className="nav-brand-name">Michael Azazi</span>
              <span className="nav-brand-sub">Real Estate</span>
            </div>
          </div>
          <div className="nav-links">
            <button className="nav-link" onClick={() => scrollTo(".listings-section")}>Listings</button>
            <button className="nav-link" onClick={() => scrollTo(".reviews-section-wrap")}>Reviews</button>
            <button className="nav-link" onClick={() => scrollTo(".yt-section")}>Videos</button>
            <button className="nav-link" onClick={() => scrollTo(".survey-section", "seller")}>Sell</button>
            <button className="nav-link" onClick={() => scrollTo(".survey-section", "buyer")}>Buy</button>
            <a href="tel:7046593564" style={{fontSize:"11px",fontWeight:600,letterSpacing:"2px",textTransform:"uppercase",color:C.blue,textDecoration:"none"}}>(704) 659-3564</a>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <img src="/images/equal.png" alt="Equal Housing Opportunity" style={{height:"32px",width:"32px",objectFit:"contain",display:"block",verticalAlign:"middle"}} />
              <img src="/images/blackrealtor.jpg" alt="REALTOR®" style={{height:"32px",width:"32px",objectFit:"contain",display:"block",verticalAlign:"middle"}} />
            </div>
          </div>
        </nav>

        <section className="hero">
          <p className="hero-eyebrow">Charlotte Metro · NC &amp; SC Licensed</p>
          <h1 className="hero-headline">
            Your Move,<br />
            <em>Handled Right.</em>
          </h1>
          <p className="hero-sub">
            Whether you're ready to sell or ready to buy, you deserve a strategist in your corner — not a salesperson.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => scrollTo(".survey-section", "seller")}>I Want to Sell</button>
            <button className="btn-outline" onClick={() => scrollTo(".survey-section", "buyer")}>I Want to Buy</button>
          </div>
          <img
            src="/images/headshot.jpg"
            alt="Michael Azazi"
            className="hero-headshot"
            style={{
              position: "absolute", right: 0, bottom: 0,
              height: "85%", maxHeight: "85%", width: "auto",
              objectFit: "contain", objectPosition: "bottom",
              pointerEvents: "none", userSelect: "none",
              filter: "brightness(0.4) sepia(1) hue-rotate(180deg) saturate(3)",
            }}
          />
        </section>

        <div className="proof-strip">
          {[["Charlotte", "Metro Market"], ["NC + SC", "Licensed"], ["eXp Realty", "Brokerage"], ["Probate", "Certified"]].map(([n, l]) => (
            <div key={l} className="proof-item">
              <div className="proof-num">{n}</div>
              <div className="proof-label">{l}</div>
            </div>
          ))}
        </div>

        <div className="about-section">
          <div className="section">
            <div className="about-inner">
              <div>
                <p className="section-eyebrow">About</p>
                <h2 className="section-title">Michael Azazi<br />Real Estate, LLC</h2>
                <p className="section-sub">
                  Michael Azazi has been in the real estate industry since 2022, bringing a foundation built on years of property management experience. That background shaped everything: attention to detail, proactive communication, and a genuine commitment to solving problems before they become issues. As a certified Real Estate Negotiation Expert (RENE), Certified Probate Expert (CPE), and Certified Listing Specialist (CLS), Michael brings specialized skills to every transaction. Whether you are navigating an estate sale, competing in a tough market, or simply looking for someone who will fight for your bottom line, the credentials back it up. Based in Charlotte and licensed in both NC and SC, Michael's philosophy is straightforward: solve your unique problem, deliver a superior experience, and be a resource you can count on long after closing.
                </p>
              </div>
              <div>
                <div className="about-badge">✦ Probate Certified</div>
                <div className="about-badge" style={{marginLeft: 8}}>✦ Negotiation Certified</div>
                <div style={{marginTop: 28}}>
                  <img
                    src="/images/SP.jpg"
                    alt="Michael Azazi South Park"
                    style={{maxWidth: 280, width: "100%", borderRadius: 12, display: "block"}}
                  />
                  <p style={{marginTop: 8, fontSize: 13, fontStyle: "italic", color: C.muted}}>Yes, that's really me.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{background: C.white, borderTop: `1px solid ${C.border}`}}>
          <div className="section">
            <p className="section-eyebrow">My Promise</p>
            <h2 className="section-title">My Commitments to You</h2>
            <ol style={{marginTop: 32, listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px"}}>
              {[
                "Expert advice for your best decision.",
                "100% forthcoming about price, condition, and what it takes to sell.",
                "Always give you the truth.",
                "Always act in your best interest.",
                "Fight to get you the most for your home.",
                "Use the most effective marketing strategies.",
                "Communicate proactively.",
                "Return calls, emails, and texts with urgency.",
                "Spend every day searching for qualified buyers.",
                "Never lock you into a long-term contract.",
              ].map((text, i) => (
                <li key={i} style={{display: "flex", alignItems: "flex-start", gap: 16, background: C.pageBg, borderRadius: 10, padding: "18px 20px", border: `1px solid ${C.border}`}}>
                  <span style={{minWidth: 32, height: 32, borderRadius: "50%", background: C.blue, color: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: 0.5, flexShrink: 0}}>{i + 1}</span>
                  <span style={{fontSize: 15, fontWeight: 400, color: C.navy, lineHeight: 1.55, paddingTop: 4}}>{text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="listings-section">
          <div className="section">
            <p className="section-eyebrow">Active Listings</p>
            <h2 className="section-title">Current Properties</h2>
            <p className="section-sub">Homes I'm representing right now in the Charlotte Metro area.</p>
            <div className="listings-grid">
              {SAMPLE_LISTINGS.length > 0 ? SAMPLE_LISTINGS.map(l => (
                <div key={l.id} className="listing-card">
                  <div className="listing-img">
                    <span className={`listing-status status-${l.status.toLowerCase()}`}>{l.status}</span>
                    {l.image
                      ? <img src={l.image} alt={l.address} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} />
                      : <span className="listing-img-placeholder">Photo Coming Soon</span>}
                  </div>
                  <div className="listing-body">
                    <div className="listing-price">{l.price}</div>
                    <div className="listing-address">{l.address}</div>
                    <div className="listing-specs">{l.specs}</div>
                    <button className="listing-cta" onClick={() => scrollTo(".survey-section", "buyer")}>
                      Request Info →
                    </button>
                  </div>
                </div>
              )) : (
                <div className="listings-empty">
                  No active listings at the moment — check back soon.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="reviews-section-wrap">
          <div className="section">
            <p className="section-eyebrow">Client Reviews</p>
            <h2 className="section-title">What Clients Say</h2>
            <p className="section-sub">Verified reviews from real buyers and sellers in the Charlotte Metro area.</p>
            <div className="reviews-grid">
              {REVIEWS.map((r, i) => (
                <div key={i} className="review-card">
                  <div className="review-stars">{"★★★★★"}</div>
                  <p className="review-quote">"{r.quote}"</p>
                  <div className="review-footer">
                    <div className="review-name">{r.name}</div>
                    <div className="review-meta">{r.role}</div>
                    <div className="review-date">{r.date}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="reviews-aggregate">
              <span className="reviews-score">5.0</span>
              <span className="reviews-stars">★★★★★</span>
              <span className="reviews-label">Verified by RealSatisfied</span>
            </div>
          </div>
        </div>

        <div className="yt-section">
          <div className="yt-inner">
            <p className="section-eyebrow">From the Channel</p>
            <h2 className="section-title">Latest Video</h2>
            <p className="section-sub">Real talk about the Charlotte market, the buying and selling process, and what nobody else is telling you.</p>
            {ytId ? (
              <div className="yt-embed-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${ytId}`}
                  title="Latest video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="yt-no-video">
                <div style={{fontSize: 32, marginBottom: 12}}>▶</div>
                Video coming soon.
              </div>
            )}
          </div>
        </div>

        <div style={{background: C.navy, padding: "80px 24px"}}>
          <div style={{maxWidth: 600, margin: "0 auto"}}>
            {valuationSubmitted ? (
              <div style={{textAlign: "center"}}>
                <p className="section-eyebrow" style={{justifyContent: "center"}}>Request Received</p>
                <h2 className="section-title" style={{color: C.white}}>You'll hear from Michael within 24 hours.</h2>
              </div>
            ) : (<>
              <p className="section-eyebrow" style={{justifyContent: "center"}}>Free Home Valuation</p>
              <h2 className="section-title" style={{color: C.white, marginBottom: 16}}>What Is Your Home Worth?</h2>
              <p style={{fontSize: 16, fontWeight: 300, color: C.grayLight, lineHeight: 1.75, marginBottom: 36}}>
                Enter your address and I'll send you a personalized home value analysis within 24 hours — no automated tools, just real local expertise.
              </p>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14}}>
                <input className="form-input" style={{gridColumn: "1 / -1"}} placeholder="Street address" value={valuation.address} onChange={e => handleValuationChange("address", e.target.value)} />
                <input className="form-input" style={{gridColumn: "1 / -1"}} placeholder="City" value={valuation.city} onChange={e => handleValuationChange("city", e.target.value)} />
                <input className="form-input" placeholder="Your name" value={valuation.name} onChange={e => handleValuationChange("name", e.target.value)} />
                <input className="form-input" placeholder="Phone number" value={valuation.phone} onChange={e => handleValuationChange("phone", e.target.value)} />
                <input className="form-input" style={{gridColumn: "1 / -1"}} placeholder="Email address" value={valuation.email} onChange={e => handleValuationChange("email", e.target.value)} />
              </div>
              <button className="btn-primary" style={{marginTop: 20, width: "100%"}} onClick={handleValuationSubmit}>Get My Home Value →</button>
            </>)}
          </div>
        </div>

        <div className="survey-section-wrap">
          <div className="survey-section">
            <div className="survey-header">
              <p className="section-eyebrow" style={{justifyContent: "center"}}>Get in Touch</p>
              <h2 className="section-title" style={{fontSize: "clamp(28px, 4vw, 40px)"}}>Let's Talk About<br />Your Situation</h2>
              <p className="section-sub" style={{margin: "0 auto", textAlign: "center"}}>Takes 2 minutes. Michael personally reviews every submission.</p>
            </div>
            {submitted ? (
              <div className="success-card">
                <div className="success-icon">✦</div>
                <h3>Got it, {contact.name.split(" ")[0]}.</h3>
                <p>Michael will reach out within one business day.<br /><br />No pressure. No pitch. Just a real conversation.</p>
              </div>
            ) : (
              <div className="survey-card">
                <div className="type-toggle">
                  <button className={`type-btn ${tab === "seller" ? "active" : ""}`} onClick={() => { setTab("seller"); setAnswers({}); }}>I'm Selling</button>
                  <button className={`type-btn ${tab === "buyer" ? "active" : ""}`} onClick={() => { setTab("buyer"); setAnswers({}); }}>I'm Buying</button>
                </div>
                {questions.map(q => <SurveyField key={q.id} q={q} value={answers[q.id]} onChange={handleAnswer} />)}
                <div className="divider" />
                <p className="form-label" style={{marginBottom: 16}}>Your Contact Info</p>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name <span className="required-star">*</span></label>
                    <input className="form-input" placeholder="Jane Smith" value={contact.name} onChange={e => handleContact("name", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone <span className="required-star">*</span></label>
                    <input className="form-input" placeholder="(704) 555-0100" value={contact.phone} onChange={e => handleContact("phone", e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email <span className="required-star">*</span></label>
                  <input className="form-input" placeholder="jane@email.com" value={contact.email} onChange={e => handleContact("email", e.target.value)} />
                </div>
                <button className="submit-btn" onClick={handleSubmit}>Contact Us →</button>
              </div>
            )}
          </div>
        </div>

        <div className="footer">
          <div style={{width:"100%",textAlign:"center"}}>Michael Azazi Real Estate, LLC · eXp Realty · Charlotte Metro · NC &amp; SC · Not intended to solicit currently listed properties</div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,width:"100%",marginTop:12}}>
            <img src="/images/equal.png" alt="Equal Housing Opportunity" style={{height:"36px",width:"auto",display:"block",filter:"brightness(0) invert(1)",opacity:0.6}} />
            <img src="/images/trans_realtor.png" alt="REALTOR®" style={{height:"36px",width:"auto",display:"block",filter:"brightness(0) invert(1)",opacity:0.6}} />
          </div>
        </div>

      </div>
    </>
  );
}

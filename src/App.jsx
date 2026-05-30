import { useState } from "react";

const C = {
  navy:      "#0c0f24",
  navyMid:   "#161929",
  navyLight: "#1e2340",
  blue:      "#506caa",
  blueMid:   "#3d5a96",
  blueLight: "#91a3c9",
  white:     "#ffffff",
  offWhite:  "rgba(255,255,255,0.9)",
  muted:     "rgba(255,255,255,0.5)",
  faint:     "rgba(255,255,255,0.12)",
  border:    "rgba(255,255,255,0.1)",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;800&family=Roboto:wght@100;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Roboto', sans-serif;
    background: ${C.navy};
    color: ${C.white};
    -webkit-font-smoothing: antialiased;
  }

  /* ── NAV ── */
  .nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 16px 40px;
    background: ${C.navy};
    border-bottom: 1px solid ${C.border};
  }
  .nav-brand { display: flex; align-items: center; gap: 14px; }
  .nav-brand-text { line-height: 1.2; }
  .nav-brand-name {
    display: block;
    font-family: 'Manrope', sans-serif;
    font-size: 15px; font-weight: 800;
    letter-spacing: 0.5px; color: ${C.white};
  }
  .nav-brand-sub {
    display: block;
    font-family: 'Roboto', sans-serif;
    font-size: 11px; font-weight: 100;
    letter-spacing: 2px; text-transform: uppercase;
    color: ${C.muted};
  }
  .nav-links { display: flex; align-items: center; gap: 28px; }
  .nav-link {
    font-size: 11px; font-weight: 400; letter-spacing: 2px;
    text-transform: uppercase; color: ${C.muted};
    background: none; border: none; cursor: pointer; transition: color 0.2s;
  }
  .nav-link:hover { color: ${C.white}; }
  .nav-phone {
    font-family: 'Manrope', sans-serif;
    font-size: 15px; font-weight: 800;
    color: ${C.white}; text-decoration: none;
    transition: color 0.2s;
  }
  .nav-phone:hover { color: ${C.blueLight}; }
  .nav-cta {
    background: ${C.blue}; color: ${C.white};
    border: none; border-radius: 4px;
    padding: 9px 18px;
    font-family: 'Roboto', sans-serif;
    font-size: 11px; font-weight: 400; letter-spacing: 2px;
    text-transform: uppercase; cursor: pointer; transition: background 0.2s;
    white-space: nowrap;
  }
  .nav-cta:hover { background: ${C.blueMid}; }
  @media (max-width: 768px) {
    .nav { padding: 12px 16px; }
    .nav-links { gap: 8px; }
    .nav-link { display: none; }
    .nav-brand-name { font-size: 10px; letter-spacing: 0.3px; white-space: nowrap; }
    .nav-brand-sub img { height: 10px; }
    .nav-brand { gap: 8px; }
    .nav-brand > img { height: 38px; width: 38px; }
    .nav-brand-text { display: flex; flex-direction: column; justify-content: center; }
    .nav-cta-wrap { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
    .nav-phone { font-size: 12px; }
    .nav-cta { font-size: 10px; padding: 8px 12px; }
  }

  /* ── HERO ── */
  .hero {
    min-height: 90vh;
    display: flex; flex-direction: column;
    justify-content: center; align-items: flex-start;
    padding: 100px 40px 80px;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 70% 30%, rgba(80,108,170,0.25) 0%, transparent 60%),
      radial-gradient(ellipse at 5% 90%, rgba(80,108,170,0.1) 0%, transparent 50%);
    pointer-events: none;
  }
  .hero-eyebrow {
    font-family: 'Roboto', sans-serif;
    font-size: 11px; font-weight: 100; letter-spacing: 4px;
    text-transform: uppercase; color: ${C.blueLight};
    margin-bottom: 28px;
    display: flex; align-items: center; gap: 14px;
    position: relative;
  }
  .hero-eyebrow::before {
    content: ''; display: block; width: 28px; height: 1px; background: ${C.blue};
  }
  .hero-headline {
    font-family: 'Manrope', sans-serif;
    font-size: clamp(44px, 7vw, 88px);
    font-weight: 800; line-height: 1.0;
    color: ${C.white}; max-width: 660px;
    margin-bottom: 20px; position: relative;
  }
  .hero-headline-sub {
    font-family: 'Manrope', sans-serif;
    font-size: clamp(28px, 4vw, 52px);
    font-weight: 300; line-height: 1.1;
    color: ${C.blueLight}; max-width: 660px;
    margin-bottom: 28px; position: relative;
  }
  .hero-sub {
    font-family: 'Roboto', sans-serif;
    font-size: 17px; font-weight: 400;
    color: ${C.muted}; max-width: 420px;
    line-height: 1.8; margin-bottom: 48px; position: relative;
  }
  .hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; position: relative; }
  .hero-headshot {
    position: absolute; right: 0; bottom: 0;
    height: 88%; width: auto;
    object-fit: contain; object-position: bottom;
    pointer-events: none; user-select: none;
  }
  @media (max-width: 900px) { .hero-headshot { display: none; } }
  @media (max-width: 600px) { .hero { padding: 80px 24px 60px; } }

  /* ── BUTTONS ── */
  .btn-primary {
    background: ${C.blue}; color: ${C.white};
    font-family: 'Roboto', sans-serif;
    font-size: 12px; font-weight: 400; letter-spacing: 2.5px;
    text-transform: uppercase; padding: 16px 36px;
    border: none; border-radius: 4px; cursor: pointer; transition: all 0.2s;
  }
  .btn-primary:hover { background: ${C.blueMid}; transform: translateY(-1px); }
  .btn-outline {
    background: transparent; color: ${C.white};
    font-family: 'Roboto', sans-serif;
    font-size: 12px; font-weight: 400; letter-spacing: 2.5px;
    text-transform: uppercase; padding: 16px 36px;
    border: 1px solid ${C.border}; border-radius: 4px;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-outline:hover { border-color: ${C.blueLight}; color: ${C.blueLight}; }

  /* ── PROOF STRIP ── */
  .proof-strip {
    display: flex; flex-wrap: wrap;
    background: ${C.navyMid};
    border-bottom: 1px solid ${C.border};
  }
  .proof-item {
    flex: 1; min-width: 120px;
    text-align: center; padding: 28px 24px;
    border-right: 1px solid ${C.border};
  }
  .proof-item:last-child { border-right: none; }
  .proof-num {
    font-family: 'Manrope', sans-serif;
    font-size: 18px; font-weight: 800;
    color: ${C.white}; letter-spacing: 0.5px;
  }
  .proof-label {
    font-size: 10px; font-weight: 100; letter-spacing: 2px;
    text-transform: uppercase; color: ${C.muted}; margin-top: 6px;
  }

  /* ── SECTIONS ── */
  .section { padding: 96px 40px; max-width: 1100px; margin: 0 auto; }
  .section-wrap { background: ${C.navyMid}; border-top: 1px solid ${C.border}; }
  .section-wrap-alt { background: ${C.navyLight}; border-top: 1px solid ${C.border}; }
  .eyebrow {
    font-family: 'Roboto', sans-serif;
    font-size: 10px; font-weight: 400; letter-spacing: 4px;
    text-transform: uppercase; color: ${C.blueLight};
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: ${C.blue}; }
  .section-title {
    font-family: 'Manrope', sans-serif;
    font-size: clamp(26px, 3.5vw, 44px); font-weight: 800;
    color: ${C.white}; margin-bottom: 8px; line-height: 1.1;
  }
  .section-title-light {
    font-family: 'Manrope', sans-serif;
    font-size: clamp(16px, 2vw, 24px); font-weight: 300;
    color: ${C.blueLight}; margin-bottom: 16px; line-height: 1.3;
  }
  .section-sub {
    font-family: 'Roboto', sans-serif;
    font-size: 16px; font-weight: 400;
    color: ${C.muted}; max-width: 500px; line-height: 1.8;
  }
  @media (max-width: 600px) { .section { padding: 64px 24px; } }

  /* ── ABOUT ── */
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 72px; align-items: center; margin-top: 56px;
  }
  @media (max-width: 700px) { .about-grid { grid-template-columns: 1fr; gap: 40px; } }
  .about-body {
    font-family: 'Roboto', sans-serif;
    font-size: 16px; font-weight: 400;
    color: ${C.muted}; line-height: 1.85; margin-top: 12px;
  }
  .badge {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid ${C.border};
    padding: 7px 14px; border-radius: 3px;
    font-size: 10px; font-weight: 400; letter-spacing: 2px;
    text-transform: uppercase; color: ${C.blueLight};
    margin-right: 8px; margin-bottom: 10px;
  }

  /* ── COMMITMENTS ── */
  .commitments-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 14px; margin-top: 48px;
  }
  @media (max-width: 900px) {
    .commitments-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 520px) {
    .commitments-grid { grid-template-columns: 1fr; }
  }
  .commitment-item {
    display: flex; align-items: flex-start; gap: 16px;
    background: ${C.navyLight}; border: 1px solid ${C.border};
    border-radius: 6px; padding: 20px;
  }
  .commitment-num {
    min-width: 30px; height: 30px; border-radius: 50%;
    background: ${C.blue}; color: ${C.white};
    display: flex; align-items: center; justify-content: center;
    font-family: 'Manrope', sans-serif;
    font-size: 13px; font-weight: 800; flex-shrink: 0;
  }
  .commitment-text {
    font-size: 14px; font-weight: 400; color: ${C.offWhite};
    line-height: 1.6; padding-top: 4px;
  }

  /* ── LISTINGS ── */
  .listings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px; margin-top: 48px;
  }
  .listing-card {
    background: ${C.navyLight}; border: 1px solid ${C.border};
    border-radius: 6px; overflow: hidden;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .listing-card:hover {
    border-color: ${C.blueLight};
    box-shadow: 0 4px 24px rgba(80,108,170,0.2);
  }
  .listing-img {
    width: 100%; aspect-ratio: 16/9;
    background: ${C.navyLight};
    position: relative; overflow: hidden;
  }
  .listing-status {
    position: absolute; top: 12px; left: 12px;
    font-size: 9px; font-weight: 400; letter-spacing: 2px;
    text-transform: uppercase; padding: 5px 10px; border-radius: 3px;
  }
  .status-active { background: ${C.blue}; color: ${C.white}; }
  .status-pending { background: rgba(255,255,255,0.1); color: ${C.muted}; }
  .status-sold { background: #2e7d4f; color: ${C.white}; }
  .listing-body { padding: 22px 24px; }
  .listing-price {
    font-family: 'Manrope', sans-serif;
    font-size: 24px; font-weight: 800; color: ${C.white}; margin-bottom: 4px;
  }
  .listing-address { font-size: 14px; font-weight: 400; color: ${C.muted}; margin-bottom: 10px; }
  .listing-specs { font-size: 11px; font-weight: 100; color: ${C.blueLight}; letter-spacing: 0.5px; }
  .listing-cta {
    display: inline-block; margin-top: 16px;
    font-size: 11px; font-weight: 400; letter-spacing: 2px;
    text-transform: uppercase; color: ${C.blueLight};
    background: none; border: none; cursor: pointer; transition: color 0.2s; padding: 0;
  }
  .listing-cta:hover { color: ${C.white}; }

  /* ── REVIEWS ── */
  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 18px; margin-top: 48px;
  }
  .review-card {
    background: ${C.navyLight}; border: 1px solid ${C.border};
    border-radius: 6px; padding: 28px;
    display: flex; flex-direction: column; gap: 16px;
    transition: border-color 0.2s;
  }
  .review-card:hover { border-color: rgba(255,255,255,0.2); }
  .review-stars { color: ${C.blue}; font-size: 15px; letter-spacing: 2px; }
  .review-quote {
    font-size: 14px; font-weight: 400; color: ${C.muted};
    line-height: 1.8; flex: 1;
  }
  .review-divider { height: 1px; background: ${C.border}; }
  .review-name { font-size: 13px; font-weight: 400; color: ${C.white}; }
  .review-meta { font-size: 11px; font-weight: 100; color: ${C.blueLight}; margin-top: 3px; }
  .review-date { font-size: 10px; font-weight: 100; color: ${C.muted}; margin-top: 2px; letter-spacing: 1px; text-transform: uppercase; }
  .reviews-score-row {
    display: flex; align-items: center; gap: 14px;
    margin-top: 40px; padding-top: 28px; border-top: 1px solid ${C.border};
  }
  .reviews-score {
    font-family: 'Manrope', sans-serif;
    font-size: 38px; font-weight: 800; color: ${C.white};
  }
  .reviews-stars { font-size: 18px; color: ${C.blue}; letter-spacing: 3px; }

  /* ── VALUATION ── */
  .valuation-wrap {
    background: ${C.blue};
    border-top: 1px solid rgba(255,255,255,0.1);
  }
  .valuation-inner { max-width: 620px; margin: 0 auto; padding: 96px 40px; }
  .valuation-inner .eyebrow { color: rgba(255,255,255,0.6); }
  .valuation-inner .eyebrow::before { background: rgba(255,255,255,0.4); }
  .valuation-inner .section-title { color: ${C.white}; }
  .val-input {
    width: 100%;
    background: ${C.white};
    border: none; color: #0c0f24;
    font-family: 'Roboto', sans-serif; font-size: 15px; font-weight: 400;
    padding: 13px 16px; outline: none; border-radius: 3px;
    transition: box-shadow 0.2s;
  }
  .val-input::placeholder { color: #999; }
  .val-input:focus { box-shadow: 0 0 0 2px rgba(255,255,255,0.6); }
  @media (max-width: 600px) { .valuation-inner { padding: 64px 24px; } }

  /* ── SURVEY ── */
  .survey-wrap { background: ${C.navyMid}; border-top: 1px solid ${C.border}; }
  .survey-inner { max-width: 700px; margin: 0 auto; padding: 96px 40px; }
  .survey-header { text-align: center; margin-bottom: 48px; }
  .survey-header .eyebrow { justify-content: center; }
  .survey-header .section-title { margin: 0 auto 8px; }
  .survey-header .section-title-light { text-align: center; }
  .survey-header .section-sub { margin: 0 auto; text-align: center; }
  .survey-card {
    background: ${C.navyLight}; border: 1px solid ${C.border};
    border-radius: 8px; padding: 48px 40px;
  }
  @media (max-width: 520px) {
    .survey-card { padding: 32px 20px; }
    .survey-inner { padding: 64px 24px; }
  }
  .type-toggle { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-bottom: 36px; }
  .type-btn {
    padding: 14px; border: 1px solid ${C.border};
    background: transparent; color: ${C.muted};
    font-family: 'Roboto', sans-serif;
    font-size: 11px; font-weight: 400; letter-spacing: 2px;
    text-transform: uppercase; cursor: pointer; transition: all 0.2s; text-align: center;
    border-radius: 3px;
  }
  .type-btn:hover { border-color: ${C.blueLight}; color: ${C.blueLight}; }
  .type-btn.active { background: ${C.blue}; border-color: ${C.blue}; color: ${C.white}; }
  .form-group { margin-bottom: 22px; }
  .form-label {
    display: block; font-size: 10px; font-weight: 400; letter-spacing: 2.5px;
    text-transform: uppercase; color: ${C.blueLight}; margin-bottom: 9px;
  }
  .form-input, .form-select, .form-textarea {
    width: 100%;
    background: ${C.white};
    border: none; color: #0c0f24;
    font-family: 'Roboto', sans-serif; font-size: 15px; font-weight: 400;
    padding: 13px 16px; outline: none; border-radius: 3px;
    transition: box-shadow 0.2s; appearance: none;
  }
  .form-input::placeholder { color: #999; }
  .form-input:focus, .form-select:focus, .form-textarea:focus {
    box-shadow: 0 0 0 2px ${C.blue};
  }
  .form-select option { background: ${C.white}; color: #0c0f24; }
  .form-textarea { resize: vertical; min-height: 90px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 520px) { .form-row { grid-template-columns: 1fr; } }
  .radio-group { display: flex; flex-direction: column; gap: 10px; }
  .radio-option {
    display: flex; align-items: center; gap: 12px;
    cursor: pointer; color: ${C.muted}; font-size: 14px; font-weight: 400;
  }
  .radio-option input { accent-color: ${C.blue}; width: 15px; height: 15px; cursor: pointer; }
  .form-divider { height: 1px; background: ${C.border}; margin: 28px 0; }
  .submit-btn {
    width: 100%; background: ${C.blue}; color: ${C.white};
    font-family: 'Roboto', sans-serif; font-size: 12px; font-weight: 400;
    letter-spacing: 3px; text-transform: uppercase;
    padding: 18px; border: none; border-radius: 4px;
    cursor: pointer; margin-top: 12px; transition: all 0.2s;
  }
  .submit-btn:hover { background: ${C.blueMid}; transform: translateY(-1px); }
  .success-card {
    background: ${C.navyLight}; border: 1px solid ${C.border};
    border-radius: 8px; padding: 64px 40px; text-align: center;
  }
  .success-title {
    font-family: 'Manrope', sans-serif;
    font-size: 28px; font-weight: 800; color: ${C.white}; margin-bottom: 12px;
  }
  .success-body { font-size: 15px; font-weight: 400; color: ${C.muted}; line-height: 1.8; }
  .required-star { color: #e05252; margin-left: 2px; }

  /* ── FOOTER ── */
  .footer {
    background: #080a18; border-top: 1px solid ${C.border};
    padding: 36px 24px;
    font-size: 11px; font-weight: 100;
    color: rgba(255,255,255,0.3); letter-spacing: 0.5px;
    text-align: center; line-height: 2;
  }
  .footer-logos {
    display: flex; align-items: center; justify-content: center;
    gap: 14px; margin-top: 16px;
  }
`;

const REVIEWS = [
  { name: "Fernando H.", role: "Buyer", date: "February 2026", quote: "We can't be more grateful to Michael for all the help he gave us in our first home purchase process. We never felt pressure and we always had accompaniment from him. We are looking forward to working with him again. 100% recommended!" },
  { name: "Adrian G.", role: "Seller", date: "December 2025", quote: "Michael was the best realtor for the sale of our home and build of our new home. Couldn't have asked for a better experience." },
  { name: "Kathy R.", role: "Buyer", date: "October 2025", quote: "Michael Azazi was very professional, knowledgeable and always available to help whenever needed. He was proactive and was always looking out for our best interest." },
  { name: "Amy B.", role: "Seller", date: "September 2025", quote: "Michael Azazi kept us updated on all events requested by our buyers. Michael was always professional, courteous and easy to work with; highly recommend." },
  { name: "Kathy B.", role: "Facebook Review", date: "2025", quote: "He's very knowledgeable about real estate. He works hard for his clients to try and get everything they want and need. Kind and very easy to work with." },
  { name: "Tim D.", role: "Facebook Review", date: "2025", quote: "I would recommend Michael highly. He is very ambitious and knowledgeable. He tries hard to get everything his clients need and want. He's very respectful and a go getter." },
];

const LISTINGS = [
  { id: 1, status: "Active", price: "$325,000", address: "4590 Deer Run, Rock Hill, NC 29732", specs: "3 bd · 2 ba · 1,893 sqft", image: "/images/4590DeerRun.jpeg", rep: null },
  { id: 2, status: "Active", price: "$350,000", address: "404 W Kerr St, Salisbury, NC 28144", specs: "7 bd · 4 ba · 4,899 sqft", image: "/images/404WKerr.jpeg", rep: null },
  { id: 3, status: "Active", price: "$250,000", address: "505 E 6th St #1003, Charlotte, NC 28202", specs: "1 bd · 1 ba · 774 sqft", image: "/images/505E6th.jpeg", rep: null },
  { id: 4, status: "Sold", price: "$427,000", address: "101 Harvest Farm Ct", specs: "Sold $2k over ask price", image: "/images/sold-harvest-farm.jpg", rep: "Seller" },
  { id: 5, status: "Sold", price: "$408,280", address: "7669 Bainbridge Rd", specs: "New construction", image: "/images/sold-bainbridge.png", rep: "Buyer" },
  { id: 6, status: "Sold", price: "$285,000", address: "10307 Bunclody Dr", specs: "Purchased $2k under ask", image: "/images/sold-bunclody.png", rep: "Buyer" },
  { id: 7, status: "Sold", price: "$603,000", address: "5128 Verona Rd", specs: "New construction", image: "/images/sold-verona.png", rep: "Buyer" },
  { id: 8, status: "Sold", price: "$363,000", address: "9428 John Russell Rd", specs: "Sold $3k over ask price", image: "/images/sold-john-russell.png", rep: "Seller" },
];

const sellerQuestions = [
  { id: "reason", label: "What is your reason for selling?", type: "textarea", placeholder: "e.g. relocating, downsizing, estate sale, investment..." },
  { id: "urgency", label: "How urgent is your need to sell?", type: "radio", options: ["1 — Just curious (6 months or longer)", "2 — Planning ahead (61–180 days)", "3 — Getting serious (31–60 days)", "4 — Soon (15–30 days)", "5 — Immediately (within 14 days)"] },
  { id: "moveByDate", label: "It would be best to be moved by:", type: "text", placeholder: "Target date or month" },
  { id: "loanBalance", label: "Approximate loan balance on the property:", type: "text", placeholder: "e.g. $150,000 or none" },
  { id: "needToBuy", label: "Do you need to buy a home after selling?", type: "radio", options: ["Yes", "No", "Not sure yet"] },
  { id: "priceRange", label: "Estimated value range of your home:", type: "select", options: ["Under $200K", "$200K–$350K", "$350K–$500K", "$500K–$750K", "$750K+", "Not sure"] },
  { id: "realtorCriteria", label: "What matters most when choosing a realtor?", type: "radio", options: ["Getting the highest price", "Strong marketing program", "Communication and availability", "Local market expertise"] },
  { id: "situation", label: "What best describes your situation?", type: "radio", options: ["Standard sale", "Inherited property / estate", "Divorce or life change", "Relocation", "Investment property", "Other"] },
  { id: "agent", label: "Are you currently working with an agent?", type: "radio", options: ["No, I'm not", "Yes, but open to options", "Yes, I have representation"] },
  { id: "notes", label: "Anything else you'd like Michael to know?", type: "textarea", placeholder: "Optional" },
];

const buyerQuestions = [
  { id: "cobuyerName", label: "Co-buyer / spouse name (if applicable):", type: "text", placeholder: "Full name" },
  { id: "timeline", label: "When do you need to buy?", type: "radio", options: ["Within 1 month", "1–3 months", "3–6 months", "6 months to 1 year", "Just looking"] },
  { id: "moveByDate", label: "It would be best if I could be moved by:", type: "text", placeholder: "Target date or month" },
  { id: "priceMin", label: "Minimum budget:", type: "text", placeholder: "e.g. $250,000" },
  { id: "priceMax", label: "Maximum budget:", type: "text", placeholder: "e.g. $400,000" },
  { id: "bedsBathsSqft", label: "Minimum bedrooms / bathrooms / square footage:", type: "text", placeholder: "e.g. 3 bed / 2 bath / 1,500 sqft" },
  { id: "areas", label: "Preferred areas in Charlotte Metro:", type: "text", placeholder: "e.g. South Charlotte, Ballantyne, Concord" },
  { id: "preapproved", label: "Have you met with a lender to pre-qualify?", type: "radio", options: ["Yes", "No, but I'm ready to", "No, I'd like help with that"] },
  { id: "loanType", label: "If pre-approved, what type of loan?", type: "radio", options: ["Cash", "Conventional", "FHA", "VA", "USDA", "Not sure yet"] },
  { id: "needToSell", label: "Do you have a home to sell before purchasing?", type: "radio", options: ["Yes", "No", "Maybe"] },
  { id: "dealBreakers", label: "3 must-have features in your next home:", type: "textarea", placeholder: "e.g. good school district, large backyard, no HOA" },
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
  const [valuation, setValuation] = useState({ address: "", city: "", name: "", phone: "", email: "" });
  const [valuationSubmitted, setValuationSubmitted] = useState(false);

  const questions = tab === "seller" ? sellerQuestions : buyerQuestions;

  const handleAnswer = (id, val) => setAnswers(prev => ({ ...prev, [id]: val }));
  const handleContact = (f, v) => setContact(prev => ({ ...prev, [f]: v }));
  const handleValChange = (f, v) => setValuation(prev => ({ ...prev, [f]: v }));

  const handleValSubmit = async () => {
    if (!valuation.name || !valuation.phone || !valuation.email || !valuation.address)
      return alert("Please fill in all fields.");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: valuation.name, phone: valuation.phone, email: valuation.email, type: "valuation", answers: { address: valuation.address, city: valuation.city } }),
      });
    } catch (e) { console.error(e); }
    setValuationSubmitted(true);
  };

  const handleSubmit = async () => {
    if (!contact.name || !contact.phone || !contact.email)
      return alert("Please enter your name, phone number, and email address.");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: contact.name, phone: contact.phone, email: contact.email, type: tab, answers }),
      });
    } catch (e) { console.error(e); }
    setSubmitted(true);
    setTimeout(() => document.querySelector(".survey-inner")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const scrollTo = (selector, type) => {
    if (type) setTab(type);
    setTimeout(() => document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-brand">
          <img
            src="/images/logo.png"
            alt="Michael Azazi Real Estate"
            style={{ height: 52, width: 52, borderRadius: "50%", objectFit: "cover", mixBlendMode: "screen", flexShrink: 0 }}
          />
          <div className="nav-brand-text">
            <span className="nav-brand-name" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              Michael Azazi Real Estate
              <img src="/images/equal.png" alt="Equal Housing Opportunity" style={{ height: 16, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.7 }} />
              <img src="/images/trans_realtor.png" alt="REALTOR®" style={{ height: 16, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.7 }} />
            </span>
            <span className="nav-brand-sub" style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <img src="/images/exp-logo-white.svg" alt="eXp Realty" style={{ height: 13, width: "auto" }} />
            </span>
          </div>
        </div>
        <div className="nav-links">
          <button className="nav-link" onClick={() => scrollTo(".listings-wrap")}>Listings</button>
          <button className="nav-link" onClick={() => scrollTo(".reviews-wrap")}>Reviews</button>
          <button className="nav-link" onClick={() => scrollTo(".survey-wrap", "seller")}>Sell</button>
          <button className="nav-link" onClick={() => scrollTo(".survey-wrap", "buyer")}>Buy</button>
          <div className="nav-cta-wrap">
            <button className="nav-cta" onClick={() => scrollTo(".valuation-wrap")}>Free Home Valuation</button>
            <a href="tel:7046593564" className="nav-phone">(704) 659-3564</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <p className="hero-eyebrow">Charlotte Metro · NC &amp; SC Licensed</p>
        <h1 className="hero-headline">Your Move,</h1>
        <p className="hero-headline-sub">Handled Right.</p>
        <p className="hero-sub">
          Whether you're ready to sell or ready to buy, you deserve a strategist in your corner — not a salesperson.
        </p>
        <div className="hero-ctas">
          <button className="btn-primary" onClick={() => scrollTo(".survey-wrap", "seller")}>I Want to Sell</button>
          <button className="btn-outline" onClick={() => scrollTo(".survey-wrap", "buyer")}>I Want to Buy</button>
        </div>
        <img src="/images/headshot-removebg-preview.png" alt="Michael Azazi" className="hero-headshot" />
      </section>

      {/* PROOF STRIP */}
      <div className="proof-strip">
        {[["Charlotte", "Metro Market"], ["NC + SC", "Licensed"], ["eXp Realty", "Brokerage"], ["Probate", "Certified"]].map(([n, l]) => (
          <div key={l} className="proof-item">
            <div className="proof-num">{n}</div>
            <div className="proof-label">{l}</div>
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <div className="section-wrap">
        <div className="section">
          <p className="eyebrow">About</p>
          <h2 className="section-title">Michael Azazi Real Estate</h2>
          <p className="section-title-light">with eXp Realty · Charlotte Metro</p>
          <div className="about-grid">
            <div>
              <p className="about-body">
                Michael Azazi has been in the real estate industry since 2022, bringing a foundation built on years of property management experience. That background shaped everything: attention to detail, proactive communication, and a genuine commitment to solving problems before they become issues.
              </p>
              <p className="about-body" style={{ marginTop: 16 }}>
                As a certified Real Estate Negotiation Expert (RENE), Certified Probate Expert (CPE), and Certified Listing Specialist (CLS), Michael brings specialized skills to every transaction. Based in Charlotte and licensed in both NC and SC.
              </p>
              <div style={{ marginTop: 28 }}>
                <span className="badge">✦ Probate Certified</span>
                <span className="badge">✦ Negotiation Expert</span>
                <span className="badge">✦ Listing Specialist</span>
              </div>
            </div>
            <div>
              <img src="/images/SP.jpg" alt="Michael Azazi" style={{ maxWidth: 300, width: "100%", borderRadius: 8, display: "block" }} />
              <p style={{ marginTop: 10, fontSize: 13, fontWeight: 100, color: C.muted, fontStyle: "italic" }}>Yes, that's really me.</p>
            </div>
          </div>
        </div>
      </div>

      {/* COMMITMENTS */}
      <div className="section-wrap-alt">
        <div className="section">
          <p className="eyebrow">My Promise</p>
          <h2 className="section-title">My Commitments to You</h2>
          <div className="commitments-grid">
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
              <div key={i} className="commitment-item">
                <span className="commitment-num">{i + 1}</span>
                <span className="commitment-text">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ACTIVE LISTINGS */}
      <div className="listings-wrap section-wrap">
        <div className="section">
          <p className="eyebrow">Active Listings</p>
          <h2 className="section-title">Current Properties</h2>
          <p className="section-sub">Homes I'm representing right now in the Charlotte Metro area.</p>
          <div className="listings-grid">
            {LISTINGS.filter(l => l.status !== "Sold").map(l => (
              <div key={l.id} className="listing-card">
                <div className="listing-img">
                  <span className={`listing-status status-${l.status.toLowerCase()}`}>{l.status}</span>
                  <img src={l.image} alt={l.address} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div className="listing-body">
                  <div className="listing-price">{l.price}</div>
                  <div className="listing-address">{l.address}</div>
                  {l.specs && <div className="listing-specs">{l.specs}</div>}
                  <button className="listing-cta" onClick={() => scrollTo(".survey-wrap", "buyer")}>Request Info →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SOLD LISTINGS */}
      <div className="sold-wrap section-wrap-alt">
        <div className="section">
          <p className="eyebrow">Sold Properties</p>
          <h2 className="section-title">Houses I've Sold</h2>
          <p className="section-sub">Buyers and sellers I've successfully represented across the Charlotte Metro area.</p>
          <div className="listings-grid">
            {LISTINGS.filter(l => l.status === "Sold").map(l => (
              <div key={l.id} className="listing-card">
                <div className="listing-img">
                  <span className={`listing-status status-${l.status.toLowerCase()}`}>{l.status}</span>
                  <img src={l.image} alt={l.address} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div className="listing-body">
                  <div className="listing-price">{l.price}</div>
                  <div className="listing-address">{l.address}</div>
                  {l.specs && <div className="listing-specs">{l.specs}</div>}
                  {l.rep && <div className="listing-specs" style={{ marginTop: 6 }}>Represented {l.rep}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="reviews-wrap section-wrap-alt">
        <div className="section">
          <p className="eyebrow">Client Reviews</p>
          <h2 className="section-title">What Clients Say</h2>
          <p className="section-sub">Verified reviews from real buyers and sellers in the Charlotte Metro area.</p>
          <div className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-stars">★★★★★</div>
                <p className="review-quote">"{r.quote}"</p>
                <div className="review-divider" />
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-meta">{r.role}</div>
                  <div className="review-date">{r.date}</div>
                  {r.role !== "Facebook Review" && (
                    <div style={{ marginTop: 6, fontSize: 10, fontWeight: 100, color: C.blueLight, letterSpacing: "1px", textTransform: "uppercase" }}>
                      ✓ Verified by RealSatisfied
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="reviews-score-row">
            <span className="reviews-score">5.0</span>
            <span className="reviews-stars">★★★★★</span>
          </div>
        </div>
      </div>

      {/* VALUATION */}
      <div className="valuation-wrap">
        <div className="valuation-inner">
          {valuationSubmitted ? (
            <div style={{ textAlign: "center" }}>
              <p className="eyebrow" style={{ justifyContent: "center" }}>Request Received</p>
              <h2 className="section-title">You'll hear from Michael within 24 hours.</h2>
            </div>
          ) : (
            <>
              <p className="eyebrow">Free Home Valuation</p>
              <h2 className="section-title">What Is Your Home Worth?</h2>
              <p style={{ fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, marginBottom: 36, marginTop: 12 }}>
                Enter your address and I'll send you a personalized home value analysis within 24 hours — no automated tools, just real local expertise.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <input className="val-input" style={{ gridColumn: "1 / -1" }} placeholder="Street address" value={valuation.address} onChange={e => handleValChange("address", e.target.value)} />
                <input className="val-input" style={{ gridColumn: "1 / -1" }} placeholder="City" value={valuation.city} onChange={e => handleValChange("city", e.target.value)} />
                <input className="val-input" placeholder="Your name" value={valuation.name} onChange={e => handleValChange("name", e.target.value)} />
                <input className="val-input" placeholder="Phone number" value={valuation.phone} onChange={e => handleValChange("phone", e.target.value)} />
                <input className="val-input" style={{ gridColumn: "1 / -1" }} placeholder="Email address" value={valuation.email} onChange={e => handleValChange("email", e.target.value)} />
              </div>
              <button className="btn-primary" style={{ marginTop: 20, width: "100%", background: C.navy }} onClick={handleValSubmit}>
                Get My Home Value →
              </button>
            </>
          )}
        </div>
      </div>

      {/* SURVEY */}
      <div className="survey-wrap">
        <div className="survey-inner">
          <div className="survey-header">
            <p className="eyebrow">Get in Touch</p>
            <h2 className="section-title">Let's Talk About Your Situation</h2>
            <p className="section-title-light">Takes 2 minutes. Michael personally reviews every submission.</p>
          </div>
          {submitted ? (
            <div className="success-card">
              <p className="eyebrow" style={{ justifyContent: "center", marginBottom: 20 }}>Got it</p>
              <h3 className="success-title">{contact.name.split(" ")[0]}, you're on Michael's list.</h3>
              <p className="success-body">He'll reach out within one business day.<br />No pressure. No pitch. Just a real conversation.</p>
            </div>
          ) : (
            <div className="survey-card">
              <div className="type-toggle">
                <button className={`type-btn ${tab === "seller" ? "active" : ""}`} onClick={() => { setTab("seller"); setAnswers({}); }}>I'm Selling</button>
                <button className={`type-btn ${tab === "buyer" ? "active" : ""}`} onClick={() => { setTab("buyer"); setAnswers({}); }}>I'm Buying</button>
              </div>
              {questions.map(q => <SurveyField key={q.id} q={q} value={answers[q.id]} onChange={handleAnswer} />)}
              <div className="form-divider" />
              <p className="form-label" style={{ marginBottom: 16 }}>Your Contact Info</p>
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
              <button className="submit-btn" onClick={handleSubmit}>Send My Info →</button>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div>Michael Azazi Real Estate · with eXp Realty · Charlotte Metro · NC &amp; SC</div>
        <div><a href="tel:7046593564" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>(704) 659-3564</a> · <a href="mailto:michael@azazirealestate.com" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>michael@azazirealestate.com</a></div>
        <div>Not intended to solicit currently listed properties or buyers under existing representation agreements</div>
        <div>Opinions are my own and not the views of eXp Realty</div>
        <div className="footer-logos">
          <img src="/images/equal.png" alt="Equal Housing Opportunity" style={{ height: 32, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.35 }} />
          <img src="/images/trans_realtor.png" alt="REALTOR®" style={{ height: 32, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.35 }} />
        </div>
      </footer>
    </>
  );
}

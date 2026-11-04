import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const C = {
  navy:      "#F5F7FC",
  navyMid:   "#FFFFFF",
  navyLight: "#FFFFFF",
  blue:      "#2563EB",
  blueMid:   "#1D4ED8",
  blueLight: "#3B6FEF",
  white:     "#ffffff",
  ink:       "#11162B",
  offWhite:  "rgba(17,22,43,0.82)",
  muted:     "rgba(17,22,43,0.6)",
  faint:     "rgba(17,22,43,0.12)",
  border:    "rgba(17,22,43,0.1)",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@300;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', sans-serif;
    background: ${C.navy};
    color: ${C.ink};
    -webkit-font-smoothing: antialiased;
  }

  /* ── NAV ── */
  .nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; gap: 28px;
    padding: 20px 48px;
    background: ${C.navy};
    border-bottom: 1px solid ${C.border};
  }
  .nav-brand { display: flex; align-items: center; gap: 14px; }
  .nav-brand-text { display: flex; flex-direction: column; justify-content: center; line-height: 1.1; }
  .nav-brand-name {
    display: block;
    font-family: 'Manrope', sans-serif;
    font-size: 18px; font-weight: 800;
    letter-spacing: 0.3px; color: ${C.ink}; white-space: nowrap;
  }
  .nav-brand-tag {
    display: block; margin-top: 2px;
    font-family: 'Manrope', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    color: ${C.muted}; white-space: nowrap;
  }
  .nav-brand-sub { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
  .nav-brand-exp { height: 13px; width: auto; }
  .nav-brand-badge { height: 14px; width: auto; opacity: 0.7; }
   {
    display: block;
    font-family: 'Inter', sans-serif;
    font-size: 11px; font-weight: 400;
    letter-spacing: 2px; text-transform: uppercase;
    color: ${C.muted};
  }
  .nav-links { display: flex; align-items: center; gap: 32px; flex: 1; justify-content: center; }
  .nav-link {
    font-size: 11px; font-weight: 400; letter-spacing: 2px;
    text-transform: uppercase; color: ${C.muted};
    background: none; border: none; cursor: pointer; transition: color 0.2s;
  }
  .nav-link:hover { color: ${C.ink}; }
  .nav-phone {
    font-family: 'Manrope', sans-serif;
    font-size: 22px; font-weight: 800;
    color: ${C.ink}; text-decoration: none;
    transition: color 0.2s; white-space: nowrap;
  }
  .nav-phone:hover { color: ${C.blueLight}; }
  .nav-cta-buttons { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
  .nav-cta {
    background: ${C.blue}; color: ${C.white};
    border: none; border-radius: 4px;
    padding: 9px 18px;
    font-family: 'Inter', sans-serif;
    font-size: 11px; font-weight: 400; letter-spacing: 2px;
    text-transform: uppercase; cursor: pointer; transition: background 0.2s;
    white-space: nowrap; text-decoration: none; display: inline-block;
  }
  .nav-cta:hover { background: ${C.blueMid}; }
  @media (max-width: 768px) {
    .nav { padding: 14px 18px; flex-wrap: wrap; row-gap: 12px; column-gap: 12px; }
    .nav-brand { flex: 1; gap: 8px; }
    .nav-links { display: none; }
    .nav-brand-name { font-size: 16px; }
    .nav-brand-tag { font-size: 9px; letter-spacing: 2.5px; }
    .nav-brand-sub { gap: 6px; margin-top: 5px; }
    .nav-brand-exp { height: 11px; }
    .nav-brand-badge { height: 12px; }
    .nav-brand > img { height: 44px !important; width: 44px !important; }
    .nav-cta-buttons { flex: 0 0 100%; gap: 6px; flex-wrap: nowrap; }
    .nav-cta { flex: 1; text-align: center; font-size: 10px; letter-spacing: 1px; padding: 9px 6px; }
    .nav-phone {
      flex: 0 0 100%; order: 3;
      font-size: 20px; text-align: center;
      padding: 10px 0; border-top: 1px solid ${C.border};
    }
  }

  /* ── HERO ── */
  .hero {
    min-height: 90vh;
    display: flex; flex-direction: row;
    justify-content: space-between; align-items: center;
    gap: 48px;
    padding: 100px 40px 80px;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 70% 30%, rgba(37,99,235,0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 5% 90%, rgba(37,99,235,0.08) 0%, transparent 50%);
    pointer-events: none;
  }
  .hero-content { position: relative; max-width: 580px; flex: 1 1 320px; min-width: 0; }
  .hero-logo {
    position: relative;
    width: clamp(280px, 40vw, 600px); height: auto;
    flex-shrink: 0; object-fit: contain;
  }
  @media (max-width: 900px) {
    .hero { flex-direction: column-reverse; align-items: center; gap: 24px; text-align: left; }
    .hero-logo { width: min(78vw, 360px); }
  }
   {
    font-family: 'Inter', sans-serif;
    font-size: 11px; font-weight: 400; letter-spacing: 4px;
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
    color: ${C.ink}; max-width: 660px;
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
    font-family: 'Inter', sans-serif;
    font-size: 17px; font-weight: 400;
    color: ${C.muted}; max-width: 420px;
    line-height: 1.8; margin-bottom: 48px; position: relative;
  }
  .hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; position: relative; }
  @media (max-width: 600px) { .hero { padding: 80px 24px 60px; } }

  /* ── BUTTONS ── */
  .btn-primary {
    background: ${C.blue}; color: ${C.white};
    font-family: 'Inter', sans-serif;
    font-size: 12px; font-weight: 400; letter-spacing: 2.5px;
    text-transform: uppercase; padding: 16px 36px;
    border: none; border-radius: 4px; cursor: pointer; transition: all 0.2s;
  }
  .btn-primary:hover { background: ${C.blueMid}; transform: translateY(-1px); }
  .btn-outline {
    background: transparent; color: ${C.ink};
    font-family: 'Inter', sans-serif;
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
    color: ${C.ink}; letter-spacing: 0.5px;
  }
   {
    font-size: 10px; font-weight: 400; letter-spacing: 2px;
    text-transform: uppercase; color: ${C.muted}; margin-top: 6px;
  }

  /* ── SECTIONS ── */
  .section { padding: 96px 40px; max-width: 1100px; margin: 0 auto; }
  .section-wrap { background: ${C.navyMid}; border-top: 1px solid ${C.border}; }
  .section-wrap-alt { background: ${C.navyLight}; border-top: 1px solid ${C.border}; }
  .eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 10px; font-weight: 400; letter-spacing: 4px;
    text-transform: uppercase; color: ${C.blueLight};
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .eyebrow::before { content: ''; display: block; width: 20px; height: 1px; background: ${C.blue}; }
  .section-title {
    font-family: 'Manrope', sans-serif;
    font-size: clamp(26px, 3.5vw, 44px); font-weight: 800;
    color: ${C.ink}; margin-bottom: 8px; line-height: 1.1;
  }
  .section-title-light {
    font-family: 'Manrope', sans-serif;
    font-size: clamp(16px, 2vw, 24px); font-weight: 300;
    color: ${C.blueLight}; margin-bottom: 16px; line-height: 1.3;
  }
  .section-sub {
    font-family: 'Inter', sans-serif;
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
    font-family: 'Inter', sans-serif;
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
    box-shadow: 0 4px 24px rgba(37,99,235,0.2);
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
  .status-pending { background: rgba(17,22,43,0.85); color: #fff; }
  .status-sold { background: #2e7d4f; color: ${C.white}; }
  .status-under-contract { background: #D4A017; color: #4A2E00; }
  .listing-body { padding: 22px 24px; }
  .listing-price {
    font-family: 'Manrope', sans-serif;
    font-size: 24px; font-weight: 800; color: ${C.ink}; margin-bottom: 4px;
  }
  .listing-address { font-size: 14px; font-weight: 400; color: ${C.muted}; margin-bottom: 10px; }
   { font-size: 11px; font-weight: 400; color: ${C.blueLight}; letter-spacing: 0.5px; }
  .listing-cta {
    display: inline-block; margin-top: 16px;
    font-size: 11px; font-weight: 400; letter-spacing: 2px;
    text-transform: uppercase; color: ${C.blueLight};
    background: none; border: none; cursor: pointer; transition: color 0.2s; padding: 0;
  }
  .listing-cta:hover { color: ${C.ink}; }

  /* ── REVIEWS ── */
  .reviews-wrap {
    background: linear-gradient(180deg, rgba(37,99,235,0.06) 0%, ${C.navyLight} 55%);
  }
  .reviews-wrap .section { padding-top: 112px; padding-bottom: 112px; }
  .reviews-wrap .section-title { font-size: clamp(30px, 4vw, 50px); }
  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 26px; margin-top: 56px;
  }
  .review-card {
    background: ${C.white}; border: 1px solid ${C.border};
    border-radius: 10px; padding: 36px 32px;
    display: flex; flex-direction: column; gap: 18px;
    box-shadow: 0 4px 20px rgba(17,22,43,0.06);
    transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  }
  .review-card:first-child {
    border-color: rgba(37,99,235,0.35);
    box-shadow: 0 8px 28px rgba(37,99,235,0.12);
  }
  .review-card:hover { transform: translateY(-3px); border-color: rgba(17,22,43,0.15); box-shadow: 0 10px 28px rgba(17,22,43,0.1); }
  .review-stars { color: ${C.blue}; font-size: 18px; letter-spacing: 3px; }
  .review-quote {
    font-size: 16px; font-weight: 400; color: ${C.offWhite};
    line-height: 1.75; flex: 1;
  }
  .review-divider { height: 1px; background: ${C.border}; }
  .review-name { font-size: 15px; font-weight: 600; color: ${C.ink}; }
  .review-meta { font-size: 12px; font-weight: 500; color: ${C.blueLight}; margin-top: 4px; }
  .review-date { font-size: 10px; font-weight: 400; color: ${C.muted}; margin-top: 2px; letter-spacing: 1px; text-transform: uppercase; }
  .reviews-score-row {
    display: flex; align-items: center; gap: 16px;
    margin-top: 48px; padding-top: 32px; border-top: 1px solid ${C.border};
  }
  .reviews-score {
    font-family: 'Manrope', sans-serif;
    font-size: 52px; font-weight: 800; color: ${C.ink};
  }
  .reviews-stars { font-size: 22px; color: ${C.blue}; letter-spacing: 4px; }

  /* ── FAQ ── */
  .faq-list { margin-top: 40px; max-width: 760px; }
  .faq-item { border-top: 1px solid ${C.border}; padding: 24px 0; }
  .faq-item:last-child { border-bottom: 1px solid ${C.border}; }
  .faq-q {
    font-family: 'Manrope', sans-serif;
    font-size: 17px; font-weight: 800; color: ${C.ink}; margin-bottom: 8px;
  }
  .faq-a {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400; color: ${C.muted}; line-height: 1.8;
  }

  /* ── VALUATION ── */
  .valuation-wrap {
    background: #EEF3FF;
    border-top: 1px solid ${C.border};
  }
  .valuation-inner { max-width: 620px; margin: 0 auto; padding: 96px 40px; }
  .val-input {
    width: 100%;
    background: ${C.white};
    border: 1px solid ${C.border}; color: #0c0f24;
    font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400;
    padding: 13px 16px; outline: none; border-radius: 3px;
    transition: box-shadow 0.2s;
  }
  .val-input::placeholder { color: #999; }
  .val-input:focus { box-shadow: 0 0 0 2px ${C.blue}; }
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
    font-family: 'Inter', sans-serif;
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
    font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400;
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
    font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 400;
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
    font-size: 28px; font-weight: 800; color: ${C.ink}; margin-bottom: 12px;
  }
  .success-body { font-size: 15px; font-weight: 400; color: ${C.muted}; line-height: 1.8; }
  .required-star { color: #e05252; margin-left: 2px; }

  /* ── FOOTER ── */
  .footer {
    background: ${C.navyMid}; border-top: 1px solid ${C.border};
    padding: 36px 24px;
    font-size: 11px; font-weight: 400;
    color: ${C.muted}; letter-spacing: 0.5px;
    text-align: center; line-height: 2;
  }
  .footer a { color: ${C.blueLight}; }
  .footer-logos {
    display: flex; align-items: center; justify-content: center;
    gap: 14px; margin-top: 16px;
  }
`;

const REVIEWS = [
  { name: "Ron Sledzieski", role: "Seller", date: "2026", quote: "I've bought and sold many houses over my lifetime and I would say Michael is right up there in the top of agents I have worked with. First, his manner is chill, but helpful and on top of details. Second, his communication and weekly updates were EXCELLENT. Third, his incitefulness into the market and our particular situation were great to help us navigate a tricky situation. I recommend him without any reservation." },
  { name: "Nana Sledzieski", role: "Seller", date: "2026", quote: "Michael came recommended by another realtor, who we had worked with for years. We were selling to a particular condo market and she felt he would be well-suited. As it turns out, Michael also excels at communication. From the first interaction to the last, he was commited to providing regular and detailed updates. He summarized the week's activity, gauged it to the market (local and hyperlocal), and gave us his recommendations. Whether the news was positive or negative, he framed it professionally and provided alternatives so we never felt our property was being overlooked or underappreciated. After a few months, we worked together across time zones, so he went out of his way to collect some items we had left in the care of friends." },
  { name: "Ian Olson", role: "Seller", date: "2026", quote: "Mike did an awesome job selling two of my houses over the past month! In a very tough market, with houses that weren't \"ideal\" to some other realtors, he was able to get them both under contract quickly, and was firm in negotiations saving me tens of thousands. Communication was great, as was his knowledge and he wasn't afraid to advise me to lower the price even if it wasn't what I wanted to hear." },
  { name: "Lord Jaggy", role: "Seller", date: "October 2026", source: "Google", quote: "Michael has been amazing to work with during the sale of our property! He was responsive, knowledgeable, on top of any issue that came up, and stayed in constant communication during the whole process. We would definitely work with Michael again for any future reality needs!" },
  { name: "D M", role: "Client", date: "October 2026", source: "Google", quote: "Michael was a great pleasure to work with. He kept me advised of all the details through the entire process is very well informed and he was a great pleasure to work with and I would recommend him again to anyone in the area." },
  { name: "Fernando H.", role: "Buyer", date: "February 2026", quote: "We can't be more grateful to Michael for all the help he gave us in our first home purchase process. We never felt pressure and we always had accompaniment from him. We are looking forward to working with him again. 100% recommended!" },
  { name: "Amy B.", role: "Seller", date: "September 2025", quote: "Michael Azazi kept us updated on all events requested by our buyers. Michael was always professional, courteous and easy to work with; highly recommend." },
  { name: "Kathy R.", role: "Buyer", date: "October 2025", quote: "Michael Azazi was very professional, knowledgeable and always available to help whenever needed. He was proactive and was always looking out for our best interest." },
  { name: "Adrian G.", role: "Seller", date: "December 2025", quote: "Michael was the best realtor for the sale of our home and build of our new home. Couldn't have asked for a better experience." },
];

const FAQS = [
  { q: "What areas does Michael Azazi Real Estate serve?", a: "Michael Azazi is a REALTOR® with eXp Realty, licensed in North Carolina and South Carolina, serving buyers, sellers, and investors throughout the Charlotte Metro area." },
  { q: "Does Michael Azazi handle probate and estate property sales?", a: "Yes. Michael holds a Certified Probate Expert (CPE) designation and helps families navigate the sale of inherited and estate properties in both North Carolina and South Carolina." },
  { q: "Can Michael Azazi help sell a distressed or as-is property?", a: "Yes, distressed and as-is property sales are one of Michael's specialties, including homes that need repair or updating before they're market-ready." },
  { q: "Is the home valuation really free?", a: "Yes. Michael provides a personalized home value estimate based on local market data and comparable sales, at no cost and with no obligation." },
  { q: "Is Michael Azazi licensed in both North Carolina and South Carolina?", a: "Yes, Michael holds active real estate licenses in both states and is brokered by eXp Realty." },
  { q: "How do I schedule a consultation?", a: "You can book a free buyer or seller consultation directly on the Schedule page, or call or text (704) 494-1953." },
];

const LISTINGS = [
  { id: 1, status: "Sold", price: "$320,000", address: "4590 Deer Run, Rock Hill, SC 29732", specs: "3 bd · 2 ba · 1,893 sqft", image: "/images/4590DeerRun.jpeg", rep: "Seller" },
  { id: 2, status: "Sold", price: "$381,000", address: "404 W Kerr St, Salisbury, NC 28144", specs: "7 bd · 4 ba · 4,899 sqft", image: "/images/404WKerr.jpeg", rep: "Buyer & Seller" },
  { id: 3, status: "Sold", price: "$218,000", address: "505 E 6th St #1003, Charlotte, NC 28202", specs: "1 bd · 1 ba · 774 sqft", image: "/images/505E6th.jpeg", rep: "Seller" },
  { id: 9, status: "Sold", price: "$175,000", address: "1 Bird St, Rock Hill, SC 29730", specs: "1 bd · 1 ba · 844 sqft", image: "/images/1BirdSt.jpeg", rep: "Seller" },
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

  useEffect(() => {
    if (window.location.hash === "#valuation") {
      setTimeout(() => document.querySelector(".valuation-wrap")?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, []);

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
            style={{ height: 52, width: 52, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
          />
          <div className="nav-brand-text">
            <span className="nav-brand-name">Michael Azazi</span>
            <span className="nav-brand-tag">Real Estate</span>
            <span className="nav-brand-sub">
              <img className="nav-brand-exp" src="/images/eXp Realty - Black.svg.svg" alt="eXp Realty" />
              <img className="nav-brand-badge" src="/images/equal.png" alt="Equal Housing Opportunity" />
              <img className="nav-brand-badge" src="/images/trans_realtor.png" alt="REALTOR®" />
            </span>
          </div>
        </div>
        <div className="nav-links">
          <button className="nav-link" onClick={() => scrollTo(".listings-wrap")}>Listings</button>
          <button className="nav-link" onClick={() => scrollTo(".reviews-wrap")}>Reviews</button>
          <button className="nav-link" onClick={() => scrollTo(".survey-wrap", "seller")}>Sell</button>
          <button className="nav-link" onClick={() => scrollTo(".survey-wrap", "buyer")}>Buy</button>
          <Link to="/probate" className="nav-link" style={{ textDecoration: "none" }}>Probate</Link>
          <Link to="/schedule" className="nav-link" style={{ textDecoration: "none" }}>Schedule</Link>
          <Link to="/videos" className="nav-link" style={{ textDecoration: "none" }}>Videos</Link>
        </div>
        <div className="nav-cta-buttons">
          <a href="/schedule" className="nav-cta">Schedule a Consultation</a>
          <button className="nav-cta" onClick={() => scrollTo(".valuation-wrap")}>Free Home Valuation</button>
        </div>
        <a href="tel:7044941953" className="nav-phone">(704) 494-1953</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Charlotte Metro · NC &amp; SC Licensed</p>
          <h1 className="hero-headline">Your Move,</h1>
          <p className="hero-headline-sub">Handled Right.</p>
          <p className="hero-sub">
            Whether you're ready to sell, buy, or invest, you deserve a strategist in your corner — not a salesperson.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => scrollTo(".survey-wrap", "seller")}>I Want to Sell</button>
            <button className="btn-outline" onClick={() => scrollTo(".survey-wrap", "buyer")}>I Want to Buy</button>
            <button className="btn-outline" onClick={() => scrollTo(".survey-wrap", "buyer")}>I Want to Invest</button>
          </div>
        </div>
        <img src="/images/logo-transparent.png?v=3" alt="Michael Azazi Real Estate logo" className="hero-logo" />
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
                Michael Azazi's foundation in real estate began in 2015 managing properties — mostly parking operations — which built his eye for detail, proactive communication, and commitment to solving problems before they become issues. He became a REALTOR® in 2023, working on teams through 2025, before going independent in December 2025.
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
              <img src="/images/headshot-michael-azazi.jpg" alt="Michael Azazi, REALTOR® with eXp Realty, Charlotte" style={{ maxWidth: 300, width: "100%", borderRadius: 8, display: "block" }} />
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
                  <span className={`listing-status status-${l.status.toLowerCase().replace(/\s+/g, '-')}`}>{l.status}</span>
                  <img src={l.image} alt={`${l.status} home for sale` + (l.specs ? ` — ${l.specs}` : "") + ` at ${l.address}, listed by Michael Azazi Real Estate`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
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
                  <span className={`listing-status status-${l.status.toLowerCase().replace(/\s+/g, '-')}`}>{l.status}</span>
                  <img src={l.image} alt={`${l.status} home for sale` + (l.specs ? ` — ${l.specs}` : "") + ` at ${l.address}, listed by Michael Azazi Real Estate`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
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
                      {r.source === "Google" ? "✓ Google Review" : "✓ Verified by RealSatisfied"}
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

      {/* LATEST VIDEO */}
      <div className="section-wrap">
        <div className="section">
          <p className="eyebrow">Videos</p>
          <h2 className="section-title">Watch & Learn</h2>
          <p className="section-sub">Market insights, buyer and seller tips, probate, FSBO — straight from Michael.</p>
          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              { id: "9IBRGvwgk5c", title: "Managing a Home During Probate", page: "/probate-video" },
              { id: "VGuz9-cQqeU", title: "Why Your Home Didn't Sell (and How to Fix It)", page: "/home-didnt-sell" },
              { id: "pYEMvmLkX3Y", title: "What FSBO Sellers Need to Know", page: "/selling-on-your-own" },
            ].map(v => (
              <div key={v.id} style={{ background: C.navyLight, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
                <div style={{ position: "relative", paddingBottom: "56.25%", background: "#0c0f24" }}>
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1&playsinline=1`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                  />
                </div>
                <div style={{ padding: "20px 24px" }}>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 17, fontWeight: 800, color: C.ink, marginBottom: 10, lineHeight: 1.3 }}>{v.title}</p>
                  <Link to={v.page} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: C.blueLight, textDecoration: "none" }}>
                    Watch &amp; Schedule a Call →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, textAlign: "center" }}>
            <Link to="/videos" style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "2px", textTransform: "uppercase", color: C.blueLight, textDecoration: "none" }}>
              Browse All Videos →
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="section-wrap-alt">
        <div className="section">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title">Common Questions</h2>
          <p className="section-sub">Straight answers about working with Michael in the Charlotte Metro area.</p>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item">
                <div className="faq-q">{f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VALUATION */}
      <div className="valuation-wrap" id="valuation">
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
              <p style={{ fontSize: 16, fontWeight: 400, color: C.muted, lineHeight: 1.8, marginBottom: 36, marginTop: 12 }}>
                Enter your address and I'll send you a personalized home value analysis within 24 hours — no automated tools, just real local expertise.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <input className="val-input" style={{ gridColumn: "1 / -1" }} placeholder="Street address" value={valuation.address} onChange={e => handleValChange("address", e.target.value)} />
                <input className="val-input" style={{ gridColumn: "1 / -1" }} placeholder="City" value={valuation.city} onChange={e => handleValChange("city", e.target.value)} />
                <input className="val-input" placeholder="Your name" value={valuation.name} onChange={e => handleValChange("name", e.target.value)} />
                <input className="val-input" placeholder="Phone number" value={valuation.phone} onChange={e => handleValChange("phone", e.target.value)} />
                <input className="val-input" style={{ gridColumn: "1 / -1" }} placeholder="Email address" value={valuation.email} onChange={e => handleValChange("email", e.target.value)} />
              </div>
              <button className="btn-primary" style={{ marginTop: 20, width: "100%", background: C.ink }} onClick={handleValSubmit}>
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
        <div>Michael Azazi Real Estate · Brokered by eXp Realty · Charlotte Metro · NC &amp; SC</div>
        <div>eXp Realty: <a href="tel:7042488230" style={{ textDecoration: "none" }}>(704) 248-8230</a></div>
        <div><a href="tel:7044941953" style={{ textDecoration: "none" }}>(704) 494-1953</a> · <a href="mailto:michael@azazirealestate.com" style={{ textDecoration: "none" }}>michael@azazirealestate.com</a></div>
        <div>Not intended to solicit currently listed properties or buyers under existing representation agreements</div>
        <div>Opinions are my own and not the views of eXp Realty</div>
        <div className="footer-logos">
          <img src="/images/equal.png" alt="Equal Housing Opportunity" style={{ height: 32, width: "auto", opacity: 0.55 }} />
          <img src="/images/trans_realtor.png" alt="REALTOR®" style={{ height: 32, width: "auto", opacity: 0.55 }} />
        </div>
      </footer>
    </>
  );
}

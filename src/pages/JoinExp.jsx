import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Paste the unlisted YouTube video ID here (the part after "watch?v=").
// Until it's filled in, the page shows a "video coming soon" placeholder.
const YOUTUBE_ID = "";

const INCOME_DISCLOSURE_URL = "https://exprealty.com/income/";

const C = {
  bg: "#F5F7FC",
  card: "#FFFFFF",
  blue: "#2563EB",
  blueMid: "#1D4ED8",
  white: "#ffffff",
  ink: "#11162B",
  body: "rgba(17,22,43,0.82)",
  muted: "rgba(17,22,43,0.6)",
  border: "rgba(17,22,43,0.1)",
};

const AUDIENCES = [
  {
    title: "Newly Licensed",
    text: "You just passed the exam and every brokerage is pitching you. The first place you hang your license shapes your habits, your income, and your confidence. Choose a home that trains you, mentors you, and lets you grow into your own business from day one.",
  },
  {
    title: "Wondering Where Your Money Goes",
    text: "You closed the deals, but after splits, franchise fees, desk fees, and royalties, the check looks smaller than the work you put in. At eXp the costs are published, the cap is fixed, and once you cap you keep 100% for the rest of your anniversary year.",
  },
  {
    title: "Building Someone Else's Business",
    text: "Teams can be a great place to learn. But if you've been trained to work for the team instead of building your own name, your own database, and your own future, it may be time to think about what you're actually building.",
  },
];

const BENEFITS = [
  {
    title: "Keep More of What You Earn",
    text: "An 80/20 split until you pay a $16,000 annual cap, then 100% commission for the rest of your anniversary year. No franchise fees, no royalty fees, no desk fees.",
  },
  {
    title: "Costs You Can Actually See",
    text: "A one-time $149 startup fee and an $85 monthly cloud brokerage fee, plus small per-transaction fees. Everything is published up front, so you can plan your business with real numbers.",
  },
  {
    title: "Revenue Share",
    text: "eXp shares 50% of its company dollar with agents who attract productive agents to the company. Built intentionally, it can become a second income stream that grows from helping other agents succeed. It is performance-based and never guaranteed.",
  },
  {
    title: "Ownership, Not Just a Paycheck",
    text: "eXp is publicly traded (NASDAQ: EXPI). Agents can earn stock awards for milestones like closing a first transaction, capping, and helping a sponsored agent close their first deal. You can also buy shares with part of each commission at a discount through the Agent Equity Program.",
  },
  {
    title: "The ICON Award",
    text: "Top producers who cap and meet production and cultural benchmarks can earn up to $16,000 in eXp stock in a year. For high performers, that can effectively return the cap as equity.",
  },
  {
    title: "Mentorship for New Agents",
    text: "The eXp Mentor Program pairs newer agents with experienced guidance on their first transactions, so you're never figuring out your first contract alone.",
  },
  {
    title: "Training Every Week",
    text: "Live, on-demand training on lead generation, listings, contracts, investing, and business growth. Learn from top producers across the country without leaving your home office.",
  },
  {
    title: "Cloud-Based Freedom",
    text: "Your office goes where you go. Work from home, from a coffee shop, or from the car between showings, with broker and transaction support a click away.",
  },
  {
    title: "Your Brand, Your Clients",
    text: "No requirement to join a team. Build your own name, your own database, and your own reputation in the market. The business you build is yours.",
  },
  {
    title: "A National and Global Referral Network",
    text: "Tens of thousands of agents across the country and around the world. When a client moves out of your market, you have someone to send them to, and they have someone to send clients back to you.",
  },
  {
    title: "A Culture Without Gatekeeping",
    text: "Top agents openly share the scripts, systems, and strategies that work for them. Here, collaboration beats competition, and people genuinely want to see you win.",
  },
  {
    title: "Access to the Monday Mastermind",
    text: "Sit in with a group of top-producing agents from across the country every Monday. Real conversations, real numbers, and real strategy. More on that below.",
  },
];

const FFM_BENEFITS = [
  {
    title: "Built by eXp's Top Producers",
    text: "Founded by Daniel Beer and Kyle Whissel, who lead one of eXp's highest-producing groups. The people sharing strategy have actually built the businesses they talk about.",
  },
  {
    title: "A Network of 12,000+ Agents",
    text: "One of the largest collaborative agent communities in the country. Wherever you need an answer, an idea, or a referral partner, someone has been there.",
  },
  {
    title: "Weekly Live Masterminds",
    text: "Multiple live calls every week with top agents from across the U.S. on what's working right now: lead generation, conversion, listings, branding, and operations.",
  },
  {
    title: "Masterminds Built for Where You Are",
    text: "Dedicated sessions for solo agents, team builders, operations and sales managers, agent attraction, women in leadership, and building wealth through real estate.",
  },
  {
    title: "Playbooks You Don't Have to Build",
    text: "Members openly share their SOPs, scripts, systems, and templates. Post a question in the private community and you'll get real answers, real documents, and offers to hop on a call.",
  },
  {
    title: "Masterclasses and a Replay Library",
    text: "Deep-dive classes taught by top producers, plus thousands of hours of searchable replays from masterminds, summits, and workshops, so you can learn on your schedule.",
  },
  {
    title: "Events and In-Person Networking",
    text: "Local and national FFM events bring agents and industry leaders together. You'll leave with more ideas than you have time to implement and relationships that last.",
  },
  {
    title: "Room to Grow Into",
    text: "As your production grows, private masterminds open up for high-volume agents and team leaders, so the room keeps rising with you.",
  },
];

const STAGES = [
  "Thinking about getting licensed",
  "Newly licensed (under 1 year)",
  "Licensed agent, independent",
  "Licensed agent, on a team",
  "Broker or team leader",
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@300;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; background: ${C.bg}; color: ${C.ink}; -webkit-font-smoothing: antialiased; }

  .jx-nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 40px; border-bottom: 1px solid ${C.border}; background: ${C.card}; }
  .jx-brand { display: flex; align-items: center; gap: 14px; text-decoration: none; color: ${C.ink}; }
  .jx-brand-name { display: flex; align-items: center; gap: 8px; font-family: 'Manrope', sans-serif; font-size: 15px; font-weight: 800; letter-spacing: 0.5px; }
  .jx-phone { font-family: 'Manrope', sans-serif; font-size: 15px; font-weight: 800; color: ${C.ink}; text-decoration: none; }
  .jx-phone:hover { color: ${C.blue}; }

  .jx-bg { background: radial-gradient(ellipse at 75% 0%, rgba(37,99,235,0.08) 0%, transparent 55%); }
  .jx-main { max-width: 1040px; margin: 0 auto; padding: 72px 24px 64px; }
  .jx-eyebrow { font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: ${C.blue}; display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .jx-eyebrow::before { content: ''; width: 20px; height: 1px; background: ${C.blue}; }
  .jx-headline { font-family: 'Manrope', sans-serif; font-weight: 800; font-size: clamp(32px, 5.4vw, 58px); line-height: 1.08; margin-bottom: 14px; max-width: 820px; }
  .jx-sub { font-family: 'Manrope', sans-serif; font-weight: 300; font-size: clamp(17px, 2.2vw, 22px); color: ${C.blue}; line-height: 1.4; margin-bottom: 20px; max-width: 760px; }
  .jx-intro { font-size: 16px; line-height: 1.8; color: ${C.body}; max-width: 720px; margin-bottom: 32px; }
  .jx-ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
  .jx-btn { display: inline-block; background: ${C.blue}; color: ${C.white}; border: 1px solid ${C.blue}; text-decoration: none; font-size: 12px; letter-spacing: 2.5px; text-transform: uppercase; padding: 16px 30px; border-radius: 4px; cursor: pointer; font-family: inherit; transition: all 0.2s; }
  .jx-btn:hover { background: ${C.blueMid}; transform: translateY(-1px); }
  .jx-btn-outline { background: transparent; color: ${C.blue}; }
  .jx-btn-outline:hover { background: rgba(37,99,235,0.06); }

  .jx-video { position: relative; width: 100%; max-width: 900px; aspect-ratio: 16 / 9; border-radius: 8px; overflow: hidden; background: #0c0f24; border: 1px solid ${C.border}; box-shadow: 0 20px 50px rgba(17,22,43,0.18); margin-bottom: 80px; }
  .jx-video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
  .jx-video-placeholder { position: absolute; inset: 0; display: flex; flex-direction: column; gap: 10px; align-items: center; justify-content: center; color: rgba(255,255,255,0.75); font-size: 13px; letter-spacing: 2px; text-transform: uppercase; }
  .jx-video-placeholder span { text-align: center; padding: 0 20px; font-size: 11px; letter-spacing: 1px; text-transform: none; color: rgba(255,255,255,0.5); }

  .jx-section { margin-bottom: 80px; scroll-margin-top: 24px; }
  .jx-h2 { font-family: 'Manrope', sans-serif; font-weight: 800; font-size: clamp(24px, 3.4vw, 36px); line-height: 1.15; margin-bottom: 12px; }
  .jx-lede { font-size: 16px; line-height: 1.8; color: ${C.body}; max-width: 720px; margin-bottom: 32px; }

  .jx-grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .jx-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .jx-grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .jx-grid4 .jx-card { padding: 22px; }
  .jx-card { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 8px; padding: 26px; }
  .jx-card h3 { font-family: 'Manrope', sans-serif; font-weight: 800; font-size: 18px; line-height: 1.25; margin-bottom: 10px; }
  .jx-card p { font-size: 14.5px; line-height: 1.75; color: ${C.body}; }
  .jx-num { font-family: 'Manrope', sans-serif; font-weight: 800; font-size: 12px; letter-spacing: 2px; color: ${C.blue}; margin-bottom: 10px; }

  .jx-split { display: grid; grid-template-columns: 1.05fr 1fr; gap: 32px; align-items: start; background: ${C.card}; border: 1px solid ${C.border}; border-radius: 10px; padding: 40px; }
  .jx-split ul { list-style: none; margin-top: 18px; }
  .jx-split li { font-size: 15px; line-height: 1.7; color: ${C.body}; padding-left: 22px; position: relative; margin-bottom: 10px; }
  .jx-split li::before { content: ''; position: absolute; left: 0; top: 10px; width: 10px; height: 2px; background: ${C.blue}; }
  .jx-badge { display: inline-block; font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: ${C.blue}; background: rgba(37,99,235,0.08); padding: 6px 10px; border-radius: 3px; margin-bottom: 14px; }

  .jx-form { display: flex; flex-direction: column; gap: 10px; }
  .jx-form label { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: ${C.muted}; margin-top: 4px; }
  .jx-form input, .jx-form select, .jx-form textarea { padding: 12px 14px; font-size: 15px; border: 1px solid ${C.border}; border-radius: 6px; font-family: inherit; background: ${C.white}; color: ${C.ink}; width: 100%; }
  .jx-form textarea { min-height: 84px; resize: vertical; }
  .jx-form button { margin-top: 6px; background: ${C.blue}; color: ${C.white}; border: none; border-radius: 4px; padding: 15px; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; font-family: inherit; }
  .jx-form button:disabled { opacity: 0.6; cursor: default; }
  .jx-form small { font-size: 11px; color: ${C.muted}; line-height: 1.5; }
  .jx-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .jx-done { font-size: 15px; line-height: 1.8; color: ${C.body}; }
  .jx-done strong { color: ${C.ink}; }

  .jx-about { display: grid; grid-template-columns: 120px 1fr; gap: 28px; align-items: center; }
  .jx-about img { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 1px solid ${C.border}; }
  .jx-about p { font-size: 15.5px; line-height: 1.8; color: ${C.body}; }

  .jx-disclosure { font-size: 12.5px; line-height: 1.75; color: ${C.muted}; border-left: 2px solid ${C.blue}; padding-left: 14px; }
  .jx-disclosure p { margin-bottom: 10px; }
  .jx-disclosure a { color: ${C.blue}; }

  .jx-footer { background: ${C.card}; border-top: 1px solid ${C.border}; padding: 36px 24px; font-size: 12px; color: ${C.muted}; letter-spacing: 0.5px; text-align: center; line-height: 2; }
  .jx-footer a { color: ${C.blue}; text-decoration: none; }
  .jx-footer-logos { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 16px; }

  @media (max-width: 900px) {
    .jx-grid, .jx-grid3, .jx-grid4 { grid-template-columns: 1fr 1fr; }
    .jx-split { grid-template-columns: 1fr; padding: 28px; }
  }
  @media (max-width: 600px) {
    .jx-nav { padding: 12px 16px; }
    .jx-brand-name { font-size: 11px; }
    .jx-brand > img { height: 38px !important; width: 38px !important; }
    .jx-phone { font-size: 12px; }
    .jx-main { padding: 48px 20px 48px; }
    .jx-grid, .jx-grid3, .jx-grid4 { grid-template-columns: 1fr; }
    .jx-row { grid-template-columns: 1fr; }
    .jx-btn { flex: 1; text-align: center; padding: 15px 18px; font-size: 11px; }
    .jx-about { grid-template-columns: 1fr; text-align: center; justify-items: center; }
    .jx-split { padding: 22px; }
  }
`;

function useLeadForm(type, initial) {
  const [values, setValues] = useState(initial);
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    const { name, email, phone, ...answers } = values;
    if (!name.trim() || !email.trim()) return;
    setStatus("sending");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, type, answers: { ...answers, page: window.location.pathname } }),
      });
    } catch (err) {
      console.error(err);
    }
    setStatus("done");
  }

  return { values, set, status, submit };
}

function CallForm() {
  const f = useLeadForm("agent-call", { name: "", email: "", phone: "", agentStage: "", licensedStates: "", bestTimes: "", agentQuestions: "" });
  if (f.status === "done") {
    return (
      <div className="jx-done">
        <p><strong>Thanks, {f.values.name.split(" ")[0]}.</strong></p>
        <p>I'll reach out personally within one business day to set a time that works for you. Prefer to talk sooner? Call or text me at <a href="tel:7044941953">(704) 494-1953</a>.</p>
      </div>
    );
  }
  return (
    <form className="jx-form" onSubmit={f.submit}>
      <input type="text" placeholder="Your name" value={f.values.name} onChange={f.set("name")} required autoComplete="name" />
      <div className="jx-row">
        <input type="tel" placeholder="Phone" value={f.values.phone} onChange={f.set("phone")} required autoComplete="tel" />
        <input type="email" placeholder="Email" value={f.values.email} onChange={f.set("email")} required autoComplete="email" />
      </div>
      <label htmlFor="jx-stage">Where are you in your career?</label>
      <select id="jx-stage" value={f.values.agentStage} onChange={f.set("agentStage")} required>
        <option value="" disabled>Choose one</option>
        {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <div className="jx-row">
        <input type="text" placeholder="State(s) licensed in" value={f.values.licensedStates} onChange={f.set("licensedStates")} />
        <input type="text" placeholder="Best days / times to talk" value={f.values.bestTimes} onChange={f.set("bestTimes")} />
      </div>
      <textarea placeholder="Anything you want to make sure we cover? (optional)" value={f.values.agentQuestions} onChange={f.set("agentQuestions")} />
      <button type="submit" disabled={f.status === "sending"}>{f.status === "sending" ? "One moment..." : "Request a Conversation"}</button>
      <small>A confidential, no-pressure conversation. I'll never contact your current broker, and you can opt out of follow-up anytime.</small>
    </form>
  );
}

function MastermindForm() {
  const f = useLeadForm("mastermind", { name: "", email: "", phone: "", agentStage: "", licensedStates: "" });
  if (f.status === "done") {
    return (
      <div className="jx-done">
        <p><strong>You're on the list, {f.values.name.split(" ")[0]}.</strong></p>
        <p>I'll personally send you the details and the link for an upcoming Monday session. Come ready to listen, take notes, and ask questions.</p>
      </div>
    );
  }
  return (
    <form className="jx-form" onSubmit={f.submit}>
      <input type="text" placeholder="Your name" value={f.values.name} onChange={f.set("name")} required autoComplete="name" />
      <div className="jx-row">
        <input type="tel" placeholder="Phone" value={f.values.phone} onChange={f.set("phone")} autoComplete="tel" />
        <input type="email" placeholder="Email" value={f.values.email} onChange={f.set("email")} required autoComplete="email" />
      </div>
      <label htmlFor="jx-mm-stage">Where are you in your career?</label>
      <select id="jx-mm-stage" value={f.values.agentStage} onChange={f.set("agentStage")} required>
        <option value="" disabled>Choose one</option>
        {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <input type="text" placeholder="State(s) licensed in" value={f.values.licensedStates} onChange={f.set("licensedStates")} />
      <button type="submit" disabled={f.status === "sending"}>{f.status === "sending" ? "One moment..." : "Save My Seat"}</button>
      <small>Free to attend as my guest. No commitment to join eXp, ever.</small>
    </form>
  );
}

export default function JoinExp() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Join eXp Realty with Michael Azazi | Charlotte Metro, NC & SC";
    const desc = document.createElement("meta");
    desc.name = "description";
    desc.content = "Thinking about eXp Realty? Learn how the cap, revenue share, stock awards, and culture work, book a confidential call with Michael Azazi, or sit in on a Monday Mastermind as a guest.";
    document.head.appendChild(desc);
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
      desc.remove();
    };
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <style>{styles}</style>

      <nav className="jx-nav">
        <Link to="/" className="jx-brand">
          <img src="/images/logo.png" alt="Michael Azazi Real Estate" style={{ height: 52, width: 52, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          <div>
            <span className="jx-brand-name">
              Michael Azazi Real Estate
              <img src="/images/equal.png" alt="Equal Housing Opportunity" style={{ height: 16, width: "auto", opacity: 0.7 }} />
            </span>
            <img src="/images/eXp Realty - Black.svg.svg" alt="eXp Realty" style={{ height: 13, width: "auto", marginTop: 4 }} />
          </div>
        </Link>
        <a href="tel:7044941953" className="jx-phone">(704) 494-1953</a>
      </nav>

      <div className="jx-bg">
        <main className="jx-main">
          {/* 1. HERO */}
          <p className="jx-eyebrow">For Real Estate Agents · NC &amp; SC</p>
          <h1 className="jx-headline">Build a Business You Actually Own.</h1>
          <p className="jx-sub">Keep more of what you earn, learn from agents who share everything, and build something that keeps paying you back.</p>
          <p className="jx-intro">
            Whether you just got licensed, you're tired of wondering where your commission went, or you've realized you've been building someone else's business, you deserve a straight answer about your options. Here's why I chose eXp Realty, and why I think it's worth a real look.
          </p>
          <div className="jx-ctas">
            <button className="jx-btn" onClick={() => go("talk")}>Talk With Me</button>
            <button className="jx-btn jx-btn-outline" onClick={() => go("mastermind")}>Join a Monday Mastermind</button>
          </div>

          {/* 2. VIDEO */}
          <div className="jx-video">
            {YOUTUBE_ID ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1&playsinline=1`}
                title="Why agents are choosing eXp Realty"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="jx-video-placeholder">
                Video coming soon
                <span>In the meantime, book a call or grab a Monday Mastermind seat below.</span>
              </div>
            )}
          </div>

          {/* 3. WHO IT'S FOR */}
          <section className="jx-section">
            <p className="jx-eyebrow">Who This Is For</p>
            <h2 className="jx-h2">Sound Familiar?</h2>
            <p className="jx-lede">Most agents I talk to are in one of three places. If you see yourself in any of them, keep reading.</p>
            <div className="jx-grid3">
              {AUDIENCES.map((a) => (
                <div className="jx-card" key={a.title}>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. BENEFITS */}
          <section className="jx-section">
            <p className="jx-eyebrow">Why eXp</p>
            <h2 className="jx-h2">What You Get When You Join</h2>
            <p className="jx-lede">A brokerage model built around the agent. Here's what that means in practice.</p>
            <div className="jx-grid">
              {BENEFITS.map((b, i) => (
                <div className="jx-card" key={b.title}>
                  <p className="jx-num">{String(i + 1).padStart(2, "0")}</p>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 5. FASTFORWARD MOVEMENT */}
          <section className="jx-section" id="ffm">
            <p className="jx-eyebrow">The FastForward Movement</p>
            <h2 className="jx-h2">You Don't Just Join eXp. You Join a Movement.</h2>
            <p className="jx-lede">
              When you join eXp with me, you're plugged into the FastForward Movement, a community of agents across the country who are committed to a high level of production and to helping each other get there. The culture is simple: collaboration over competition. If someone has already built it, they'll share it with you.
            </p>
            <div className="jx-grid4">
              {FFM_BENEFITS.map((b, i) => (
                <div className="jx-card" key={b.title}>
                  <p className="jx-num">FFM {String(i + 1).padStart(2, "0")}</p>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 6. MASTERMIND */}
          <section className="jx-section" id="mastermind">
            <div className="jx-split">
              <div>
                <span className="jx-badge">Free Guest Access</span>
                <h2 className="jx-h2">Sit In on a Monday Mastermind</h2>
                <p className="jx-lede" style={{ marginBottom: 0 }}>
                  Every Monday I meet with a group of top-producing agents from across the country through the FastForward Movement at eXp. You're invited to join as my guest, free, with no obligation to ever switch brokerages. Consider it my way of adding value before you make any decision.
                </p>
                <ul>
                  <li>Hear what's working right now from agents producing at a high level</li>
                  <li>Real talk on lead generation, listings, pricing, and running your business</li>
                  <li>Ask your own questions and leave with something you can use this week</li>
                  <li>See the eXp culture of open sharing for yourself, before you commit to anything</li>
                </ul>
              </div>
              <MastermindForm />
            </div>
          </section>

          {/* 6. APPOINTMENT */}
          <section className="jx-section" id="talk">
            <div className="jx-split">
              <div>
                <span className="jx-badge">Confidential Conversation</span>
                <h2 className="jx-h2">Let's Talk About Your Business</h2>
                <p className="jx-lede" style={{ marginBottom: 0 }}>
                  No pitch deck and no pressure. We'll look at where you are, where you want to go, and whether eXp actually fits. If it doesn't, I'll tell you.
                </p>
                <ul>
                  <li>Walk through your real numbers: split, fees, and what you take home today</li>
                  <li>Understand how the cap, stock awards, and revenue share work, including the parts most people skip</li>
                  <li>Get honest answers about the transition, your listings, and your license</li>
                </ul>
              </div>
              <CallForm />
            </div>
          </section>

          {/* 7. ABOUT */}
          <section className="jx-section">
            <div className="jx-about">
              <img src="/images/logo.png" alt="Michael Azazi Real Estate" />
              <div>
                <p className="jx-eyebrow" style={{ marginBottom: 10 }}>Who You'd Be Talking To</p>
                <p>
                  I'm Michael Azazi, a REALTOR® licensed in North Carolina and South Carolina with eXp Realty, serving the Charlotte Metro. I worked on teams before going solo, so I understand both sides of that decision. My leadership roots go back to running canvass crews in college and managing parking operations, and I bring that same people-first approach to helping agents build businesses they're proud of.
                </p>
              </div>
            </div>
          </section>

          {/* 8. DISCLOSURE */}
          <section className="jx-disclosure">
            <p>
              <strong>Income disclosure.</strong> Earnings at eXp Realty are performance-based and not guaranteed. Most participants earn supplemental or no income from revenue share, and gross compensation does not reflect the business expenses required to run a real estate practice. For average agent earnings and full details, see eXp Realty's <a href={INCOME_DISCLOSURE_URL} target="_blank" rel="noopener noreferrer">Income Disclosure</a>.
            </p>
            <p>
              Fees, commission structures, stock award programs, and revenue share plans are set by eXp Realty and eXp World Holdings, are subject to change, and may be modified or discontinued at the company's discretion. Stock awards are subject to vesting requirements. Nothing on this page is investment, tax, or legal advice.
            </p>
            <p>
              This page is not intended to interfere with any agent's existing independent contractor or employment agreement. Opinions are my own and not the views of eXp Realty.
            </p>
          </section>
        </main>
      </div>

      <footer className="jx-footer">
        <div>Michael Azazi Real Estate · Brokered by eXp Realty · Licensed in NC &amp; SC</div>
        <div>
          Michael: <a href="tel:7044941953">(704) 494-1953</a> · eXp Realty: <a href="tel:7042488230">(704) 248-8230</a> · <a href="mailto:michael@azazirealestate.com">michael@azazirealestate.com</a> · <a href="https://azazirealestate.com">azazirealestate.com</a>
        </div>
        <div>Opinions are my own and not the views of eXp Realty</div>
        <div className="jx-footer-logos">
          <img src="/images/equal.png" alt="Equal Housing Opportunity" style={{ height: 32, width: "auto", opacity: 0.55 }} />
          <img src="/images/trans_realtor.png" alt="REALTOR®" style={{ height: 32, width: "auto", opacity: 0.55 }} />
        </div>
      </footer>
    </>
  );
}

import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function PreQualification() {
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const prefill = {
    name: searchParams.get("name") || "",
    phone: searchParams.get("phone") || "",
    email: searchParams.get("email") || "",
    address: searchParams.get("address") || "",
    date: searchParams.get("date") || "",
    time: searchParams.get("time") || "",
  };

  const [form, setForm] = useState({
    whySelling: "",
    timeline: "",
    estimatedValue: "",
    homeHighlights: "",
    idealBuyer: "",
    neighborhoodFeatures: "",
    interiorUpgrades: "",
    exteriorUpgrades: "",
    upgradeTotal: "",
    workingWithAgent: "",
  });

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const emailBody = `
New Appointment + Pre-Qualification Submission

--- APPOINTMENT ---
Name: ${prefill.name}
Phone: ${prefill.phone}
Email: ${prefill.email}
Property: ${prefill.address}
Date: ${prefill.date}
Time: ${prefill.time}

--- PRE-QUALIFICATION ---
Why selling: ${form.whySelling}
Timeline: ${form.timeline}
Estimated value: ${form.estimatedValue}
Home highlights: ${form.homeHighlights}
Ideal buyer: ${form.idealBuyer}
Neighborhood features: ${form.neighborhoodFeatures}
Interior upgrades: ${form.interiorUpgrades}
Exterior upgrades: ${form.exteriorUpgrades}
Total upgrade value: ${form.upgradeTotal}
Working with another agent: ${form.workingWithAgent}
    `.trim();

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "appointments@azazirealestate.com",
          to: "michael@azazirealestate.com",
          subject: `New Appointment Request — ${prefill.name} — ${prefill.date} at ${prefill.time}`,
          text: emailBody,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        console.error("Resend error", res.status, body);
        throw new Error("Send failed");
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please call or text me directly at (704) 659-3564.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section style={{ maxWidth: 560, margin: "4rem auto", padding: "2rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.75rem", fontWeight: 700 }}>You're all set.</h2>
        <p style={{ color: "#555", marginTop: "1rem" }}>
          Your appointment is confirmed for <strong>{new Date(prefill.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} at {prefill.time}</strong>. I'll reach out to confirm before we meet. Talk soon.
        </p>
        <p style={{ marginTop: "1rem", color: "#555" }}>— Michael Azazi · (704) 659-3564</p>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 600, margin: "0 auto", padding: "2rem 1.5rem" }}>
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>
        Tell Me About Your Home
      </h2>
      <p style={{ color: "#555", marginBottom: "0.25rem" }}>
        Appointment confirmed for <strong>{prefill.date} at {prefill.time}</strong>.
      </p>
      <p style={{ color: "#555", marginBottom: "1.5rem" }}>
        The more detail you share here, the more value I can bring to our meeting. This takes about 5 minutes.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

        <Field label="Why are you thinking about selling?">
          <textarea name="whySelling" value={form.whySelling} onChange={handleChange} rows={3} style={textareaStyle} />
        </Field>

        <Field label="When are you looking to move?">
          <select name="timeline" value={form.timeline} onChange={handleChange} style={inputStyle}>
            <option value="">Select</option>
            <option>As soon as possible</option>
            <option>1-3 months</option>
            <option>3-6 months</option>
            <option>6-12 months</option>
            <option>Just exploring for now</option>
          </select>
        </Field>

        <Field label="What do you think your home is worth?">
          <input type="text" name="estimatedValue" value={form.estimatedValue} onChange={handleChange} placeholder="e.g. $350,000" style={inputStyle} />
        </Field>

        <Field label="What do you love most about your home?">
          <textarea name="homeHighlights" value={form.homeHighlights} onChange={handleChange} rows={3} style={textareaStyle} placeholder="Features, finishes, layout, anything that stands out" />
        </Field>

        <Field label="Who do you think would love this home the most?">
          <textarea name="idealBuyer" value={form.idealBuyer} onChange={handleChange} rows={2} style={textareaStyle} placeholder="Young couple, growing family, investor, etc." />
        </Field>

        <Field label="What do you love about your neighborhood or area?">
          <textarea name="neighborhoodFeatures" value={form.neighborhoodFeatures} onChange={handleChange} rows={2} style={textareaStyle} />
        </Field>

        <Field label="Interior upgrades (list each and approximate value)">
          <textarea name="interiorUpgrades" value={form.interiorUpgrades} onChange={handleChange} rows={4} style={textareaStyle} placeholder="e.g. New kitchen countertops — $8,000&#10;Hardwood floors — $6,500" />
        </Field>

        <Field label="Exterior upgrades (list each and approximate value)">
          <textarea name="exteriorUpgrades" value={form.exteriorUpgrades} onChange={handleChange} rows={4} style={textareaStyle} placeholder="e.g. New roof — $12,000&#10;Deck addition — $9,000" />
        </Field>

        <Field label="Approximate total value of all upgrades">
          <input type="text" name="upgradeTotal" value={form.upgradeTotal} onChange={handleChange} placeholder="e.g. $35,000" style={inputStyle} />
        </Field>

        <Field label="Are you currently working with another agent?">
          <select name="workingWithAgent" value={form.workingWithAgent} onChange={handleChange} style={inputStyle}>
            <option value="">Select</option>
            <option>No</option>
            <option>Yes, but no agreement signed</option>
            <option>Yes, under a listing agreement</option>
          </select>
        </Field>

        {error && <p style={{ color: "red", fontSize: "0.875rem" }}>{error}</p>}

        <button type="submit" disabled={submitting} style={{ ...buttonStyle, opacity: submitting ? 0.6 : 1 }}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label style={{ fontWeight: 600, fontSize: "0.95rem" }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  padding: "0.75rem 1rem",
  fontSize: "1rem",
  border: "1px solid #ddd",
  borderRadius: "6px",
  width: "100%",
  boxSizing: "border-box",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
  fontFamily: "inherit",
};

const buttonStyle = {
  padding: "0.875rem",
  fontSize: "1rem",
  fontWeight: 700,
  backgroundColor: "#1a1a1a",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

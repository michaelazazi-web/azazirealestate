import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDocMeta from "../useDocMeta";

const TIME_SLOTS = [];
for (let hour = 9; hour <= 19; hour++) {
  const suffix = hour < 12 ? "AM" : "PM";
  const display = hour <= 12 ? hour : hour - 12;
  TIME_SLOTS.push(`${display}:00 ${suffix}`);
  if (hour < 19) TIME_SLOTS.push(`${display}:30 ${suffix}`);
}

function getDaysFromToday(count) {
  const days = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  for (let i = 1; i <= count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      label: `${dayNames[d.getDay()]} ${monthNames[d.getMonth()]} ${d.getDate()}`,
      value: d.toISOString().split("T")[0],
    });
  }
  return days;
}

export default function AppointmentScheduler() {
  useDocMeta(
    "Schedule a Free Consultation | Michael Azazi Real Estate",
    "Book a free buyer or seller consultation with Michael Azazi, REALTOR® with eXp Realty serving the Charlotte Metro area, licensed in NC & SC."
  );
  const navigate = useNavigate();
  const [type, setType] = useState("seller");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  const days = getDaysFromToday(30);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !phone || !email || !address || !date || !time) {
      setError("Please fill out all fields before continuing.");
      return;
    }
    const params = new URLSearchParams({ type, name, phone, email, address, date, time });
    navigate(`/prequal?${params.toString()}`);
  }

  return (
    <section style={{ maxWidth: 560, margin: "0 auto", padding: "2rem 1.5rem" }}>
      <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>
        Schedule Your Free Consultation
      </h2>
      <p style={{ color: "#555", marginBottom: "1.5rem" }}>
        Pick a time that works for you — Mon through Sun, 9am to 8pm. We'll spend about an hour together and you'll leave with a clear plan.
      </p>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <button
          type="button"
          onClick={() => { setType("seller"); setAddress(""); }}
          style={{ ...toggleStyle, ...(type === "seller" ? toggleActiveStyle : {}) }}
        >
          I'm Selling
        </button>
        <button
          type="button"
          onClick={() => { setType("buyer"); setAddress(""); }}
          style={{ ...toggleStyle, ...(type === "buyer" ? toggleActiveStyle : {}) }}
        >
          I'm Buying
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder={type === "seller" ? "Property address" : "Area or zip code you're targeting"}
          value={address}
          onChange={e => setAddress(e.target.value)}
          style={inputStyle}
        />
        <select value={date} onChange={e => setDate(e.target.value)} style={inputStyle}>
          <option value="">Select a date</option>
          {days.map(d => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
        <select value={time} onChange={e => setTime(e.target.value)} style={inputStyle}>
          <option value="">Select a time</option>
          {TIME_SLOTS.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {error && <p style={{ color: "red", fontSize: "0.875rem" }}>{error}</p>}

        <button type="submit" style={buttonStyle}>
          Confirm & Continue
        </button>
      </form>
    </section>
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

const toggleStyle = {
  flex: 1,
  padding: "0.65rem 1rem",
  fontSize: "0.95rem",
  fontWeight: 600,
  border: "1px solid #ddd",
  borderRadius: "6px",
  cursor: "pointer",
  backgroundColor: "#fff",
  color: "#555",
  transition: "all 0.15s",
};

const toggleActiveStyle = {
  backgroundColor: "#1a1a1a",
  color: "#fff",
  borderColor: "#1a1a1a",
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

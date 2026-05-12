import { createContext, useContext, useState } from "react";

const BulbContext = createContext(null);

export default function App() {
  const [bulbOn, setBulbOn] = useState(true);

  return (
    <BulbContext.Provider value={{ bulbOn, setBulbOn }}>
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>React Context API Bulb</h1>
          <Light />
        </div>
      </div>
    </BulbContext.Provider>
  );
}

function Light() {
  return (
    <div style={styles.lightWrap}>
      <LightBulb />
      <LightSwitch />
    </div>
  );
}

function LightBulb() {
  const { bulbOn } = useContext(BulbContext);

  return (
    <div style={styles.bulbSection}>
      <div
        style={{
          ...styles.bulb,
          background: bulbOn ? "#facc15" : "#9ca3af",
          boxShadow: bulbOn
            ? "0 0 40px rgba(250, 204, 21, 0.65)"
            : "0 0 18px rgba(107, 114, 128, 0.45)",
        }}
      />
      <p style={styles.status}>{bulbOn ? "💡 Bulb On" : "🌑 Bulb Off"}</p>
    </div>
  );
}

function LightSwitch() {
  const { bulbOn, setBulbOn } = useContext(BulbContext);

  return (
    <button
      onClick={() => setBulbOn(!bulbOn)}
      style={styles.button}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      Toggle the Bulb
    </button>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background:
      "radial-gradient(circle at top, #f8fafc 0%, #e2e8f0 45%, #cbd5e1 100%)",
    padding: "24px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(10px)",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
    textAlign: "center",
  },
  title: {
    margin: "0 0 28px",
    fontSize: "2rem",
    fontWeight: "800",
    color: "#111827",
  },
  lightWrap: {
    display: "grid",
    gap: "22px",
    justifyItems: "center",
  },
  bulbSection: {
    display: "grid",
    gap: "14px",
    justifyItems: "center",
  },
  bulb: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    transition: "all 0.3s ease",
    border: "6px solid rgba(255,255,255,0.7)",
  },
  status: {
    margin: 0,
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#111827",
  },
  button: {
    border: "none",
    cursor: "pointer",
    padding: "14px 22px",
    borderRadius: "14px",
    background: "#111827",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "700",
    boxShadow: "0 10px 24px rgba(17,24,39,0.22)",
    transition: "transform 0.15s ease",
  },
};

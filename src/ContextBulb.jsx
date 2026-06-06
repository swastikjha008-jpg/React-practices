import { createContext, useContext, useState } from "react";

const LightContext = createContext();

function Bulb() {
  const { isOn } = useContext(LightContext);
  return (
    <div style={{ textAlign: "center", margin: "32px 0 20px" }}>
      <div style={{
        width: 140, height: 140, borderRadius: "50%", margin: "0 auto 20px",
        background: isOn
          ? "radial-gradient(circle at 40% 35%, #ffe066, #f59e0b)"
          : "radial-gradient(circle at 40% 35%, #d1d5db, #9ca3af)",
        boxShadow: isOn
          ? "0 0 40px 12px rgba(245,158,11,0.35), 0 0 80px 20px rgba(245,158,11,0.15)"
          : "none",
        transition: "all 0.4s ease"
      }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 20 }}>
        <span style={{ fontSize: 22 }}>{isOn ? "💡" : "🔮"}</span>
        <span style={{ fontWeight: 600, fontSize: 22, color: "#111827" }}>
          {isOn ? "Bulb On" : "Bulb Off"}
        </span>
      </div>
    </div>
  );
}

function Switch() {
  const { toggle } = useContext(LightContext);
  return (
    <div style={{ textAlign: "center", marginTop: 24 }}>
      <button onClick={toggle} style={{
        background: "#111827", color: "#fff", border: "none",
        borderRadius: 14, padding: "16px 48px", fontSize: 18,
        fontWeight: 600, cursor: "pointer", letterSpacing: 0.3,
        transition: "opacity 0.2s"
      }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
        onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
        Toggle the Bulb
      </button>
    </div>
  );
}

export default function ContextBulb() {
  const [isOn, setIsOn] = useState(false);
  return (
    <LightContext.Provider value={{ isOn, toggle: () => setIsOn((v) => !v) }}>
      <div style={{
        minHeight: "100vh", background: "#f3f4f6",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "system-ui, sans-serif", padding: 24
      }}>
        <div style={{
          background: "#fff", borderRadius: 24, padding: "40px 48px",
          maxWidth: 480, width: "100%", boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
        }}>
          <h1 style={{ textAlign: "center", fontSize: 28, fontWeight: 700, margin: "0 0 4px", color: "#111827" }}>
            React Context API Demo
          </h1>
          <p style={{ textAlign: "center", color: "#6b7280", margin: "0 0 8px", fontSize: 15 }}>
            State shared across components using Context
          </p>
          <Bulb />
          <Switch />
        </div>
      </div>
    </LightContext.Provider>
  );
}

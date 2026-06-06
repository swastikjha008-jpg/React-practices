import { createContext, useContext, useState } from "react";

const LightContext = createContext();

function LightBulb() {
  const { isOn } = useContext(LightContext);
  return (
    <div style={{ textAlign: "center", fontSize: 80, margin: "20px 0" }}>
      {isOn ? "💡" : "🌑"}
      <p style={{ fontSize: 16 }}>{isOn ? "Light is ON" : "Light is OFF"}</p>
    </div>
  );
}

function LightSwitch() {
  const { isOn, toggle } = useContext(LightContext);
  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={toggle}
        style={{ padding: "10px 24px", fontSize: 16, borderRadius: 8, border: "none",
          background: isOn ? "#f59e0b" : "#374151", color: "#fff", cursor: "pointer" }}>
        {isOn ? "Turn Off" : "Turn On"}
      </button>
    </div>
  );
}

export default function ContextBulb() {
  const [isOn, setIsOn] = useState(false);
  return (
    <LightContext.Provider value={{ isOn, toggle: () => setIsOn((v) => !v) }}>
      <div style={{ maxWidth: 400, margin: "60px auto", fontFamily: "sans-serif", textAlign: "center" }}>
        <h2>🔦 Context API Bulb</h2>
        <p style={{ color: "#666" }}>Demonstrates React Context API</p>
        <LightBulb />
        <LightSwitch />
      </div>
    </LightContext.Provider>
  );
}

import { useState } from "react";
import ExpenseTracker from "./ExpenseTracker";
import ContextBulb from "./ContextBulb";

export default function App() {
  const [active, setActive] = useState(null);

  if (active) return (
    <div>
      <button onClick={() => setActive(null)}
        style={{ margin: 16, padding: "8px 16px", cursor: "pointer", borderRadius: 6, border: "1px solid #ccc" }}>
        ← Back
      </button>
      {active === "expense" && <ExpenseTracker />}
      {active === "bulb" && <ContextBulb />}
    </div>
  );

  return (
    <div style={{ maxWidth: 600, margin: "60px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>⚛️ React Practices</h1>
      <p style={{ color: "#666", marginBottom: 40 }}>Mini React projects by Swastik Jha</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div onClick={() => setActive("expense")}
          style={{ padding: 20, border: "1px solid #ddd", borderRadius: 10, cursor: "pointer" }}>
          <h2 style={{ margin: "0 0 6px" }}>💰 Expense Tracker</h2>
          <p style={{ margin: 0, color: "#666" }}>Add, filter and track expenses with localStorage</p>
        </div>
        <div onClick={() => setActive("bulb")}
          style={{ padding: 20, border: "1px solid #ddd", borderRadius: 10, cursor: "pointer" }}>
          <h2 style={{ margin: "0 0 6px" }}>🔦 Context API Bulb</h2>
          <p style={{ margin: 0, color: "#666" }}>Light bulb toggle using React Context API</p>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import ExpenseTracker from "./ExpenseTracker";
import ContextBulb from "./ContextBulb";

const projects = [
  {
    id: "expense",
    emoji: "💰",
    title: "Expense Tracker",
    desc: "Add, filter and track expenses by category with localStorage persistence.",
    tags: ["useState", "useMemo", "localStorage"],
    color: "#4f46e5",
    bg: "#eef2ff",
  },
  {
    id: "bulb",
    emoji: "🔦",
    title: "Context API Bulb",
    desc: "Light bulb toggle demonstrating React Context API across components.",
    tags: ["Context API", "useContext", "useState"],
    color: "#d97706",
    bg: "#fffbeb",
  },
];

export default function App() {
  const [active, setActive] = useState(null);

  if (active) {
    const project = projects.find((p) => p.id === active);
    return (
      <div style={{ minHeight: "100vh", background: "#f9fafb" }}>
        <div style={{
          background: "#fff", borderBottom: "1px solid #e5e7eb",
          padding: "12px 24px", display: "flex", alignItems: "center", gap: 12
        }}>
          <button onClick={() => setActive(null)} style={{
            background: "none", border: "1px solid #e5e7eb", borderRadius: 8,
            padding: "6px 14px", cursor: "pointer", fontSize: 14, color: "#374151",
            display: "flex", alignItems: "center", gap: 6
          }}>
            ← Back
          </button>
          <span style={{ fontSize: 14, color: "#6b7280" }}>
            React Practices / <strong style={{ color: "#111827" }}>{project.title}</strong>
          </span>
        </div>
        <div style={{ padding: "24px 0" }}>
          {active === "expense" && <ExpenseTracker />}
          {active === "bulb" && <ContextBulb />}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
        padding: "60px 24px 48px", textAlign: "center", color: "#fff"
      }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>⚛️</div>
        <h1 style={{ margin: "0 0 10px", fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>
          React Practices
        </h1>
        <p style={{ margin: "0 0 20px", color: "#a5b4fc", fontSize: 16 }}>
          A collection of React mini-projects by Swastik Jha
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          {["React", "Vite", "JavaScript", "localStorage"].map((t) => (
            <span key={t} style={{
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 99, padding: "4px 12px", fontSize: 13, color: "#e0e7ff"
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px" }}>
        <p style={{
          fontSize: 13, fontWeight: 600, letterSpacing: "0.08em",
          textTransform: "uppercase", color: "#6b7280", marginBottom: 20
        }}>
          {projects.length} Projects
        </p>

        <div style={{ display: "grid", gap: 16 }}>
          {projects.map((p) => (
            <div key={p.id} onClick={() => setActive(p.id)} style={{
              background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16,
              padding: "24px", cursor: "pointer",
              transition: "box-shadow 0.2s, transform 0.2s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
              }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, background: p.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, flexShrink: 0
                }}>{p.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h2 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 600, color: "#111827" }}>
                      {p.title}
                    </h2>
                    <span style={{ color: "#9ca3af", fontSize: 20 }}>→</span>
                  </div>
                  <p style={{ margin: "0 0 12px", color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
                    {p.desc}
                  </p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.tags.map((tag) => (
                      <span key={tag} style={{
                        background: p.bg, color: p.color, borderRadius: 6,
                        padding: "3px 10px", fontSize: 12, fontWeight: 500
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 48, paddingTop: 24, borderTop: "1px solid #e5e7eb",
          textAlign: "center", color: "#9ca3af", fontSize: 13
        }}>
          Built by{" "}
          <a href="https://github.com/swastikjha008-jpg" target="_blank"
            style={{ color: "#4f46e5", textDecoration: "none", fontWeight: 500 }}>
            Swastik Jha
          </a>
          {" "}· React + Vite
        </div>
      </div>
    </div>
  );
}

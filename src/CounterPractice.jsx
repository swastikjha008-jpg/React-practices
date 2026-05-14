import { useEffect, useMemo, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [theme, setTheme] = useState("light");

  const doubled = useMemo(() => count * 2, [count]);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        fontFamily: "Trebuchet MS, sans-serif",
        background:
          theme === "light"
            ? "linear-gradient(135deg, #fff7ed 0%, #fefce8 100%)"
            : "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
        color: theme === "light" ? "#1f2937" : "#f9fafb",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "24px",
          borderRadius: "22px",
          background: theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(17,24,39,0.9)",
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.14)",
        }}
      >
        <p
          style={{
            margin: "0 0 8px",
            fontSize: "0.78rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#c2410c",
            fontWeight: 700,
          }}
        >
          Small Hooks Exercise
        </p>

        <h1 style={{ margin: 0, fontSize: "2rem" }}>Counter Practice</h1>

        <p style={{ margin: "10px 0 20px", lineHeight: 1.6, opacity: 0.82 }}>
          Practice <code>useState</code>, <code>useEffect</code>, and{" "}
          <code>useMemo</code> with one small React exercise.
        </p>

        <div
          style={{
            marginBottom: "18px",
            padding: "18px",
            borderRadius: "18px",
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: 700,
            background: theme === "light" ? "#f3f4f6" : "#374151",
          }}
        >
          {count}
        </div>

        <label style={{ display: "grid", gap: "8px", marginBottom: "18px", fontWeight: 600 }}>
          Step Value
          <input
            type="number"
            min="1"
            value={step}
            onChange={(event) => setStep(Number(event.target.value) || 1)}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "12px",
              padding: "12px 14px",
              font: "inherit",
            }}
          />
        </label>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            marginBottom: "18px",
          }}
        >
          <button
            type="button"
            onClick={() => setCount((current) => current - step)}
            style={buttonStyle}
          >
            -{step}
          </button>

          <button type="button" onClick={() => setCount(0)} style={buttonStyle}>
            Reset
          </button>

          <button
            type="button"
            onClick={() => setCount((current) => current + step)}
            style={buttonStyle}
          >
            +{step}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "18px",
            padding: "14px 16px",
            borderRadius: "14px",
            background: "#ecfccb",
            color: "#365314",
          }}
        >
          <span>Doubled value:</span>
          <strong>{doubled}</strong>
        </div>

        <button
          type="button"
          onClick={() =>
            setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"))
          }
          style={{
            width: "100%",
            border: 0,
            borderRadius: "12px",
            padding: "12px 14px",
            font: "inherit",
            cursor: "pointer",
            background: "#dbeafe",
            color: "#1d4ed8",
          }}
        >
          Toggle {theme === "light" ? "Dark" : "Light"} Theme
        </button>
      </section>
    </main>
  );
}

const buttonStyle = {
  border: 0,
  borderRadius: "12px",
  padding: "12px 14px",
  font: "inherit",
  cursor: "pointer",
  background: "#fed7aa",
  color: "#9a3412",
};

export default App;

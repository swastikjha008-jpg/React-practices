import { useState, useMemo } from "react";

const CATEGORIES = ["Food", "Travel", "Study", "Bills", "Other"];

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState(() => {
    try { return JSON.parse(localStorage.getItem("expenses")) || []; }
    catch { return []; }
  });
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [filter, setFilter] = useState("All");

  const save = (updated) => {
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
  };

  const handleSubmit = () => {
    if (!title.trim() || !amount) return;
    save([...expenses, { id: Date.now(), title: title.trim(), amount: parseFloat(amount), category }]);
    setTitle(""); setAmount("");
  };

  const filtered = useMemo(() =>
    filter === "All" ? expenses : expenses.filter((e) => e.category === filter),
    [expenses, filter]);

  const total = useMemo(() =>
    filtered.reduce((sum, e) => sum + e.amount, 0), [filtered]);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui, sans-serif", padding: "40px 24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <p style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", color: "#0ea5e9", textTransform: "uppercase" }}>
              React Practice Project
            </p>
            <h1 style={{ margin: "0 0 8px", fontSize: 36, fontWeight: 800, color: "#0f172a" }}>
              Expense Tracker
            </h1>
            <p style={{ margin: 0, color: "#64748b", fontSize: 15 }}>
              Add daily expenses, filter by category, and track spending.
            </p>
          </div>
          <div style={{
            background: "#ecfeff", border: "1px solid #a5f3fc", borderRadius: 16,
            padding: "16px 24px", textAlign: "right", flexShrink: 0
          }}>
            <p style={{ margin: "0 0 4px", fontSize: 13, color: "#0891b2", fontWeight: 500 }}>Filtered Total</p>
            <p style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#0e7490" }}>
              Rs. {total.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Form */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          <input placeholder="Expense title" value={title} onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 2, minWidth: 160, padding: "12px 16px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 15, outline: "none" }} />
          <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}
            style={{ flex: 1, minWidth: 120, padding: "12px 16px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 15, outline: "none" }} />
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            style={{ flex: 1, minWidth: 120, padding: "12px 16px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 15, outline: "none", background: "#fff" }}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <button onClick={handleSubmit}
            style={{ padding: "12px 24px", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
            Add Expense
          </button>
        </div>

        {/* Filter chips */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {["All", ...CATEGORIES].map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              style={{
                padding: "8px 18px", borderRadius: 99, border: "none", fontSize: 14, fontWeight: 500, cursor: "pointer",
                background: filter === c ? "#0f172a" : "#fff",
                color: filter === c ? "#fff" : "#374151",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
              }}>
              {c}
            </button>
          ))}
        </div>

        {/* Expense list */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          {filtered.length === 0 ? (
            <p style={{ textAlign: "center", color: "#94a3b8", padding: "40px 0", margin: 0 }}>No expenses yet. Add one above!</p>
          ) : filtered.map((e, i) => (
            <div key={e.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "18px 24px",
              borderBottom: i < filtered.length - 1 ? "1px solid #f1f5f9" : "none"
            }}>
              <div>
                <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 16, color: "#0f172a" }}>{e.title}</p>
                <p style={{ margin: 0, fontSize: 13, color: "#94a3b8" }}>{e.category} • Rs. {e.amount.toLocaleString()}</p>
              </div>
              <button onClick={() => save(expenses.filter((x) => x.id !== e.id))}
                style={{ background: "#fff1f2", color: "#e11d48", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

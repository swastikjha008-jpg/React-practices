import { useState, useMemo } from "react";

const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Other"];

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [filter, setFilter] = useState("All");

  const save = (updated) => {
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;
    const newExpense = { id: Date.now(), title: title.trim(), amount: parseFloat(amount), category };
    save([...expenses, newExpense]);
    setTitle("");
    setAmount("");
  };

  const deleteExpense = (id) => save(expenses.filter((e) => e.id !== id));

  const filtered = useMemo(() =>
    filter === "All" ? expenses : expenses.filter((e) => e.category === filter),
    [expenses, filter]
  );

  const total = useMemo(() =>
    filtered.reduce((sum, e) => sum + e.amount, 0), [filtered]
  );

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: "0 16px", fontFamily: "sans-serif" }}>
      <h2>💰 Expense Tracker</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <button type="submit" style={{ padding: 10, background: "#4f46e5", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
          Add Expense
        </button>
      </form>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {["All", ...CATEGORIES].map((c) => (
          <button key={c} type="button" onClick={() => setFilter(c)}
            style={{ padding: "4px 12px", borderRadius: 99, border: "1px solid #ccc",
              background: filter === c ? "#4f46e5" : "#fff", color: filter === c ? "#fff" : "#333", cursor: "pointer" }}>
            {c}
          </button>
        ))}
      </div>

      <p style={{ fontWeight: 600 }}>Total: ₹{total.toFixed(2)}</p>

      {filtered.length === 0 && <p style={{ color: "#999" }}>No expenses yet.</p>}
      {filtered.map((e) => (
        <div key={e.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "10px 14px", marginBottom: 8, border: "1px solid #eee", borderRadius: 8 }}>
          <div>
            <div style={{ fontWeight: 500 }}>{e.title}</div>
            <div style={{ fontSize: 12, color: "#888" }}>{e.category}</div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontWeight: 600 }}>₹{e.amount.toFixed(2)}</span>
            <button type="button" onClick={() => deleteExpense(e.id)}
              style={{ background: "none", border: "none", color: "#e53e3e", cursor: "pointer", fontSize: 16 }}>✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";

const starterExpenses = [
  { id: 1, title: "Groceries", amount: 850, category: "Food" },
  { id: 2, title: "Bus Pass", amount: 300, category: "Travel" },
  { id: 3, title: "Notebook", amount: 120, category: "Study" },
];

const categories = ["All", "Food", "Travel", "Study", "Bills", "Other"];

function ExpenseTracker() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expense-tracker-items");
    return savedExpenses ? JSON.parse(savedExpenses) : starterExpenses;
  });
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem("expense-tracker-items", JSON.stringify(expenses));
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    if (selectedCategory === "All") {
      return expenses;
    }

    return expenses.filter((expense) => expense.category === selectedCategory);
  }, [expenses, selectedCategory]);

  const totalAmount = useMemo(
    () => filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0),
    [filteredExpenses]
  );

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const numericAmount = Number(amount);

    if (!trimmedTitle || !numericAmount) {
      return;
    }

    setExpenses((currentExpenses) => [
      {
        id: Date.now(),
        title: trimmedTitle,
        amount: numericAmount,
        category,
      },
      ...currentExpenses,
    ]);

    setTitle("");
    setAmount("");
    setCategory("Food");
  }

  function deleteExpense(id) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id)
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.headingRow}>
          <div>
            <p style={styles.eyebrow}>React Practice Project</p>
            <h1 style={styles.heading}>Expense Tracker</h1>
            <p style={styles.subtitle}>
              Add daily expenses, filter by category, and track spending.
            </p>
          </div>
          <div style={styles.totalBox}>
            <span style={styles.totalLabel}>Filtered Total</span>
            <strong style={styles.totalValue}>Rs. {totalAmount}</strong>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Expense title"
            style={styles.input}
            type="text"
            value={title}
          />
          <input
            min="1"
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Amount"
            style={styles.input}
            type="number"
            value={amount}
          />
          <select
            onChange={(event) => setCategory(event.target.value)}
            style={styles.input}
            value={category}
          >
            {categories
              .filter((item) => item !== "All")
              .map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>
          <button style={styles.primaryButton} type="submit">
            Add Expense
          </button>
        </form>

        <div style={styles.filterRow}>
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setSelectedCategory(item)}
              style={{
                ...styles.filterButton,
                ...(selectedCategory === item ? styles.activeFilterButton : {}),
              }}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <div style={styles.list}>
          {filteredExpenses.length === 0 ? (
            <p style={styles.emptyState}>No expenses found for this category.</p>
          ) : (
            filteredExpenses.map((expense) => (
              <article key={expense.id} style={styles.item}>
                <div>
                  <h2 style={styles.itemTitle}>{expense.title}</h2>
                  <p style={styles.meta}>
                    {expense.category} • Rs. {expense.amount}
                  </p>
                </div>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  style={styles.deleteButton}
                  type="button"
                >
                  Delete
                </button>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "24px",
    background: "linear-gradient(135deg, #ecfeff 0%, #eff6ff 100%)",
    fontFamily: "Segoe UI, sans-serif",
    color: "#0f172a",
  },
  card: {
    width: "min(920px, 100%)",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 20px 60px rgba(15, 23, 42, 0.12)",
  },
  headingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  eyebrow: {
    margin: 0,
    color: "#0f766e",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  heading: {
    margin: "8px 0",
    fontSize: "2.2rem",
  },
  subtitle: {
    margin: 0,
    color: "#475569",
  },
  totalBox: {
    minWidth: "180px",
    padding: "16px",
    borderRadius: "18px",
    background: "#ecfeff",
    border: "1px solid #bae6fd",
  },
  totalLabel: {
    display: "block",
    fontSize: "0.85rem",
    color: "#0f766e",
    marginBottom: "6px",
  },
  totalValue: {
    fontSize: "1.6rem",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr auto",
    gap: "12px",
    marginBottom: "18px",
  },
  input: {
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "1rem",
  },
  primaryButton: {
    border: 0,
    borderRadius: "12px",
    padding: "12px 16px",
    background: "#0891b2",
    color: "#ffffff",
    fontSize: "1rem",
    cursor: "pointer",
  },
  filterRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "18px",
  },
  filterButton: {
    border: "1px solid #cbd5e1",
    background: "#f8fafc",
    borderRadius: "999px",
    padding: "8px 14px",
    cursor: "pointer",
  },
  activeFilterButton: {
    background: "#0f172a",
    color: "#ffffff",
    borderColor: "#0f172a",
  },
  list: {
    display: "grid",
    gap: "12px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    background: "#f8fafc",
  },
  itemTitle: {
    margin: "0 0 6px",
    fontSize: "1.05rem",
  },
  meta: {
    margin: 0,
    color: "#475569",
  },
  deleteButton: {
    border: 0,
    borderRadius: "10px",
    padding: "10px 14px",
    background: "#fee2e2",
    color: "#b91c1c",
    cursor: "pointer",
  },
  emptyState: {
    margin: 0,
    padding: "18px",
    textAlign: "center",
    borderRadius: "16px",
    background: "#f8fafc",
    color: "#64748b",
  },
};

export default ExpenseTracker;

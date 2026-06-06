import { useState } from "react";
import ExpenseTracker from "./ExpenseTracker";
import StudentManagementV2 from "./StudentManagementV2";

export default function App() {
  const [active, setActive] = useState(null);

  if (active === "expense") return (
    <div>
      <button onClick={() => setActive(null)}
        style={{ margin: "16px", padding: "8px 16px", cursor: "pointer" }}>
        ← Back
      </button>
      <ExpenseTracker />
    </div>
  );

  if (active === "student") return (
    <div>
      <button onClick={() => setActive(null)}
        style={{ margin: "16px", padding: "8px 16px", cursor: "pointer" }}>
        ← Back
      </button>
      <StudentManagementV2 />
    </div>
  );

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "60px auto", padding: "0 20px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>⚛️ React Practices</h1>
      <p style={{ color: "#666", marginBottom: "40px" }}>A collection of React mini-projects by Swastik Jha</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div onClick={() => setActive("expense")}
          style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", cursor: "pointer" }}>
          <h2 style={{ margin: "0 0 6px" }}>💰 Expense Tracker</h2>
          <p style={{ margin: 0, color: "#666" }}>Add, filter and track expenses with localStorage</p>
        </div>

        <div onClick={() => setActive("student")}
          style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", cursor: "pointer" }}>
          <h2 style={{ margin: "0 0 6px" }}>🎓 Student Management V2</h2>
          <p style={{ margin: 0, color: "#666" }}>Add, edit, search and filter student records</p>
        </div>
      </div>
    </div>
  );
}

import React, { useMemo, useState } from "react";
import "./App.css";

const initialTasks = [
  { id: 1, title: "Read React notes", completed: true },
  { id: 2, title: "Build a small component", completed: false },
  { id: 3, title: "Practice useState", completed: false },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("all");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }

    if (filter === "pending") {
      return tasks.filter((task) => !task.completed);
    }

    return tasks;
  }, [filter, tasks]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  function markComplete(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  }

  function addTask(event) {
    event.preventDefault();

    const title = newTaskTitle.trim();
    if (!title) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: currentTasks.length
          ? Math.max(...currentTasks.map((task) => task.id)) + 1
          : 1,
        title,
        completed: false,
      },
    ]);

    setNewTaskTitle("");
    setFilter("all");
  }

  return (
    <main className="app">
      <section className="card">
        <p className="eyebrow">Mini React Practice</p>
        <h1>Task Filter</h1>
        <p className="subtitle">
          Filter tasks and mark pending work as completed.
        </p>

        <div className="stats">
          <span>Total: {tasks.length}</span>
          <span>Completed: {completedCount}</span>
          <span>Pending: {pendingCount}</span>
        </div>

        <form className="add-task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="Add a new task"
            value={newTaskTitle}
            onChange={(event) => setNewTaskTitle(event.target.value)}
            aria-label="New task title"
          />
          <button type="submit">Add Task</button>
        </form>

        <div className="filters">
          <button
            type="button"
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            type="button"
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>

        <ul className="task-list">
          {filteredTasks.length === 0 ? (
            <li className="empty">No tasks match this filter.</li>
          ) : (
            filteredTasks.map((task) => (
              <li className="task-item" key={task.id}>
                <div>
                  <h2>{task.title}</h2>
                  <p className={task.completed ? "status done" : "status pending"}>
                    {task.completed ? "Completed" : "Pending"}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={task.completed}
                  onClick={() => markComplete(task.id)}
                >
                  {task.completed ? "Done" : "Mark Complete"}
                </button>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
}

export default App;

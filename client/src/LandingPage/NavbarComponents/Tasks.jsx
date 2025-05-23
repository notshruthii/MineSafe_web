import React, { useState } from "react";

const initialTasks = [
  { id: 1, task: "Check oxygen level in tunnel 3", priority: "High", done: false },
  { id: 2, task: "Inspect conveyor belt", priority: "Medium", done: false },
  { id: 3, task: "Report drill maintenance log", priority: "Low", done: false },
  { id: 4, task: "Test gas sensors in shaft 2", priority: "High", done: false },
  { id: 5, task: "Clean safety gear", priority: "Low", done: false },
  { id: 6, task: "Verify escape route signage", priority: "Medium", done: false },
  { id: 7, task: "Submit safety checklist to supervisor", priority: "High", done: false },
  { id: 8, task: "Lubricate winch equipment", priority: "Medium", done: false },
  { id: 9, task: "Recharge communication radios", priority: "Low", done: false }
];

export default function MineWorkerDashboard() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Mine Safe Workers</h1>
        <h2 style={styles.subtitle}>Daily Tasks</h2>
      </header>

      <section style={styles.taskList}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              ...styles.taskCard,
              backgroundColor: task.done ? "#eee" : "#fff",
              textDecoration: task.done ? "line-through" : "none",
            }}
          >
            <label style={styles.label}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
                style={styles.checkbox}
              />
              <span>{task.task}</span>
            </label>
            <span style={{ ...styles.priority, ...getPriorityStyle(task.priority) }}>
              {task.priority}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}

// Inline CSS styles
const styles = {
  container: {
    backgroundColor: "#000",
    color: "#fff",
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    borderBottom: "2px solid #fff",
    marginBottom: "2rem",
    textAlign: "center",
  },
  title: {
    fontSize: "2rem",
    margin: 0,
  },
  subtitle: {
    fontSize: "1.5rem",
    margin: "0.5rem 0",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  taskCard: {
    backgroundColor: "#fff",
    color: "#000",
    padding: "1rem",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 5px rgba(255,255,255,0.1)",
  },
  checkbox: {
    marginRight: "1rem",
    transform: "scale(1.3)",
  },
  label: {
    display: "flex",
    alignItems: "center",
    fontSize: "1rem",
  },
  priority: {
    padding: "0.3rem 0.6rem",
    borderRadius: "4px",
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
};

// Style by priority level
const getPriorityStyle = (priority) => {
  switch (priority) {
    case "High":
      return { backgroundColor: "#000", color: "#fff" };
    case "Medium":
      return { border: "1px solid #000", color: "#000" };
    case "Low":
      return { border: "1px solid #999", color: "#000" };
    default:
      return {};
  }
};

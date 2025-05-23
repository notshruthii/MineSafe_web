import React, { useState } from "react";

export default function AttendanceApp() {
  const workerNames = [
    "Ravi Kumar",
    "Sunil Sharma",
    "Amit Verma",
    "Deepak Singh",
    "Suresh Yadav",
    "Ramesh Patil",
    "Vikram Mehta",
    "Manoj Joshi",
    "Anil Desai",
    "Karan Kapoor"
  ];

  const initialAttendance = workerNames.map((name, index) => ({
    id: index + 1,
    name,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  }));

  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState(initialAttendance);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newRecord = {
      id: attendance.length + 1,
      name,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };
    setAttendance([newRecord, ...attendance]);
    setName("");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Coal Mine Workers Attendance</h1>
      </header>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Submit</button>
      </form>

      <section style={styles.listSection}>
        <h2>Today's Attendance</h2>
        <ul style={styles.list}>
          {attendance.map((entry) => (
            <li key={entry.id} style={styles.listItem}>
              <span><strong>{entry.name}</strong></span>
              <span>{entry.date} @ {entry.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "1a1a1a",
    color: "#fff",
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    borderBottom: "1px solid white",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "2rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    border: "1px solid #fff",
    borderRadius: "4px",
    backgroundColor: "#111",
    color: "#fff",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#fff",
    color: "#000",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  listSection: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  list: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  listItem: {
    backgroundColor: "#fff",
    color: "#000",
    padding: "0.75rem",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "space-between",
  },
};

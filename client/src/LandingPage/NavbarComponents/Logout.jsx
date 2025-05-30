import React from "react";

export default function LogoutPage() {
  const handleLogout = () => {
    alert("You have been logged out successfully.");
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Mine Safe - Logout</h1>
        <p style={styles.message}>Are you sure you want to logout?</p>
        <button onClick={handleLogout} style={styles.button}>
          Confirm Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `
      linear-gradient(to top right, rgba(68, 17, 236, 0.7), transparent 40%),
      linear-gradient(to top left, rgba(68, 17, 236, 0.7), transparent 40%),
      rgb(1, 8, 27)
    `,
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    padding: "2rem",
  },
  content: {
    textAlign: "center",
    padding: "2rem",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "12px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
  },
  button: {
    padding: "0.8rem 1.6rem",
    backgroundColor: "#fff",
    color: "#000",
    border: "2px solid #fff",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
};


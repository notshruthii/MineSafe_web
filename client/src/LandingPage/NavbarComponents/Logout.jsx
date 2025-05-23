import React from "react";

export default function LogoutPage() {
  const handleLogout = () => {
    alert("You have been logged out successfully.");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Mine Safe - Logout</h1>
      <p style={styles.message}>Are you sure you want to logout?</p>
      <button onClick={handleLogout} style={styles.button}>
        Confirm Logout
      </button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#000", // Black background
    color: "#fff", // White text
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    padding: "2rem",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#fff", // Ensuring the heading remains white
  },
  message: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#fff", // White text for consistency
  },
  button: {
    padding: "0.8rem 1.6rem",
    backgroundColor: "#fff", // White button
    color: "#000", // Black text
    border: "2px solid #fff", // White border
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
};

export default LogoutPage;

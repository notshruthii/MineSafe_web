import React from "react";

const workerData = {
  name: "Ravi Kumar",
  workerId: "MW-1023",
  role: "Safety Inspector",
  shift: "Morning (6:00 AM – 2:00 PM)",
  contact: "+91 98765 43210",
  email: "ravi.kumar@minesafe.com",
  location: "Tunnel 3, Site B"
};

export default function WorkerProfile() {
  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          style={styles.profileImage}
        />
        <h1 style={styles.title}>Worker Profile</h1>
        
        <div style={styles.infoGroup}>
          <label style={styles.label}>Name:</label>
          <p style={styles.value}>{workerData.name}</p>
        </div>

        <div style={styles.infoGroup}>
          <label style={styles.label}>Worker ID:</label>
          <p style={styles.value}>{workerData.workerId}</p>
        </div>

        <div style={styles.infoGroup}>
          <label style={styles.label}>Role:</label>
          <p style={styles.value}>{workerData.role}</p>
        </div>

        <div style={styles.infoGroup}>
          <label style={styles.label}>Shift:</label>
          <p style={styles.value}>{workerData.shift}</p>
        </div>

        <div style={styles.infoGroup}>
          <label style={styles.label}>Contact:</label>
          <p style={styles.value}>{workerData.contact}</p>
        </div>

        <div style={styles.infoGroup}>
          <label style={styles.label}>Email:</label>
          <p style={styles.value}>{workerData.email}</p>
        </div>

        <div style={styles.infoGroup}>
          <label style={styles.label}>Location:</label>
          <p style={styles.value}>{workerData.location}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "linear-gradient(145deg, #000000, #111111)",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  profileCard: {
    backgroundColor: "#111",
    padding: "2.5rem",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
    textAlign: "center",
  },
  profileImage: {
    borderRadius: "50%",
    marginBottom: "1.5rem",
    width: "100px",
    height: "100px",
    objectFit: "cover",
    border: "2px solid white"
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    borderBottom: "1px solid white",
    paddingBottom: "0.5rem",
  },
  infoGroup: {
    marginBottom: "1rem",
    textAlign: "left",
  },
  label: {
    fontWeight: "bold",
    color: "#aaa",
    fontSize: "0.9rem",
  },
  value: {
    fontSize: "1.1rem",
    color: "#fff",
    marginTop: "0.25rem",
  },
};

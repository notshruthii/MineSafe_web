import React from "react";
import Profile_pic from './man_coal.webp';

const workerData = {
  empID: "w123",
  email: "w123@minesafe.com",
  mgrName: "Amit Kumar",
  firstName: "Aditya",
  lastName: "Sharma",
  phone: "+91 98765 43210",
  position: "Underground Operator",
  role: "Worker",
  shift: "Morning (6:00 AM – 2:00 PM)",
  location: "Tunnel 3, Site B",
  readiness: {
    start: "21.05.2025",
    required: true,
    progress: 35,
    steps: [
      { name: "Safety Briefing", progress: 100 },
      { name: "PPE Inspection", progress: 20 },
      { name: "Gas Detector Calibration", progress: 0 },
      { name: "Emergency Drill Completed", progress: 0 },
    ],
  },
};

export default function WorkerProfileDashboard() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Left Side */}
        <div style={styles.left}>
          <img
            src={Profile_pic}
            alt="Profile"
            style={styles.image}
          />
          <button style={styles.changeBtn}>Change Photo</button>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Employee Details</h2>
            <p><strong>Employee ID:</strong> {workerData.empID}</p>
            <p><strong>Name:</strong> {workerData.firstName} {workerData.lastName}</p>
            <p><strong>Email:</strong> {workerData.email}</p>
            <p><strong>Phone:</strong> {workerData.phone}</p>
            <p><strong>Manager Name:</strong> {workerData.mgrName}</p>
            <p><strong>Position:</strong> {workerData.position}</p>
            <p><strong>Location:</strong> {workerData.location}</p>
          </div>
        </div>

        {/* Right Side */}
        <div style={styles.right}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Role & Shift</h2>
            <p><strong>Role:</strong> {workerData.role}</p>
            <p><strong>Shift:</strong> {workerData.shift}</p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Work Readiness & Safety Compliance</h2>
            <p><strong>Start Date:</strong> {workerData.readiness.start}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span style={styles.onboardingLabel}>In Progress</span>
            </p>
            <div style={styles.progressContainer}>
              <div
                style={{
                  ...styles.progressBar,
                  width: `${workerData.readiness.progress}%`,
                }}
              />
            </div>
            <p style={styles.progressText}>{workerData.readiness.progress}% Complete</p>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Compliance Tasks</h2>
            {workerData.readiness.steps.map((step, idx) => (
              <div key={idx} style={styles.taskItem}>
                <p>{step.name}</p>
                <div style={styles.taskProgressWrapper}>
                  <div
                    style={{
                      ...styles.taskProgressBar,
                      width: `${step.progress}%`,
                    }}
                  />
                  <span style={styles.taskProgressText}>{step.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Styles ----------
const styles = {
  container: {
    background: "#1A1A1A",
    color: "#fff",
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#111",
    borderRadius: "12px",
    padding: "2rem",
    maxWidth: "1000px",
    width: "100%",
    gap: "2rem",
    boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)",
  },
  left: {
    width: "300px",
    borderRight: "1px solid #333",
    paddingRight: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: "150px",
    height: "180px",
    borderRadius: "8px",
    objectFit: "cover",
    border: "2px solid white",
    marginBottom: "1rem",
  },
  changeBtn: {
    background: "transparent",
    color: "#0af",
    border: "none",
    cursor: "pointer",
    marginBottom: "2rem",
    textDecoration: "underline",
  },
  right: {
    flex: 1,
    paddingLeft: "1rem",
  },
  section: {
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "1.2rem",
    borderBottom: "1px solid #444",
    marginBottom: "1rem",
    paddingBottom: "0.5rem",
  },
  onboardingLabel: {
    backgroundColor: "#a80",
    padding: "2px 8px",
    borderRadius: "6px",
    fontSize: "0.8rem",
    color: "#fff",
  },
  progressContainer: {
    backgroundColor: "#333",
    borderRadius: "6px",
    overflow: "hidden",
    height: "10px",
    marginTop: "0.5rem",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#0af",
  },
  progressText: {
    fontSize: "0.85rem",
    marginTop: "0.3rem",
    color: "#aaa",
  },
  taskItem: {
    marginBottom: "1rem",
  },
  taskProgressWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "#222",
    borderRadius: "6px",
    overflow: "hidden",
    height: "8px",
    marginTop: "0.2rem",
    position: "relative",
  },
  taskProgressBar: {
    height: "8px",
    backgroundColor: "#0af",
    borderRadius: "6px 0 0 6px",
  },
  taskProgressText: {
    fontSize: "0.75rem",
    color: "#aaa",
    position: "absolute",
    right: "5px",
    top: "-18px",
  },
};

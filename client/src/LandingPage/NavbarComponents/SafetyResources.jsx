import React from "react";

const safetyResources = [
  {
    title: "Safety Manual",
    url: "https://example.com/safety-manual.pdf",
  },
  {
    title: "Emergency Procedures Video",
    url: "https://example.com/emergency-procedures-video",
  },
  {
    title: "PPE Guidelines",
    url: "https://example.com/ppe-guidelines",
  },
  {
    title: "Fire Safety Tips",
    url: "https://example.com/fire-safety-tips",
  },
];

export default function SafetyResourcesPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Safety Resources</h1>
      <p style={styles.intro}>
        Welcome to the Safety Resources portal. Here you will find important
        documents, videos, and guidelines to help maintain a safe work
        environment.
      </p>
      <ul style={styles.resourceList}>
        {safetyResources.map((resource, idx) => (
          <li key={idx} style={styles.resourceItem}>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.resourceLink}
            >
              {resource.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#1A1A1A",
    color: "#fff",
    minHeight: "100vh",
    padding: "3rem 2rem",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
    borderBottom: "2px solid #0af",
    paddingBottom: "0.5rem",
  },
  intro: {
    fontSize: "1.1rem",
    marginBottom: "2rem",
    color: "#ccc",
  },
  resourceList: {
    listStyleType: "none",
    paddingLeft: 0,
  },
  resourceItem: {
    marginBottom: "1.2rem",
  },
  resourceLink: {
    color: "#0af",
    fontSize: "1.2rem",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

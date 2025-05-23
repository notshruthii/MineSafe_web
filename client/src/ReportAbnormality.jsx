import React, { useState } from "react";

export default function ReportAbnormality() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Report submitted successfully!");
    console.log(formData);
    // You would typically send formData to a backend here
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Mine Safe - Report Abnormality</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            style={styles.textarea}
            required
          />
        </label>
        <label style={styles.label}>
          Upload Image (optional):
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>
          Submit Report
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#000",
    color: "#fff",
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "2rem",
  },
  form: {
    maxWidth: "500px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    fontSize: "1rem",
  },
  input: {
    padding: "0.6rem",
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #fff",
    borderRadius: "4px",
  },
  textarea: {
    padding: "0.6rem",
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #fff",
    borderRadius: "4px",
    resize: "vertical",
  },
  button: {
    padding: "0.8rem",
    backgroundColor: "#fff",
    color: "#000",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

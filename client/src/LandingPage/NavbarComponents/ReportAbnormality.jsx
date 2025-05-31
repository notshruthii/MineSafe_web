import React, { useState } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workerData = JSON.parse(localStorage.getItem("workerData"));
    const employeeId = workerData?.employeeId;

    if (!employeeId) {
      alert("User not logged in. Please log in first.");
      return;
    }

    try {
      let imageUrl = "";

      // 1. Upload image to Firebase Storage (if provided)
      if (formData.image) {
        const imageRef = ref(
          storage,
          `abnormalities/${employeeId}/${Date.now()}_${formData.image.name}`
        );
        const snapshot = await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // 2. Create report data object
      const reportData = {
        name: formData.name,
        location: formData.location,
        description: formData.description,
        imageUrl,
        timestamp: new Date(),
      };

      // 3. Save to Firestore under worker's subcollection
      await addDoc(collection(db, "workers", employeeId, "reports"), reportData);

      alert("Report submitted successfully!");
      setFormData({
        name: "",
        location: "",
        description: "",
        image: null,
      });
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report.");
    }
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
    borderColor: "rgb(194, 199, 212)",
    backgroundColor: "rgb(1, 8, 27)",
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
    padding: "2rem",
    border: "2px solid rgba(194, 199, 212, 0.5)",
    borderRadius: "8px",
    backgroundColor: "rgba(255,255,255,0.05)",
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

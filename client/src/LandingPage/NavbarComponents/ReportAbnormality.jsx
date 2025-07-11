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

      if (formData.image) {
        const imageRef = ref(
          storage,
          `abnormalities/${employeeId}/${Date.now()}_${formData.image.name}`
        );
        const snapshot = await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const reportData = {
        name: formData.name,
        location: formData.location,
        description: formData.description,
        imageUrl,
        timestamp: new Date(),
      };

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
    <div className="min-h-screen bg-[#0b1e34] text-white p-6">
      <div className="max-w-2xl mx-auto bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white border-opacity-20">
        <h1 className="text-3xl font-semibold mb-8 text-center border-b border-white pb-3">
          Report Abnormality
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-lg font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white text-black border border-gray-300"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-lg font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white text-black border border-gray-300"
              placeholder="e.g. Zone A, Shaft 2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-lg font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 rounded bg-white text-black border border-gray-300"
              placeholder="Describe the abnormality or issue"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-lg font-medium">Upload Image (optional)</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-3 rounded bg-white text-black border border-gray-300"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-200 transition duration-200"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

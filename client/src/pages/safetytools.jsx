import React, { useState } from 'react';
import { db } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore';

const SafetyTools = () => {
  const [form, setForm] = useState({
    helmet: false,
    glasses: false,
    gloves: false,
    boots: false,
    vest: false
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      userId: localStorage.getItem("userId") || "unknownUser",
      managerId: localStorage.getItem("managerId") || "unknownManager",
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, "safetyTools"), payload);
      alert('Safety tools submitted successfully!');
      setForm({
        helmet: false,
        glasses: false,
        gloves: false,
        boots: false,
        vest: false
      });
    } catch (err) {
      console.error("Error submitting safety tools:", err);
      alert('Failed to submit safety tools.');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-8" style={{ backgroundImage: "url('/coal.jpg')" }}>
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Safety Tools Checklist</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <input type="checkbox" name="helmet" checked={form.helmet} onChange={handleChange} className="mr-2" /> Helmet Checked
          </label>
          <label className="block">
            <input type="checkbox" name="glasses" checked={form.glasses} onChange={handleChange} className="mr-2" /> Safety Glasses Worn
          </label>
          <label className="block">
            <input type="checkbox" name="gloves" checked={form.gloves} onChange={handleChange} className="mr-2" /> Gloves Present
          </label>
          <label className="block">
            <input type="checkbox" name="boots" checked={form.boots} onChange={handleChange} className="mr-2" /> Safety Boots Worn
          </label>
          <label className="block">
            <input type="checkbox" name="vest" checked={form.vest} onChange={handleChange} className="mr-2" /> Reflective Vest Used
          </label>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SafetyTools;

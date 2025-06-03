import React, { useState } from 'react';
import { db } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore';

const SafetyTools = () => {
  const [form, setForm] = useState({
    helmet: false,
    glasses: false,
    gloves: false,
    boots: false,
    vest: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workerData = JSON.parse(localStorage.getItem("workerData"));
    const userId = workerData?.employeeId;

    if (!userId) {
      alert("Please login first.");
      return;
    }

    const payload = {
      ...form,
      userId,
      timestamp: new Date(),
    };

    try {
      const safetyToolsRef = collection(db, "workers", userId, "safetyTools");
      await addDoc(safetyToolsRef, payload);
      alert('Safety tools submitted successfully!');
      setForm({
        helmet: false,
        glasses: false,
        gloves: false,
        boots: false,
        vest: false,
      });
    } catch (err) {
      console.error("Error submitting safety tools:", err);
      alert('Failed to submit safety tools.');
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0b1e34] text-white p-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/coal.jpg')" }}
    >
      <div className="max-w-2xl mx-auto bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white border-opacity-20">
        <h1 className="text-3xl font-semibold mb-8 text-center border-b border-white pb-3">
          Safety Tools Checklist
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {['helmet', 'glasses', 'gloves', 'boots', 'vest'].map((item) => (
            <label key={item} className="flex items-center space-x-3 text-lg">
              <input
                type="checkbox"
                name={item}
                checked={form[item]}
                onChange={handleChange}
                className="accent-blue-500"
              />
              <span className="capitalize">{item} Checked</span>
            </label>
          ))}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-[#123456] hover:bg-[#102a45] transition duration-200 text-white px-6 py-2 rounded text-lg font-medium"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SafetyTools;

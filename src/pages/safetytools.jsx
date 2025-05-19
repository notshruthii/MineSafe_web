// src/pages/SafetyTools.js
import React from 'react';

const SafetyTools = () => {
  return (
    <div className="min-h-screen bg-cover bg-center p-8" style={{ backgroundImage: "url('/coal.jpg')" }}>
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Safety Tools Checklist</h1>
        <form className="space-y-4">
          <label className="block">
            <input type="checkbox" className="mr-2" /> Helmet Checked
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Safety Glasses Worn
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Gloves Present
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Safety Boots Worn
          </label>
          <label className="block">
            <input type="checkbox" className="mr-2" /> Reflective Vest Used
          </label>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SafetyTools;

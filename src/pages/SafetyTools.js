// src/pages/SafetyTools.js
import React from 'react';

const SafetyTools = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: "url('/coal.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Safety & Tools Checklist</h1>
        <form>
          <label className="block mb-2">Helmet Checked:</label>
          <input type="checkbox" className="mb-4" />
          <label className="block mb-2">Gloves Present:</label>
          <input type="checkbox" className="mb-4" />
          <label className="block mb-2">Lamp Working:</label>
          <input type="checkbox" className="mb-4" />
          <br />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SafetyTools;

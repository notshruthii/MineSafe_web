// src/pages/EndShift.js
import React from 'react';

const EndShift = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: "url('/coal.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">End of Shift Report</h1>
        <form>
          <input type="text" placeholder="Summary" className="border p-2 mb-4 w-full" />
          <textarea placeholder="Any incidents or notes?" className="border p-2 mb-4 w-full" rows="4"></textarea>
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EndShift;

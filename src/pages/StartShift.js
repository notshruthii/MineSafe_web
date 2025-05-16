// src/pages/StartShift.js
import React from 'react';

const StartShift = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: "url('/coal.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Start of Shift</h1>
        <form>
          <input type="text" placeholder="Worker Name" className="border p-2 mb-4 w-full" />
          <input type="datetime-local" className="border p-2 mb-4 w-full" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartShift;

// src/pages/EndShift.js
import React from 'react';

const EndShift = () => {
  return (
    <div className="min-h-screen bg-cover bg-center p-8" style={{ backgroundImage: "url('/coal.jpg')" }}>
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">End of Shift</h1>
        <form className="space-y-4">
          <label className="block">End Time:
            <input type="time" className="border p-2 w-full mt-1" />
          </label>

          <label className="block">Tasks Completed:</label>
          <div className="pl-4">
            <label className="block"><input type="checkbox" /> Coal Loading</label>
            <label className="block"><input type="checkbox" /> Shaft Inspection</label>
            <label className="block"><input type="checkbox" /> Safety Meeting</label>
            <label className="block"><input type="checkbox" /> Equipment Cleaning</label>
            <label className="block"><input type="checkbox" /> Documentation</label>
          </div>

          <label className="block">Tools Returned:</label>
          <div className="space-x-4">
            <label><input type="radio" name="toolsReturned" /> Yes</label>
            <label><input type="radio" name="toolsReturned" /> No</label>
          </div>

          <textarea placeholder="Final Remarks" className="border p-2 w-full" rows={4}></textarea>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EndShift;

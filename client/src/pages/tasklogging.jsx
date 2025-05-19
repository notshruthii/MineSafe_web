// src/pages/TaskLogging.js
import React from 'react';

const TaskLogging = () => {
  return (
    <div className="min-h-screen bg-cover bg-center p-8" style={{ backgroundImage: "url('/coal.jpg')" }}>
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Task Logging</h1>
        <form className="space-y-4">
          <label className="block font-semibold">Tasks Assigned:</label>
          <select multiple className="border p-2 w-full">
            <option>Drilling</option>
            <option>Blasting</option>
            <option>Material Transport</option>
            <option>Inspection</option>
            <option>Equipment Maintenance</option>
          </select>

          <input type="text" placeholder="Tools/Machinery Issued" className="border p-2 w-full" />
          <textarea placeholder="Task Remarks" className="border p-2 w-full" rows={4}></textarea>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TaskLogging;


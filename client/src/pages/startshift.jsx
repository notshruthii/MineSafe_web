// src/pages/StartShift.js
import React, { useState, useEffect } from 'react';

const StartShift = () => {
  const [date, setDate] = useState('');

  useEffect(() => {
    const today = new Date();
    setDate(today.toISOString().slice(0, 10));
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center p-8" style={{ backgroundImage: "url('/coal.jpg')" }}>
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Start of Shift</h1>
        <form className="space-y-4">
          <label className="block">Date:
            <input type="date" value={date} readOnly className="border p-2 w-full mt-1" />
          </label>

          <label className="block">Start Time:
            <input type="time" className="border p-2 w-full mt-1" />
          </label>

          <label className="block">Location/Zone Assigned:
            <input type="text" placeholder="Zone A/B/C..." className="border p-2 w-full mt-1" />
          </label>

          <div>
            <p className="font-semibold">PPE Compliance:</p>
            <label className="block"><input type="checkbox" /> Helmet</label>
            <label className="block"><input type="checkbox" /> Gloves</label>
            <label className="block"><input type="checkbox" /> Goggles</label>
            <label className="block"><input type="checkbox" /> Reflective Jacket</label>
            <label className="block"><input type="checkbox" /> Safety Shoes</label>
          </div>

          <label className="block">Health Check (Temperature):
            <input type="number" placeholder="°C" className="border p-2 w-full mt-1" />
          </label>

          <label className="block">Health Check (Pulse):
            <input type="number" placeholder="BPM" className="border p-2 w-full mt-1" />
          </label>

          <label className="block">
            <input type="checkbox" className="mr-2" /> Fit for Duty Confirmation
          </label>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default StartShift;

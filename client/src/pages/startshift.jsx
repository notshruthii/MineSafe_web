import React, { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const StartShift = () => {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  });

  const [startTime, setStartTime] = useState('');
  const [zone, setZone] = useState('');
  const [ppe, setPpe] = useState({
    helmet: false,
    gloves: false,
    goggles: false,
    jacket: false,
    shoes: false
  });
  const [temp, setTemp] = useState('');
  const [pulse, setPulse] = useState('');
  const [fitForDuty, setFitForDuty] = useState(false);

  const togglePpe = (item) => {
    setPpe(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workerData = JSON.parse(localStorage.getItem('workerData'));
    if (!workerData) {
      alert("Please login first.");
      return;
    }

    const userData = {
      date,
      startTime,
      zone,
      ppe,
      temperature: temp,
      pulse,
      fitForDuty,
      timestamp: new Date()
    };

    try {
      const shiftsCollectionRef = collection(db, 'workers', workerData.employeeId, 'startShifts');
      await addDoc(shiftsCollectionRef, userData);

      alert("Shift data submitted successfully!");

      // Reset form
      setStartTime('');
      setZone('');
      setPpe({ helmet: false, gloves: false, goggles: false, jacket: false, shoes: false });
      setTemp('');
      setPulse('');
      setFitForDuty(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-8" style={{ backgroundImage: "url('/coal.jpg')" }}>
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Start of Shift</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">Date:
            <input type="date" value={date} readOnly className="border p-2 w-full mt-1" />
          </label>

          <label className="block">Start Time:
            <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="border p-2 w-full mt-1" />
          </label>

          <label className="block">Location/Zone Assigned:
            <input type="text" value={zone} onChange={e => setZone(e.target.value)} placeholder="Zone A/B/C..." className="border p-2 w-full mt-1" />
          </label>

          <div>
            <p className="font-semibold">PPE Compliance:</p>
            {['helmet', 'gloves', 'goggles', 'jacket', 'shoes'].map(item => (
              <label className="block" key={item}>
                <input type="checkbox" checked={ppe[item]} onChange={() => togglePpe(item)} className="mr-2" />
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </label>
            ))}
          </div>

          <label className="block">Health Check (Temperature):
            <input type="number" value={temp} onChange={e => setTemp(e.target.value)} placeholder="°C" className="border p-2 w-full mt-1" />
          </label>

          <label className="block">Health Check (Pulse):
            <input type="number" value={pulse} onChange={e => setPulse(e.target.value)} placeholder="BPM" className="border p-2 w-full mt-1" />
          </label>

          <label className="block">
            <input type="checkbox" checked={fitForDuty} onChange={() => setFitForDuty(!fitForDuty)} className="mr-2" />
            Fit for Duty Confirmation
          </label>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default StartShift;

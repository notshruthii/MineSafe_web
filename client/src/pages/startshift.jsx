import React, { useState } from 'react';
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const StartShift = () => {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
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
    <div className="min-h-screen bg-[#0b1e34] text-white p-6">
      <div className="max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white border-opacity-20">
        <h1 className="text-3xl font-semibold mb-8 text-center border-b border-white pb-3">Start of Shift Entry</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-lg font-medium">Date</label>
              <input
                type="date"
                value={date}
                readOnly
                className="w-full p-2 rounded bg-white text-black border border-gray-300"
              />
            </div>

            <div>
              <label className="block mb-1 text-lg font-medium">Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="w-full p-2 rounded bg-white text-black border border-gray-300"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 text-lg font-medium">Assigned Zone</label>
              <input
                type="text"
                value={zone}
                onChange={e => setZone(e.target.value)}
                placeholder="e.g., Zone A"
                className="w-full p-2 rounded bg-white text-black border border-gray-300"
                required
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold border-b border-white mb-2 pb-1">PPE Compliance</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['helmet', 'gloves', 'goggles', 'jacket', 'shoes'].map(item => (
                <label key={item} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={ppe[item]}
                    onChange={() => togglePpe(item)}
                    className="accent-blue-500"
                  />
                  <span className="capitalize">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-lg font-medium">Temperature (°C)</label>
              <input
                type="number"
                value={temp}
                onChange={e => setTemp(e.target.value)}
                placeholder="e.g., 36.5"
                className="w-full p-2 rounded bg-white text-black border border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-lg font-medium">Pulse (BPM)</label>
              <input
                type="number"
                value={pulse}
                onChange={e => setPulse(e.target.value)}
                placeholder="e.g., 72"
                className="w-full p-2 rounded bg-white text-black border border-gray-300"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              checked={fitForDuty}
              onChange={() => setFitForDuty(!fitForDuty)}
              className="accent-blue-600"
            />
            <span className="text-lg">I confirm I am fit for duty</span>
          </div>

          <div className="text-center mt-6">
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

export default StartShift;

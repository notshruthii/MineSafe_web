import React, { useState } from 'react';
import { db } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore';

const EndShift = () => {
  const [endTime, setEndTime] = useState('');
  const [tasksCompleted, setTasksCompleted] = useState([]);
  const [toolsReturned, setToolsReturned] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setTasksCompleted((prev) => [...prev, value]);
    } else {
      setTasksCompleted((prev) => prev.filter((task) => task !== value));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const workerData = JSON.parse(localStorage.getItem("workerData"));
  const userId = workerData?.employeeId;
  const managerId = workerData?.managerId || "unknownManager";

  if (!userId) {
    alert("User not logged in. Please login first.");
    return;
  }

  const formData = {
    endTime,
    tasksCompleted,
    toolsReturned,
    remarks,
    userId,
    managerId,
    timestamp: new Date(),
  };

  try {
    const endShiftsRef = collection(db, "workers", userId, "endShifts");
    await addDoc(endShiftsRef, formData);
    alert('End of shift form submitted successfully');

    // Reset form
    setEndTime('');
    setTasksCompleted([]);
    setToolsReturned('');
    setRemarks('');
  } catch (err) {
    console.error('Error submitting end of shift form:', err);
    alert('Error submitting end of shift form');
  }
};




  return (
    <div className="min-h-screen bg-cover bg-center p-8" style={{ backgroundImage: "url('/coal.jpg')" }}>
      <div className="bg-dark bg-opacity-90 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">End of Shift</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">End Time:
            <input type="time" className="border p-2 w-full mt-1" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </label>

          <label className="block">Tasks Completed:</label>
          <div className="pl-4">
            {['Coal Loading', 'Shaft Inspection', 'Safety Meeting', 'Equipment Cleaning', 'Documentation'].map(task => (
              <label key={task} className="block">
                <input
                  type="checkbox"
                  value={task}
                  checked={tasksCompleted.includes(task)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {task}
              </label>
            ))}
          </div>

          <label className="block">Tools Returned:</label>
          <div className="space-x-4">
            <label>
              <input
                type="radio"
                name="toolsReturned"
                value="Yes"
                checked={toolsReturned === 'Yes'}
                onChange={(e) => setToolsReturned(e.target.value)}
              /> Yes
            </label>
            <label>
              <input
                type="radio"
                name="toolsReturned"
                value="No"
                checked={toolsReturned === 'No'}
                onChange={(e) => setToolsReturned(e.target.value)}
              /> No
            </label>
          </div>

          <textarea
            placeholder="Final Remarks"
            className="border p-2 w-full"
            rows={4}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          ></textarea>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EndShift;

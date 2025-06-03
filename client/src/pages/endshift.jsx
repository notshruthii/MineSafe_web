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
    <div className="min-h-screen bg-[#0b1e34] text-white p-6">
      <div className="max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white border-opacity-20">
        <h1 className="text-3xl font-semibold mb-8 text-center border-b border-white pb-3">End of Shift Report</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-lg font-medium">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-2 rounded bg-white text-black border border-gray-300"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium">Tasks Completed</label>
            <div className="grid grid-cols-2 gap-2">
              {['Coal Loading', 'Shaft Inspection', 'Safety Meeting', 'Equipment Cleaning', 'Documentation'].map(task => (
                <label key={task} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={task}
                    checked={tasksCompleted.includes(task)}
                    onChange={handleCheckboxChange}
                    className="accent-blue-500"
                  />
                  <span>{task}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium">Tools Returned</label>
            <div className="space-x-4 text-lg">
              {['Yes', 'No'].map(option => (
                <label key={option} className="inline-flex items-center space-x-2">
                  <input
                    type="radio"
                    name="toolsReturned"
                    value={option}
                    checked={toolsReturned === option}
                    onChange={(e) => setToolsReturned(e.target.value)}
                    className="accent-blue-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-1 text-lg font-medium">Final Remarks</label>
            <textarea
              rows={4}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Any additional comments or incidents..."
              className="w-full p-2 rounded bg-white text-black border border-gray-300"
            />
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

export default EndShift;

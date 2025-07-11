import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const TaskLogging = () => {
  const [tasksAssigned, setTasksAssigned] = useState([]);
  const [toolsIssued, setToolsIssued] = useState('');
  const [taskRemarks, setTaskRemarks] = useState('');
  const [workerId, setWorkerId] = useState(null);
  const [managerId, setManagerId] = useState(null);

  useEffect(() => {
    const workerData = JSON.parse(localStorage.getItem("workerData"));
    if (workerData) {
      setWorkerId(workerData.employeeId);
      setManagerId(workerData.managerId || "unknownManager");
    }
  }, []);

  const handleTaskChange = (e) => {
    const options = Array.from(e.target.options);
    const selected = options.filter(o => o.selected).map(o => o.value);
    setTasksAssigned(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!workerId) {
      alert("Worker ID missing. Please login.");
      return;
    }

    const payload = {
      tasksAssigned,
      toolsIssued,
      taskRemarks,
      managerId,
      timestamp: new Date(),
    };

    try {
      const tasksRef = collection(db, 'workers', workerId, 'taskLogging');
      await addDoc(tasksRef, payload);
      alert('Task logged successfully');
      setTasksAssigned([]);
      setToolsIssued('');
      setTaskRemarks('');
    } catch (error) {
      console.error('Error logging task:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div
      className="min-h-screen bg-[#0b1e34] text-white p-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/coal.jpg')" }}
    >
      <div className="max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white border-opacity-20">
        <h1 className="text-3xl font-semibold mb-8 text-center border-b border-white pb-3">
          Task Logging
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-lg font-medium">Tasks Assigned</label>
            <select
              multiple
              value={tasksAssigned}
              onChange={handleTaskChange}
              className="w-full p-2 rounded bg-white text-black border border-gray-300"
              required
            >
              <option value="Drilling">Drilling</option>
              <option value="Blasting">Blasting</option>
              <option value="Material Transport">Material Transport</option>
              <option value="Inspection">Inspection</option>
              <option value="Equipment Maintenance">Equipment Maintenance</option>
            </select>
            <p className="text-sm mt-1 text-gray-200">Hold Ctrl/Cmd to select multiple</p>
          </div>

          <div>
            <label className="block mb-1 text-lg font-medium">Tools/Machinery Issued</label>
            <input
              type="text"
              placeholder="e.g. Jackhammer, Drill Rig"
              value={toolsIssued}
              onChange={e => setToolsIssued(e.target.value)}
              className="w-full p-2 rounded bg-white text-black border border-gray-300"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-lg font-medium">Task Remarks</label>
            <textarea
              placeholder="Additional notes or instructions"
              value={taskRemarks}
              onChange={e => setTaskRemarks(e.target.value)}
              rows={4}
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

export default TaskLogging;

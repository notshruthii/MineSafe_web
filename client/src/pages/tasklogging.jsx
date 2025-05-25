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
    <div className="min-h-screen bg-cover bg-center p-8" style={{ backgroundImage: "url('/coal.jpg')" }}>
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Task Logging</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block font-semibold">Tasks Assigned:</label>
          <select multiple className="border p-2 w-full" value={tasksAssigned} onChange={handleTaskChange}>
            <option value="Drilling">Drilling</option>
            <option value="Blasting">Blasting</option>
            <option value="Material Transport">Material Transport</option>
            <option value="Inspection">Inspection</option>
            <option value="Equipment Maintenance">Equipment Maintenance</option>
          </select>

          <input
            type="text"
            placeholder="Tools/Machinery Issued"
            className="border p-2 w-full"
            value={toolsIssued}
            onChange={e => setToolsIssued(e.target.value)}
          />
          <textarea
            placeholder="Task Remarks"
            className="border p-2 w-full"
            rows={4}
            value={taskRemarks}
            onChange={e => setTaskRemarks(e.target.value)}
          ></textarea>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TaskLogging;

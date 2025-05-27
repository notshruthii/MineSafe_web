import React, { useState } from 'react';

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const sampleWorkers = [
  { id: 1, name: 'Amit Singh', role: 'Driller' },
  { id: 2, name: 'Ravi Kumar', role: 'Supervisor' },
  { id: 3, name: 'Sanjay Verma', role: 'Loader' },
  { id: 4, name: 'Deepak Rawat', role: 'Blaster' },
];

const generateShiftReport = (name) => ({
  hoursWorked: getRandom(6, 12),
  tasksCompleted: getRandom(2, 8),
  incidents: getRandom(0, 2),
  notes: `Performance of ${name} was ${["excellent", "satisfactory", "needs improvement"][getRandom(0, 2)]}.`,
});

export default function ManagerDashboard() {
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [shiftReport, setShiftReport] = useState(null);

  const handleViewReport = (worker) => {
    setSelectedWorker(worker);
    setShiftReport(generateShiftReport(worker.name));
  };

  return (
    <div className="min-h-screen p-8 font-sans text-white bg-black" style={{}}>
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome back, Manager</h1>
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-sm font-medium">Palak jain</p>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Total Workers" value={getRandom(100, 150)} />
        <Card title="Shifts Today" value={getRandom(10, 20)} />
        <Card title="Active Tasks" value={getRandom(20, 40)} />
      </section>

      {/* Progress and Tracker */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-2xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Daily Shift Progress</h2>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-2xl font-bold">{getRandom(6, 8)}h</p>
              <p className="text-xs text-gray-400">Avg. Shift Duration</p>
            </div>
            <div className="w-24 h-24 rounded-full border-8 border-green-400 flex items-center justify-center text-xl font-bold">
              {getRandom(60, 90)}%
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow col-span-2">
          <h2 className="text-lg font-semibold mb-4">Shift Schedule</h2>
          <div className="grid grid-cols-5 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
              <div key={index} className="bg-gray-700 rounded-xl p-4 text-center">
                <p className="font-semibold">{day}</p>
                <p className="mt-2 text-green-400">{getRandom(6, 10)} Workers</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding Task */}
      <section className="bg-gray-800 rounded-2xl p-6 shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Onboarding Progress</h2>
        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl font-bold">4/6 Tasks Completed</p>
          <p className="text-sm text-green-400">66%</p>
        </div>
        <ul className="space-y-2">
          {[
            'ID Verification',
            'Safety Training',
            'Tool Orientation',
            'Team Introduction',
            'Coal Site Tour',
            'Emergency Protocols',
          ].map((task, index) => (
            <li
              key={index}
              className={`flex justify-between p-3 rounded-xl ${
                index < 4 ? 'bg-green-700' : 'bg-gray-700'
              }`}
            >
              <span>{task}</span>
              {index < 4 ? (
                <span className="text-green-300 font-bold">✔</span>
              ) : (
                <span className="text-gray-400">○</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Worker Reports */}
      <section className="bg-gray-800 rounded-2xl p-6 shadow mb-10">
        <h2 className="text-lg font-semibold mb-4">Individual Worker Reports</h2>
        <ul className="divide-y divide-gray-700">
          {sampleWorkers.map((worker) => (
            <li key={worker.id} className="flex justify-between items-center py-3">
              <div>
                <p className="font-semibold">{worker.name}</p>
                <p className="text-sm text-gray-400">{worker.role}</p>
              </div>
              <button
                onClick={() => handleViewReport(worker)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                View End Shift Report
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Shift Report Section */}
      {selectedWorker && shiftReport && (
        <section className="bg-gray-800 rounded-2xl p-6 shadow-lg mb-10">
          <h3 className="text-xl font-bold mb-2">End Shift Report</h3>
          <p className="mb-1"><strong>Worker:</strong> {selectedWorker.name}</p>
          <p className="mb-1"><strong>Role:</strong> {selectedWorker.role}</p>
          <p className="mb-1"><strong>Hours Worked:</strong> {shiftReport.hoursWorked}</p>
          <p className="mb-1"><strong>Tasks Completed:</strong> {shiftReport.tasksCompleted}</p>
          <p className="mb-1"><strong>Incidents:</strong> {shiftReport.incidents}</p>
          <p className="mb-3"><strong>Notes:</strong> {shiftReport.notes}</p>
          <button
            className="mt-2 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            onClick={() => setSelectedWorker(null)}
          >
            Close Report
          </button>
        </section>
      )}
    </div>
  );
}

// Reusable card component
const Card = ({ title, value }) => (
  <div className="bg-gray-800 text-white rounded-2xl p-6 shadow text-center">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);



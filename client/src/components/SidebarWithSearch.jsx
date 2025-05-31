// src/components/SidebarWithSearch.js

import React, { useState } from "react";

const SidebarWithSearch = ({ workers, onSelectWorker, onNavigate, selectedWorkerId }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkers = workers.filter((worker) =>
    worker.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 bg-white shadow-md p-4 h-screen overflow-y-auto sticky top-0">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      
      <nav className="mb-6">
        <button
          className="block w-full text-left text-blue-600 hover:underline mb-2"
          onClick={() => onNavigate("abnormalities")}
        >
          View Abnormalities
        </button>
        <button
          className="block w-full text-left text-blue-600 hover:underline"
          onClick={() => onNavigate("workers")}
        >
          View Workers
        </button>
      </nav>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Worker ID"
          className="w-full p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Workers</h3>
        {filteredWorkers.length === 0 ? (
          <p className="text-sm text-gray-500">No workers found.</p>
        ) : (
          <ul className="space-y-2">
            {filteredWorkers.map((worker) => (
              <li key={worker.id}>
                <button
                  className={`block text-left w-full px-2 py-1 rounded ${
                    selectedWorkerId === worker.id ? "bg-blue-100 font-medium" : "hover:bg-gray-100"
                  }`}
                  onClick={() => onSelectWorker(worker)}
                >
                  {worker.id}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SidebarWithSearch;

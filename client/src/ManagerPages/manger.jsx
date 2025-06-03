import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import SidebarWithSearch from "../components/SidebarWithSearch";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";


const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("abnormalities");

  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [formReports, setFormReports] = useState({
    startShift: null,
    safetyTools: null,
    taskLogging: null,
    endShift: null,
  });
  const [reportLoading, setReportLoading] = useState(false);
  const [abnormalities, setAbnormalities] = useState([]);
  const [selectedAbnormalityTab, setSelectedAbnormalityTab] = useState(null);

 
  useEffect(() => {
    if (abnormalities.length > 0) {
      setSelectedAbnormalityTab(abnormalities[0].id);
    }
  }, [abnormalities]);

  useEffect(() => {
    const fetchWorkersAndAbnormalities = async () => {
      try {
        const managerData = JSON.parse(localStorage.getItem("managerData"));
        const managerId = managerData?.managerId;

        if (!managerId) {
          alert("No manager data found. Please log in again.");
          setLoading(false);
          return;
        }

        // Fetch assigned workers
        const workersRef = collection(db, "workers");
        const q = query(workersRef, where("mgrID", "==", managerId));
        const querySnapshot = await getDocs(q);
        const workersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkers(workersList);

        // Fetch abnormalities for all workers
        const allAbnormalities = [];
        for (const worker of workersList) {
  const abRef = collection(db, "workers", worker.id, "reports"); // ✅ renamed
  const abSnap = await getDocs(query(abRef, orderBy("timestamp", "desc"))); // optional: add filter
  abSnap.forEach((doc) => {
    allAbnormalities.push({
      id: doc.id,
      workerName: worker.fullName || "Unnamed",
      workerId: worker.id,
      ...doc.data(),
    });
  });
}

        // Sort by timestamp
        allAbnormalities.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);
        setAbnormalities(allAbnormalities);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkersAndAbnormalities();
  }, []);

  const fetchAllFormReports = async (worker) => {
    setReportLoading(true);
    setSelectedWorker(worker);

    try {
      const fetchLatestDoc = async (subcollectionName) => {
        const ref = collection(db, "workers", worker.id, subcollectionName);
        const q = query(ref, orderBy("timestamp", "desc"), limit(1));
        const snapshot = await getDocs(q);
        return snapshot.empty ? null : snapshot.docs[0].data();
      };

      const [startShift, safetyTools, taskLogging, endShift] = await Promise.all([
        fetchLatestDoc("startShifts"),
        fetchLatestDoc("safetyTools"),
        fetchLatestDoc("taskLogging"),
        fetchLatestDoc("endShifts"),
      ]);

      setFormReports({ startShift, safetyTools, taskLogging, endShift });
    } catch (error) {
      console.error("Error fetching form reports:", error);
    }

    setReportLoading(false);
  };

  if (loading) return <div className="p-8">Loading...</div>;
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarWithSearch
        workers={workers}
        onSelectWorker={fetchAllFormReports}
        selectedWorkerId={selectedWorker?.id}
        onNavigate={setActiveTab}
      />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>

        {/* Abnormalities */}
        {activeTab === "abnormalities" && abnormalities.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Recent Abnormalities</h2>
            <div className="flex flex-col space-y-4">
              {abnormalities.map((ab) => {
                const isSelected = selectedAbnormalityTab === ab.id;
                return (
                  <div
                    key={ab.id}
                    className="bg-red-100 border border-red-400 p-4 rounded-lg shadow cursor-pointer"
                    onMouseEnter={() => setSelectedAbnormalityTab(ab.id)}
                    onMouseLeave={() => setSelectedAbnormalityTab(null)}
                  >
                    <p className="text-red-700 font-medium truncate">{ab.description || "No description"}</p>

                    <div
                      className={`overflow-hidden transition-all duration-1000 ease-in-out ${
                        isSelected ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
                      }`}
                      style={{ transitionProperty: "max-height, opacity, margin-top" }}
                    >
                      <div className="bg-white border border-red-400 rounded-lg p-4 text-gray-800">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-semibold text-red-700">{ab.description}</p>
                          <button className="text-sm bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                            Send Alert
                          </button>
                        </div>
                        <p><strong>Worker:</strong> {ab.workerName} (ID: {ab.workerId})</p>
                        <p><strong>Timestamp:</strong>{" "}
                          {ab.timestamp?.seconds
                            ? new Date(ab.timestamp.seconds * 1000).toLocaleString()
                            : "N/A"}
                        </p>
                        <div className="mt-2 text-sm">
                          {Object.entries(ab)
                            .filter(
                              ([k]) =>
                                !["id", "workerName", "workerId", "timestamp", "description"].includes(k)
                            )
                            .map(([key, val]) => (
                              <p key={key}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                                {typeof val === "boolean" ? (val ? "Yes" : "No") : val}
                              </p>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Worker Cards */}
        {activeTab === "workers" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Your Workers</h2>
            {workers.length === 0 ? (
              <p>No workers assigned to you.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {workers.map((worker) => (
                  <div key={worker.id} className="bg-white p-4 rounded shadow">
                    <h3 className="text-xl font-semibold">{worker.fullName || "Unnamed"}</h3>
                    <p>ID: {worker.id}</p>
                    <p>Manager ID: {worker.mgrID}</p>
                    <button
                      className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() => fetchAllFormReports(worker)}
                    >
                      View Reports
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Reports Modal */}
        {selectedWorker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-3xl w-full mx-4 overflow-y-auto max-h-[90vh]">
              <button
                className="absolute top-3 right-3 text-white bg-red-500 hover:bg-red-600 rounded-full px-3 py-1 text-sm"
                onClick={() => setSelectedWorker(null)}
              >
                ✕ Close
              </button>

              <h2 className="text-2xl font-bold mb-4">
                Reports for {selectedWorker.fullName}
              </h2>

              {reportLoading ? (
                <p>Loading reports...</p>
              ) : (
                <>
                  {formReports.startShift && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">Start Shift</h3>
                      <ul className="list-disc ml-6">
                        <li><strong>Date:</strong> {formReports.startShift.date}</li>
                        <li><strong>Fit for Duty:</strong> {formReports.startShift.fitForDuty ? "Yes" : "No"}</li>
                        <li><strong>Pulse:</strong> {formReports.startShift.pulse}</li>
                        <li><strong>Temperature:</strong> {formReports.startShift.temperature} °C</li>
                        <li><strong>Start Time:</strong> {formReports.startShift.startTime}</li>
                        <li><strong>PPE:</strong>
                          <ul className="ml-4 list-disc">
                            {formReports.startShift.ppe &&
                              Object.entries(formReports.startShift.ppe).map(([item, value]) => (
                                <li key={item}>
                                  {item.charAt(0).toUpperCase() + item.slice(1)}: {value ? "Yes" : "No"}
                                </li>
                              ))}
                          </ul>
                        </li>
                      </ul>
                    </div>
                  )}

                  {formReports.safetyTools && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">Safety Tools</h3>
                      <ul className="list-disc ml-6">
                        {Object.entries(formReports.safetyTools).map(([tool, value]) => (
                          <li key={tool}>
                            {tool.charAt(0).toUpperCase() + tool.slice(1)}: {value ? "Yes" : "No"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {formReports.taskLogging && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">Task Logging</h3>
                      <ul className="list-disc ml-6">
                        <li><strong>Task:</strong> {formReports.taskLogging.task}</li>
                        <li><strong>Location:</strong> {formReports.taskLogging.location}</li>
                        <li><strong>Time:</strong> {formReports.taskLogging.time}</li>
                        <li><strong>Hazards:</strong> {formReports.taskLogging.hazards}</li>
                      </ul>
                    </div>
                  )}

                  {formReports.endShift && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">End Shift</h3>
                      <ul className="list-disc ml-6">
                        <li><strong>End Time:</strong> {formReports.endShift.endTime}</li>
                        <li><strong>Tools Returned:</strong> {formReports.endShift.toolsReturned ? "Yes" : "No"}</li>
                        <li><strong>Comments:</strong> {formReports.endShift.comments || "None"}</li>
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

const ManagerDashboard = () => {
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

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const managerData = JSON.parse(localStorage.getItem("managerData"));
        const managerId = managerData?.managerId;

        if (!managerId) {
          alert("No manager data found. Please log in again.");
          setLoading(false);
          return;
        }

        const workersRef = collection(db, "workers");
        const q = query(workersRef, where("mgrID", "==", managerId));
        const querySnapshot = await getDocs(q);

        const workersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setWorkers(workersList);
      } catch (error) {
        console.error("Error fetching workers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
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

  if (loading) return <div className="p-8 text-white">Loading workers...</div>;

  return (
    <div className="background p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Manager Dashboard</h1>

      {workers.length === 0 ? (
        <p className="text-white">No workers assigned to you.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow text-white"
            >
              <h2 className="text-xl font-semibold">{worker.name || "Unnamed"}</h2>
              <p>ID: {worker.id}</p>
              <p>Name: {worker.fullName || "Not specified"}</p>
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

      {selectedWorker && (
        <div className="mt-8 bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-3xl mx-auto text-white">
          <h2 className="text-2xl font-bold mb-4">
            Reports for {selectedWorker.name}
          </h2>

          {reportLoading ? (
            <p>Loading reports...</p>
          ) : (
            <>
              {/* Start Shift Report */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Start Shift</h3>
                {formReports.startShift ? (
                  <ul className="list-disc list-inside space-y-1">
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
                              {item.charAt(0).toUpperCase() + item.slice(1)}:{" "}
                              <span className={value ? "text-green-400" : "text-red-400"}>
                                {value ? "Yes" : "No"}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </li>
                  </ul>
                ) : (
                  <p>No start shift data available.</p>
                )}
              </div>

              {/* Safety Tools Report */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Safety Tools</h3>
                {formReports.safetyTools ? (
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>User ID:</strong> {formReports.safetyTools.userId}</li>
                    <li><strong>Timestamp:</strong> {formReports.safetyTools.timestamp?.seconds ? new Date(formReports.safetyTools.timestamp.seconds * 1000).toLocaleString() : "N/A"}</li>
                    <li><strong>PPE:</strong>
                      <ul className="ml-4 list-disc">
                        {Object.entries(formReports.safetyTools)
                          .filter(([key]) => ["gloves", "helmet", "boots", "vest", "glasses"].includes(key))
                          .map(([key, value]) => (
                            <li key={key}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                              <span className={value ? "text-green-400" : "text-red-400"}>
                                {value ? "Yes" : "No"}
                              </span>
                            </li>
                          ))}
                      </ul>
                    </li>
                  </ul>
                ) : (
                  <p>No safety tools data available.</p>
                )}
              </div>

              {/* Task Logs Report */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Task Logging</h3>
                {formReports.taskLogging ? (
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Tasks Assigned:</strong>
                      <ul className="ml-4 list-disc">
                        {formReports.taskLogging.tasksAssigned?.map((task, i) => (
                          <li key={i}>{task}</li>
                        ))}
                      </ul>
                    </li>
                    <li><strong>Tools Issued:</strong> {formReports.taskLogging.toolsIssued}</li>
                    <li><strong>Task Remarks:</strong> {formReports.taskLogging.taskRemarks}</li>
                    <li><strong>Timestamp:</strong> {formReports.taskLogging.timestamp?.seconds ? new Date(formReports.taskLogging.timestamp.seconds * 1000).toLocaleString() : "N/A"}</li>
                  </ul>
                ) : (
                  <p>No task logs data available.</p>
                )}
              </div>

              {/* End Shift Report */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">End Shift</h3>
                {formReports.endShift ? (
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>End Time:</strong> {formReports.endShift.endTime}</li>
                    <li><strong>Tools Returned:</strong> {formReports.endShift.toolsReturned}</li>
                    <li><strong>Remarks:</strong> {formReports.endShift.remarks || "None"}</li>
                    <li><strong>Tasks Completed:</strong>
                      <ul className="ml-4 list-disc">
                        {formReports.endShift.tasksCompleted?.map((task, i) => (
                          <li key={i}>{task}</li>
                        ))}
                      </ul>
                    </li>
                    <li><strong>Timestamp:</strong> {formReports.endShift.timestamp?.seconds ? new Date(formReports.endShift.timestamp.seconds * 1000).toLocaleString() : "N/A"}</li>
                  </ul>
                ) : (
                  <p>No end shift data available.</p>
                )}
              </div>

              <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => {
                  setSelectedWorker(null);
                  setFormReports({
                    startShift: null,
                    safetyTools: null,
                    taskLogging: null,
                    endShift: null,
                  });
                }}
              >
                Close Reports
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;

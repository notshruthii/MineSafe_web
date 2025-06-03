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
  const [submittedToday, setSubmittedToday] = useState(0);
  const [missingSubmissions, setMissingSubmissions] = useState(0);
  const [activeTab, setActiveTab] = useState("abnormalities");

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

        const workersRef = collection(db, "workers");
        const q = query(workersRef, where("mgrID", "==", managerId));
        const querySnapshot = await getDocs(q);
        const workersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkers(workersList);

        const allAbnormalities = [];
        for (const worker of workersList) {
          const abRef = collection(db, "workers", worker.id, "reports");
          const abSnap = await getDocs(query(abRef, orderBy("timestamp", "desc")));
          abSnap.forEach((doc) => {
            allAbnormalities.push({
              id: doc.id,
              workerName: worker.fullName || "Unnamed",
              workerId: worker.id,
              ...doc.data(),
            });
          });
        }

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

  const fetchReportsForAllWorkers = async () => {
    const today = new Date().toLocaleDateString();
    let submitted = 0;

    for (const worker of workers) {
      const ref = collection(db, "workers", worker.id, "startShifts");
      const snapshot = await getDocs(query(ref, orderBy("timestamp", "desc"), limit(1)));
      if (!snapshot.empty) {
        const doc = snapshot.docs[0].data();
        const reportDate = new Date(doc.date).toLocaleDateString();
        if (reportDate === today) submitted++;
      }
    }

    setSubmittedToday(submitted);
    setMissingSubmissions(workers.length - submitted);
  };

  useEffect(() => {
    if (workers.length > 0) {
      fetchReportsForAllWorkers();
    }
  }, [workers]);

  if (loading) return <div className="p-8 text-white">Loading...</div>;

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
        <h1 className="text-lg font-bold text-black overflow-hidden">Manager Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">Total Workers</h3>
            <p className="text-2xl font-bold text-blue-600">{workers.length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">Submitted Today</h3>
            <p className="text-2xl font-bold text-green-600">{submittedToday}</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-700">Missing Submissions</h3>
            <p className="text-2xl font-bold text-red-600">{missingSubmissions}</p>
          </div>
        </div>

        {/* Worker Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workers.map((worker) => (
            <div key={worker.id} className="bg-white p-4 rounded-xl shadow text-gray-800">
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

        {/* Reports Section */}
        {selectedWorker && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow-lg max-w-4xl mx-auto text-gray-800">
            <h2 className="text-2xl font-bold mb-4">
              Reports for {selectedWorker.name}
            </h2>

            {reportLoading ? (
              <p>Loading reports...</p>
            ) : (
              <>
                {/* Start Shift */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Start Shift</h3>
                  {formReports.startShift ? (
                    <ul className="list-disc list-inside">
                      <li>Date: {formReports.startShift.date}</li>
                      <li>Fit for Duty: {formReports.startShift.fitForDuty ? "Yes" : "No"}</li>
                      <li>Pulse: {formReports.startShift.pulse}</li>
                      <li>Temperature: {formReports.startShift.temperature} °C</li>
                      <li>Start Time: {formReports.startShift.startTime}</li>
                      <li>PPE:
                        <ul className="ml-4 list-disc">
                          {Object.entries(formReports.startShift.ppe || {}).map(([item, value]) => (
                            <li key={item}>
                              {item}: {value ? "✔" : "❌"}
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  ) : (
                    <p>No start shift data available.</p>
                  )}
                </div>

                {/* Safety Tools */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Safety Tools</h3>
                  {formReports.safetyTools ? (
                    <ul className="list-disc list-inside">
                      <li>User ID: {formReports.safetyTools.userId}</li>
                      <li>Timestamp: {formReports.safetyTools.timestamp?.seconds ? new Date(formReports.safetyTools.timestamp.seconds * 1000).toLocaleString() : "N/A"}</li>
                      <li>PPE:
                        <ul className="ml-4 list-disc">
                          {["gloves", "helmet", "boots", "vest", "glasses"].map((key) => (
                            <li key={key}>
                              {key}: {formReports.safetyTools[key] ? "✔" : "❌"}
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  ) : (
                    <p>No safety tools data available.</p>
                  )}
                </div>

                {/* Task Logging */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Task Logging</h3>
                  {formReports.taskLogging ? (
                    <ul className="list-disc list-inside">
                      <li>Tools Issued: {formReports.taskLogging.toolsIssued}</li>
                      <li>Task Remarks: {formReports.taskLogging.taskRemarks}</li>
                      <li>Tasks Assigned:
                        <ul className="ml-4 list-disc">
                          {formReports.taskLogging.tasksAssigned?.map((task, i) => (
                            <li key={i}>{task}</li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  ) : (
                    <p>No task logs data available.</p>
                  )}
                </div>

                {/* End Shift */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">End Shift</h3>
                  {formReports.endShift ? (
                    <ul className="list-disc list-inside">
                      <li>End Time: {formReports.endShift.endTime}</li>
                      <li>Tools Returned: {formReports.endShift.toolsReturned}</li>
                      <li>Remarks: {formReports.endShift.remarks}</li>
                      <li>Tasks Completed:
                        <ul className="ml-4 list-disc">
                          {formReports.endShift.tasksCompleted?.map((task, i) => (
                            <li key={i}>{task}</li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  ) : (
                    <p>No end shift data available.</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;


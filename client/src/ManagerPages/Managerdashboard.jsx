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
  const [allReports, setAllReports] = useState({});
  const [submittedToday, setSubmittedToday] = useState(0);
  const [missingSubmissions, setMissingSubmissions] = useState(0);
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
    const reportsMap = {};
    const today = new Date().toLocaleDateString();
    let submitted = 0;

    for (const worker of workers) {
      const reports = await getReports(worker);
      reportsMap[worker.id] = reports;

      if (
        reports?.startShift?.date &&
        new Date(reports.startShift.date).toLocaleDateString() === today
      ) {
        submitted += 1;
      }
    }

    setAllReports(reportsMap);
    setSubmittedToday(submitted);
    setMissingSubmissions(workers.length - submitted);
  };

  useEffect(() => {
    if (workers.length > 0) {
      fetchReportsForAllWorkers();
    }
  }, [workers]);

  if (loading) return <div className="p-8 text-black">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      <SidebarWithSearch
        workers={workers}
        onSelectWorker={fetchAllFormReports}
        selectedWorkerId={selectedWorker?.id}
        onNavigate={setActiveTab}
      />

      <div className="flex-1 p-6 text-black">
        <h1 className="text-3xl font-bold mb-6 text-black">Manager Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card title="Total Workers" value={workers.length} />
          <Card title="Submitted Today" value={submittedToday} />
          <Card title="Missing Submission" value={missingSubmissions} />
          <Card title="Abnormalities" value={abnormalities.length} />
        </div>

        {activeTab === "abnormalities" && abnormalities.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-black">Recent Abnormalities</h2>
            <div className="flex flex-col space-y-4">
              {abnormalities.map((ab) => {
                const isSelected = selectedAbnormalityTab === ab.id;
                return (
                  <div
                    key={ab.id}
                    className="bg-red-100 border border-red-400 p-4 rounded-lg shadow cursor-pointer text-black"
                    onMouseEnter={() => setSelectedAbnormalityTab(ab.id)}
                    onMouseLeave={() => setSelectedAbnormalityTab(null)}
                  >
                    <p className="font-medium truncate">{ab.description || "No description"}</p>
                    <div className={`transition-all duration-1000 ease-in-out ${isSelected ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}`}>
                      <div className="bg-white border border-red-400 rounded-lg p-4 text-black">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-semibold">{ab.description}</p>
                          <button className="text-sm bg-red-300 text-black px-2 py-1 rounded hover:bg-red-400">
                            Send Alert
                          </button>
                        </div>
                        <p><strong>Worker:</strong> {ab.workerName} (ID: {ab.workerId})</p>
                        <p><strong>Timestamp:</strong> {ab.timestamp?.seconds ? new Date(ab.timestamp.seconds * 1000).toLocaleString() : "N/A"}</p>
                        <div className="mt-2 text-sm">
                          {Object.entries(ab)
                            .filter(([k]) => !["id", "workerName", "workerId", "timestamp", "description"].includes(k))
                            .map(([key, val]) => (
                              <p key={key}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {typeof val === "boolean" ? (val ? "Yes" : "No") : val}
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

        {activeTab === "workers" && (
          <>
            <h2 className="text-2xl font-semibold mb-4 text-black">Your Workers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {workers.map((worker) => (
                <div key={worker.id} className="bg-white p-4 rounded shadow text-black">
                  <h3 className="text-xl font-semibold text-black">{worker.fullName || "Unnamed"}</h3>
                  <p>ID: {worker.id}</p>
                  <p>Manager ID: {worker.mgrID}</p>
                  <button
                    className="mt-3 px-4 py-2 bg-blue-300 text-black rounded hover:bg-blue-400"
                    onClick={() => fetchAllFormReports(worker)}
                  >
                    View Reports
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {selectedWorker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-3xl w-full mx-4 overflow-y-auto max-h-[90vh] text-black">
              <button
                className="absolute top-3 right-3 text-black bg-red-300 hover:bg-red-400 rounded-full px-3 py-1 text-sm"
                onClick={() => setSelectedWorker(null)}
              >
                ✕ Close
              </button>

              <h2 className="text-2xl font-bold mb-4 text-black">
                Reports for {selectedWorker.fullName}
              </h2>

              {reportLoading ? (
                <p>Loading reports...</p>
              ) : (
                <>
                  {formReports.startShift && (
                    <ReportSection title="Start Shift" entries={formReports.startShift} />
                  )}
                  {formReports.safetyTools && (
                    <ReportSection title="Safety Tools" entries={formReports.safetyTools} />
                  )}
                  {formReports.taskLogging && (
                    <ReportSection title="Task Logging" entries={formReports.taskLogging} />
                  )}
                  {formReports.endShift && (
                    <ReportSection title="End Shift" entries={formReports.endShift} />
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


const Card = ({ title, value }) => {
  let valueColor = "text-black";

  if (typeof value === "number") {
    if (title === "Submitted Today" || title === "Total Workers") {
      valueColor = "text-green-600";
    } else if (title === "Missing Submission" || title === "Abnormalities") {
      valueColor = value > 0 ? "text-red-600" : "text-green-600";
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow-md text-center hover:shadow-lg hover:scale-105 transform transition duration-300 ease-in-out cursor-pointer border text-black">
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
};

const ReportSection = ({ title, entries }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
    <ul className="list-disc ml-6 text-black">
      {Object.entries(entries).map(([key, value]) =>
        typeof value === "object" ? (
          <li key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
            <ul className="ml-4 list-disc">
              {Object.entries(value).map(([k, v]) => (
                <li key={k}>
                  {k.charAt(0).toUpperCase() + k.slice(1)}: {v ? "Yes" : "No"}
                </li>
              ))}
            </ul>
          </li>
        ) : (
          <li key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
            {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
          </li>
        )
      )}
    </ul>
  </div>
);

const getReports = async (worker) => {
  const fetchLatest = async (subcollection) => {
    const ref = collection(db, "workers", worker.id, subcollection);
    const q = query(ref, orderBy("timestamp", "desc"), limit(1));
    const snap = await getDocs(q);
    return snap.empty ? null : snap.docs[0].data();
  };

  return {
    startShift: await fetchLatest("startShifts"),
    safetyTools: await fetchLatest("safetyTools"),
    taskLogging: await fetchLatest("taskLogging"),
    endShift: await fetchLatest("endShifts"),
  };
};

export default ManagerDashboard;

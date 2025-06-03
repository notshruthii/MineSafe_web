import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function WorkerProfile() {
  const [workerData, setWorkerData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy data for performance and compliance (replace with real Firestore queries)
  const [performanceMetrics, setPerformanceMetrics] = useState({
    tasksCompleted: 42,
    rating: 4.5,
    projectsHandled: 7,
  });

  const [complianceTasks, setComplianceTasks] = useState([
    { id: 1, title: "Safety Training", completed: true },
    { id: 2, title: "Equipment Check", completed: false },
    { id: 3, title: "Health Screening", completed: true },
  ]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const workersRef = collection(db, "workers");
          const q = query(workersRef, where("email", "==", user.email));
          const snapshot = await getDocs(q);

          if (!snapshot.empty) {
            setWorkerData(snapshot.docs[0].data());
          } else {
            console.log("Worker not found.");
            setWorkerData(null);
          }
        } catch (error) {
          console.error("Error fetching worker data:", error);
          setWorkerData(null);
        }
      } else {
        setWorkerData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (!workerData) return <div className="text-white p-6">No data found.</div>;

  // Calculate compliance progress %
  const completedCount = complianceTasks.filter((task) => task.completed).length;
  const totalTasks = complianceTasks.length;
  const compliancePercent = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  return (
    <div className="bg-[#01081b] text-white min-h-screen flex flex-col md:flex-row p-6">
      {/* Left Column */}
      <div className="md:w-1/3 border-r border-gray-700 pr-6">
        <div className="mb-4 text-center">
          <img
            src="https://www.shutterstock.com/image-photo/mine-worker-554630599"
            alt="Worker"
            className="w-32 h-32 object-cover mx-auto rounded-md"
          />
          <a href="#" className="text-blue-400 underline block mt-2">
            Change Photo
          </a>
        </div>

        <h2 className="text-xl font-semibold mb-2">Employee Details</h2>
        <hr className="border-gray-600 mb-3" />
        <div className="space-y-2 text-sm">
          <p>
            <strong>Employee ID:</strong> {workerData.empID}
          </p>
          <p>
            <strong>Name:</strong> {workerData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {workerData.email}
          </p>
          <p>
            <strong>Phone:</strong> {workerData.contact || "N/A"}
          </p>
          <p>
            <strong>Manager Name:</strong> {workerData.mgrName || "N/A"}
          </p>
          <p>
            <strong>Position:</strong> {workerData.position || "Unknown"}
          </p>
          <p>
            <strong>Location:</strong> {workerData.location || "Unknown"}
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="md:w-2/3 pl-6">
        <h2 className="text-2xl font-semibold mb-4">
          Work Readiness & Safety Compliance
        </h2>

        <div className="mb-6">
          <p>
            <strong>Start Date:</strong> N/A
          </p>
          <p className="flex items-center mt-2">
            <strong>Status:</strong>
            <span className="ml-2 px-2 py-1 bg-yellow-600 text-white rounded">
              {compliancePercent === 100 ? "Compliant" : "In Progress"}
            </span>
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 h-4 mt-3 rounded">
            <div
              className="h-full bg-green-500 rounded transition-all duration-500"
              style={{ width: `${compliancePercent}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">{Math.round(compliancePercent)}% Complete</p>
        </div>

        {/* Compliance Tasks */}
        <h3 className="text-xl font-semibold mt-6 mb-2">Compliance Tasks</h3>
        <hr className="border-gray-600 mb-4" />
        {complianceTasks.length === 0 ? (
          <p>No compliance tasks available.</p>
        ) : (
          <ul className="list-disc list-inside text-sm space-y-2">
            {complianceTasks.map((task) => (
              <li
                key={task.id}
                className={task.completed ? "text-green-400" : "text-red-400"}
              >
                {task.title} {task.completed ? "(Completed)" : "(Pending)"}
              </li>
            ))}
          </ul>
        )}

        {/* Performance Metrics */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Performance Metrics</h3>
          <hr className="border-gray-600 mb-3" />
          <div className="space-y-2 text-sm">
            <p>
              <strong>Tasks Completed:</strong> {performanceMetrics.tasksCompleted}
            </p>
            <p>
              <strong>Rating:</strong> {performanceMetrics.rating} / 5
            </p>
            <p>
              <strong>Projects Handled:</strong> {performanceMetrics.projectsHandled}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

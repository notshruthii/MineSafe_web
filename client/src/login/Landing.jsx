import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import miners from "./login_img.jpeg"; 

export default function LoginPage({ embedded = false }) {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("worker");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = `${identifier}@minesafe.com`;
    try {
      // Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);

      // Determine collection and localStorage key
      const collection = userType === "manager" ? "managers" : "workers";
      const storageKey = userType === "manager" ? "managerData" : "workerData";
      const dashboardRoute = userType === "manager" ? "/manager-dashboard" : "/worker-dashboard";

      // Fetch profile
      const docRef = doc(db, collection, identifier);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const profileData = docSnap.data();
        // Attach id field
        if (userType === "manager") profileData.managerId = identifier;
        else profileData.employeeId = identifier;

        // Save session
        localStorage.setItem(storageKey, JSON.stringify(profileData));
        setError("");
        navigate(dashboardRoute);
      } else {
        setError(`No profile found for this ${userType === "manager" ? "Manager" : "Employee"} ID.`);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(`Invalid ${userType === "manager" ? "Manager" : "Employee"} ID or Password`);
    }
  };

  const idLabel = userType === "manager" ? "Manager ID" : "Employee ID";

  return embedded ? (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder={idLabel}
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        required
      />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="button" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide" : "Show"}
      </button>
      {error && <div className="error">{error}</div>}
      <button type="submit">Login</button>
    </form>
  ) : (
    <div className="min-h-screen bg-[#0b0f2a] flex items-center justify-center px-6">
      <div className="flex rounded-xl overflow-hidden w-full max-w-5xl text-white border-2" style={{ backgroundColor: "#0b0f2a", marginTop: "2px" }}>
        {/* Left Side with Image */}
        <div className="w-1/2 bg-blue-100 flex items-center justify-center">
          <img src={miners} alt="Miner" className="w-full h-full object-cover" />
        </div>

        {/* Right login form */}
        <div className="w-1/2 p-10 flex flex-col justify-center text-base">
          {/* Toggle buttons */}
          <div className="flex justify-center mb-6 space-x-6 text-base">
            <button
              type="button"
              onClick={() => setUserType("worker")}
              className={`px-6 py-2 rounded-full transition font-semibold ${
                userType === "worker"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              As Worker
            </button>
            <button
              type="button"
              onClick={() => setUserType("manager")}
              className={`px-6 py-2 rounded-full transition font-semibold ${
                userType === "manager"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              As Manager
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center">
            Log in as {userType === "worker" ? "Worker" : "Manager"}
          </h2>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder={idLabel}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="p-3 mb-4 rounded bg-white text-black w-full outline-none text-sm placeholder-gray-600"
              required
            />
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 mb-4 rounded bg-white text-black w-full outline-none text-sm placeholder-gray-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-sm text-gray-600 hover:text-gray-800"
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && <div className="text-red-500 mb-4 font-semibold text-center">{error}</div>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition"
            >
              Login
            </button>
          </form>

          <div className="flex justify-between mt-4 text-sm">
            <span className="cursor-pointer hover:underline text-gray-300">Forgot password?</span>
            <span className="cursor-pointer hover:underline text-blue-300">Contact Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}

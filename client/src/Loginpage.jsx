import React, { useState } from "react";

export default function LoginPage() {
  const [userType, setUserType] = useState("worker");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-[#0b0f2a] flex items-center justify-center px-6">
      <div
        className="flex rounded-xl overflow-hidden w-full max-w-6xl text-white border-2"
        style={{ backgroundColor: "#0b0f2a", marginTop: "2px" }}
      >
        {/* Left Side with Image */}
        <div className="w-1/2 bg-blue-100 flex items-center justify-center">
          <img
            src="/login.png"
            alt="Miner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right login form */}
        <div className="w-1/2 p-10 flex flex-col justify-center text-base">
          {/* Toggle buttons */}
          <div className="flex justify-center mb-6 space-x-6 text-base">
            <button
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

          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mb-4 rounded bg-white text-black w-full outline-none text-sm placeholder-gray-600"
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 mb-4 rounded bg-white text-black w-full outline-none text-sm placeholder-gray-600"
          />
          <button className="p-3 rounded bg-blue-600 hover:bg-blue-700 text-white w-full text-sm font-semibold">
            Login
          </button>

          <div className="flex justify-between mt-4 text-sm">
            <span className="cursor-pointer hover:underline text-gray-300">
              Forgot password?
            </span>
            <span className="cursor-pointer hover:underline text-blue-300">
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

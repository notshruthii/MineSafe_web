import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./WorkerPages/Header.jsx";
import Navbar1 from "./components/Navbar1";
import LandingPage from "./login/Landingpage1.jsx";
import WorkerDash from './WorkerPages/Workersdashboard.jsx';
import SafetyGuidelines from "./LandingPage/Safety_guidelines.jsx";
import Test from "./LandingPage/FirstPage.jsx";
import WorkersLogin from "./WorkerPages/WorkersLogin.jsx";
import ManagersLogin from "./ManagerPages//ManagersLogin.jsx"; // ✅ Corrected path
import ManagerDashboard from "./ManagerPages/Managerdashboard.jsx"; // ✅ Corrected path
import AttendanceApp from "./LandingPage/NavbarComponents/Attendance.jsx";

import "./App.css";

const App = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/coal.png')" }}
    >
      <Navbar1 />
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/dashboard" element={<LandingPage />} />
        <Route path="/safety-guidelines" element={<SafetyGuidelines />} />
        <Route path="/workers-login" element={<WorkersLogin />} />
        <Route path="/manager-login" element={<ManagersLogin />} />
        <Route path="/worker-dashboard" element={<Header />} />
        <Route path="/workers/*" element={<WorkerDash />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/Attendance" element={<AttendanceApp />} />
      </Routes>
    </div>
  );
};

export default App;

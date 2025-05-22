// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD

import Header from "./Header.jsx";
import Navbar1 from "./components/Navbar1";
import LandingPage from "./Landingpage1.jsx";
import WorkerDash from "./WorkersDashboard.jsx";
import SafetyGuidelines from "./Safety_guidelines.jsx";
import Test from "./test";
import WorkersLogin from "./WorkersLogin.jsx";
import ManagersLogin from "./ManagersLogin.jsx";
import ManagerDashboard from "./Managerdashboard.jsx"; // ✅ ADD THIS

=======
import Header from "./WorkerPages/Header.jsx";
import Navbar1 from "./components/Navbar1"; 
import AttendanceApp from "./LandingPage/NavbarComponents/Attendance.jsx";
import LandingPage from "./login/Landingpage1.jsx";
import WorkerDash from './WorkerPages/Workersdashboard.jsx';
import SafetyGuidelines from "./LandingPage/Safety_guidelines.jsx";
import Test from "./LandingPage/FirstPage.jsx";
import WorkersLogin from "./WorkerPages/WorkersLogin.jsx";
>>>>>>> a2f33c7441f7a0cec7513f7454703795570f1aa0
import "./App.css";

const App = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/coal.png')" }}
    >
      <Navbar1 />

<<<<<<< HEAD
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/dashboard" element={<LandingPage />} />
        <Route path="/safety-guidelines" element={<SafetyGuidelines />} />
        <Route path="/workers-login" element={<WorkersLogin />} />
        <Route path="/manager-login" element={<ManagersLogin />} />
        <Route path="/worker-dashboard" element={<Header />} />
        <Route path="/workers/*" element={<WorkerDash />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} /> {/* ✅ ADD THIS */}
      </Routes>
=======
     <Routes>
  <Route path="/" element={<Test />} />
  <Route path="/dashboard" element={<LandingPage />} />
  <Route path="/safety-guidelines" element={<SafetyGuidelines />} />
  <Route path="/workers-login" element={<WorkersLogin />} />
  <Route path="/worker-dashboard" element={<Header />} />
  <Route path="/workers/*" element={<WorkerDash />} />
  <Route path="/Attendance" element={<AttendanceApp />} />
</Routes>

>>>>>>> a2f33c7441f7a0cec7513f7454703795570f1aa0
    </div>
  );
};

export default App;



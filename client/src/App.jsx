import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar1 from "./components/Navbar1";
// Landing Page Components
import LandingPage from "./login/Landingpage1.jsx";
import SafetyGuidelines from "./LandingPage/Safety_guidelines.jsx";
import Test from "./LandingPage/FirstPage.jsx";
import WorkersLogin from "./WorkerPages/WorkersLogin.jsx";
import WorkerDash from "./WorkerPages/Workersdashboard.jsx";
import ManagersLogin from "./ManagerPages/ManagersLogin.jsx";
import ManagerDashboard from "./ManagerPages/Managerdashboard.jsx";
import Manager from './ManagerPages/ManagerHome.jsx';
import AttendanceApp from "./LandingPage/NavbarComponents/Attendance.jsx";
import ReportAbnormality from "./LandingPage/NavbarComponents/ReportAbnormality.jsx";
import News from './LandingPage/NavbarComponents/News.jsx';
import Task from './LandingPage/NavbarComponents/Tasks.jsx';
import Profile from './LandingPage/NavbarComponents/WorkersProfile.jsx';
import Resources from './LandingPage/NavbarComponents/SafetyResources.jsx';

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
        <Route path="/workers/*" element={<WorkerDash />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/attendance" element={<AttendanceApp />} />
        <Route path="/news" element={<News />} />
        <Route path="/task" element={<Task />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<ReportAbnormality />} />
        <Route path="/resource" element={<Resources />} />
        <Route path="/manager" element={<Manager />} />
      </Routes>
    </div>
  );
};

export default App;


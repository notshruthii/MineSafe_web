import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./WorkerPages/Header.jsx";
import Navbar1 from "./components/Navbar1";
import AttendanceApp from "./LandingPage/NavbarComponents/Attendance.jsx";
import ReportAbnormality from "./LandingPage/NavbarComponents/ReportAbnormality.jsx";
import LandingPage from "./login/Landingpage1.jsx";
import WorkerDash from './WorkerPages/Workersdashboard.jsx';
import SafetyGuidelines from "./LandingPage/Safety_guidelines.jsx";
import Test from "./LandingPage/FirstPage.jsx";
import WorkersLogin from "./WorkerPages/WorkersLogin.jsx";
<<<<<<< HEAD
import ManagersLogin from "./ManagerPages//ManagersLogin.jsx"; // ✅ Corrected path
import ManagerDashboard from "./ManagerPages/Managerdashboard.jsx"; // ✅ Corrected path
import AttendanceApp from "./LandingPage/NavbarComponents/Attendance.jsx";
import News from './LandingPage/NavbarComponents/News.jsx'
import Task from './LandingPage/NavbarComponents/Tasks.jsx'
import Profile from './LandingPage/NavbarComponents/WorkersProfile.jsx'
import Report from './LandingPage/NavbarComponents/ReportAbnormality.jsx'
import Resources from './LandingPage/NavbarComponents/SafetyResources.jsx'
import Manager from './ManagerPages/ManagerHome.jsx'

=======
import ManagersLogin from "./ManagerPages/ManagersLogin.jsx";
import ManagerDashboard from "./ManagerPages/Managerdashboard.jsx";
import News from './LandingPage/NavbarComponents/News.jsx';
import Task from './LandingPage/NavbarComponents/Tasks.jsx';
import Profile from './LandingPage/NavbarComponents/WorkersProfile.jsx';
import Report from './LandingPage/NavbarComponents/ReportAbnormality.jsx';
import Resources from './LandingPage/NavbarComponents/SafetyResources.jsx';
>>>>>>> 16afbbb5e8e97a81a5932db1a04902970c5c1c8c

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
        <Route path="/news" element={<News />} />
        <Route path="/task" element={<Task />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<Report />} />
<<<<<<< HEAD
        <Route path="/resource" element={<Resources/>}/>
        <Route path="/manager" element={<Manager />} />

=======
        <Route path="/resource" element={<Resources />} />
        <Route path="/workers-report" element={<ReportAbnormality />} />
>>>>>>> 16afbbb5e8e97a81a5932db1a04902970c5c1c8c
      </Routes>
    </div>
  );
};

export default App;

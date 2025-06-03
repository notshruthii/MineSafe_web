import React from "react";
import { Routes, Route } from "react-router-dom";

// Common Components
import Navbar1 from "./components/Navbar1";
import "./App.css";

// Landing and Login
import Test from "./LandingPage/FirstPage.jsx";
import Login from './login/Landing.jsx';
import LandingPage from "./login/Landingpage1.jsx"; // If needed elsewhere

// Navbar Pages
import AboutUs from "./LandingPage/NavbarComponents/AboutUs.jsx";
import Contactus from "./LandingPage/NavbarComponents/Contactus.jsx";
import Career from "./LandingPage/NavbarComponents/Career.jsx";
import AttendanceApp from "./LandingPage/NavbarComponents/Attendance.jsx";
import News from './LandingPage/NavbarComponents/News.jsx';
import Task from './LandingPage/NavbarComponents/Tasks.jsx';
import Profile from './LandingPage/NavbarComponents/WorkersProfile.jsx';
import Report from './LandingPage/NavbarComponents/ReportAbnormality.jsx';
import Resources from './LandingPage/NavbarComponents/SafetyResources.jsx';
import SafetyGuidelines from "./LandingPage/Safety_guidelines.jsx";
import Logout from './LandingPage/NavbarComponents/Logout.jsx';

// Worker Pages
import WorkersLogin from "./WorkerPages/WorkersLogin.jsx";
import Header from "./WorkerPages/Header.jsx";
import WorkerDash from './WorkerPages/Workersdashboard.jsx';

// Manager Pages
import ManagersLogin from "./ManagerPages/ManagersLogin.jsx";
import Manager from './ManagerPages/ManagerHome.jsx';
import ManagerDashboard from "./ManagerPages/Managerdashboard.jsx";

const App = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/coal.png')" }}
    >
      <Navbar1 />

      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/safety-guidelines" element={<SafetyGuidelines />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/career" element={<Career />} />
        <Route path="/ContactUs" element={<Contactus />} />
        <Route path="/attendance" element={<AttendanceApp />} />
        <Route path="/news" element={<News />} />
        <Route path="/task" element={<Task />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<Report />} />
        <Route path="/resource" element={<Resources />} />
        <Route path="/logout" element={<Logout />} />

        {/* Worker Routes */}
        <Route path="/workers-login" element={<WorkersLogin />} />
        <Route path="/worker-dashboard" element={<Header />} />
        <Route path="/workers/*" element={<WorkerDash />} />

        {/* Manager Routes */}
        <Route path="/manager-login" element={<ManagersLogin />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
      </Routes>
    </div>
  );
};

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./WorkerPages/Header.jsx";
import Navbar1 from "./components/Navbar1";

import AboutUs from "./LandingPage/NavbarComponents/AboutUs.jsx";
import AttendanceApp from "./LandingPage/NavbarComponents/Attendance.jsx";
import LandingPage from "./login/Landingpage1.jsx";
import WorkerDash from './WorkerPages/Workersdashboard.jsx';
import SafetyGuidelines from "./LandingPage/Safety_guidelines.jsx";
import Test from "./LandingPage/FirstPage.jsx";

import WorkersLogin from "./WorkerPages/WorkersLogin.jsx";
import Manager from './ManagerPages/ManagerHome.jsx'
import ManagersLogin from "./ManagerPages/ManagersLogin.jsx";
import ManagerDashboard from "./ManagerPages/Managerdashboard.jsx";
import Login from './login/Landing.jsx';
import News from './LandingPage/NavbarComponents/News.jsx';
import Task from './LandingPage/NavbarComponents/Tasks.jsx';
import Profile from './LandingPage/NavbarComponents/WorkersProfile.jsx';
import Report from './LandingPage/NavbarComponents/ReportAbnormality.jsx';
import Resources from './LandingPage/NavbarComponents/SafetyResources.jsx';

import About from './LandingPage/NavbarComponents/AboutUs.jsx';
// Worker Pages


import Careers from './LandingPage/NavbarComponents/CareerSpot.jsx';
import Logout from './LandingPage/NavbarComponents/Logout.jsx';
// Manager Pages



//import Login from './Loginpage';



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
        <Route path="/login" element={<Login />} />
        <Route path="/safety-guidelines" element={<SafetyGuidelines />} />
        <Route path="/about-us" element={<AboutUs />} />
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
        <Route path="/resource" element={<Resources/>}/>
        <Route path="/manager" element={<Manager />} />
        <Route path="/worker-dashboard/*" element={<WorkerDash />} />
        <Route path="/about" element={<About/>} />
        <Route path="/career" element={<Careers/>} />
         <Route path="/logout" element={<Logout/>} />

       
      </Routes>
    </div>
  );
};

export default App;
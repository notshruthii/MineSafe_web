// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Header";
         
import Navbar1 from "./components/Navbar1"; 
import Navbar from "./Navbar";   // Sidebar or secondary navbar
import WorkerDash from './WorkersDashboard.js';
import LandingPage from "./LandingPage1";
import WorkersLogin from "./WorkersLogin";

import StartShift from "./pages/StartShift";
import TaskLogging from "./pages/TaskLogging";
import EndShift from "./pages/EndShift";
import SafetyTools from "./pages/SafetyTools";
import Logout from "./pages/Logout";

import Test from "./test";
import SafetyGuidelines from "./Safety_guidelines";

import "./App.css";

const App = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/coal.png')" }}
    >
      <Router>
        {/* Top navigation bar */}
        <Navbar1 />

        {/* Sidebar or secondary navbar */}
        {/* <Navbar /> */}

        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/dashboard" element={<LandingPage />} />
         <Route path="/*" element={<WorkerDash />} />

          <Route path="/safety-guidelines" element={<SafetyGuidelines />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;




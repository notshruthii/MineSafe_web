// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Header";
         
import Navbar1 from "./components/Navbar1"; 
import Navbar from "./Navbar";   // Sidebar or secondary navbar

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
        <Navbar />

        {/* Sidebar or secondary navbar */}
        <Navbar1 />

        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/dashboard" element={<LandingPage />} />
          <Route path="/workers-login" element={<WorkersLogin />} />
          <Route path="/login" element={<Header />} />

          <Route path="/start-shift" element={<StartShift />} />
          <Route path="/task-logging" element={<TaskLogging />} />
          <Route path="/end-shift" element={<EndShift />} />
          <Route path="/safety-tools" element={<SafetyTools />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="/safety-guidelines" element={<SafetyGuidelines />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;




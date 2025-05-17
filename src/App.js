// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header.js";
import Navbar1 from "./components/Navbar1"; 
import LandingPage from "./LandingPage1";
import WorkerDash from './WorkersDashboard.js';
import SafetyGuidelines from "./Safety_guidelines";
import Test from "./test";
import WorkersLogin from "./WorkersLogin.jsx";
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
  <Route path="/worker-dashboard" element={<Header />} />
  <Route path="/workers/*" element={<WorkerDash />} />
</Routes>

    </div>
  );
};

export default App;

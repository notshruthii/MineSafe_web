// src/WorkersDashboard.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import WorkersLogin from "./WorkersLogin";;
import WorkerLayout from "./Workerlayout";
import ReportAbnormality from "../LandingPage/NavbarComponents/ReportAbnormality.jsx";
import AttendanceApp from "../LandingPage/NavbarComponents/Attendance";
import StartShift from "../pages/startshift";

import TaskLogging from "../pages/TaskLogging";
import EndShift from "../pages/endshift";
import SafetyTools from "../pages/safetytools";
import Logout from "../pages/logout";

const WorkerDash = () => {
  return (
    <Routes>
      {/* Routes WITHOUT sidebar */}
      <Route path="workers-login" element={<WorkersLogin />} />
      <Route path="" element={<Header />} />

      {/* Routes WITH sidebar */}
      <Route element={<WorkerLayout />}>
        <Route path="start-shift" element={<StartShift />} />
        <Route path="task-logging" element={<TaskLogging />} />
        <Route path="end-shift" element={<EndShift />} />
        <Route path="safety-tools" element={<SafetyTools />} />
        <Route path="logout" element={<Logout />} />
        <Route path="report" element={<ReportAbnormality />} />
        <Route path="attendance" element={<AttendanceApp />} />
      </Route>
    </Routes>
  );
};

export default WorkerDash;

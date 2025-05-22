// src/WorkersDashboard.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import WorkersLogin from "./WorkersLogin";
import WorkerLayout from "./Workerlayout";

import StartShift from "../pages/StartShift";
import TaskLogging from "../pages/TaskLogging";
import EndShift from "../pages/EndShift";
import SafetyTools from "../pages/SafetyTools";
import Logout from "../pages/Logout";

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
      </Route>
    </Routes>
  );
};

export default WorkerDash;

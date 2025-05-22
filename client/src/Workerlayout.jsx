// src/WorkerLayout.js
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const WorkerLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-grow p-4 bg-cover bg-center" style={{ backgroundColor:"#1A1A1A" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default WorkerLayout;

// src/App.js
import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import StartShift from './pages/StartShift';
import SafetyTools from './pages/SafetyTools';
import TaskLogging from './pages/TaskLogging';
import EndShift from './pages/EndShift';
import Logout from './pages/Logout';


import Test from './test.js';


import Navbar1 from './components/Navbar1.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar1 from './components/Navbar1';
import Navbar from './Navbar';
import Header from './Header';
const App = () => {
  return (
    <div>
    <Navbar1/>
    <Test/>
    
      <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-1 bg-white">
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/attendance" element={<div className="p-6">Attendance Page</div>} />
            <Route path="/profile" element={<div className="p-6">Profile Page</div>} />
            <Route path="/help" element={<div className="p-6">Help Page</div>} />
            <Route path="/logout" element={<div className="p-6">Logout Page</div>} />
          </Routes>
        </main>
      </div>
    </Router>
    </div>
  );
};

export default App;



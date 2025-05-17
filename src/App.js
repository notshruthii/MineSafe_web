// src/App.js

import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar1 from './components/Navbar1';
import Navbar from './Navbar';
import LandingPage from './LandingPage1';
import Test from './Test';

import StartShift from './pages/StartShift';
import SafetyTools from './pages/SafetyTools';
import TaskLogging from './pages/TaskLogging';
import EndShift from './pages/EndShift';
import Logout from './pages/Logout';

import WorkersLogin from './WorkersLogin';
import Safety from './Safety_guidelines';

const App = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/coal.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Router>
        <Navbar1 />
        <div className="flex min-h-screen bg-black/50 backdrop-blur-sm">
          <Navbar />
          <main className="flex-1 text-white">
            <Routes>
              {/* Landing and Dashboard */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Test />} />

              {/* Other pages */}
              <Route path="/attendance" element={<div className="p-6">Attendance Page</div>} />
              <Route path="/profile" element={<div className="p-6">Profile Page</div>} />
              <Route path="/help" element={<div className="p-6">Help Page</div>} />
              <Route path="/logout" element={<Logout />} />

              {/* Shift management */}
              <Route path="/start-shift" element={<StartShift />} />
              <Route path="/safety-tools" element={<SafetyTools />} />
              <Route path="/task-logging" element={<TaskLogging />} />
              <Route path="/end-shift" element={<EndShift />} />

              {/* Worker login */}
              <Route path="/worker-login" element={<WorkersLogin />} />

              {/* Safety guidelines */}
              <Route path="/safety-guidelines" element={<Safety />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
};

export default App;

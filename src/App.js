// App.js
import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar1 from './components/Navbar1.js';
import Navbar from './Navbar';
import Header from './Header';
import Test from './test.js';
import StartShift from './pages/StartShift';
import SafetyTools from './pages/SafetyTools';
import TaskLogging from './pages/TaskLogging';
import EndShift from './pages/EndShift';
import Logout from './pages/Logout';
import Safety from './Safety_guidelines.js';

const App = () => {
  return (
    <Router>
      <Navbar1 />
      <div className="flex min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-1 bg-white">
          <Routes>
            <Route path="/" element={<Test />} /> {/* Landing page */}
            <Route path="/dashboard" element={<Header />} />
            <Route path="/attendance" element={<div className="p-6">Attendance Page</div>} />
            <Route path="/profile" element={<div className="p-6">Profile Page</div>} />
            <Route path="/help" element={<div className="p-6">Help Page</div>} />
            <Route path="/logout" element={<div className="p-6">Logout Page</div>} />
            <Route path="/safety-guidelines" element={<Safety />} /> {/* Safety Page */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

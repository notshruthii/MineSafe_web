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


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar1 from './components/Navbar1';
import Navbar from './Navbar';
import Header from './Header';
const App = () => {
  return (
    <div>
      <Navbar1 />
      <Router>
        <div className="flex min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Header />} />
              <Route path="/startshift" element={<StartShift />} />
              <Route path="/attendance" element={<SafetyTools />} />
              <Route path="/profile" element={<TaskLogging />} />
              <Route path="/help" element={<EndShift />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
};

export default App;



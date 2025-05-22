import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

import { useNavigate } from 'react-router-dom';

import Navbar from './Sidebar';

const generateMonthlyAttendance = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    attendance: parseFloat((Math.random()).toFixed(2)),
  }));
};

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [attendanceData] = useState(generateMonthlyAttendance());
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 p-6">
       

        {/* Content */}
        <div className="flex items-center justify-center mt-8">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-2xl p-10 max-w-5xl w-full"
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
            }}
          >
            <div className="h-64">
              <h2 className="text-xl font-semibold text-center mb-4">Attendance Overview</h2>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    stroke="#ccc"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis domain={[0, 1]} ticks={[0, 0.25, 0.5, 0.75, 1]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="attendance" stroke="#34d399" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
                alt="Worker with hat"
                className="w-28 h-28 mx-auto mb-4"
              />
              <h1 className="text-4xl font-bold text-white drop-shadow mb-2">Sharanya Gupta</h1>
              <p className="text-lg"><strong>Shift Time:</strong> 6:00 AM - 2:00 PM</p>
              <p className="text-lg"><strong>Zone Assigned:</strong> Zone A</p>
              <p className="text-sm text-gray-200 mt-4">{currentTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

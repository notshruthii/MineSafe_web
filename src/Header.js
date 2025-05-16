import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const attendanceData = [
  { day: 'Mon', attendance: 0.5 },
  { day: 'Tue', attendance: 1 },
  { day: 'Wed', attendance: 0 },
  { day: 'Thu', attendance: 0.6 },
  { day: 'Fri', attendance: 1 },
  { day: 'Sat', attendance: 0.7 },
  { day: 'Sun', attendance: 0 },
];

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000); // update every second

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/coal.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(1px)',
          animation: 'flicker 4s infinite'
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-10 max-w-5xl w-full">

        {/* Left side: Attendance Graph */}
        <div className="h-64">
          <h2 className="text-xl font-semibold text-center mb-4">Attendance Overview</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis domain={[0, 1]} ticks={[0, 1]} />
              <Tooltip />
              <Bar dataKey="attendance" fill="#34d399" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Right side: User Info */}
        <div className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
            alt="Worker with hat"
            className="w-28 h-28 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-white drop-shadow mb-2">Sharanya Gupta</h1>
          <p className="text-lg"><strong>Shift Time:</strong> 6:00 AM - 2:00 PM</p>
          <p className="text-lg"><strong>Zone Assigned:</strong>Zone A</p>
          <p className="text-sm text-gray-200 mt-4">{currentTime}</p>
        </div>
      </div>

      {/* Flicker animation */}
      <style>{`
        @keyframes flicker {
          0%, 100% {
            filter: blur(2px) brightness(1) contrast(1);
          }
          50% {
            filter: blur(2px) brightness(1.15) contrast(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default Header;

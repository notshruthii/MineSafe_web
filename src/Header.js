import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Helper function to generate random attendance values
const generateMonthlyAttendance = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    attendance: parseFloat((Math.random()).toFixed(2)),
  }));
};

// Helper arrays for random zone and shift
const zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'];
const shifts = ['6:00 AM - 2:00 PM', '2:00 PM - 10:00 PM', '10:00 PM - 6:00 AM'];

const Header = () => {
  const [attendanceData, setAttendanceData] = useState(generateMonthlyAttendance());
  const [zone, setZone] = useState(zones[Math.floor(Math.random() * zones.length)]);
  const [shift, setShift] = useState(shifts[Math.floor(Math.random() * shifts.length)]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
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
          <h2 className="text-xl font-semibold text-center mb-4">Monthly Attendance</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis domain={[0, 1]} ticks={[0, 0.5, 1]} />
              <Tooltip />
              <Line type="monotone" dataKey="attendance" stroke="#34d399" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
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
          <p className="text-lg"><strong>Shift Time:</strong> {shift}</p>
          <p className="text-lg"><strong>Zone Assigned:</strong> {zone}</p>
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

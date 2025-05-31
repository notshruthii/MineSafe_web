import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaClock, FaPen, FaSignOutAlt } from 'react-icons/fa';
import { GiHelmet } from 'react-icons/gi';



import { FaExclamationTriangle } from "react-icons/fa";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-gray-100 text-gray-900 min-h-screen shadow-md transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} p-4 border-r`}
      style={{ backdropFilter: 'blur(12px)' }} // subtle blur on container too
    >
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-lg font-semibold transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'} overflow-hidden text-black`}

        >
          Dashboard
        </h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <nav className="flex flex-col gap-3">
        {[
          { to: '/workers/start-shift', icon: <FaClock />, label: 'Start-Shift' },
          { to: '/workers/safety-tools', icon: <GiHelmet />, label: 'Safety Tools' },
          { to: '/workers/task-logging', icon: <FaPen />, label: 'Task Logging' },
          { to: '/workers/end-shift', icon: <FaClock />, label: 'End Shift' },
          { to: '/workers/logout', icon: <FaSignOutAlt />, label: 'Logout' },
          { to: '/workers/report', icon: <FaExclamationTriangle />, label: 'Report' },
        ].map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-300
              ${
                isActive
                  ? 'bg-white bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 shadow-md text-gray-900'
                  : 'bg-white bg-opacity-10 backdrop-blur-md border border-transparent hover:border-white hover:border-opacity-20 hover:bg-white hover:bg-opacity-20'
              }`
            }
          >
            <div className="text-lg">{icon}</div>
            {isOpen && label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;

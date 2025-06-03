import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaClock, FaPen, FaSignOutAlt, FaExclamationTriangle } from 'react-icons/fa';
import { GiHelmet } from 'react-icons/gi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-gray-100 text-black min-h-screen shadow-md transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} p-4 border-r`}
      style={{ backdropFilter: 'blur(12px)' }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`"text-xs font-semibold text-black overflow-hidden"'}`}
        >
          Dashboard
        </h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-black">
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
              `flex items-center gap-3 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-300 text-black
              ${
                isActive
                  ? 'bg-white bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 shadow-md'
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

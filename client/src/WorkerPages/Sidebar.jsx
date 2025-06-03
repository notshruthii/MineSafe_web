import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaBars,
  FaTimes,
  FaClock,
  FaPen,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { GiHelmet } from 'react-icons/gi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const links = [
    { to: '/workers/start-shift', icon: <FaClock />, label: 'Start-Shift' },
    { to: '/workers/safety-tools', icon: <GiHelmet />, label: 'Safety Tools' },
    { to: '/workers/task-logging', icon: <FaPen />, label: 'Task Logging' },
    { to: '/workers/end-shift', icon: <FaClock />, label: 'End Shift' },
    // { to: '/workers/logout', icon: <FaSignOutAlt />, label: 'Logout' },
    { to: '/workers/report', icon: <FaExclamationTriangle />, label: 'Report' },
  ];

  return (
    <div
      className={`bg-gray-100 text-black min-h-screen shadow-md transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      } p-4 border-r`}
      style={{ backdropFilter: 'blur(12px)' }}
    >
      {/* Header Toggle */}
      <div className="flex justify-between items-center mb-6">
        {isOpen && (
          <h2 className="text-xs font-semibold text-black select-none">
            Dashboard
          </h2>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black focus:outline-none"
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-3">
        {links.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 text-black justify-center ${
                isActive
                  ? 'bg-white bg-opacity-30 backdrop-blur-md border border-white border-opacity-20 shadow-md'
                  : 'bg-white bg-opacity-10 backdrop-blur-md border border-transparent hover:border-white hover:border-opacity-20 hover:bg-white hover:bg-opacity-20'
              }`
            }
          >
            {isOpen && (
              <div className="flex items-center gap-3 text-lg">
                {icon}
                <span className="text-sm">{label}</span>
              </div>
            )}
            {!isOpen && (
              <div className="text-lg flex justify-center w-full">{icon}</div>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;

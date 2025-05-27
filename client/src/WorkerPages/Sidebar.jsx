import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaClock, FaPen, FaSignOutAlt } from 'react-icons/fa';
import { GiHelmet } from 'react-icons/gi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-white text-gray-900 min-h-screen shadow-md transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} p-4 border-r`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-lg font-semibold transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'} overflow-hidden`}>
          Dashboard
        </h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <nav className="flex flex-col gap-3">
        <NavLink
          to="/workers/start-shift"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-3 rounded-md text-sm font-medium ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`
          }
        >
          <FaClock />
          {isOpen && 'Start-Shift'}
        </NavLink>
        <NavLink
          to="/workers/safety-tools"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-3 rounded-md text-sm font-medium ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`
          }
        >
          <GiHelmet />
          {isOpen && 'Safety Tools'}
        </NavLink>

        <NavLink
          to="/workers/task-logging"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-3 rounded-md text-sm font-medium ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`
          }
        >
          <FaPen />
          {isOpen && 'Task Logging'}
        </NavLink>

        <NavLink
          to="/workers/end-shift"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-3 rounded-md text-sm font-medium ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`
          }
        >
          <FaClock />
          {isOpen && 'End Shift'}
        </NavLink>

        <NavLink
          to="/workers/logout"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-3 rounded-md text-sm font-medium ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`
          }
        >
          <FaSignOutAlt />
          {isOpen && 'Logout'}
        </NavLink>
        <NavLink
          to="/workers/report"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-3 rounded-md text-sm font-medium ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`
         }
        >
          <FaExclamationTriangle />
          {isOpen && 'Report'}
        </NavLink>

      </nav>
    </div>
  );
};

export default Navbar;

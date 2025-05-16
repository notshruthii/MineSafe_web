import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

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
          to="/startshift"
          className={({ isActive }) =>
            `block py-2 px-3 rounded-md text-sm font-medium ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`
          }
        >
          {isOpen ? 'Start Shift' : null}
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            `block py-2 px-3 rounded-md text-sm font-medium ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`
          }
        >
          {isOpen ? 'Safety Tools' : null}
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `block py-2 px-3 rounded-md text-sm font-medium ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`
          }
        >
          {isOpen ? 'Task Logging' : null}
        </NavLink>

        <NavLink
          to="/help"
          className={({ isActive }) =>
            `block py-2 px-3 rounded-md text-sm font-medium ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`
          }
        >
          {isOpen ? 'End Shift' : null}
        </NavLink>

        <NavLink
          to="/logout"
          className={({ isActive }) =>
            `block py-2 px-3 rounded-md text-sm font-medium ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`
          }
        >
          {isOpen ? 'Logout' : null}
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar;

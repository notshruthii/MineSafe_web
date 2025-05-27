import React from 'react';
import { Link } from 'react-router-dom';

const Taskbar_names = ({ label, to = "#", className = "" }) => {
  return (
    <li className="nav-item">
      <Link className={`nav-link px-4 ${className}`} to={to}>
        {label}
      </Link>
      
    </li>
  );
};

export default Taskbar_names;


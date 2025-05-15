import React from 'react';

const Taskbar_names = ({ label, href = "#", className = "" }) => {
  return (
    <li className="nav-item">
      <a className={`nav-link px-4 ${className}`} href={href}>
        {label}
      </a>
    </li>
  );
};

export default Taskbar_names;

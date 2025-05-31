// src/pages/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth/session here if needed
    navigate('/startshift');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: "url('/coal.jpg')" }}
    >
      <div className="bg-dark bg-opacity-90 p-6 rounded-lg shadow-md max-w-2xl mx-auto text-center">
        <h1 className="text-xl font-bold mb-4">Are you sure you want to logout?</h1>
        <button onClick={handleLogout} className="bg-gray-800 text-white px-4 py-2 rounded">
          Confirm Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;

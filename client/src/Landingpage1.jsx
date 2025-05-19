// src/pages/LandingPage1.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage1 = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col justify-start items-center "
      style={{ backgroundColor: '#1A1A1A', color: '#fff',paddingTop:"-20px" }}
    >
      <h1 className="text-4xl font-bold mb-3 text-center " style={{marginTop:"99px"}} >
        Welcome to Coal Mine Dashboard
      </h1>
      <p className="text-lg text-gray-400 mb-9">
          Monitor, Manage, and Mobilize Mining Operations
        </p>
      
      <div className="flex space-x-6">
        <button
          onClick={() => navigate('/workers-login')}
          className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-200"
        >
          Worker Login
        </button>

        <button
          onClick={() => alert('Manager login not implemented yet')}
          className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all duration-200"
        >
          Manager Login
        </button>
      </div>
    </div>
  );
};

export default LandingPage1;


import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
      <p className="mb-6">You do not have permission to view this page.</p>
      <Link to="/" className="text-yellow-400 underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default Unauthorized;

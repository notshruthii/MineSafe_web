// src/pages/WorkersLogin.js
import React, { useState } from 'react';

const WorkersLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    alert(`Logging in with ${email}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      {/* Login form only */}
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Worker Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700" htmlFor="email">
              Email Id
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block mb-1 font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-600 hover:text-yellow-500 text-sm"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="mb-6 text-right">
            <a href="#!" className="text-yellow-500 hover:underline text-sm">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-white py-2 rounded-md font-semibold hover:bg-yellow-500 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-gray-600 text-center">
          Don't have an account?{' '}
          <a href="#!" className="text-yellow-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default WorkersLogin;

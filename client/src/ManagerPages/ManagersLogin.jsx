import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManagersLogin = () => {
  const navigate = useNavigate();
  const [managerId, setManagerId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const validManagerId = '012345';
  const validPassword = 'a@123';

  const handleLogin = (e) => {
    e.preventDefault();

    if (managerId === validManagerId && password === validPassword) {
      setError('');
      navigate('/manager-dashboard');
    } else {
      setError('Invalid Manager ID or password');
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4"
      style={{ backgroundColor: '#1A1A1A' }}
    >
      <div className="w-full max-w-md p-8 bg-[#121212] text-white rounded-2xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center">Manager Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 font-medium" htmlFor="managerId">
              Manager ID
            </label>
            <input
              type="text"
              id="managerId"
              value={managerId}
              onChange={(e) => setManagerId(e.target.value)}
              required
              className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your Manager ID"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block mb-1 font-medium" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-black border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-sm text-gray-400 hover:text-yellow-400"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && (
            <div className="text-red-500 mb-4 font-semibold text-center">
              {error}
            </div>
          )}

          <div className="mb-6 text-right">
            <a href="#!" className="text-yellow-400 hover:underline text-sm">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don’t have an account?{' '}
          <a href="#!" className="text-yellow-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default ManagersLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // ✅ Make sure this points to your firebase config

const ManagersLogin = () => {
  const navigate = useNavigate();
  const [managerId, setManagerId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = `${managerId}@minesafe.com`; // 🔁 Match the auth user email

    try {
      await signInWithEmailAndPassword(auth, email, password); // 🔐 Auth login

      const docRef = doc(db, 'managers', managerId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const managerData = docSnap.data();
        managerData.managerId = managerId;

        // Save to localStorage
        localStorage.setItem('managerData', JSON.stringify(managerData));
        setError('');
        navigate('/manager-dashboard');
      } else {
        setError('No manager profile found.');
      }
    } catch (err) {
      console.error('Login error:', err.message);
      setError('Invalid Manager ID or Password');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4" style={{ backgroundColor: '#1A1A1A' }}>
      <div className="w-full max-w-md p-8 bg-[#121212] text-white rounded-2xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center">Manager Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="managerId" className="block mb-1 font-medium">Manager ID</label>
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
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
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
              tabIndex={-1}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && <div className="text-red-500 mb-4 font-semibold text-center">{error}</div>}

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
            Contact Admin
          </a>
        </p>
      </div>
    </div>
  );
};

export default ManagersLogin;

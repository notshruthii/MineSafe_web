import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const ManagersLogin = ({ embedded = false }) => {
  const navigate = useNavigate();
  const [managerId, setManagerId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = `${managerId}@minesafe.com`;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      const docRef = doc(db, 'managers', managerId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const managerData = docSnap.data();
        managerData.managerId = managerId;
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

  const loginForm = (
    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <label htmlFor="managerId" className="block mb-1 font-medium">
          Manager ID
        </label>
        <input
          type="text"
          id="managerId"
          value={managerId}
          onChange={(e) => setManagerId(e.target.value)}
          required
          className="w-full px-4 py-2 bg-black/50 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400"
          placeholder="Enter your Manager ID"
        />
      </div>

      <div className="mb-4 relative">
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 bg-black/50 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400"
          placeholder="Enter your password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-sm text-gray-300 hover:text-yellow-400"
          tabIndex={-1}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      {error && (
        <div className="text-red-400 mb-4 font-semibold text-center">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-gray-200 transition"
      >
        Login
      </button>
    </form>
  );

  if (embedded) {
    return loginForm;
  }

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4"
      style={{
        background: `linear-gradient(to top right, rgba(68, 17, 236, 0.7), transparent 40%),
                     linear-gradient(to top left, rgba(68, 17, 236, 0.7), transparent 40%),
                     rgb(1, 8, 27)`,
      }}
    >
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-gray-600">
        <h2 className="text-3xl font-bold mb-6 text-center">Manager Login</h2>
        {loginForm}
        <p className="mt-6 text-center text-gray-300">
          Don’t have an account?{' '}
          <span className="text-yellow-400 hover:underline cursor-pointer">
            Contact Admin
          </span>
        </p>
      </div>
    </div>
  );
};

export default ManagersLogin;

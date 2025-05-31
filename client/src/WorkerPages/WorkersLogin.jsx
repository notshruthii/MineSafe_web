import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; 

const WorkersLogin = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Construct fake email from employeeId
    const email = `${employeeId}@minesafe.com`;

    try {
      // Firebase Auth sign-in
      await signInWithEmailAndPassword(auth, email, password);

      // Fetch worker profile from Firestore
      const docRef = doc(db, 'workers', employeeId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const workerData = docSnap.data();
        // Add employeeId explicitly if not present
        workerData.employeeId = employeeId;

        // Save worker data to localStorage for session
        localStorage.setItem('workerData', JSON.stringify(workerData));

        setError('');
        navigate('/worker-dashboard'); // redirect on success
      } else {
        setError('No profile found for this Employee ID.');
      }
    } catch (err) {
      setError('Invalid Employee ID or Password');
      console.error('Login error:', err);
    }
  };

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
        <h2 className="text-3xl font-bold mb-6 text-center">Worker Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="employeeId" className="block mb-1 font-medium">Employee ID</label>
            <input
              type="text"
              id="employeeId"
              required
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full px-4 py-2 bg-black/50 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400"
              placeholder="Enter your Employee ID"
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-black/50 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400"
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

          {error && (
            <div className="text-red-500 mb-4 font-semibold text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{' '}
          <a href="#!" className="text-yellow-400 hover:underline">
            Contact Admin
          </a>
        </p>
      </div>
    </div>
  );
};

export default WorkersLogin;

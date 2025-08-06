import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      await api.post('/auth/register', { username, email, password, role });
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      const message = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Registration failed. Please check your details and try again.';
      setError(message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-full max-w-sm">
        <h2 className="mb-4 text-2xl font-bold text-center">Register</h2>
        
        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Role Select */}
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
            <option value="client">Client</option>
            <option value="manufacturer">Manufacturer</option>
          </select>
        </div>

        {/* FIX 3: Display the error message */}
        {error && <p className="mb-4 text-xs italic text-red-500">{error}</p>}

        <button type="submit" className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
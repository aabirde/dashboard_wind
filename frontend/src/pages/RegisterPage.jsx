import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PasswordValidator = ({ password }) => {
  const rules = [
    { text: 'At least 8 characters', regex: /.{8,}/ },
    { text: 'An uppercase letter (A-Z)', regex: /[A-Z]/ },
    { text: 'A lowercase letter (a-z)', regex: /[a-z]/ },
    { text: 'A number (0-9)', regex: /\d/ },
    { text: 'A special character (@$!%*?&)', regex: /[@$!%*?&]/ },
  ];

  return (
    <div className="mt-2 text-sm space-y-1">
      {rules.map((rule, index) => {
        const isMet = rule.regex.test(password);
        return (
          <div key={index} className={`flex items-center ${isMet ? 'text-green-600' : 'text-gray-500'}`}>
            <span className="w-10 font-bold mr-2 text-left">
              {isMet ? 'Complete: ' : 'Incomplete: '}
            </span>
            <span>{rule.text}</span>
          </div>
        );
      })}
    </div>
  );
};

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (password != confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3002/api/auth/register', {
        username,
        email,
        password,
        confirmPassword,
      });
      setSuccessMessage(response.data.message); 
    } catch (err) {
      console.error('Registration failed:', err);
      let errorMsg = 'Registration failed. Please try again.';
      if (err.response) {
        // If the server responded with an error
        const { data } = err.response;
        
        if (data?.errors?.[0]?.msg) {
          errorMsg = data.errors[0].msg;
        } 
        else if (typeof data === 'string') {
          errorMsg = data;
        }
      } else if (err.request) {
        errorMsg = 'Cannot connect to the server. Please check your network connection.';
      }
      setError(errorMsg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Show success message instead of the form */}
      {successMessage ? (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Registration Successful</h2>
            <p>{successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            
            {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
            </div>
            )}

            <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                />
                <PasswordValidator password={password} />
            </div>

            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Register
            </button>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UseUserAuth from '../hooks/UseUserAuth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const {isAuthenticated}=UseUserAuth()
  useEffect(() => {
                      if (isAuthenticated) {
                        navigate('/url');
                          }
                 }, [isAuthenticated, navigate]);



  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:500/user/login', {
        email,
        password,
      }, { withCredentials: true });
      
      if (response.status === 202) {
        navigate('/url');
      }
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };





  return (
    <div className="bg-slate-200 max-w-md mx-auto p-8 rounded-3xl shadow-lg">
      <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">Login</h2>
      <form onSubmit={handleLoginSubmit} className="space-y-6">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            className="border border-gray-300 w-full p-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            className="border border-gray-300 w-full p-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-700 text-white py-3 rounded-full hover:bg-red-600 transition duration-300"
        >
          Login
        </button>

        {/* Registration Link */}
        <div className="text-center mt-4">
          <Link to="/registration" className="text-blue-500 hover:underline">
            Don't have an account? Register here.
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;

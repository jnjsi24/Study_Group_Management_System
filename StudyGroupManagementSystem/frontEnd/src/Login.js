// Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Importing the CSS file

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Send login request
      const response = await axios.post('http://localhost:5000/api/login', {
        userName,
        password,
      });

      // Store username in local storage
      localStorage.setItem('userName', userName);

      // Extract user ID from the response
      const userId = response.data.user._id;

      // Redirect to dashboard with userId as a query parameter
      navigate(`/dashboard?userId=${userId}`);
    } catch (error) {
      console.error('Error logging in:', error);
      // Check if the error response contains a specific message
      if (error.response && error.response.data && error.response.data.error) {
        // Set the error message from the backend response
        setErrorMessage(error.response.data.error);
      } else {
        // If no specific error message found, display a generic message
        setErrorMessage('Failed to login. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <h1 className="project-title">Study Group Management System</h1>
      <div className="login-form">
        <h2 className="login-text">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="userName">Username:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="button-group">
            <button type="submit" className="login-button">Login</button>
            <button type="button" onClick={handleCreateAccount} className="create-account-button">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import './createCustomer.css'; // Importing the CSS file

function CreateCustomer() {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v2/customers', {
        userName,
        email,
        contactNumber,
        password,
      });
      console.log(response.data);
      // Clear error message if there was one
      setErrorMessage('');
      // Set success message
      setSuccessMessage('Account created successfully!');
      // Clear form fields after successful submission
      setUsername('');
      setEmail('');
      setContactNumber('');
      setPassword('');
    } catch (error) {
      console.error('There was an error creating the account!', error);
      // Set an error message to display to the user
      setErrorMessage('There was an error creating the account. Please try again.');
    }
  };

  return (
    <div className="create-customer-container">
      <h2>Create Account</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Create Account</button>
        </div>
      </form>
      <div>
        <p>Already have an account? <Link to="/" className="nav-link">Log In</Link></p>
      </div>
    </div>
  );
}

export default CreateCustomer;

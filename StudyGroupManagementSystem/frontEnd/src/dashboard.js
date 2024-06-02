import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css'; // Importing the CSS file

function Dashboard() {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cafesResponse = await axios.get('http://localhost:5000/api/v2/cafes');
        setCafes(cafesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = new URLSearchParams(location.search).get('userId');
        const response = await axios.get(`http://localhost:5000/api/v2/customers/${userId}`);
        setUsername(response.data.userName);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [location.search]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <img src="/images/logo.jpg" alt="Logo" className="logo" />
        <h1 className="title">Dashboard</h1>
        <div className="nav-links">
          <Link to="/" className="nav-link">Log Out</Link>
          <Link to={`/my-profile?userName=${username}`} className="nav-link">My Profile</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
      </div>
      <div className="main-content">
        <h2>Welcome {username}!</h2>
        <div>
          <h3>Cafes</h3>
          <div className="cafe-container">
            {cafes.map((cafe) => (
              <div key={cafe._id} className="cafe-box">
                <img src={cafe.imageUrl} alt={`${cafe.name} Image`} /> {/* Use imageUrl here */}
                <h4>{cafe.name}</h4>
                <p>{cafe.description}</p>
                <Link to={`/cafes/${cafe._id}`} className="nav-link">Visit Cafe</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

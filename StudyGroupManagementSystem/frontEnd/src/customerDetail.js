import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import './customerDetail.css'; // Importing the CSS file

function CustomerDetail() {
  const location = useLocation();
  const userName = new URLSearchParams(location.search).get('userName');

  const [customer, setCustomer] = useState(null);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [newDetails, setNewDetails] = useState({
    userName: '',
    email: '',
    contactNumber: ''
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        console.log(`Fetching customer details for userName: ${userName}`); // Debugging line
        const response = await axios.get(`http://localhost:5000/api/v2/customers/name?userName=${userName}`);
        console.log("API Response:", response.data); // Debugging line
        if (response.data.length === 0) {
          setError('Customer not found');
        } else {
          setCustomer(response.data[0]);
          // Once customer is fetched, fetch their bookings
          fetchCustomerBookings(response.data[0].userName); // Fetch bookings based on username
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer details:', error);
        setError('Failed to load customer details. Please try again later.');
        setLoading(false);
      }
    };

    const fetchCustomerBookings = async (customerUserName) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v2/subjects?customers=${customerUserName}`);
        const bookings = response.data;
        // Get the current date
        const currentDate = new Date();
        // Separate bookings into current and previous
        const current = [];
        const previous = [];
        bookings.forEach((booking) => {
          const bookingDate = new Date(booking.date);
          if (bookingDate >= currentDate) {
            current.push(booking);
          } else {
            previous.push(booking);
          }
        });
        // Set state with current and previous bookings
        setCurrentBookings(current);
        setPreviousBookings(previous);
      } catch (error) {
        console.error('Error fetching customer bookings:', error);
      }
    };

    if (userName) {
      fetchCustomer();
    } else {
      setLoading(false);
      setError('No userName provided in the URL');
    }
  }, [userName]);

  const handleEdit = () => {
    setEditMode(true);
    setNewDetails({
      userName: customer.userName,
      email: customer.email,
      contactNumber: customer.contactNumber
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDetails({
      ...newDetails,
      [name]: value
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/v2/customers/${customer._id}`, newDetails);
      console.log('Updated customer details:', response.data);
      setCustomer(response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating customer details:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!customer) {
    return <p>No customer found</p>;
  }

  return (
    <div className="customer-detail-container">
      <h2>Customer Detail</h2>
      <div className="customer-info">
        {!editMode ? (
          <>
            <p><strong>User Name:</strong> {customer.userName}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Contact Number:</strong> {customer.contactNumber}</p>
            <Link to={`/my-profile?userName=${customer.userName}`} className="nav-link">My Profile</Link>
            <button onClick={handleEdit}>Edit</button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              User Name:
              <input
                type="text"
                name="userName"
                value={newDetails.userName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={newDetails.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Contact Number:
              <input
                type="text"
                name="contactNumber"
                value={newDetails.contactNumber}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelEdit}>Cancel</button>
          </form>
        )}
      </div>
      <div className="booking-list">
        <h3>Current Bookings</h3>
        <ul>
          {currentBookings.map((booking) => (
            <li key={booking._id}>
              <strong>{booking.name}</strong> - {booking.date} - {booking.startTime} to {booking.endTime}
            </li>
          ))}
        </ul>
        <h3>Previous Bookings</h3>
        <ul>
          {previousBookings.map((booking) => (
            <li key={booking._id}>
              <strong>{booking.name}</strong> - {booking.date} - {booking.startTime} to {booking.endTime}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CustomerDetail;

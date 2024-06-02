import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './cafeDetail.css'; // Importing the CSS file

function CafeDetail() {
  const { id } = useParams();
  const [cafe, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [group, setGroup] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchCafe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v2/cafes/${id}`);
        setCafe(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cafe details:', error);
        setError('Failed to load cafe details. Please try again later.');
        setLoading(false);
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v2/subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchCafe();
    fetchSubjects();
  }, [id]);

  const handleJoin = () => {
    setShowJoinForm(true);
    setShowCreateForm(false);
  };

  const handleCreate = () => {
    setShowCreateForm(true);
    setShowJoinForm(false);
  };

  const handleBookNow = async () => {
    try {
      const userName = localStorage.getItem('userName');
      const cafeId = cafe._id; // Assuming the cafe object has an _id property
      const customerId = localStorage.getItem('customerId'); // Adjust this according to your setup

      if (!subject || !date || !time || !endTime) {
        return setMessage('Please fill in all required fields.');
      }

      const formattedDate = date ? new Date(date).toISOString() : new Date().toISOString();
      const formattedStartTime = new Date(date + 'T' + time + 'Z').toISOString();
      const formattedEndTime = new Date(date + 'T' + endTime + 'Z').toISOString();

      const response = await axios.post('http://localhost:5000/api/v2/subjects', {
        name: subject,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        date: formattedDate, // Include the date field in the request payload
        createdBy: userName,
        cafeId: cafeId,
        customerId: customerId // Include the customerId in the request payload
      });

      setMessage('Subject created successfully');
      console.log('Subject created:', response.data);
      setSubject('');
      setDate('');
      setTime('');
      setEndTime('');
      setGroup('');
      setShowJoinForm(false);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating subject:', error);
      setMessage(`Error creating subject: ${error.response?.data?.error || error.message}`);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <div className="nav-links">
        <Link to="/" className="nav-link">Log Out</Link>
        <Link to={`/my-profile`} className="nav-link">My Profile</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </div>
      {cafe && (
        <>
          <h2>{cafe.name}</h2>
          <img src={cafe.imageUrl} alt={cafe.name} className="cafe-image" style={{ width: '100%', maxWidth: '400px' }} />
          <p className="address">Address: {cafe.address}</p>
          {message && <p>{message}</p>}
          <div>
            <button onClick={handleJoin}>Join</button>
            <button onClick={handleCreate}>Create</button>
          </div>
          {showJoinForm && (
            <div className={`booking-form join-theme`}>
              <h3>Join {cafe.name}</h3>
              <label htmlFor="subject">Subject:</label>
              <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject.name}>{subject.name}</option>
                ))}
              </select>
              <label htmlFor="date">Date:</label>
              <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <label htmlFor="time">Time:</label>
              <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} />
              <button onClick={handleBookNow}>Book Now</button>
            </div>
          )}
          {showCreateForm && (
            <div className={`create-form create-theme`}>
              <h3>Create {cafe.name}</h3>
              <label htmlFor="group">Your Group:</label>
              <input type="text" id="group" value={group} onChange={(e) => setGroup(e.target.value)} />
              <label htmlFor="subject">Subject:</label>
              <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
              <label htmlFor="date">Date:</label>
              <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <label htmlFor="time">Time:</label>
              <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} />
              <label htmlFor="endTime">End Time:</label>
              <input type="time" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              <button onClick={handleBookNow}>Book Now</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CafeDetail;

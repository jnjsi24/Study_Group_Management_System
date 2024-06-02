import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function GroupDetail() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v2/groups/${id}`);
        setGroup(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching group details:', error);
        setError('Failed to load group details. Please try again later.');
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>{group.name}</h2>
      <p>Subject: {group.subject_id.name}</p>
      <p>Cafe: {group.cafe_id.name}</p>
      <p>Customer: {group.customer_id.userName}</p>
      <p>Start Date: {new Date(group.schedule.start).toLocaleString()}</p>
      <p>End Date: {new Date(group.schedule.end).toLocaleString()}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default GroupDetail;

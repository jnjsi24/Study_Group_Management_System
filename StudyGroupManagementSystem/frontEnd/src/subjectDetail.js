import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SubjectDetail() {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v2/subjects/${id}`);
        setSubject(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subject details:', error);
        setError('Failed to load subject details. Please try again later.');
        setLoading(false);
      }
    };

    fetchSubject();
  }, [id]);

  useEffect(() => {
    const fetchCustomerName = async () => {
      try {
        if (subject && subject.customer) {
          const response = await axios.get(`http://localhost:5000/api/v2/customers/${subject.customer}`);
          setSubject(prevState => ({ ...prevState, customerName: response.data.userName, customerEmail: response.data.email }));
        }
      } catch (error) {
        console.error('Error fetching customer details:', error);
        setError('Failed to load customer details. Please try again later.');
      }
    };

    if (subject) {
      fetchCustomerName();
    }
  }, [subject]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>{subject.name}</h2>
      <p>Customer: {subject.customerName}</p>
      <p>Customer Email: {subject.customerEmail}</p>
    </div>
  );
}

export default SubjectDetail;

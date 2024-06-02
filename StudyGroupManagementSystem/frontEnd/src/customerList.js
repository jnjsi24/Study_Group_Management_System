import React, { useEffect, useState } from 'react';
import { getCustomers } from './apiService';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <h1>Customers</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Customers;

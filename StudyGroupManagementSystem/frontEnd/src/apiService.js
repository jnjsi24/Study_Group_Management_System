import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/customers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

// Add more functions as needed for other API endpoints

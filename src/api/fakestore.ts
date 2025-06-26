import axios from 'axios';

// Base URL for the Fake Store API
const API_URL = 'https://fakestoreapi.com';

/**
 * Fetches all products from the Fake Store API.
 * Uses axios to send a GET request to the '/products' endpoint.
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 */
export const fetchFakeProducts = async () => {
  const res = await axios.get(`${API_URL}/products`);
  return res.data; // Return only the data from the response
};

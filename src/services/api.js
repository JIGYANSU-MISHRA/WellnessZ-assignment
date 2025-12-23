import axios from 'axios';

// Central axios instance so all requests share the same base config
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

export const getUsers = async () => {
  // Keep this function small so swapping the backend later is easy
  const response = await api.get('/users');
  return response.data;
};


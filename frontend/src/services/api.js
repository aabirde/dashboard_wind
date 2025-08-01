import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

// Create an axios instance for API requests
const api = axios.create({
  baseURL: API_URL,
});

// Function to get the auth token from local storage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API functions
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const getReports = async () => {
  try {
    const response = await api.get('/reports');
    return response.data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};

export const createReport = async (reportData) => {
  try {
    const response = await api.post('/reports', reportData);
    return response.data;
  } catch (error) {
    console.error('Error creating report:', error);
    throw error;
  }
};

export const getTurbines = async () => {
  try {
    const response = await api.get('/turbines');
    return response.data;
  } catch (error) {
    console.error('Error fetching turbines:', error);
    throw error;
  }
};

export default {
  login,
  getReports,
  createReport,
  getTurbines,
};
import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

const api = axios.create({
  baseURL: 'http://localhost:3002/api',
  baseURL: API_URL,
  withCredentials: true, // This is crucial for sending cookies
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  console.log("1. Login function started with:", credentials);
  try {
    const response = await api.post(`${API_URL}/auth/login`, credentials);
    console.log("2. Response received from server:", response.data);
    const { token, role } = response.data;
    localStorage.setItem('token', token);
    console.log("3. Token saved to localStorage:", token);
    localStorage.setItem('role', role);
    return response.data;
  } catch (error) {
  console.error('Login service error:', error.response?.data || error.message);
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
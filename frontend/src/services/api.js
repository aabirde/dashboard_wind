import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  baseURL: API_URL,
  withCredentials: true, // This is crucial for sending cookies
});


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
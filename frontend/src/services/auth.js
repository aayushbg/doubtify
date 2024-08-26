import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = async (username, email, password) => {
  try {
    await axios.post(`${API_URL}/register`, { username, email, password });
    return true;
  } catch (error) {
    console.error('Registration error:', error);
    return false;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
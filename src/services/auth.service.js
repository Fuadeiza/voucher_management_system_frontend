// services/auth.service.js
import api from './api';

export const authService = {
  login: async (email, passcode, role) => {
    try {
      const endpoint = role === 'admin' ? '/admin/login' : '/attendant/login';
      const response = await api.post(endpoint, {
        email,
        passcode
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
  }
};
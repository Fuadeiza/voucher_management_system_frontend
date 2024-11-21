// services/api.js
import axios from 'axios';
import { API_URL } from '../utils/constants';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('Current user data:', user);

    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
        config.headers['X-Debug-Token'] = user.token;
        config.headers['X-Debug-Email'] = user.email;
        console.log('Setting Authorization header:', config.headers.Authorization);
    } else {
        console.log('No token found in localStorage');
    }
    return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('API Error:', {
            config: error.config,
            response: error.response
        });
        return Promise.reject(error);
    }
);

export default api;
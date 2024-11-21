// services/company.service.js
import api from './api';

export const companyService = {
    getCompanies: async () => {
        try {
            const response = await api.get('/company/');
            return response.data;
        } catch (error) {
            console.error('Get companies error:', error);
            throw error;
        }
    },
    
    createCompany: async (data) => {
        try {
            const response = await api.post('/company/create', data);
            return response.data;
        } catch (error) {
            console.error('Create company error:', error);
            throw error;
        }
    }
};
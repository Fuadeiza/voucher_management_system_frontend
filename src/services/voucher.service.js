// services/voucher.service.js
import api from './api';

export const voucherService = {
    createVoucher: async (data) => {
      try {
          console.log('Creating vouchers with data:', data);
          const response = await api.post('/voucher/create', {
              company_id: data.company_id,
              count: data.count || 1
          });
          // Response will be an array of vouchers
          return Array.isArray(response.data) ? response.data : [response.data];
      } catch (error) {
          console.error('Error creating vouchers:', error);
          throw error;
      }
  },

    getVouchersByCompany: async (companyId) => {
        try {
            console.log('Fetching vouchers for company:', companyId);
            const response = await api.get(`/company/${companyId}/vouchers`);
            return response.data;
        } catch (error) {
            console.error('Error fetching vouchers:', error);
            throw error;
        }
    },

    getVoucherStats: async () => {
      try {
          console.log('Fetching voucher stats'); // Debug log
          const response = await api.get('/voucher/stats');
          console.log('Stats response:', response.data); // Debug log
          return response.data;
      } catch (error) {
          console.error('Error fetching voucher stats:', error);
          throw error;
      }
  },

    verifyVoucher: async (code) => {
        try {
            const response = await api.post(`/voucher/verify/${code}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    useVoucher: async (code, attendantId) => {
        try {
            const response = await api.post(`/voucher/use/${code}`, {
                attendant_id: attendantId
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
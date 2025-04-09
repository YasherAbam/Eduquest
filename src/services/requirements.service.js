// src/services/requirements.service.js
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/requirements/';

export const requirementsService = {
    getAllRequirements: async () => {
        const response = await axios.get(API_URL, { headers: authHeader() });
        return response.data;
    },

    getRequirementById: async (id) => {
        const response = await axios.get(API_URL + id, { headers: authHeader() });
        return response.data;
    },

    createRequirement: async (requirementData) => {
        const formData = new FormData();
        Object.keys(requirementData).forEach(key => {
            if (key === 'attachments') {
                requirementData[key].forEach(file => {
                    formData.append('attachments', file);
                });
            } else {
                formData.append(key, requirementData[key]);
            }
        });

        const response = await axios.post(API_URL, formData, {
            headers: {
                ...authHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    updateRequirement: async (id, requirementData) => {
        const formData = new FormData();
        Object.keys(requirementData).forEach(key => {
            if (key === 'attachments') {
                requirementData[key].forEach(file => {
                    formData.append('attachments', file);
                });
            } else {
                formData.append(key, requirementData[key]);
            }
        });

        const response = await axios.put(API_URL + id, formData, {
            headers: {
                ...authHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    deleteRequirement: async (id) => {
        const response = await axios.delete(API_URL + id, { headers: authHeader() });
        return response.data;
    }
};
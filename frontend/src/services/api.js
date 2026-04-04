import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const onboardRider = async (riderData) => {
    try {
        const response = await api.post('/riders/onboarding', riderData);
        return response.data;
    } catch (error) {
        console.error('Error onboarding rider:', error);
        throw error;
    }
};

export const issuePolicy = async (policyData) => {
    try {
        const response = await api.post('/policies/issue', policyData);
        return response.data;
    } catch (error) {
        console.error('Error issuing policy:', error);
        throw error;
    }
};

export const getTriggerAlerts = async () => {
    try {
        const response = await api.get('/triggers/alerts');
        return response.data;
    } catch (error) {
        console.error('Error fetching triggers:', error);
        throw error;
    }
};

export default api;

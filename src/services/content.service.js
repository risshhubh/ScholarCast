import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const contentService = {
  getTeacherContent: async (teacherId) => {
    try {
      const response = await axios.get(`${API_URL}/content`, {
        params: { teacherId }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch teacher content');
    }
  },

  getAllContent: async () => {
    try {
      const response = await axios.get(`${API_URL}/content`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch all content');
    }
  },

  getPendingContent: async () => {
    try {
      const response = await axios.get(`${API_URL}/content`, {
        params: { status: 'pending' }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch pending content');
    }
  },

  getLiveContent: async (teacherId) => {
    try {
      const response = await axios.get(`${API_URL}/content`, {
        params: { teacherId, status: 'approved' }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch live content');
    }
  },

  uploadContent: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/content`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to upload content');
    }
  },

  approveContent: async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/content/${id}`, {
        status: 'approved'
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to approve content');
    }
  },

  rejectContent: async (id, rejectionReason) => {
    try {
      const response = await axios.patch(`${API_URL}/content/${id}`, {
        status: 'rejected',
        rejectionReason
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to reject content');
    }
  }
};

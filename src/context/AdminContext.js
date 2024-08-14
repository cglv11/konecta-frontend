import React, { createContext, useState } from 'react';
import api from '../lib/api';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRequests = async (page = 1, limit = 10, code = '') => {
    try {
      const response = await api.get('/requests', {
        params: {
          page,
          limit,
          code,
        },
      });

      setRequests(response.data.requests);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
    setLoading(false);
  };

  const getRequest = async (id) => {
    try {
      const response = await api.get(`/requests/${id}`);
      setCurrentRequest(response.data);
    } catch (error) {
      console.error('Error fetching request:', error);
    }
  };

  const postRequest = async (requestData) => {
    try {
      const response = await api.post('/requests', requestData);
      setRequests([...requests, response.data.request]);
    } catch (error) {
      console.error('Error creating request:', error);
    }
  };

  const deleteRequest = async (id) => {
    try {
      await api.delete(`/requests/${id}`);
      setRequests(requests.filter(request => request.id !== id));
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        loading,
        requests,
        totalPages,
        getRequests,
        getRequest,
        postRequest,
        deleteRequest,
        currentRequest,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

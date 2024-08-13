import React, { createContext, useState } from 'react';
import api from '../lib/api';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentRequest, setCurrentRequest] = useState(null);

  const getRequests = async (employeeId, page = 1, limit = 10, code = '') => {
    try {
      const response = await api.get('/requests', {
        params: {
          page,
          limit,
          code,
          employeeId,
        },
      });

      setRequests(response.data.requests);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
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

  return (
    <EmployeeContext.Provider
      value={{
        requests,
        totalPages,
        currentRequest,
        getRequests,
        getRequest,
        postRequest,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

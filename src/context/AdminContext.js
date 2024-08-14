import React, { createContext, useState } from 'react';
import api from '../lib/api';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [currentEmployee, setCurrentEmployee] = useState(null);
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

  // ENDPOINTS EMPLEADOS
  const getEmployees = async (page = 1, limit = 10, name = '', username = '', role = '') => {
    try {
      const response = await api.get('/employees', {
        params: {
          page,
          limit,
          name,
          username,
          role,
        },
      });

      setEmployees(response.data.employees);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
    setLoading(false);
  };

  const getEmployee = async (id) => {
    try {
      const response = await api.get(`/employees/${id}`);
      setCurrentEmployee(response.data);
    } catch (error) {
      console.error('Error fetching request:', error);
    }
  };

  const postEmployee = async (employeeData) => {
    try {
      const response = await api.post('/employees', employeeData);
      setEmployees([...employees, response.data.employee]);
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
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
        employees,
        getEmployees,
        getEmployee,
        postEmployee,
        deleteEmployee,
        currentEmployee
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

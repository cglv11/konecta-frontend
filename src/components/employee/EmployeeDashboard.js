import Navbar from '../Navbar';
import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@material-ui/core';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { EmployeeContext } from '../../context/EmployeeContext';
import { AuthContext } from '../../context/AuthContext';
import RequestsTable from '../tables/RequestsTable';
import RequestModal from '../modals/RequestModal';
import CreateRequestModal from '../modals/CreateRequestModal';

const EmployeeDashboard = () => {
  const { requests, getRequests, totalPages, loading, postRequest } = useContext(EmployeeContext);
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (user && user.employee.id) {
      getRequests(user.employee.id, page);  
    }
  }, [user, page, getRequests]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCreateRequest = async (newRequest) => {
    try {
      await postRequest(newRequest);
      getRequests(user.employee.id, page); // Actualizar la lista después de crear la solicitud
      setSnackbarSeverity('success');
      setSnackbarMessage('Request created successfully!');
      setOpenSnackbar(true);
      return true;
    } catch (error) {
      console.error('Error creating request:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to create request. Please try again.');
      setOpenSnackbar(true);
      return false;
    }
  };

  const handleViewClick = (id) => {
    const request = requests.find(req => req.id === id);
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Navbar />
      <h1>Employee Dashboard</h1>
      <h2>Solicitudes</h2>  
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => setIsCreateModalOpen(true)}
        style={{
          backgroundColor: '#536C79',  
          color: 'white', 
          textTransform: 'none'
      }}
      >
        Crear Nueva Solicitud
      </Button>
      <RequestsTable
        requests={requests}
        loading={loading}
        totalPages={totalPages}
        page={page}
        onPageChange={handlePageChange}
        onViewClick={handleViewClick} 
        isAdmin={false}
      />
      {selectedRequest && (
        <RequestModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          requestData={selectedRequest}
          isAdmin={false}
        />
      )}

      {isCreateModalOpen && (
        <CreateRequestModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateRequest={handleCreateRequest}
          employeeId={user.employee.id}
        />
      )}

<Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};


export default EmployeeDashboard;

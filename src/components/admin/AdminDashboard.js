import Navbar from '../Navbar';
import React, { useState, useEffect, useContext } from 'react';
import { Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { AdminContext } from '../../context/AdminContext';
import RequestsTable from '../tables/RequestsTable';
import RequestModal from '../modals/RequestModal';
import CreateRequestModal from '../modals/CreateRequestModal';

const AdminDashboard = () => {
  const { requests, getRequests, totalPages, loading, postRequest, deleteRequest } = useContext(AdminContext);
  const [page, setPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    getRequests(page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCreateRequest = async (newRequest) => {
    try {
      await postRequest(newRequest);
      getRequests(page);
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

  const handleDeleteRequest = async (id) => {
    try {
      await deleteRequest(id);
      getRequests(page);
      setSnackbarSeverity('success');
      setSnackbarMessage('Request deleted successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting request:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to delete request. Please try again.');
      setOpenSnackbar(true);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Navbar />
      <h1>Admin Dashboard</h1>
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
        onDeleteClick={handleDeleteRequest} 
        isAdmin={true}
      />
      {selectedRequest && (
        <RequestModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          requestData={selectedRequest}
          isAdmin={true}
        />
      )}

      {isCreateModalOpen && (
        <CreateRequestModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateRequest={handleCreateRequest}
          employeeId={null}
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

export default AdminDashboard;

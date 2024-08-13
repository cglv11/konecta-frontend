import Navbar from '../Navbar';
import React, { useState, useEffect, useContext } from 'react';
import { EmployeeContext } from '../../context/EmployeeContext';
import { AuthContext } from '../../context/AuthContext';
import RequestsTable from '../tables/RequestsTable';
import RequestModal from '../modals/RequestModal';

const EmployeeDashboard = () => {
  const { requests, getRequests, totalPages, loading } = useContext(EmployeeContext);
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user && user.employee.id) {
      getRequests(user.employee.id, page);  
    }
  }, [user, page, getRequests]);

  const handlePageChange = (event, value) => {
    setPage(value);
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
    </div>
  );
};


export default EmployeeDashboard;

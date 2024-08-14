import Navbar from '../Navbar';
import React, { useState, useEffect, useContext } from 'react';
import { Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { AdminContext } from '../../context/AdminContext';
import { AuthContext } from '../../context/AuthContext';
import EmployeesTable from '../tables/EmployeesTable';
import EmployeeModal from '../modals/EmployeeModal';
import CreateEmployeeModal from '../modals/CreateEmployeeModal';

const AdminEmployeeSection = () => {
  const { employees, getEmployees, totalPages, loading, postEmployee, deleteEmployee } = useContext(AdminContext);
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    getEmployees(page);
  }, [page]);

  useEffect(() => {
    console.log('emplados: ', employees)
  }, [employees])
  

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCreateEmployee = async (newEmployee) => {
    try {
      await postEmployee(newEmployee);
      getEmployees(page);
      setSnackbarSeverity('success');
      setSnackbarMessage('Employee created successfully!');
      setOpenSnackbar(true);
      return true;
    } catch (error) {
      console.error('Error creating employee:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to create employee. Please try again.');
      setOpenSnackbar(true);
      return false;
    }
  };

  const handleViewClick = (id) => {
    const employee = employees.find(req => req.id === id);
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      getEmployees(page);
      setSnackbarSeverity('success');
      setSnackbarMessage('Employee deleted successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error deleting employee:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Failed to delete employee. Please try again.');
      setOpenSnackbar(true);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Navbar />
      <h1>Admin Dashboard</h1>
      <h2>Empleados</h2>
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
        Crear Nuevo Empleado
      </Button>
      <EmployeesTable
        employees={employees}
        loading={loading}
        totalPages={totalPages}
        page={page}
        onPageChange={handlePageChange}
        onViewClick={handleViewClick}
        onDeleteClick={handleDeleteEmployee} 
      />
      {selectedEmployee && (
        <EmployeeModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          employeeData={selectedEmployee}
        />
      )}

      {isCreateModalOpen && (
        <CreateEmployeeModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateEmployee={handleCreateEmployee}
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

export default AdminEmployeeSection;
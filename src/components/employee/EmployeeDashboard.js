import React from 'react';
import LogoutButton from '../LogoutButton';

const EmployeeDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Employee Dashboard</h1>
      <p>Welcome to the Employee Dashboard! Here you can view your tasks, update your profile, and track your performance.</p>
      <LogoutButton />
    </div>
  );
};

export default EmployeeDashboard;

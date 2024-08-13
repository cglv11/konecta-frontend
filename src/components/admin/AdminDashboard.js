import React from 'react';
import LogoutButton from '../LogoutButton';

const AdminDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard! Here you can manage users, view reports, and configure system settings.</p>
      <LogoutButton />
    </div>
  );
};

export default AdminDashboard;

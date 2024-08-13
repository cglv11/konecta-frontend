import React from 'react';
import Navbar from '../Navbar';

const AdminDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Navbar />
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard! Here you can manage users, view reports, and configure system settings.</p>
    </div>
  );
};

export default AdminDashboard;

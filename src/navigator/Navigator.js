import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext } from './../context/AuthContext';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminEmployeeSection from '../components/admin/AdminEmployeeSection';
import EmployeeDashboard from '../components/employee/EmployeeDashboard';
import Login from '../components/auth/Login';
import Loading from '../components/Loading';

const Navigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>;
  }

  return (
    <Routes>
      {user.employee.role === 'ADMIN' ? (
        <>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/employee" element={<AdminEmployeeSection />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </>
      ) : (
        <>
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="*" element={<Navigate to="/employee" />} />
        </>
      )}
    </Routes>
  );
};

export default Navigator;
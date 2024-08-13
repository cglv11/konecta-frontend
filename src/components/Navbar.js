import React, { useContext } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout();
      navigate('/');
    };
  
    return (
      <AppBar position="static" sx={{ backgroundColor: '#48616D' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            {user.employee.role === 'ADMIN' ? (
              <>
                <Button color="inherit" onClick={() => navigate('/admin/reports')}>Reports</Button>
                <Button color="inherit" onClick={() => navigate('/admin/settings')}>Settings</Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/employee/tasks')}>Tasks</Button>
                <Button color="inherit" onClick={() => navigate('/employee/profile')}>Profile</Button>
              </>
            )}
          </Box>
  
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    );
  };

export default Navbar;

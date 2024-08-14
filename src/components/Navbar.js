import React, { useContext } from 'react';
import { AppBar, Toolbar, Button, Box } from "@material-ui/core";
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
      <AppBar position="static" style={{ backgroundColor: '#536C79' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
            {user.employee.role === 'ADMIN' ? (
              <>
                <Button color="inherit" onClick={() => navigate('/admin')}>Inicio</Button>
                <Button color="inherit" onClick={() => navigate('/admin')}>Solicitudes</Button>
                <Button color="inherit" onClick={() => navigate('/admin/employee')}>Empleados</Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/employee')}>Inicio</Button>
              </>
            )}
          </Box>
          <Button color="inherit" onClick={handleLogout}>Salir</Button>
        </Toolbar>
      </AppBar>
    );
  };

export default Navbar;

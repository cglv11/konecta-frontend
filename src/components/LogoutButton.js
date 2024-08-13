import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { AuthContext } from '../context/AuthContext';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Button
      color="secondary"
      variant="contained"
      onClick={logout}
      style={{ position: 'absolute', top: '20px', right: '20px' }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;

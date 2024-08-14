import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { TextField, Button, Paper, Typography, Container } from '@material-ui/core';
import Toast from '../Toast';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await login({ username, password });
      } catch (error) {
        setToastMessage(error.response.data.msg);
        setToastOpen(true);
      }
    };

  return (
    <div className="root">
      <Container>
        <Paper elevation={3} className="paper">
          <Typography variant="h4" className="title">
            Login
          </Typography>
          <form onSubmit={handleSubmit} className="form">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              className="textField"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              className="textField"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              color="primary"
              fullWidth
              className="button"
              size="large"
              variant="outlined"
              style={{
                  backgroundColor: '#536C79',  
                  color: 'white', 
                  textTransform: 'none'
              }}
            >
              Login
            </Button>
          </form>
        </Paper>
        <Toast 
          open={toastOpen} 
          message={toastMessage} 
          onClose={() => setToastOpen(false)}
          severity="error"
        />
      </Container>
    </div>
  );
};

export default Login;

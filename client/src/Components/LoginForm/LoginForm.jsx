import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography } from '@mui/material';
import { FaUserCircle } from "react-icons/fa";


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/login`, { username, password });
      if (response.status === 200) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/admin');
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <Paper
      elevation={3}
      className="bg-custom-bg" 
      sx={{
        p: { xs: 2, sm: 4 },
        minHeight: '100vh',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <Typography 
          variant="h4" 
          align="center" 
          sx={{ 
            mb: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center'
          }}
        >
          <FaUserCircle size="10rem" style={{ marginBottom: '0.5rem' }} />
          Admin Login
        </Typography>
        {error && <Typography color="error" align="center" sx={{ mb: 2 }}>{error}</Typography>}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ style: { color: '#fff' } }}
          InputProps={{ style: { color: '#fff' } }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 4 }}
          InputLabelProps={{ style: { color: '#fff' } }}
          InputProps={{ style: { color: '#fff' } }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;

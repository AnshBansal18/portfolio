import React from 'react';
import { Typography, Tabs, Tab, Paper, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import AdminIntro from './AdminIntro';
import AdminAbout from './AdminAbout';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import AdminContact from './AdminContact';
import AdminProject from './AdminProject';

const Admin = () => {
  const [value, setValue] = React.useState('0');
  const navigate = useNavigate(); 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 4 },
        minHeight: '100vh',
        bgcolor: '#121212',
        color: '#fff',
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        <br />Admin Dashboard
      </Typography>
      
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ mb: 4, display: 'block', mx: 'auto' }}
      >
        Logout
      </Button>
      
      <TabContext value={value}>
        <Paper
          elevation={1}
          sx={{
            mb: 2,
            bgcolor: '#1e1e1e',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <TabList
            aria-label="admin tabs"
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              bgcolor: '#1e1e1e',
              '& .MuiTabs-indicator': {
                bgcolor: '#f0f0f0',
              },
            }}
          >
            <Tab label="Intro" value="0" sx={{ color: '#fff' }} />
            <Tab label="About" value="1" sx={{ color: '#fff' }} />
            <Tab label="Header" value="2" sx={{ color: '#fff' }} />
            <Tab label="Footer" value="3" sx={{ color: '#fff' }} />
            <Tab label="Contacts" value="4" sx={{ color: '#fff' }} />
            <Tab label="Projects" value="5" sx={{ color: '#fff' }} />
          </TabList>
        </Paper>
        <div
          style={{
            backgroundColor: '#181818',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          <TabPanel value="0"> <AdminIntro /> </TabPanel>
          <TabPanel value="1"> <AdminAbout /> </TabPanel>
          <TabPanel value="2"> <AdminHeader /> </TabPanel>
          <TabPanel value="3"> <AdminFooter /> </TabPanel>
          <TabPanel value="4"> <AdminContact /> </TabPanel>
          <TabPanel value="5"> <AdminProject /> </TabPanel>
        </div>
      </TabContext>
    </Paper>
  );
};
export default Admin;
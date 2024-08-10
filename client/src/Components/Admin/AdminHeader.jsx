import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Container, FormControl, FormLabel, Input, Typography, Stack, Grid, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const AdminHeader = () => {
  const [nav, setNav] = useState({
    name: '',
    logo: '',
    navItems: []
  });
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/get-portfolio-data`)
      .then(response => {
        if (response.data.nav) setNav(response.data.nav);
      })
      .catch(error => console.error('Error fetching navigation data:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNav(prevState => ({ ...prevState, [name]: value }));
  };

  const handleNavItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedNavItems = [...nav.navItems];
    updatedNavItems[index] = { ...updatedNavItems[index], [name]: value };
    setNav(prevState => ({ ...prevState, navItems: updatedNavItems }));
  };

  const handleAddNavItem = () => {
    setNav(prevState => ({
      ...prevState,
      navItems: [...prevState.navItems, { name: '', path: '', icon: '' }]
    }));
  };

  const handleRemoveNavItem = (index) => {
    setNav(prevState => ({
      ...prevState,
      navItems: prevState.navItems.filter((_, i) => i !== index)
    }));
  };

  const handleSaveChanges = () => {
    axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/update-nav`, { nav })
      .then(response => {
        setNav(response.data.data);
        enqueueSnackbar('Changes Saved.', { variant: 'success' });
      })
      .catch(error => {
        console.error('Error saving changes:', error);
        enqueueSnackbar('Error saving changes.', { variant: 'error' });
      });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
        Admin - Header Section
      </Typography>

      <Box sx={{ p: 4, borderRadius: 2, boxShadow: 3, bgcolor: theme.palette.grey[800] }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel sx={{ color: 'white' }}>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={nav.name}
            onChange={handleInputChange}
            placeholder="Enter name"
            sx={{ bgcolor: 'white' }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel sx={{ color: 'white' }}>Logo URL</FormLabel>
          <Input
            type="text"
            name="logo"
            value={nav.logo}
            onChange={handleInputChange}
            placeholder="Enter logo URL"
            sx={{ bgcolor: 'white' }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel sx={{ color: 'white' }}>Navigation Items</FormLabel>
          <Stack spacing={2}>
            {nav.navItems.map((item, index) => (
              <Grid container key={index} spacing={2} alignItems="center">
                <Grid item xs>
                  <Input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={(e) => handleNavItemChange(index, e)}
                    placeholder="Enter item name"
                    sx={{ bgcolor: 'white' }}
                  />
                </Grid>
                <Grid item xs>
                  <Input
                    type="text"
                    name="path"
                    value={item.path}
                    onChange={(e) => handleNavItemChange(index, e)}
                    placeholder="Enter item path"
                    sx={{ bgcolor: 'white' }}
                  />
                </Grid>
                <Grid item xs>
                  <Input
                    type="text"
                    name="icon"
                    value={item.icon}
                    onChange={(e) => handleNavItemChange(index, e)}
                    placeholder="Enter icon name"
                    sx={{ bgcolor: 'white' }}
                  />
                </Grid>
                <Grid item>
                  <IconButton onClick={() => handleRemoveNavItem(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="success"
              onClick={handleAddNavItem}
              sx={{ mt: 2 }}
            >
              Add Navigation Item
            </Button>
          </Stack>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default AdminHeader;
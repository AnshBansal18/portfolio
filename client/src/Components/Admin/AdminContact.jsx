import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Box,Button,Container,FormControl,FormLabel,Input,Typography,Stack,useTheme,useMediaQuery,} from '@mui/material';
import { useSnackbar } from 'notistack';

const AdminContact = () => {
  const [contact, setContact] = useState({
    email: '',
    phone: '',
    socialMediaLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: '',
    },
  });

  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/get-portfolio-data`
      )
      .then((response) => {
        if (response.data.contact) setContact(response.data.contact);
      })
      .catch((error) =>
        enqueueSnackbar('Error fetching contact data', { variant: 'error' })
      );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({
      ...prevState,
      socialMediaLinks: {
        ...prevState.socialMediaLinks,
        [name]: value,
      },
    }));
  };

  const handleSaveChanges = () => {
    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/update-contact`,
        { contact }
      )
      .then((response) => {
        setContact(response.data.contact);
        enqueueSnackbar('Changes Saved', { variant: 'success' });
      })
      .catch((error) =>
        enqueueSnackbar('Error saving changes', { variant: 'error' })
      );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant={isSmallScreen ? 'h5' : 'h4'}
        gutterBottom
        sx={{ color: 'white', textAlign: 'center' }}
      >
        Admin - Contact Section
      </Typography>

      <Box
        sx={{
          p: isSmallScreen ? 2 : 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: theme.palette.grey[800],
        }}
      >
        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel sx={{ color: 'white' }}>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel sx={{ color: 'white' }}>Phone</FormLabel>
          <Input
            type="text"
            name="phone"
            value={contact.phone}
            onChange={handleInputChange}
            placeholder="Enter phone number"
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel sx={{ color: 'white' }}>Social Media Links</FormLabel>
          <Stack spacing={2}>
            <Input  
              type="text"
              name="github"
              value={contact.socialMediaLinks.github}
              onChange={handleSocialMediaChange}
              placeholder="Enter GitHub URL"
              sx={{ bgcolor: 'white', borderRadius: 1 }}
            />
            <Input
              type="text"
              name="linkedin"
              value={contact.socialMediaLinks.linkedin}
              onChange={handleSocialMediaChange}
              placeholder="Enter LinkedIn URL"
              sx={{ bgcolor: 'white', borderRadius: 1 }}
            />
            <Input
              type="text"
              name="twitter"
              value={contact.socialMediaLinks.twitter}
              onChange={handleSocialMediaChange}
              placeholder="Enter Twitter URL"
              sx={{ bgcolor: 'white', borderRadius: 1 }}
            />
            <Input
              type="text"
              name="instagram"
              value={contact.socialMediaLinks.instagram}
              onChange={handleSocialMediaChange}
              placeholder="Enter Instagram URL"
              sx={{ bgcolor: 'white', borderRadius: 1 }}
            />
          </Stack>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth={isSmallScreen}
          onClick={handleSaveChanges}
          sx={{
            mt: 3,
            borderRadius: 1,
            fontSize: isSmallScreen ? '0.875rem' : '1rem',
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};
export default AdminContact;
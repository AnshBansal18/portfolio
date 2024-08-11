import React from 'react';
import axios from 'axios';
import {Box,Button,Container,FormControl,FormLabel,Input,TextField,Typography,Stack,useTheme,useMediaQuery} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

const ResponsiveForm = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      _id: portfolioData?.intro?._id,
      fullName: formData.get('fullName'),
      caption: formData.get('caption'),
      description: formData.get('description'),
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/update-intro`, data);
      if (response.data.success) {
        enqueueSnackbar('Changes saved successfully.', { variant: 'success' });
        dispatch({ type: 'UPDATE_INTRO', payload: response.data.data });
      } else {
        enqueueSnackbar('Failed to update the intro.', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error updating intro:', error);
      enqueueSnackbar('An error occurred while updating the intro.', { variant: 'error' });
    }
  };

  const initialFullName = portfolioData?.intro?.fullName || '';
  const initialCaption = portfolioData?.intro?.caption || '';
  const initialDescription = portfolioData?.intro?.description || '';

  return (
    <Container maxWidth="sm" sx={{ py: 4, bgcolor: '#121212', color: '#E0E0E0' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#E0E0E0', mb: 4 }}>
        Admin - Intro Section
      </Typography>

      <Box sx={{ p: 4, borderRadius: 2, boxShadow: 3, bgcolor: '#1E1E1E' }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <FormLabel sx={{ color: '#E0E0E0' }}>Full Name</FormLabel>
              <TextField
                name="fullName"
                defaultValue={initialFullName}
                placeholder="Enter your full name"
                variant="outlined"
                fullWidth
                sx={{
                  bgcolor: 'white',
                  color: '#000',
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    '& fieldset': { borderColor: '#ccc' }
                  }
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel sx={{ color: '#E0E0E0' }}>Caption</FormLabel>
              <TextField
                name="caption"
                defaultValue={initialCaption}
                placeholder="Enter a caption"
                variant="outlined"
                fullWidth
                sx={{
                  bgcolor: 'white',
                  color: '#000',
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    '& fieldset': { borderColor: '#ccc' }
                  }
                }}
              />
            </FormControl>

            <FormControl fullWidth>
              <FormLabel sx={{ color: '#E0E0E0' }}>Description</FormLabel>
              <TextField
                name="description"
                defaultValue={initialDescription}
                placeholder="Enter a description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                sx={{
                  bgcolor: 'white',
                  color: '#000',
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    '& fieldset': { borderColor: '#ccc' }
                  }
                }}
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};
export default ResponsiveForm;
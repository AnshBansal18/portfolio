import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Box,Button,Container,FormControl,FormLabel,Input,TextField,Typography,IconButton,Stack,Divider,Grid,useTheme,useMediaQuery} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const AdminAbout = () => {
  const [about, setAbout] = useState({
    description: '',
    imageUrl: '',
    whatIKnow: []
  });
  const [newCategory, setNewCategory] = useState('');
  const [newSkill, setNewSkill] = useState({ categoryId: '', skillName: '' });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/get-portfolio-data`)
      .then(response => {
        if (response.data.about) {
          setAbout(response.data.about);
        }
      })
      .catch(error => console.error('Error fetching about data:', error));
  }, []);

  const handleDescriptionChange = (e) => setAbout({ ...about, description: e.target.value });
  const handleImageUrlChange = (e) => setAbout({ ...about, imageUrl: e.target.value });

  const handleSaveChanges = () => {
    axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/update-about`, about)
      .then(response => {
        setAbout(response.data.data);
        enqueueSnackbar('Changes Saved.', { variant: 'success' });
      })
      .catch(error => {
        console.error('Error saving changes:', error);
        enqueueSnackbar('Error saving changes.', { variant: 'error' });
      });
  };

  const handleAddCategory = () => {
    axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/add-category`, { category: { category: newCategory, skills: [] } })
      .then(response => {
        setAbout(response.data.data);
        setNewCategory('');
      })
      .catch(error => console.error('Error adding category:', error));
  };

  const handleDeleteCategory = (categoryId) => {
    axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/delete-category`, { categoryId })
      .then(response => setAbout(response.data.data))
      .catch(error => console.error('Error deleting category:', error));
  };

  const handleAddSkill = (categoryId) => {
    axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/add-skill`, { categoryId, skill: { skillName: newSkill.skillName } })
      .then(response => {
        setAbout(response.data.data);
        setNewSkill({ ...newSkill, skillName: '' });
      })
      .catch(error => console.error('Error adding skill:', error));
  };

  const handleDeleteSkill = (categoryId, skillId) => {
    axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/delete-skill`, { categoryId, skillId })
      .then(response => setAbout(response.data.data))
      .catch(error => console.error('Error deleting skill:', error));
  };

  const handleSkillInputChange = (e, categoryId) => setNewSkill({ ...newSkill, skillName: e.target.value, categoryId });

  return (
    <Container maxWidth="lg" sx={{ py: 4, bgcolor: 'custom-bg', color: '#E0E0E0' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Admin - About Section
      </Typography>

      <Box sx={{ mb: 4, p: 4, borderRadius: 2, boxShadow: 3, bgcolor: '#1E1E1E' }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel sx={{ color: '#E0E0E0' }}>Description</FormLabel>
          <TextField
            multiline
            rows={4}
            value={about.description}
            onChange={handleDescriptionChange}
            placeholder="Enter description"
            variant="outlined"
            fullWidth
            sx={{ bgcolor: 'white', color: '#000', '& .MuiOutlinedInput-root': { bgcolor: 'white', '& fieldset': { borderColor: '#ccc' } } }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel sx={{ color: '#E0E0E0' }}>Image URL</FormLabel>
          <Input
            type="text"
            value={about.imageUrl}
            onChange={handleImageUrlChange}
            placeholder="Enter image URL"
            fullWidth
            sx={{ bgcolor: 'white', color: '#000' }}
          />
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Box>

      <Box sx={{ p: 4, borderRadius: 2, boxShadow: 3, bgcolor: '#1E1E1E' }}>
        <Typography variant="h6" gutterBottom>
          Manage Categories
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category"
              variant="outlined"
              sx={{ bgcolor: 'white', color: '#000' }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="primary" onClick={handleAddCategory}>
              Add Category
            </Button>
          </Grid>
        </Grid>

        {about.whatIKnow.map(cat => (
          <Box key={cat._id} sx={{ mb: 4, p: 4, borderRadius: 2, bgcolor: '#2E2E2E' }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={10}>
                <Typography variant="h6">{cat.category}</Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => handleDeleteCategory(cat._id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2, bgcolor: '#444' }} />
            <Stack spacing={2}>
              {cat.skills.map(skill => (
                <Grid container alignItems="center" key={skill._id} spacing={2}>
                  <Grid item xs={10}>
                    <Typography>{skill.skillName}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={() => handleDeleteSkill(cat._id, skill._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    value={newSkill.categoryId === cat._id ? newSkill.skillName : ''}
                    onChange={(e) => handleSkillInputChange(e, cat._id)}
                    placeholder="New Skill"
                    variant="outlined"
                    sx={{ bgcolor: 'white', color: '#000' }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button variant="contained" color="primary" onClick={() => handleAddSkill(cat._id)}>
                    Add Skill
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        ))}
      </Box>
    </Container>
  );
};
export default AdminAbout;
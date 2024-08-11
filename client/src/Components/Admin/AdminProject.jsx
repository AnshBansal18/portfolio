import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Container, FormControl, FormLabel, Input, TextField, Typography, IconButton, Divider, Grid, useTheme, useMediaQuery
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const AdminProject = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    image: '',
    title: '',
    description: '',
    techStack: '',
    link: ''
  });
  const [editingProject, setEditingProject] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/get-portfolio-data`)
      .then(response => setProjects(response.data.projects))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  const handleInputChange = (e, field) => {
    if (editingProject) {
      setEditingProject({ ...editingProject, [field]: e.target.value });
    } else {
      setNewProject({ ...newProject, [field]: e.target.value });
    }
  };

const handleSaveProject = () => {
    const projectData = editingProject || newProject;
    const endpoint = editingProject
        ? `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/update-project/${editingProject._id}`
        : `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/add-project`;

    axios.post(endpoint, projectData)
        .then(response => {
            setProjects(response.data.projects); // Ensure projects are updated
            enqueueSnackbar('Project saved successfully.', { variant: 'success' });
            setNewProject({ image: '', title: '', description: '', techStack: '', link: '' });
            setEditingProject(null);
        })
        .catch(error => {
            console.error('Error saving project:', error);
            enqueueSnackbar('Error saving project.', { variant: 'error' });
        });
};

  const handleEditProject = (project) => {
    setEditingProject(project);
  };

  const handleDeleteProject = (projectId) => {
    axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/delete-project`, { projectId })
        .then(response => {
            setProjects(response.data.projects); // Ensure projects are updated
            enqueueSnackbar('Project deleted successfully.', { variant: 'success' });
        })
        .catch(error => {
            console.error('Error deleting project:', error);
            enqueueSnackbar('Error deleting project.', { variant: 'error' });
        });
};

  return (
    <Container maxWidth="lg" sx={{ py: 4, bgcolor: '#121212', color: '#E0E0E0' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#E0E0E0' }}>
        Admin - Projects Section
      </Typography>

      <Box sx={{ mb: 4, p: 4, borderRadius: 2, boxShadow: 3, bgcolor: '#1E1E1E' }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel sx={{ color: '#E0E0E0' }}>Project Image URL</FormLabel>
          <Input
            type="text"
            value={editingProject ? editingProject.image : newProject.image}
            onChange={(e) => handleInputChange(e, 'image')}
            placeholder="Enter image URL"
            fullWidth
            sx={{ bgcolor: 'white', color: '#000' }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel sx={{ color: '#E0E0E0' }}>Project Title</FormLabel>
          <Input
            type="text"
            value={editingProject ? editingProject.title : newProject.title}
            onChange={(e) => handleInputChange(e, 'title')}
            placeholder="Enter project title"
            fullWidth
            sx={{ bgcolor: 'white', color: '#000' }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel sx={{ color: '#E0E0E0' }}>Project Description</FormLabel>
          <TextField
            multiline
            rows={4}
            value={editingProject ? editingProject.description : newProject.description}
            onChange={(e) => handleInputChange(e, 'description')}
            placeholder="Enter project description"
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

        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel sx={{ color: '#E0E0E0' }}>Tech Stack (comma-separated)</FormLabel>
          <Input
            type="text"
            value={editingProject ? editingProject.techStack : newProject.techStack}
            onChange={(e) => handleInputChange(e, 'techStack')}
            placeholder="Enter tech stack"
            fullWidth
            sx={{ bgcolor: 'white', color: '#000' }}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel sx={{ color: '#E0E0E0' }}>Project Link</FormLabel>
          <Input
            type="text"
            value={editingProject ? editingProject.link : newProject.link}
            onChange={(e) => handleInputChange(e, 'link')}
            placeholder="Enter project link"
            fullWidth
            sx={{ bgcolor: 'white', color: '#000' }}
          />
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleSaveProject}>
          {editingProject ? 'Update Project' : 'Add Project'}
        </Button>
      </Box>

      <Box sx={{ p: 4, borderRadius: 2, boxShadow: 3, bgcolor: '#1E1E1E' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#E0E0E0' }}>
          Existing Projects
        </Typography>

        {projects.map(project => (
          <Box key={project._id} sx={{ mb: 4, p: 4, borderRadius: 2, bgcolor: '#2E2E2E' }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={10}>
                <Typography variant="h6" sx={{ color: '#E0E0E0' }}>{project.title}</Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => handleDeleteProject(project._id)} sx={{ color: '#FF5722' }}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2, bgcolor: '#666' }} />
            <Typography sx={{ color: '#E0E0E0' }}>{project.description}</Typography>
            <Typography sx={{ color: '#E0E0E0' }}>
              Tech Stack: {project.techStack.join(', ')}
            </Typography>
            <Typography sx={{ color: '#E0E0E0' }}>
              <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: '#64B5F6' }}>
                Project Link
              </a>
            </Typography>
            <Button variant="contained" color="secondary" onClick={() => handleEditProject(project)}>
              Edit Project
            </Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default AdminProject;

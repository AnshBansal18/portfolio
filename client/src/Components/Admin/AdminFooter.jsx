import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Container, FormControl, FormLabel, Input, Typography, IconButton, Stack, Grid, useTheme } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const AdminFooter = () => {
    const [footer, setFooter] = useState({
        socialMediaLinks: {},
        name: '',
        logo: '',
        copyrightText: ''
    });
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/get-portfolio-data`)
            .then(response => setFooter(response.data.footer || {}))
            .catch(error => console.error('Error fetching footer data:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const [key, subkey] = name.split('.');

        setFooter(prevState => ({
            ...prevState,
            [key]: subkey ? {
                ...prevState[key],
                [subkey]: value
            } : value
        }));
    };

    const handleSaveChanges = () => {
        axios.post(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/portfolio/update-footer`, footer)
            .then(response => {
                setFooter(response.data.data);
                enqueueSnackbar('Changes Saved.', { variant: 'success' });
            })
            .catch(error => {
                console.error('Error saving changes:', error);
                enqueueSnackbar('Error saving changes.', { variant: 'error' });
            });
    };

    const handleRemoveSocialMediaLink = (key) => {
        setFooter(prevState => ({
            ...prevState,
            socialMediaLinks: Object.fromEntries(
                Object.entries(prevState.socialMediaLinks).filter(([k]) => k !== key)
            )
        }));
    };

    const socialMediaPlatforms = {
        Github: 'github',
        LinkedIn: 'linkedin',
        Instagram: 'instagram',
        X: 'x'
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
                Admin - Footer Section
            </Typography>

            <Box sx={{ mb: 4, p: 4, borderRadius: 2, boxShadow: 3, bgcolor: theme.palette.grey[800] }}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <FormLabel sx={{ color: 'white' }}>Name</FormLabel>
                    <Input
                        type="text"
                        name="name"
                        value={footer.name}
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
                        value={footer.logo}
                        onChange={handleInputChange}
                        placeholder="Enter logo URL"
                        sx={{ bgcolor: 'white' }}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                    <FormLabel sx={{ color: 'white' }}>Copyright Text</FormLabel>
                    <Input
                        type="text"
                        name="copyrightText"
                        value={footer.copyrightText}
                        onChange={handleInputChange}
                        placeholder="Enter copyright text"
                        sx={{ bgcolor: 'white' }}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                    <FormLabel sx={{ color: 'white' }}>Social Media Links</FormLabel>
                    <Stack spacing={2}>
                        {Object.entries(socialMediaPlatforms).map(([platform, key]) => (
                            <Grid container key={key} spacing={2} alignItems="center">
                                <Grid item xs={10}>
                                    <FormControl fullWidth>
                                        <FormLabel sx={{ color: 'white' }}>{platform}</FormLabel>
                                        <Input
                                            type="text"
                                            name={`socialMediaLinks.${key}`}
                                            value={footer.socialMediaLinks[key] || ''}
                                            onChange={handleInputChange}
                                            placeholder={`Enter ${platform} URL`}
                                            sx={{ bgcolor: 'white' }}
                                        />
                                    </FormControl>
                                </Grid>
                                {footer.socialMediaLinks[key] && (
                                    <Grid item xs={2}>
                                        <IconButton onClick={() => handleRemoveSocialMediaLink(key)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                )}
                            </Grid>
                        ))}
                    </Stack>
                </FormControl>

                <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Box>
        </Container>
    );
};

export default AdminFooter;
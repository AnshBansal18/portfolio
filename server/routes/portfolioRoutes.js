const express = require('express');
const router = express.Router();
const { Intro, About, Project, Contact, NavigationData, Footer } = require('../models/portfolioModel');
const User = require('../models/userModel');

// Get portfolio data
router.get('/get-portfolio-data', async (req, res) => {
    try {
        const about = await About.findOne();
        const projects = await Project.find();

        res.status(200).send({
            about: about || null,
            projects: projects || [],
        });
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
        res.status(500).send({
            message: 'An error occurred while fetching portfolio data.',
            error: error.message
        });
    }
});


// Update about
router.post('/update-about', async (req, res) => {
    try {
        const about = await About.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!about) {
            return res.status(404).send({ message: 'About section not found.' });
        }
        res.status(200).send({
            data: about,
            success: true,
            message: "About updated successfully"
        });
    } catch (error) {
        console.error('Error updating about:', error);
        res.status(500).send({
            message: 'An error occurred while updating about.',
            error: error.message
        });
    }
});

// Add new category in about
router.post('/add-category', async (req, res) => {
    try {
        const about = await About.findOne();
        if (about) {
            about.whatIKnow.push(req.body.category);
            await about.save();
            res.status(200).send({
                data: about,
                success: true,
                message: "Category added successfully"
            });
        } else {
            res.status(404).send({ message: 'About section not found.' });
        }
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).send({
            message: 'An error occurred while adding category.',
            error: error.message
        });
    }
});

// Delete category from about
router.post('/delete-category', async (req, res) => {
    try {
        const about = await About.findOne();
        if (about) {
            about.whatIKnow = about.whatIKnow.filter(cat => cat._id.toString() !== req.body.categoryId);
            await about.save();
            res.status(200).send({
                data: about,
                success: true,
                message: "Category deleted successfully"
            });
        } else {
            res.status(404).send({ message: 'About section not found.' });
        }
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).send({
            message: 'An error occurred while deleting category.',
            error: error.message
        });
    }
});

// Add skill to a category
router.post('/add-skill', async (req, res) => {
    try {
        const about = await About.findOne();
        if (about) {
            const category = about.whatIKnow.find(cat => cat._id.toString() === req.body.categoryId);
            if (category) {
                category.skills.push(req.body.skill);
                await about.save();
                res.status(200).send({
                    data: about,
                    success: true,
                    message: "Skill added successfully"
                });
            } else {
                res.status(404).send({ message: 'Category not found.' });
            }
        } else {
            res.status(404).send({ message: 'About section not found.' });
        }
    } catch (error) {
        console.error('Error adding skill:', error);
        res.status(500).send({
            message: 'An error occurred while adding skill.',
            error: error.message
        });
    }
});

// Delete skill from a category
router.post('/delete-skill', async (req, res) => {
    try {
        const about = await About.findOne();
        if (about) {
            const category = about.whatIKnow.find(cat => cat._id.toString() === req.body.categoryId);
            if (category) {
                category.skills = category.skills.filter(skill => skill._id.toString() !== req.body.skillId);
                await about.save();
                res.status(200).send({
                    data: about,
                    success: true,
                    message: "Skill deleted successfully"
                });
            } else {
                res.status(404).send({ message: 'Category not found.' });
            }
        } else {
            res.status(404).send({ message: 'About section not found.' });
        }
    } catch (error) {
        console.error('Error deleting skill:', error);
        res.status(500).send({
            message: 'An error occurred while deleting skill.',
            error: error.message
        });
    }
});

// Route to add a new project
router.post('/add-project', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        const projects = await Project.find(); 
        res.status(201).send({ projects });
    } catch (error) {
        res.status(500).send({ message: 'Error adding project', error: error.message });
    }
});

// Route to update an existing project
router.post('/update-project/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).send({ message: 'Project not found' });
        const projects = await Project.find(); // Fetch updated project list
        res.status(200).send({ projects });
    } catch (error) {
        res.status(500).send({ message: 'Error updating project', error: error.message });
    }
});

// Route to delete a project
router.post('/delete-project/:id', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        const projects = await Project.find(); // Fetch updated project list
        res.status(200).send({ projects });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting project', error: error.message });
    }
});


// Admin 
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

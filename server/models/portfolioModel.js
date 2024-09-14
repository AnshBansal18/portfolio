const mongoose = require('mongoose');
const { Schema } = mongoose;


// About Schema
const aboutSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  whatIKnow: [{
    category: {
      type: String,
      required: true,
      trim: true,
    },
    skills: [{
      skillName: {
        type: String,
        required: true,
        trim: true,
      }
    }]
  }]
});

// Project Schema
const projectSchema = new Schema({
  image: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  techStack: [{
    type: String,
    required: true,
    trim: true,
  }],
  link: {
    type: String,
    required: true,
    trim: true,
  }
});


// Model exports
const About = mongoose.model('About', aboutSchema);
const Project = mongoose.model('Project', projectSchema);

module.exports = {
  About,
  Project,
};
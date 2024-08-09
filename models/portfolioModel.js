const mongoose = require('mongoose');
const { Schema } = mongoose;

// Intro Schema
const introSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  caption: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

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

// Contact Schema
const contactSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address.']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number.']
  },
  socialMedia: {
    github: {
      type: String,
      trim: true,
      match: [/^https:\/\/github\.com\/.+$/, 'Please enter a valid GitHub URL.']
    },
    linkedin: {
      type: String,
      trim: true,
      match: [/^https:\/\/www\.linkedin\.com\/in\/.+$/, 'Please enter a valid LinkedIn URL.']
    },
    twitter: {
      type: String,
      trim: true,
      match: [/^https:\/\/twitter\.com\/.+$/, 'Please enter a valid Twitter URL.']
    },
    instagram: {
      type: String,
      trim: true,
      match: [/^https:\/\/www\.instagram\.com\/.+$/, 'Please enter a valid Instagram URL.']
    }
  }
});

// Navigation Data Schema
const navItemSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    trim: true
  },
  path: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    trim: true
  }
});

const navigationDataSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    type: String,
    required: true,
    trim: true
  },
  navItems: [navItemSchema]
});

const footerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: String,
    required: true,
    trim: true,
  },
  socialMediaLinks: {
    github: {
      type: String,
      trim: true,
      match: [/^https:\/\/github\.com\/.+$/, 'Please enter a valid GitHub URL.']
    },
    linkedin: {
      type: String,
      trim: true,
      match: [/^https:\/\/www\.linkedin\.com\/in\/.+$/, 'Please enter a valid LinkedIn URL.']
    },
    twitter: {
      type: String,
      trim: true,
      match: [/^https:\/\/x\.com\/.+$/, 'Please enter a valid Twitter URL.'] // Updated regex pattern
    },
    instagram: {
      type: String,
      trim: true,
      match: [/^https:\/\/www\.instagram\.com\/.+$/, 'Please enter a valid Instagram URL.']
    }
  },
  copyrightText: {
    type: String,
    required: true,
    trim: true,
  }
});

// Model exports
const Intro = mongoose.model('Intro', introSchema);
const About = mongoose.model('About', aboutSchema);
const Project = mongoose.model('Project', projectSchema);
const Contact = mongoose.model('Contact', contactSchema);
const NavigationData = mongoose.model('NavigationData', navigationDataSchema);
const Footer = mongoose.model('Footer', footerSchema);

module.exports = {
  Intro,
  About,
  Project,
  Contact,
  NavigationData,
  Footer,
};

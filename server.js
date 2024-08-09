const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const nodemailer = require('nodemailer');
const portfolioRoutes = require('./routes/portfolioRoutes'); 

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Define allowed origins
const allowedOrigins = [
  "https://portfolio-anshbansal18-ansh-bansals-projects.vercel.app",
  "https://vercel.com/ansh-bansals-projects/portfolio/FSdPjQtP7LFSNueixWzoFc5h9t6n",
  "https://portfolio-1bsok3ssr-ansh-bansals-projects.vercel.app"
];

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Portfolio API route
app.use('/api/portfolio', portfolioRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Email sending route
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all fields.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `Message from ${name}`,
      text: message,
      html: `<p>You have a new message from your contact form:</p>
             <p><strong>Name: </strong> ${name}</p>
             <p><strong>Email: </strong> ${email}</p>
             <p><strong>Message: </strong> ${message}</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

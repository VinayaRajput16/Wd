// wd/app.js

require('dotenv').config(); // Load environment variables

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json()); // Add this to handle JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'static')));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
   name: String,
   country: String,
   email: String,
   phone: String, // Add phone to the schema
   registrationDate: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
// In your Express app
app.get('/form', (req, res) => {
   res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
   const { name, country, email, phone } = req.body;

   // Save user data to MongoDB
   const newUser = new User({ name, country, email, phone });

   newUser.save()
       .then(() => {
           // Configure nodemailer to send email
           const transporter = nodemailer.createTransport({
              service: 'gmail', // or your email provider
              auth: {
                 user: process.env.EMAIL_USER,  // Using environment variable
                 pass: process.env.EMAIL_PASS   // Using environment variable
              }
           });

           const mailOptions = {
              from: process.env.EMAIL_USER,   // Using environment variable
              to: email,
              subject: 'Your Scheduled Webinar Link',
              text: `Hello ${name},\n\nThank you for registering! Your webinar link: [Insert Webinar Link Here].\n\nBest regards,\nWebinar Team`
           };

           transporter.sendMail(mailOptions, (error, info) => {
             if (error) {
                 console.error(error);
                 res.status(500).json({ status: 'error', message: 'Error sending email' });
             } else {
                 res.status(200).json({ status: 'success', message: 'Registration successful! The webinar link has been sent to your email.' });
             }
         });
       })
       .catch((error) => {
           console.error(error);
           res.status(500).json({ status: 'error', message: 'Error saving data to database' });
       });
});

app.get('/webinar', (req, res) => {
   res.sendFile(path.join(__dirname, 'views', 'webinar.html'));
});

app.listen(3000, () => {
   console.log('Server is running on port 3000');
});

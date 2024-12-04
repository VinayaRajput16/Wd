//app.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');


// Import modules
const { connectToDatabase } = require('./modules/database');
const { getWebinarTimeAndDate } = require('./modules/webinar');
const { sendWebinarEmail } = require('./modules/email');
const User = require('./models/user');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(cors()); 

connectToDatabase();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

app.post('/submit', async (req, res) => {
    const { name, country, email, phone } = req.body;
    const { webinarDate, webinarTime } = getWebinarTimeAndDate();

    let isUserNew = false;

    // Send the email first (non-blocking)
    sendWebinarEmail({ name, email, webinarDate, webinarTime }).catch(error => {
        console.error('Email Sending Error:', error);
    });

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            // User doesn't exist, save them to the database
            const newUser = new User({ name, country, email, phone });
            await newUser.save();
            isUserNew = true;
        }
    } catch (error) {
        console.error('Database Error:', error);
        // Do not block email sending even if database check/save fails
    }

    const message = isUserNew
        ? 'Registration successful! The webinar link has been sent to your email.'
        : 'Welcome back! The webinar link has been sent to your email.';

    res.status(200).json({
        status: 'success',
        message,
    });
});


app.get('/webinar', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'webinar.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


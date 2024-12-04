const nodemailer = require('nodemailer');

async function sendWebinarEmail({ name, email, webinarDate, webinarTime }) {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or your email provider
        auth: {
            user: process.env.EMAIL_USER, // Environment variable
            pass: process.env.EMAIL_PASS, // Environment variable
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Scheduled Webinar Link',
        html: `Hello ${name},<br><br>
        Thank you for registering for our upcoming webinar! We're excited to have you join us.<br><br>
        Your personalized webinar link is: 
        <a href="https://stoictrader.in/webinar" target="_blank" style="color: #2986cc; text-decoration: underline;">Join the Webinar here</a><br><br>
        Date: ${webinarDate}<br>
        Time: ${webinarTime}<br><br>
        Best regards,<br>
        W Man.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = { sendWebinarEmail };

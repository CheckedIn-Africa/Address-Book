const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, code) => {
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Verification Code',
        text: `Your verification code is: ${code}`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        throw new Error('Error sending verification email: ' + err.message);
    }
};

module.exports = { sendVerificationEmail };
const Resend = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY); // Replace with your Resend API key
const { render } = require('@react-email/render');
const WelcomeEmail = require('../emails/WelcomeEmail'); // Your React Email template

// Function to send the email
const sendWelcomeEmail = async (user) => {
    const emailHtml = render(<WelcomeEmail user={user} />); // Render the email template to HTML

    try {
        const response = await resend.sendEmail({
            from: 'your-email@domain.com', // Your verified email address in Resend
            to: user.email, // The recipient's email
            subject: 'Welcome to Our Service!',
            html: emailHtml, // The rendered HTML email content
        });

        console.log('Welcome email sent to:', user.email);
        console.log(response); // You can log the response for debugging purposes
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending welcome email');
    }
};

module.exports = { sendWelcomeEmail };

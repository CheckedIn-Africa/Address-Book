const Resend = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY); // Resend API Key from environment variable
const { render } = require('@react-email/render');
const WelcomeEmail = require('../emails/waitlist'); // Your React email template
const logger = require('../logger'); // Import your logger

// Log the API key load status using logger
if (!process.env.RESEND_API_KEY) {
    logger.error('Resend API key is missing!');
} else {
    logger.info('Resend API key loaded successfully.');
}

// Function to send the email
const sendAddressClaimEmail = async (user) => {
    
}

const sendWelcomeEmail = async (user) => {
    logger.info(`Preparing to send welcome email to: ${user.email}`);

    // Render the email template to HTML
    const emailHtml = render(<WelcomeEmail user={user} />);
    logger.info(`Rendered HTML email content for: ${user.email}`);

    try {
        // Send the email using Resend API
        const response = await resend.sendEmail({
            from: 'your-email@domain.com', // Verified email address in Resend
            to: user.email, // The recipient's email
            subject: 'Welcome to Our Service!',
            html: emailHtml, // Rendered HTML email content
        });

        // Success log
        logger.info(`Welcome email sent to: ${user.email}`);
        logger.info(`Resend API response: ${JSON.stringify(response)}`); // Inspect response for debugging

    } catch (error) {
        // Log the full error response or message for debugging
        logger.error(`Error sending email to ${user.email}: ${error.response || error.message || error}`);
        if (error.response) {
            logger.error(`Error details: ${JSON.stringify(error.response.data)}`); // If the error includes additional details from Resend
        }
        throw new Error('Error sending welcome email');
    }
};

module.exports = { sendWelcomeEmail };

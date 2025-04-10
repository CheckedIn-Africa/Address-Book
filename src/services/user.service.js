const User = require('../models/user.model');
const ApiKey = require('../models/api.model');
const { generateApiKey } = require('../utils/generateApiKey');
const logger = require('../utils/logger');  // Importing the logger

/**
 * Service to create a new user and generate an API key
 */
const createUserService = async (username, email, password) => {
    try {
        // Log the attempt to create a new user
        logger.info(`Attempting to create user with email: ${email}`);

        // Create a new user
        const user = new User({ username, email, password });

        // Save the user
        await user.save();

        // Log the successful creation of the user
        logger.info(`User created successfully with email: ${email}`);

        // Generate an API key for the user
        const apiKey = generateApiKey();  // Using the utility function to generate a new API key

        // Log the generated API key (mask the key in production for security purposes)
        logger.info(`Generated new API key for user: ${email}`);

        // Store the generated API key in the ApiKey model
        const newApiKey = new ApiKey({ apiKey, user: user._id });
        await newApiKey.save();

        // Log the successful saving of the API key
        logger.info(`API key stored successfully for user: ${email}`);

        // Add the API key reference to the user's apiKeys array
        user.apiKeys.push(newApiKey._id);
        await user.save();

        // Log that the user's API key was added successfully
        logger.info(`API key reference added to user ${email}`);

        return { user, apiKey };
    } catch (error) {
        // Log the error for troubleshooting
        logger.error(`Error creating user with email ${email}: ${error.message}`);
        throw new Error('Error creating user: ' + error.message);
    }
};

/**
 * Service to handle user login and validate password
 */
const loginUserService = async (email, password) => {
    try {
        // Log the attempt to login
        logger.info(`Attempting to login with email: ${email}`);

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        // Compare password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Log the successful login
        logger.info(`User logged in successfully with email: ${email}`);

        return { user };
    } catch (error) {
        // Log the error for troubleshooting
        logger.error(`Error logging in with email ${email}: ${error.message}`);
        throw new Error('Error logging in: ' + error.message);
    }
};

module.exports = {
    createUserService,
    loginUserService
};

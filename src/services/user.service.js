const User = require('../models/user.model');
const ApiKey = require('../models/api.model');
const { generateApiKey } = require('../utils/generateApiKey');

/**
 * Service to create a new user and generate an API key
 */
const createUserService = async (username, email, password) => {
    try {
        // Create a new user
        const user = new User({ username, email, password });

        // Save the user
        await user.save();

        // Generate an API key for the user
        const apiKey = generateApiKey();  // Using the utility function to generate a new API key

        // Store the generated API key in the ApiKey model
        const newApiKey = new ApiKey({ apiKey, user: user._id });
        await newApiKey.save();

        // Add the API key reference to the user's apiKeys array
        user.apiKeys.push(newApiKey._id);
        await user.save();

        return { user, apiKey };
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

/**
 * Service to handle user login and validate password
 */
const loginUserService = async (email, password) => {
    try {
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

        return { user };
    } catch (error) {
        throw new Error('Error logging in: ' + error.message);
    }
};

module.exports = {
    createUserService,
    loginUserService
};

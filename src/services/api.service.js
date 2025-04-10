const ApiKey = require('../models/api.model');
const { generateApiKey } = require('../utils/generateApiKey');

/**
 * Service to generate and store an API key.
 */
const generateAndStoreApiKey = async (user) => {
    try {
        // Generate a new API key using the provided function
        const newApiKey = generateApiKey();

        // Save the generated API key to the database
        const apiKey = new ApiKey({ apiKey: newApiKey, user });

        await apiKey.save();

        // Return the generated API key
        return { apiKey: newApiKey };
    } catch (error) {
        throw new Error(`Error generating API key: ${error.message}`);
    }
};

module.exports = { generateAndStoreApiKey };

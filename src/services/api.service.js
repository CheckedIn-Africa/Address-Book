const ApiKey = require('../models/api.model');
const { generateApiKey } = require('../utils/generateApiKey');
const logger = require('../utils/logger');  // Import the logger

/**
 * Service to generate and store an API key.
 */
const generateAndStoreApiKey = async (user) => {
    try {
        // Log the attempt to generate an API key
        logger.info(`Attempting to generate API key for user: ${user}`);

        // Generate a new API key using the provided function
        const newApiKey = generateApiKey();

        // Log the newly generated API key (you may want to avoid logging sensitive data)
        logger.info(`Generated new API key for user ${user}: ${newApiKey}`);

        // Save the generated API key to the database
        const apiKey = new ApiKey({ apiKey: newApiKey, user });

        await apiKey.save();

        // Log the successful saving of the API key
        logger.info(`API key for user ${user} stored successfully.`);

        // Return the generated API key
        return { apiKey: newApiKey };
    } catch (error) {
        // Log the error
        logger.error(`Error generating API key for user ${user}: ${error.message}`);
        throw new Error(`Error generating API key: ${error.message}`);
    }
};

module.exports = { generateAndStoreApiKey };

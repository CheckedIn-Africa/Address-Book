const { generateAndStoreApiKey } = require('../services/api.service');

/**
 * Controller to handle generating and storing the API key.
 */
exports.generateAndStoreApiKey = async (req, res) => {
    const { user } = req.body;  // Assume the user is provided in the request body

    // Validate user input (you can add validation to ensure user exists, etc.)
    if (!user) {
        return res.status(400).json({ message: 'User is required.' });
    }

    try {
        // Call the service function to generate and store the API key
        const result = await generateAndStoreApiKey(user);

        // Respond with the generated API key
        return res.status(201).json({
            message: 'API key generated successfully.',
            apiKey: result.apiKey,
        });
    } catch (err) {
        return res.status(500).json({ message: 'Error generating API key', error: err.message });
    }
};

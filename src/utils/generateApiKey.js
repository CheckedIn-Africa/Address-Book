const crypto = require('crypto');

/**
 * Generate a random API key
 * @returns {string} The generated API key
 */
exports.generateApiKey = () => {
    // Create a random API key with 32 characters
    return crypto.randomBytes(16).toString('hex');
};

const crypto = require('crypto');

/**
 * Generate a short API key with app identifier
 * @param {string} appIdentifier - The unique identifier for the app
 * @returns {string} The generated short API key
 */
exports.generateApiKey = () => {
    // Generate a random hash using crypto (16 bytes for shorter length)
    const randomHash = crypto.randomBytes(8).toString('hex'); // 16 hex characters

    // Concatenate app identifier with the random hash
    const combined = `${process.env.APPID}-${randomHash}`;

    // Base64url encode the combined string (url-safe)
    const base64Url = Buffer.from(combined).toString('base64url');

    // Return the final short API key
    return base64Url.substring(0, 22); // Limiting to 22 chars for compactness
};

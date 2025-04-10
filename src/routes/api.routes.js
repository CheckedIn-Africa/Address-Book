const express = require('express');
const router = express.Router();
const apiKeyController = require('../controllers/api.controller');  // Import the controller
const apiKeyMiddleware = require('../middleware/api.middleware');  // Import the API key middleware

// Route to generate and store a new API key
router.post('/generate-api-key', apiKeyController.generateAndStoreApiKey);

// Secured route (only accessible with a valid API key)
router.get('/secure-data', apiKeyMiddleware.validateApiKey, (req, res) => {
    res.status(200).json({ message: 'You have access to secure data!' });
});

module.exports = router;

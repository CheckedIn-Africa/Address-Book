const express = require('express');
const router = express.Router();
const apiKeyController = require('../controllers/api.controller');  // Import the controller

// POST route to generate and store the API key
router.post('/generate', apiKeyController.generateAndStoreApiKey);

module.exports = router;

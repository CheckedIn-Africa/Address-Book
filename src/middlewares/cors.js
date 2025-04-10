const express = require('express'); // Import express
const cors = require('cors');

// CORS configuration options
const corsOptions = {
    origin: 'http://localhost:3000', // Change to your frontend URL in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Combine CORS and JSON middleware
const corsMiddleware = [cors(corsOptions), express.json()];

module.exports = corsMiddleware;

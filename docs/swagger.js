const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'API documentation for your Express application',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Update with your server URL
            },
        ],
    },
    // Paths to files containing OpenAPI definitions (JSDoc comments)
    apis: ['./routes/*.js'], // Path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
const express = require('express');
const router = express.Router();
const apiKeyController = require('../controllers/api.controller');

/**
 * @swagger
 * tags:
 *   name: API Keys
 *   description: API Key generation and management
 * 
 * components:
 *   securitySchemes:
 *     AdminAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Requires admin-level JWT token
 */

/**
 * @swagger
 * /api/keys/generate:
 *   post:
 *     summary: Generate a new API key (Admin only)
 *     description: |
 *       Generates a cryptographically secure API key and stores it in the database.
 *       Requires admin privileges.
 *     tags: [API Keys]
 *     security:
 *       - AdminAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - permissions
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 example: "5f8d0d55b54764421b7156c3"
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [read, write, delete, admin]
 *                 example: ["read", "write"]
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 description: Optional expiration date (ISO 8601)
 *                 example: "2025-12-31T23:59:59Z"
 *     responses:
 *       201:
 *         description: API key generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 apiKey:
 *                   type: string
 *                   description: The generated API key (store this securely)
 *                   example: "ak_7x82hnb3984hd87y34d287h3d"
 *                 expiresAt:
 *                   type: string
 *                   format: date-time
 *                 permissions:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized (missing/invalid admin token)
 *       403:
 *         description: Forbidden (insufficient permissions)
 *       500:
 *         description: Internal server error (key generation failure)
 */
router.post('/generate', apiKeyController.generateAndStoreApiKey);

module.exports = router;
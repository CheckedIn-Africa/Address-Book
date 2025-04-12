const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address.controller');
const validate = require('../validators/address.validator');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: Address management (CRUD operations)
 * 
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: x-api-key
 */

/**
 * @swagger
 * /api/address:
 *   post:
 *     summary: Create a new address (Requires JWT)
 *     tags: [Addresses]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - street
 *               - city
 *               - postalCode
 *             properties:
 *               street:
 *                 type: string
 *                 example: "123 Main St"
 *               city:
 *                 type: string
 *                 example: "New York"
 *               postalCode:
 *                 type: string
 *                 example: "10001"
 *               country:
 *                 type: string
 *                 example: "USA"
 *     responses:
 *       201:
 *         description: Address created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "507f1f77bcf86cd799439011"
 *                 street:
 *                   type: string
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (missing/invalid JWT)
 */
router.post('/address', auth.authorize, validate.validateAddressId, addressController.createAddress);

/**
 * @swagger
 * /api/address/{id}:
 *   get:
 *     summary: Get address by ID (Requires API key + rate-limited)
 *     tags: [Addresses]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Address ID
 *     responses:
 *       200:
 *         description: Address details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 street:
 *                   type: string
 *                 city:
 *                   type: string
 *       400:
 *         description: Invalid ID format
 *       401:
 *         description: Missing/invalid API key
 *       404:
 *         description: Address not found
 *       429:
 *         description: API rate limit exceeded
 */
router.get('/address/:id', auth.validateApiKey, validate.validateAddressId, auth.checkApiLimit, addressController.getAddressById);

/**
 * @swagger
 * /api/address/{id}:
 *   put:
 *     summary: Update address by ID (Requires API key)
 *     tags: [Addresses]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Address ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 example: "456 Updated St"
 *               city:
 *                 type: string
 *                 example: "Los Angeles"
 *     responses:
 *       200:
 *         description: Address updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address not found
 */
router.put('/address/:id', auth.validateApiKey, validate.validateAddressId, validate.validateUpdateAddress, addressController.updateAddress);

/**
 * @swagger
 * /api/address/{id}:
 *   delete:
 *     summary: Delete address by ID (Requires JWT)
 *     tags: [Addresses]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Address ID
 *     responses:
 *       204:
 *         description: Address deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Address not found
 */
router.delete('/address/:id', auth.authorize, validate.validateAddressId, addressController.deleteAddress);

module.exports = router;
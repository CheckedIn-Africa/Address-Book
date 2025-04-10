const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address.controller');
const validate = require('../validators/address.validator');
const auth = require('../middlewares/auth');

// POST route to create an address
router.post('/address', auth.authorize, validate.validateAddressId, addressController.createAddress);

// GET route to fetch an address by ID
router.get('/address/:id', auth.validateApiKey, validate.validateAddressId, auth.checkApiLimit,  addressController.getAddressById);

// PUT route to update an address
router.put('/address/:id', auth.validateApiKey, validate.validateAddressId, validate.validateUpdateAddress, addressController.updateAddress);

// DELETE route to delete an address
router.delete('/address/:id', auth.authorize, validate.validateAddressId, addressController.deleteAddress);

module.exports = router;

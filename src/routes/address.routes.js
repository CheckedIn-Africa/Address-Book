const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address.controller');
const validate = require('../validators/address.validator');

// POST route to create an address
router.post('/address', validate.validateAddressId, addressController.createAddress);

// GET route to fetch an address by ID
router.get('/address/:id', validate.validateAddressId, addressController.getAddressById);

// PUT route to update an address
router.put('/address/:id', validate.validateAddressId, validate.validateUpdateAddress, addressController.updateAddress);

// DELETE route to delete an address
router.delete('/address/:id', validate.validateAddressId, addressController.deleteAddress);

module.exports = router;

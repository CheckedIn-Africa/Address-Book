const addressService = require('../services/address.service');

// Controller to create an address
exports.createAddress = async (req, res) => {
    try {
        const addressData = req.body;
        const newAddress = await addressService.createAddress(addressData);

        res.status(201).json({
            message: 'Address created successfully',
            data: newAddress,
        });
    } catch (error) {
        console.error('Error creating address:', error.message);
        res.status(500).json({
            message: 'Failed to create address',
            error: error.message,
        });
    }
};

// Controller to get an address by ID
exports.getAddressById = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await addressService.getAddressById(id);

        res.status(200).json({
            message: 'Address retrieved successfully',
            data: address,
        });
    } catch (error) {
        console.error('Error retrieving address:', error.message);
        res.status(500).json({
            message: 'Failed to retrieve address',
            error: error.message,
        });
    }
};

// Controller to update an address
exports.updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedAddress = await addressService.updateAddress(id, updatedData);

        res.status(200).json({
            message: 'Address updated successfully',
            data: updatedAddress,
        });
    } catch (error) {
        console.error('Error updating address:', error.message);
        res.status(500).json({
            message: 'Failed to update address',
            error: error.message,
        });
    }
};

// Controller to delete an address
exports.deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        await addressService.deleteAddress(id);

        res.status(200).json({
            message: 'Address deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting address:', error.message);
        res.status(500).json({
            message: 'Failed to delete address',
            error: error.message,
        });
    }
};

// Controller to search for addresses by filter
exports.searchAddresses = async (req, res) => {
    try {
        const filters = req.query;
        const addresses = await addressService.searchAddresses(filters);

        res.status(200).json({
            message: 'Addresses retrieved successfully',
            data: addresses,
        });
    } catch (error) {
        console.error('Error searching addresses:', error.message);
        res.status(500).json({
            message: 'Failed to search addresses',
            error: error.message,
        });
    }
};

// Controller to get addresses near a specific location
exports.getAddressesNearLocation = async (req, res) => {
    try {
        const { lat, lng } = req.body.coordinates;
        const radius = req.body.radius || 10000; // Default to 10km radius
        const addresses = await addressService.getAddressesNearLocation([lng, lat], radius);

        res.status(200).json({
            message: 'Nearby addresses retrieved successfully',
            data: addresses,
        });
    } catch (error) {
        console.error('Error fetching nearby addresses:', error.message);
        res.status(500).json({
            message: 'Failed to fetch nearby addresses',
            error: error.message,
        });
    }
};

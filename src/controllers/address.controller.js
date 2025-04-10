const Address = require('../models/Address');

// Create a new address
exports.createAddress = async (req, res) => {
    try {
        const addressData = req.body;
        // Automatically generate shortCode via pre-save hook
        const newAddress = new Address(addressData);
        const savedAddress = await newAddress.save();

        res.status(201).json({
            message: 'Address created successfully',
            data: savedAddress,
        });
    } catch (error) {
        console.error('Error creating address:', error.message);
        res.status(500).json({
            message: 'Failed to create address',
            error: error.message,
        });
    }
};

// Get address by MongoDB ID
exports.getAddressById = async (req, res) => {
    try {
        const addressId = req.params.id;
        const address = await Address.findById(addressId);

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json({
            message: 'Address retrieved successfully',
            data: address,
        });
    } catch (error) {
        console.error('Error fetching address:', error.message);
        res.status(500).json({
            message: 'Failed to fetch address',
            error: error.message,
        });
    }
};

const Address = require('../models/address.model');
const generateStructuredShortCode = require('../utils/generateShortCode');

/**
 * Service for creating an address
 */
exports.createAddress = async (addressData) => {
    try {
        // Check if the address already exists
        const existingAddress = await Address.findOne({ shortCode: addressData.shortCode });
        if (existingAddress) {
            throw new Error('Address with this shortcode already exists');
        }

        // If no shortcode, generate one
        if (!addressData.shortCode) {
            addressData.shortCode = generateStructuredShortCode(addressData);
        }

        // Create a new address
        const newAddress = new Address(addressData);
        const savedAddress = await newAddress.save();

        return savedAddress;
    } catch (error) {
        throw new Error('Error while creating address: ' + error.message);
    }
};

/**
 * Service for getting an address by its ID
 */
exports.getAddressById = async (addressId) => {
    try {
        const address = await Address.findById(addressId);
        if (!address) {
            throw new Error('Address not found');
        }

        return address;
    } catch (error) {
        throw new Error('Error while retrieving address: ' + error.message);
    }
};

/**
 * Service for updating an address by its ID
 */
exports.updateAddress = async (addressId, updatedData) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(addressId, updatedData, { new: true });
        if (!updatedAddress) {
            throw new Error('Address not found');
        }

        return updatedAddress;
    } catch (error) {
        throw new Error('Error while updating address: ' + error.message);
    }
};

/**
 * Service for deleting an address by its ID
 */
exports.deleteAddress = async (addressId) => {
    try {
        const deletedAddress = await Address.findByIdAndDelete(addressId);
        if (!deletedAddress) {
            throw new Error('Address not found');
        }

        return deletedAddress;
    } catch (error) {
        throw new Error('Error while deleting address: ' + error.message);
    }
};

/**
 * Service for searching addresses based on filters
 */
exports.searchAddresses = async (filters) => {
    try {
        const addresses = await Address.find(filters);
        return addresses;
    } catch (error) {
        throw new Error('Error while searching addresses: ' + error.message);
    }
};

/**
 * Service for performing geospatial searches
 */
exports.getAddressesNearLocation = async (coordinates, radius) => {
    try {
        const addresses = await Address.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: coordinates },
                    $maxDistance: radius,
                },
            },
        });

        return addresses;
    } catch (error) {
        throw new Error('Error while searching for nearby addresses: ' + error.message);
    }
};

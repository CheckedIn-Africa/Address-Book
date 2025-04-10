const Address = require('../models/address.model');
const generateStructuredShortCode = require('../utils/generateShortCode');
const logger = require('../utils/logger');  // Import the logger

/**
 * Service for creating an address
 */
exports.createAddress = async (addressData) => {
    try {
        // Log the action
        logger.info(`Attempting to create an address with shortcode: ${addressData.shortCode || 'N/A'}`);

        // Check if the address already exists
        const existingAddress = await Address.findOne({ shortCode: addressData.shortCode });
        if (existingAddress) {
            logger.warn(`Address with shortcode ${addressData.shortCode} already exists.`);
            throw new Error('Address with this shortcode already exists');
        }

        // If no shortcode, generate one
        if (!addressData.shortCode) {
            addressData.shortCode = generateStructuredShortCode(addressData);
            logger.info(`Generated new shortcode: ${addressData.shortCode}`);
        }

        // Create a new address
        const newAddress = new Address(addressData);
        const savedAddress = await newAddress.save();

        // Log successful address creation
        logger.info(`Address created successfully with ID: ${savedAddress._id}`);

        return savedAddress;
    } catch (error) {
        logger.error(`Error while creating address: ${error.message}`);
        throw new Error('Error while creating address: ' + error.message);
    }
};

/**
 * Service for getting an address by its ID
 */
exports.getAddressById = async (addressId) => {
    try {
        logger.info(`Attempting to retrieve address with ID: ${addressId}`);

        const address = await Address.findById(addressId);
        if (!address) {
            logger.warn(`Address with ID ${addressId} not found.`);
            throw new Error('Address not found');
        }

        logger.info(`Address with ID ${addressId} retrieved successfully.`);
        return address;
    } catch (error) {
        logger.error(`Error while retrieving address: ${error.message}`);
        throw new Error('Error while retrieving address: ' + error.message);
    }
};

/**
 * Service for updating an address by its ID
 */
exports.updateAddress = async (addressId, updatedData) => {
    try {
        logger.info(`Attempting to update address with ID: ${addressId}`);

        const updatedAddress = await Address.findByIdAndUpdate(addressId, updatedData, { new: true });
        if (!updatedAddress) {
            logger.warn(`Address with ID ${addressId} not found for update.`);
            throw new Error('Address not found');
        }

        logger.info(`Address with ID ${addressId} updated successfully.`);
        return updatedAddress;
    } catch (error) {
        logger.error(`Error while updating address: ${error.message}`);
        throw new Error('Error while updating address: ' + error.message);
    }
};

/**
 * Service for deleting an address by its ID
 */
exports.deleteAddress = async (addressId) => {
    try {
        logger.info(`Attempting to delete address with ID: ${addressId}`);

        const deletedAddress = await Address.findByIdAndDelete(addressId);
        if (!deletedAddress) {
            logger.warn(`Address with ID ${addressId} not found for deletion.`);
            throw new Error('Address not found');
        }

        logger.info(`Address with ID ${addressId} deleted successfully.`);
        return deletedAddress;
    } catch (error) {
        logger.error(`Error while deleting address: ${error.message}`);
        throw new Error('Error while deleting address: ' + error.message);
    }
};

/**
 * Service for searching addresses based on filters
 */
exports.searchAddresses = async (filters) => {
    try {
        logger.info('Attempting to search addresses with filters:', filters);

        const addresses = await Address.find(filters);

        logger.info(`Found ${addresses.length} address(es) matching the filters.`);
        return addresses;
    } catch (error) {
        logger.error(`Error while searching addresses: ${error.message}`);
        throw new Error('Error while searching addresses: ' + error.message);
    }
};

/**
 * Service for performing geospatial searches
 */
exports.getAddressesNearLocation = async (coordinates, radius) => {
    try {
        logger.info(`Attempting to search for addresses near coordinates: ${coordinates}, within radius: ${radius}`);

        const addresses = await Address.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: coordinates },
                    $maxDistance: radius,
                },
            },
        });

        logger.info(`Found ${addresses.length} address(es) near the location.`);
        return addresses;
    } catch (error) {
        logger.error(`Error while searching for nearby addresses: ${error.message}`);
        throw new Error('Error while searching for nearby addresses: ' + error.message);
    }
};

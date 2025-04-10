const { body, param, query, validationResult } = require('express-validator');

// Middleware for validating request data
exports.validateCreateAddress = [
    body('country').optional().isString().withMessage('Country must be a string'),
    body('county').isString().withMessage('County is required and must be a string'),
    body('subCounty').isString().withMessage('SubCounty is required and must be a string'),
    body('ward').isString().withMessage('Ward is required and must be a string'),
    body('street').isString().withMessage('Street is required and must be a string'),
    body('streetDirection').optional().isIn(['West', 'East', 'North', 'South']).withMessage('Street direction must be one of: West, East, North, South'),
    body('buildingName').isString().withMessage('Building name is required and must be a string'),
    body('isFlat').isBoolean().withMessage('isFlat should be a boolean'),
    body('buildingType').isIn(['Residential', 'Commercial', 'Mixed']).withMessage('Building type must be one of: Residential, Commercial, Mixed'),
    body('buildingNumber').optional().isInt().withMessage('Building number must be an integer'),
    body('plotNumber').optional().isInt().withMessage('Plot number must be an integer'),
    body('floor').optional().isInt().withMessage('Floor must be an integer'),
    body('unit').optional().isString().withMessage('Unit must be a string'),
    body('entrance').optional().isString().withMessage('Entrance must be a string'),
    body('distance').isInt({ min: 0 }).withMessage('Distance must be a positive integer'),
    body('location.coordinates').isArray({ min: 2, max: 2 }).withMessage('Coordinates must be an array with two elements [longitude, latitude]'),
    body('location.coordinates[0]').isFloat().withMessage('Longitude must be a float'),
    body('location.coordinates[1]').isFloat().withMessage('Latitude must be a float'),
    body('shortCode').optional().isString().withMessage('ShortCode must be a string'),

    // Custom error handler
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware for validating ID parameter for routes that need an address ID
exports.validateAddressId = [
    param('id').isMongoId().withMessage('Address ID must be a valid MongoDB ObjectId'),

    // Custom error handler
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Middleware for validating update address data
exports.validateUpdateAddress = [
    body('country').optional().isString().withMessage('Country must be a string'),
    body('county').optional().isString().withMessage('County must be a string'),
    body('subCounty').optional().isString().withMessage('SubCounty must be a string'),
    body('ward').optional().isString().withMessage('Ward must be a string'),
    body('street').optional().isString().withMessage('Street must be a string'),
    body('streetDirection').optional().isIn(['West', 'East', 'North', 'South']).withMessage('Street direction must be one of: West, East, North, South'),
    body('buildingName').optional().isString().withMessage('Building name must be a string'),
    body('isFlat').optional().isBoolean().withMessage('isFlat should be a boolean'),
    body('buildingType').optional().isIn(['Residential', 'Commercial', 'Mixed']).withMessage('Building type must be one of: Residential, Commercial, Mixed'),
    body('buildingNumber').optional().isInt().withMessage('Building number must be an integer'),
    body('plotNumber').optional().isInt().withMessage('Plot number must be an integer'),
    body('floor').optional().isInt().withMessage('Floor must be an integer'),
    body('unit').optional().isString().withMessage('Unit must be a string'),
    body('entrance').optional().isString().withMessage('Entrance must be a string'),
    body('distance').optional().isInt({ min: 0 }).withMessage('Distance must be a positive integer'),
    body('location.coordinates').optional().isArray({ min: 2, max: 2 }).withMessage('Coordinates must be an array with two elements [longitude, latitude]'),
    body('location.coordinates[0]').optional().isFloat().withMessage('Longitude must be a float'),
    body('location.coordinates[1]').optional().isFloat().withMessage('Latitude must be a float'),
    body('shortCode').optional().isString().withMessage('ShortCode must be a string'),

    // Custom error handler
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

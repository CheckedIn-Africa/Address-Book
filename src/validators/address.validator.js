const Joi = require('joi');

exports.addressSchema = Joi.object({
    country: Joi.string().default('Kenya'),
    county: Joi.string().default('Nairobi'),
    subCounty: Joi.string().required(),
    ward: Joi.string().required(),
    street: Joi.string().required(),
    streetDirection: Joi.string().valid('West', 'East', 'North', 'South'),

    buildingName: Joi.string().required(),
    isFlat: Joi.boolean().required(),
    buildingType: Joi.string().valid('Residential', 'Commercial', 'Mixed').required(),
    buildingNumber: Joi.number().optional(),
    plotNumber: Joi.number().optional(),

    floor: Joi.number().optional(),
    unit: Joi.string().optional(),
    entrance: Joi.string().optional(),
    distance: Joi.number().default(1),
    location: Joi.object({
        type: Joi.string().valid('Point').required(),
        coordinates: Joi.array().ordered(
            Joi.number().min(-180).max(180), // lng
            Joi.number().min(-90).max(90)    // lat
        ).required()
    }).required(),

    shortCode: Joi.string().optional() // usually generated automatically
});

const mongoose = require('mongoose');
const generateShortCode = require('../utils/generateShortCode');

const AddressSchema = new mongoose.Schema({
    country: { type: String, default: 'Kenya', required: true },
    county: { type: String, default: 'Nairobi', required: true },
    subCounty: { type: String, required: true },
    ward: { type: String, required: true },
    street: { type: String, required: true },
    streetDirection: {
        type: String,
        enum: ['West', 'East','North','South'],
    },

    buildingName: { type: String, required: true },
    isFlat: { type: Boolean, default: false, required: true },
    buildingType: {
        type: String,
        enum: ['Residential', 'Commercial', 'Mixed'],
        required: true,
    },
    buildingNumber: { type: Number },
    plotNumber: { type: Number },

    floor: { type: Number },
    unit: { type: String },
    entrance: { type: String },

    distance: { type: Number, required: true }, // from main road

    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true,
        },
        coordinates: {
            type: [Number], // [lng, lat]
            required: true,
        },
    },

    shortCode: { type: String, unique: true },

}, { timestamps: true });

// 2dsphere index for geospatial queries
AddressSchema.index({ location: '2dsphere' });

// Pre-save hook to auto-generate shortCode if not provided

AddressSchema.pre('save', function (next) {
    if (!this.shortCode) {
        this.shortCode = generateStructuredShortCode({
            county: this.county,
            subCounty: this.subCounty,
            buildingName: this.buildingName,
            floor: this.floor,
            unit: this.unit,
            streetDirection: this.streetDirection,
        });
    }
    next();
});

module.exports = mongoose.model('Address', AddressSchema);

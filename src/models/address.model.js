const mongoose = require('mongoose');
const generateStructuredShortCode = require('../utils/generateShortCode');

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - country
 *         - county
 *         - subCounty
 *         - ward
 *         - street
 *         - landmark
 *         - photoUrl
 *         - description
 *         - buildingName
 *         - isFlat
 *         - buildingType
 *         - units
 *         - distance
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *           description: Auto-generated MongoDB ID
 *         country:
 *           type: string
 *           default: "Kenya"
 *           example: "Kenya"
 *         county:
 *           type: string
 *           default: "Nairobi"
 *           example: "Nairobi"
 *         subCounty:
 *           type: string
 *           example: "Kasarani"
 *         ward:
 *           type: string
 *           example: "Mwiki"
 *         street:
 *           type: string
 *           example: "Muringa Road"
 *         landmark:
 *           type: string
 *           example: "Near Shell Petrol Station"
 *         photoUrl:
 *           type: string
 *           format: uri
 *           example: "https://example.com/address-photo.jpg"
 *         description:
 *           type: string
 *           example: "Blue gate with security guard"
 *         streetDirection:
 *           type: string
 *           enum: [West, East, North, South]
 *           example: "North"
 *         buildingName:
 *           type: string
 *           example: "Sunset Towers"
 *         isFlat:
 *           type: boolean
 *           default: false
 *           example: true
 *         buildingType:
 *           type: string
 *           enum: [Residential, Commercial, Mixed]
 *           example: "Residential"
 *         buildingNumber:
 *           type: number
 *           example: 42
 *         postalCode:
 *           type: string
 *           example: "00100"
 *         plotNumber:
 *           type: number
 *           example: 287
 *         units:
 *           type: number
 *           example: 24
 *         floor:
 *           type: number
 *           example: 3
 *         unit:
 *           type: string
 *           example: "SU304"
 *         entrance:
 *           type: string
 *           example: "Main Gate B"
 *         distance:
 *           type: number
 *           description: "Distance from main road in meters"
 *           example: 150
 *         location:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum: [Point]
 *               default: "Point"
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *               example: [36.8219, -1.2921]
 *               description: "[longitude, latitude]"
 *         shortCode:
 *           type: string
 *           example: "NRB-KAS-MWK-MRD-N-304"
 *           description: Auto-generated structured code
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-04-15T09:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-04-15T09:30:00Z"
 */

/**
 * @swagger
 * components:
 *   examples:
 *     AddressCreation:
 *       value:
 *         country: "Kenya"
 *         county: "Nairobi"
 *         subCounty: "Kasarani"
 *         ward: "Mwiki"
 *         street: "Muringa Road"
 *         landmark: "Near Shell Petrol Station"
 *         photoUrl: "https://example.com/address-photo.jpg"
 *         description: "Blue gate with security guard"
 *         buildingName: "Sunset Towers"
 *         isFlat: true
 *         buildingType: "Residential"
 *         units: 24
 *         distance: 150
 *         location:
 *           type: "Point"
 *           coordinates: [36.8219, -1.2921]
 *     GeoQueryExample:
 *       value:
 *         longitude: 36.8219
 *         latitude: -1.2921
 *         maxDistance: 5000
 *         buildingType: "Residential"
 */

// Address schema definition
const AddressSchema = new mongoose.Schema({
    // Country where the address is located, defaulting to 'Kenya'
    country: { type: String, default: 'Kenya', required: true },

    // County in which the address is located, defaulting to 'Nairobi'
    county: { type: String, default: 'Nairobi', required: true },

    // Sub-county within the county, required field
    subCounty: { type: String, required: true },

    // Ward within the sub-county, required field
    ward: { type: String, required: true },

    // Street name of the address, required field
    street: { type: String, required: true },

    // landmark of the address, required field
    landmark: { type: String, required: true },

    // image of the address, required field
    photoUrl: { type: String, required: true },

    // description of the address, required field
    description: { type: String, required: true },

    // Street direction (East, West, North, South), optional field with specific allowed values
    streetDirection: {
        type: String,
        enum: ['West', 'East', 'North', 'South'], // Enum restricts values to one of these directions
    },

    // Building name, required field (e.g., "Sunset Towers")
    buildingName: { type: String, required: true },

    // Boolean indicating if the building is a flat (apartment) or not, default is false (not a flat)
    isFlat: { type: Boolean, default: false, required: true },

    // Type of building (Residential, Commercial, or Mixed), required field
    buildingType: {
        type: String,
        enum: ['Residential', 'Commercial', 'Mixed'], // Restricts to only these types
        required: true,
    },

    // Building number, optional field (e.g., "101")
    buildingNumber: { type: Number },

     // Plot number (as per county records), optional field
    postalCode: { type: String },

    // Plot number (as per county records), optional field
    plotNumber: { type: Number },

    // Number of units in the building, optional field (e.g., "20")
    units: { type: Number, required: true }, 

    // Floor number where the unit is located, optional field (e.g., "5")
    floor: { type: Number },

    // Unit number (e.g., "SU123"), optional field
    unit: { type: String },

    // Entrance of the building (optional description, e.g., "Main entrance")
    entrance: { type: String },

    // Distance from the main road to the building, required field (e.g., "200 meters")
    distance: { type: Number, required: true },

    // Geospatial location information, necessary for spatial queries
    location: {
        type: {
            type: String,
            enum: ['Point'], // Only supports 'Point' type for geospatial data
            default: 'Point',
            required: true,
        },
        coordinates: {
            type: [Number], // Array of numbers for [longitude, latitude]
            required: true, // Coordinates are required
        },
    },

    // Short code for this address, unique identifier generated for easy reference
    shortCode: { type: String, unique: true },

}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' fields

// ✅ Indexes for performance
AddressSchema.index({ location: '2dsphere' }); // Index for geospatial queries (search by coordinates)
AddressSchema.index({ county: 1, subCounty: 1, ward: 1 }); // Index for area-based filtering (county, sub-county, ward)
AddressSchema.index({ street: 1 }); // Index for searching by street name
AddressSchema.index({ buildingName: 1 }); // Index for building-specific queries (e.g., search by building name)

// Pre-save hook to auto-generate a shortCode if not provided
AddressSchema.pre('save', function (next) {
    // Only generate shortCode if it doesn't already exist
    if (!this.shortCode) {
        this.shortCode = generateStructuredShortCode({
            county: this.county,
            subCounty: this.subCounty,
            ward: this.ward,
            buildingName: this.buildingName,
            floor: this.floor,
            unit: this.unit,
            streetDirection: this.streetDirection,
        });
    }
    next(); // Proceed to save the document
});

// Export the model to be used in other parts of the application
module.exports = mongoose.model('Address', AddressSchema);

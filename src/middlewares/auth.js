const jwt = require('jsonwebtoken');
const { sign, verify } = jwt;
const _ = require('lodash');
const ApiKey = require('../models/api.model');  // The ApiKey model we created earlier


// Middleware to verify token
const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token from header
    console.log("[AUTH] Incoming request:", req.method, req.originalUrl);
    console.log("[AUTH] Token extracted:", token || "No token found");

    if (!token) {
        console.warn("[AUTH] No token provided, authorization denied");
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = decoded; // Attach user payload to request

        console.log("[AUTH] Token successfully verified for user:", decoded._id || decoded.userId);
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("[AUTH] Invalid token error:", error.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};

// Helper to generate JWT token
const generateToken = (user) => {
    console.log("[AUTH] Generating token for user ID:", user._id, "Role:", user.type);

    // Convert Mongoose document to plain object and omit sensitive fields
    const payload = _.omit(user.toObject(), ["password", "__v", "createdAt", "updatedAt"]);

    const token = sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

    console.log("[AUTH] Token generated successfully");
    return token;
};


// Middleware to check roles
const authorize = (roles) => (req, res, next) => {
    console.log("[AUTH] Checking authorization for user ID:", req.user?._id, "Role:", req.user?.role);

    if (!req.user || !roles.includes(req.user.type)) {
        console.warn("[AUTH] Access denied for user ID:", req.user?._id);
        return res.status(403).json({ message: 'Access denied', user: req.user });
    }

    // Omit unnecessary fields before attaching user info to request
    req.user = _.omit(req.user, ['password', '__v', 'createdAt', 'updatedAt']);
    console.log("[AUTH] Access granted to user ID:", req.user._id);
    next();
};
/**
 * Middleware to validate the API Key
 */
const validateApiKey = async (req, res, next) => {
    // Get API key from headers (x-api-key) or query params (apiKey)
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;

    if (!apiKey) {
        return res.status(400).json({ message: 'API key is missing.' });
    }

    try {
        // Look for the API key in the database
        const key = await ApiKey.findOne({ apiKey });

        if (!key) {
            return res.status(403).json({ message: 'Invalid API key.' });
        }

        // If the key is valid, proceed to the next middleware or controller
        next();
    } catch (err) {
        return res.status(500).json({ message: 'Error validating API key', error: err.message });
    }
};


module.exports = { authenticate, authorize, generateToken, validateApiKey };

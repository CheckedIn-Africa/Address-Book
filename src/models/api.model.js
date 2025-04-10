const mongoose = require('mongoose');

const ApiKeySchema = new mongoose.Schema({
    apiKey: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    user: { type: String, required: true },  // The user associated with the API key (optional)
});

module.exports = mongoose.model('ApiKey', ApiKeySchema);
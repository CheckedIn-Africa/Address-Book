const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For password hashing

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    apiKeys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ApiKey',  // Link to ApiKey model
    }],
}, { timestamps: true });

// Hash password before saving the user to the database
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password when logging in
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);

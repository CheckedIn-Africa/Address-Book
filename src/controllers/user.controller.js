const User = require('../models/user.model');
const { generateApiKey } = require('../utils/generateApiKey');
const ApiKey = require('../models/api.model');

// Create a new user and generate an API key
exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Create a new user
        const user = new User({ username, email, password });

        // Save the user
        await user.save();

        // Generate an API key for the user
        const apiKey = generateApiKey();  // Using the utility function to generate a new API key

        // Store the generated API key in the ApiKey model
        const newApiKey = new ApiKey({ apiKey, user: user._id });
        await newApiKey.save();

        // Add the API key reference to the user's apiKeys array
        user.apiKeys.push(newApiKey._id);
        await user.save();

        // Respond with success
        res.status(201).json({
            message: 'User created successfully with API key.',
            user,
            apiKey,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Login User and Validate Password
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate API key if needed or use existing ones
        res.status(200).json({
            message: 'User logged in successfully',
            user,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

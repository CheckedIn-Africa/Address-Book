const { createUserService, loginUserService } = require('../services/userService');

/**
 * Controller to create a new user and generate an API key
 */
exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const { user, apiKey } = await createUserService(username, email, password);

        // Respond with success
        res.status(201).json({
            message: 'User created successfully with API key.',
            user,
            apiKey,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Controller to handle user login and validate password
 */
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { user } = await loginUserService(email, password);

        // Respond with user details (and optionally the API key if needed)
        res.status(200).json({
            message: 'User logged in successfully',
            user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

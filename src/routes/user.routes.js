const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');  // Import controller

// Route to create a new user
router.post('/register', userController.createUser);

// Route for user login
router.post('/login', userController.loginUser);

module.exports = router;
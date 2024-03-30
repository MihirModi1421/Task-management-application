const express = require('express');
const userController = require('../controllers/userController'); // Import the user controller

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Add other user-related routes here (e.g., GET /profile, PUT /profile)

module.exports = router;

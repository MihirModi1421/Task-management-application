const userService = require('../services/userService'); // Import the user service
const jwt = require('jsonwebtoken'); // For JWT generation

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.registerUser(email, password);
    res.status(201).json(user); // Send created user data as JSON
    // res.render('login'); // Send created user data as JSON
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(400).json({ message: err.message }); // Send error message as JSON with appropriate status code
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.loginUser(email, password);

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Replace with your secret key and expiration time

    res.json({ token }); // Send JWT token in the response
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(401).json({ message: err.message }); // Send error message with appropriate status code
  }
};

// Add other user-related controllers here (e.g., get profile, update profile)

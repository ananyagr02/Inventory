// routes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');



// Define a route for /register-page
router.post('/register-page',authController.register);


// Login route
router.post('/login-page', authController.login);

// Logout route
router.get('/logout', authController.logout);

// Protect route (middleware to protect routes)
router.use('/protected', authController.protect);

// Example protected route
// router.get('/protected/example', (req, res) => {
//   res.status(200).json({ message: 'This is a protected route!' });
// });

module.exports = router;
                                         
const express = require('express');
const router = express.Router();
const { registerStudent, loginStudent } = require('../controllers/studentController');

// Call the registerStudent function when a POST request is received.
router.post('/register', registerStudent);

// Call the login function when a POST request is received.
router.post('/login', loginStudent);

module.exports = router;
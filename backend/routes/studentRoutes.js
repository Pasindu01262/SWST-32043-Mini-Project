const express = require('express');
const router = express.Router();
const { registerStudent, loginStudent } = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

// Call the registerStudent function when a POST request is received.
router.post('/register', registerStudent);

// Call the login function when a POST request is received.
router.post('/login', loginStudent);


// Route to get student details
router.get('/me', protect, (req, res) => {
    res.json({ message: "Login successful!", student: req.student });
});

module.exports = router;
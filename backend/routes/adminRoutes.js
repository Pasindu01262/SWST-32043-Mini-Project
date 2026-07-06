const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin } = require('../controllers/adminController');

// Run the loginAdmin function when a POST request is received.
router.post('/login', loginAdmin);

router.post('/register', registerAdmin);

module.exports = router;
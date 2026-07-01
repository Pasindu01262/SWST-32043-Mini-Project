const express = require('express');
const router = express.Router();

// Import the Controller functions here
const {
    getLecturers,
    addLecturer,
    updateLecturer,
    deleteLecturer
} = require('../controllers/lecturerController');

// Define the API endpoints and HTTP methods.
router.get('/', getLecturers);          // Get data (GET)
router.post('/', addLecturer);           // Add new data (POST)
router.put('/:id', updateLecturer);      // Update data (PUT)
router.delete('/:id', deleteLecturer);   // Delete data (DELETE)

module.exports = router;
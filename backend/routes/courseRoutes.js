const express = require('express');
const router = express.Router();
const { createCourse, getAllCourses } = require('../controllers/courseController');


router.post('/', createCourse);


router.get('/', getAllCourses);

module.exports = router;
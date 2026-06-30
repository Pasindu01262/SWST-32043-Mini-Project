const express = require('express');
const courseRouter = express.Router();
const { createCourse, getAllCourses, updateCourse,  deleteCourse, getCourse, searchCourses } = require('../controllers/courseController');


courseRouter.post('/', createCourse);

courseRouter.get('/', getAllCourses);

courseRouter.get('/search', searchCourses);

courseRouter.get('/:courseCode/:academicYear/:semester', getCourse);

courseRouter.put('/:courseCode/:academicYear/:semester', updateCourse);

courseRouter.delete('/:courseCode/:academicYear/:semester', deleteCourse);




module.exports = courseRouter;
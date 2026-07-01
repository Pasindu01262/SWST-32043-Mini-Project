const express = require('express');
const courseRouter = express.Router();
const { createCourse, getAllCourses, updateCourse,  deleteCourse, searchCourses, getCourseById } = require('../controllers/courseController');


courseRouter.post('/', createCourse);

courseRouter.get('/', getAllCourses);

courseRouter.get('/search', searchCourses);

courseRouter.get('/:id', getCourseById);

courseRouter.put('/:id', updateCourse);

courseRouter.delete('/:id', deleteCourse);


module.exports = courseRouter;
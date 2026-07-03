const express = require('express');
const EnrollmentRouter = express.Router();

const { enrollStudent,calculateTotalCredits,getEnrolledCourses } = require('../controllers/enrollStudentControll');

EnrollmentRouter.post('/enroll', enrollStudent);
EnrollmentRouter.get('/totalCredits/:studentId', calculateTotalCredits);
EnrollmentRouter.get('/enrolledCourses/:studentId', getEnrolledCourses);

module.exports = EnrollmentRouter;
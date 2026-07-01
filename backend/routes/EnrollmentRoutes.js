const express = require('express');
const EnrollmentRouter = express.Router();

const { enrollStudent,calculateTotalCredits } = require('../controllers/enrollStudentControll');

EnrollmentRouter.post('/enroll', enrollStudent);
EnrollmentRouter.get('/totalCredits/:studentId', calculateTotalCredits);
module.exports = EnrollmentRouter;
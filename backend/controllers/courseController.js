const Course = require('../models/Course');

const createCourse = async (req, res) => {
    try {
    const existingCourse = await Course.findOne({
    courseCode: req.body.courseCode,
    academicYear: req.body.academicYear,
    semester: req.body.semester 
    });
    if (existingCourse) {
        return res.status(400).json({ message: 'Course code already exists' });
    }

    
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(
        { 
            message: 'Course created successfully',
            course: course
        });

    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};


const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createCourse,
    getAllCourses
};
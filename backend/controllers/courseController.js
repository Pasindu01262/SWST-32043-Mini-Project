const Course = require('../models/Course');


// Create a new course
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


// Retrieve all courses from the database
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update an existing course
const updateCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await Course.findOne({ _id: id });

        if(course == null) {
            return res.status(404).json({ message: 'Course not found' });
        }

        await Course.findOneAndUpdate({ _id: id }, req.body);

        res.status(200).json({ message: 'Course updated successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Delete a course 
const deleteCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await Course.findOne({ _id: id });

        if(course == null) {
            return res.status(404).json({ message: 'Course not found' });
        }

        await Course.findOneAndDelete({ _id: id });
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Retrieve a single course using its ID
const getCourseById = async (req, res) => {
    try {
        const id= req.params.id;

        const course = await Course.findOne({ _id: id });

        if(course == null) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Search courses by course code
const searchCourses = async (req, res) => {
    try {
        const courseCode = req.query.courseCode;

        const courses = await Course.find({ 
            courseCode: { $regex: courseCode, $options: 'i' }
        }).sort({ createdAt: -1 });

        res.status(200).json(courses);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    getCourseById,
    searchCourses
};
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


const updateCourse = async (req, res) => {
    try {
        const {courseCode, academicYear, semester} = req.params;
        const course = await Course.findOne({ courseCode: courseCode, academicYear: academicYear, semester: semester });

        if(course == null) {
            return res.status(404).json({ message: 'Course not found' });
        }

        await Course.findOneAndUpdate({courseCode: courseCode, academicYear: academicYear, semester: semester}, req.body);
        
        res.status(200).json({ message: 'Course updated successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCourse = async (req, res) => {
    try {
        const {courseCode, academicYear, semester} = req.params;
        const course = await Course.findOne({ courseCode: courseCode, academicYear: academicYear, semester: semester });

        if(course == null) {
            return res.status(404).json({ message: 'Course not found' });
        }

        await Course.findOneAndDelete({courseCode: courseCode, academicYear: academicYear, semester: semester});
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCourse = async (req, res) => {
    try {
        const { courseCode, academicYear, semester } = req.params;

        const course = await Course.findOne({ courseCode: courseCode, academicYear: academicYear, semester: semester });

        if(course == null) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
    getCourse,
    searchCourses
};
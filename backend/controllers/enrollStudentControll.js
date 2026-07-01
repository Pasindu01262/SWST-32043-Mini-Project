const Student = require('../models/studentModel');
const Course = require('../models/Course');

const enrollStudent = async (req, res) => {

    try {

        const { studentId, courses } = req.body;

        // Find student
        const student = await Student.findOne({ studentId });  
        

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        // Convert course codes to ObjectIds
        const courseIds = [];

        for (const course of courses) {

            const foundCourse = await Course.findOne({
                courseCode: course.courseCode
            });

            if (!foundCourse) {
                return res.status(404).json({
                    message: `${course.courseCode} not found`
                });
            }

            courseIds.push(foundCourse._id);
        }

        // Save ObjectIds
        student.enrolledCourses = courseIds;

        await student.save();

        console.log("Saved courseIds:", student.enrolledCourses);
        const updatedStudent = await Student.findOne({ studentId })
        .populate('enrolledCourses', 'courseCode');
        console.log("Populated student:", updatedStudent);

        res.status(200).json({
            message: "Enrollment successful",
            student: updatedStudent
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

//calculate total credits
const calculateTotalCredits = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findOne({ studentId })
        .populate('enrolledCourses', 'credits');

        console.log("Populated student2:", student);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const totalCredits = student.enrolledCourses.reduce((sum, course) => sum + course.credits, 0);

        res.status(200).json({
            message: "Total credits calculated",
            totalCredits: totalCredits
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


module.exports = { enrollStudent, calculateTotalCredits };
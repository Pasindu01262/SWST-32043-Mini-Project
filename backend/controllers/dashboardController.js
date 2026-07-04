const mongoose = require('mongoose');

// GET /api/dashboard/summary
// Reads directly from the shared MongoDB collections using the native driver
// (mongoose.connection.db.collection(...)) instead of importing teammates'
// Mongoose models, so this file never depends on studentModel.js / Course.js /
// Lecturer.js or their controllers/routes.
const getDashboardSummary = async (req, res) => {
    try {
        const db = mongoose.connection.db;

        const [totalStudents, totalCourses, totalLecturers] = await Promise.all([
            db.collection('students').countDocuments(),
            db.collection('courses').countDocuments(),
            db.collection('lecturers').countDocuments()
        ]);

        // Join students -> courses on enrolledCourses (array of Course ObjectIds)
        // using a raw $lookup, so we get course codes without needing the
        // Course Mongoose model or its populate().
        const students = await db.collection('students').aggregate([
            {
                $lookup: {
                    from: 'courses',
                    localField: 'enrolledCourses',
                    foreignField: '_id',
                    as: 'courseDetails'
                }
            },
            {
                $project: {
                    _id: 0,
                    studentId: 1,
                    name: 1,
                    email: 1,
                    enrolledCourses: {
                        $map: {
                            input: '$courseDetails',
                            as: 'c',
                            in: '$$c.courseCode'
                        }
                    }
                }
            },
            { $sort: { studentId: 1 } }
        ]).toArray();

        res.status(200).json({
            totalStudents,
            totalCourses,
            totalLecturers,
            students
        });
    } catch (error) {
        console.error('Error in getDashboardSummary: ', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getDashboardSummary };
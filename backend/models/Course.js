const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        courseCode: {
            type: String,
            required: true,
            trim: true
        },
        courseName: {
            type: String,
            required: true,
            trim: true
        },
        credits: {
            type: Number,
            required: true,
            min: 1
        },
        level: {
            type: String,
            required: true,
            trim: true
        },
        academicYear: {
            type: String,
            required: true,
            trim: true      
        },
        semester: {
            type: String,
            required: true,
            trim: true      
        }
    },
    {
        timestamps: true
    }
);


courseSchema.index(
    { courseCode: 1, academicYear: 1, semester: 1 },
    { unique: true }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
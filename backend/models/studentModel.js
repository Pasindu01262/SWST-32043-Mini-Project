const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    studentId: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    joinYear: { 
        type: Number, 
        required: true
    },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course' 
    }],
    role: {
        type: String,
        default: 'student' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
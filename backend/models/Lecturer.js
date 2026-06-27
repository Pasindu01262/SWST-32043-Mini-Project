const mongoose = require('mongoose');

const lecturerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    }
}, {
    // Automatically saves the creation and last update times.
    timestamps: true 
});

module.exports = mongoose.model('Lecturer', lecturerSchema);
const mongoose = require("mongoose");

const batchProgressSchema = new mongoose.Schema({
    batch: {
        type: Number,
        required: true,
        unique: true
    },

    academicYear: {
        type: String,
        required: true
    },

    currentYearLevel: {
        type: String,
        required: true
    },

    currentSemester: {
        type: String,
        required: true
    },

    registrationOpen: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

const Batch = mongoose.model('Batch', batchProgressSchema);
module.exports = Batch;
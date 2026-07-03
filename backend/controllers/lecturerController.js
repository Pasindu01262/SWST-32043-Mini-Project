const Lecturer = require('../models/Lecturer');

// 1. Get all lecturer details (Read)
const getLecturers = async (req, res) => {
    try {
        const lecturers = await Lecturer.find();
        res.status(200).json(lecturers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Add a new lecturer to the system (Create)
const addLecturer = async (req, res) => {
    try {
        const { name, email, phone, department } = req.body;
        const newLecturer = new Lecturer({ name, email, phone, department });
        const savedLecturer = await newLecturer.save();
        res.status(201).json(savedLecturer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 3. Update a lecturer's details (Update)
const updateLecturer = async (req, res) => {
    try {
        const updatedLecturer = await Lecturer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // This returns the updated document
        );
        if (!updatedLecturer) return res.status(404).json({ message: 'Lecturer not found' });
        res.status(200).json(updatedLecturer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 4. Delete a lecturer from the system (Delete)
const deleteLecturer = async (req, res) => {
    try {
        const deletedLecturer = await Lecturer.findByIdAndDelete(req.params.id);
        if (!deletedLecturer) return res.status(404).json({ message: 'Lecturer not found' });
        res.status(200).json({ message: 'Lecturer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export all functions
module.exports = {
    getLecturers,
    addLecturer,
    updateLecturer,
    deleteLecturer
};
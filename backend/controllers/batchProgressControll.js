const Batch = require('../models/BatchProgress');
const Student = require('../models/studentModel');
const Course = require('../models/Course');
const Registerbatch = async (req, res) => {
    try{
        const progress = new Batch(req.body);
        await progress.save();
        res.status(201).json(progress);
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};


const ShowCourse = async (req, res) => {

    try {
        const { batch } = req.params;

        const batchdetails = await Batch.findOne({ batch:batch});

        if(!batchdetails) {
            return res.status(404).json({ message: 'Details are not found' });
            
        }

        const courses = await Course.find({
            level: batchdetails.currentYearLevel,
            semester: batchdetails.currentSemester
        });
        res.status(200).json(
            courses
        );

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {Registerbatch,ShowCourse};
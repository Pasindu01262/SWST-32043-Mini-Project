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

//get all batch details
const getAllBatchDetails = async (req, res) => {
    try {
        const batchDetails = await Batch.find().sort({ batch: 1 });

        res.status(200).json(batchDetails);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//update batch details
const updateBatchDetails = async (req, res) => {
    try {
        const { batch } = req.params;

        const updatedBatch = await Batch.findOneAndUpdate(
            { batch },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBatch) {
            return res.status(404).json({
                message: "Batch not found"
            });
        }

        res.status(200).json({
            message: "Batch updated successfully",
            data: updatedBatch
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



module.exports = {Registerbatch,ShowCourse,getAllBatchDetails, updateBatchDetails};
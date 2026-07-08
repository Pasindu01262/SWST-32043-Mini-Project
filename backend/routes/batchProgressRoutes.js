const express = require('express');
const BatchRouter = express.Router();
const { Registerbatch, ShowCourse,getAllBatchDetails,updateBatchDetails} = require('../controllers/batchProgressControll');


BatchRouter.post('/register', Registerbatch);
BatchRouter.get('/batchdetails/:batch', ShowCourse);
BatchRouter.get('/getalldetails',getAllBatchDetails);
BatchRouter.put('/updateBatch/:batch',updateBatchDetails)





module.exports = BatchRouter;
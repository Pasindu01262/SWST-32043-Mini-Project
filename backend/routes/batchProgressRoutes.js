const express = require('express');
const BatchRouter = express.Router();
const { Registerbatch, ShowCourse } = require('../controllers/batchProgressControll');


BatchRouter.post('/register', Registerbatch);
BatchRouter.get('/batchdetails/:batch', ShowCourse)





module.exports = BatchRouter;
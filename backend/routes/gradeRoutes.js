const express = require('express');
   const router = express.Router();
   const ctrl = require('../controllers/gradeController');

   router.post('/', ctrl.addGrade);
   router.get('/', ctrl.getAllGrades);
   router.put('/:id', ctrl.updateGrade);
   router.delete('/:id', ctrl.deleteGrade);
   router.get('/my/:regNo', ctrl.getGradesByRegNo);

   module.exports = router;
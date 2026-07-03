 const mongoose = require('mongoose');

   const gradeSchema = new mongoose.Schema({
     studentName: { type: String, required: true },
     studentRegNo: { type: String, required: true }, // student's registration/ID number
     courseName: { type: String, required: true },
     courseCode: { type: String, required: true },
     grade: { type: String, required: true, enum: ['A', 'B', 'C', 'D', 'E', 'F'] },
   }, { timestamps: true });

   module.exports = mongoose.model('Grade', gradeSchema);
   

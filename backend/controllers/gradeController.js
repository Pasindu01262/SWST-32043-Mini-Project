   const Grade = require('../models/Grade');

   // Admin: Add a grade
   exports.addGrade = async (req, res) => {
     try {
       const { studentName, studentRegNo, courseName, courseCode, grade } = req.body;
       const newGrade = await Grade.create({ studentName, studentRegNo, courseName, courseCode, grade });
       res.status(201).json(newGrade);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };

   // Admin: View all grades
   exports.getAllGrades = async (req, res) => {
     try {
       const grades = await Grade.find().sort({ createdAt: -1 });
       res.json(grades);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };

   // Admin: Edit a grade
   exports.updateGrade = async (req, res) => {
     try {
       const updated = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true });
       if (!updated) return res.status(404).json({ message: 'Grade not found' });
       res.json(updated);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };

   // Admin: Delete a grade
   exports.deleteGrade = async (req, res) => {
     try {
       const deleted = await Grade.findByIdAndDelete(req.params.id);
       if (!deleted) return res.status(404).json({ message: 'Grade not found' });
       res.json({ message: 'Deleted successfully' });
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };

   // Student: View results by registration number
   exports.getGradesByRegNo = async (req, res) => {
     try {
       const grades = await Grade.find({ studentRegNo: req.params.regNo });
       res.json(grades);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const lecturerRoutes = require('./routes/lecturerRoutes');
const studentRoutes = require('./routes/studentRoutes');
const BatchRouter = require('./routes/batchProgressRoutes');
const courseRouter = require('./routes/courseRoutes');
const EnrollmentRouter = require('./routes/EnrollmentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/grades', require('./routes/gradeRoutes'));

app.use('/api/lecturers', lecturerRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/enrollments', EnrollmentRouter);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/admin', adminRoutes);


app.get('/api/status', (req, res) => {
  res.json({ message: "Backend and MongoDB are fully connected! " });
});

app.use('/api/courses', courseRouter);
app.use('/api/batch', BatchRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
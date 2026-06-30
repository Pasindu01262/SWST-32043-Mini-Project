const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const lecturerRoutes = require('./routes/lecturerRoutes');
const studentRoutes = require('./routes/studentRoutes');


const courseRouter = require('./routes/courseRoutes');

dotenv.config();
connectDB(); // Connecting to MongoDB

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/lecturers', lecturerRoutes);
app.use('/api/students', studentRoutes);


// Test API for communicating with the frontend
app.get('/api/status', (req, res) => {
  res.json({ message: "Backend and MongoDB are fully connected! " });
});


app.use('/api/courses', courseRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
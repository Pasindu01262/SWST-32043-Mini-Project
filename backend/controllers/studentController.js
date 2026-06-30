const Student = require('../models/studentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin Registers a New Student function
const registerStudent = async (req, res) => {
    try {
        // get data from the frontend
        const { studentId,name, email, password, joinYear } = req.body;

        // 1. Check if a user with this email already exists.
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: "A student is already registered with this email address!" });
        }

        // Check if the Student ID already exists
        const existingStudentId = await Student.findOne({ studentId });
        if (existingStudentId) {
            return res.status(400).json({ message: "This Student ID is already in use!" });
        }

       // 2. Hash the password for security.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create the new student (joinYear is included)
        const newStudent = new Student({
            studentId,
            name,
            email,
            password: hashedPassword,
            joinYear
        });

        // 4. Save the student to the database.
        await newStudent.save();
        
        res.status(201).json({ 
            message: "Student registered successfully!", 
            student: {
                _id: newStudent._id,
                name: newStudent.name,
                email: newStudent.email,
                joinYear: newStudent.joinYear,
                role: newStudent.role
            } 
        });

    } catch (error) {
        console.error("Error in registerStudent: ", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// Student Login Function
const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check whether a student exists with this email
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(404).json({ message: "No account found for this email address." });
        }

        // 2. Check if the password is correct (compare with hashed password in database)
        const isPasswordCorrect = await bcrypt.compare(password, student.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "The password you entered is incorrect." });
        }

        // 3. If correct, generate a digital ID (JWT token)
        const token = jwt.sign(
            { id: student._id, role: student.role }, 
            process.env.JWT_SECRET || 'swst_mini_project_secret', 
            { expiresIn: '1d' } // This token will expire in 1 day
        );

        // 4. Send the token and student details to the frontend
        res.status(200).json({
            message: "Successfully logged in!",
            token,
            student: {
                _id: student._id,
                studentId: student.studentId,
                name: student.name,
                email: student.email,
                role: student.role
            }
        });

    } catch (error) {
        console.error("Error in loginStudent: ", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { registerStudent, loginStudent };

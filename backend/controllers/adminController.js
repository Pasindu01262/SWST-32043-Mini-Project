const Admin = require('../models/Admin');

// admin login main function
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if an admin with this email exists in the database.
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success: false, message: "Admin account not found!" });
    }

    // 2. Check if the provided password matches the one in the database.

    if (admin.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid password!" });
    }

    // 3.If both are correct, return "Login Successful
    res.status(200).json({
      success: true,
      message: "Login successful",
      admin: { id: admin._id, email: admin.email }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};




//Function to add a new admin to the database.
const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if an admin with this email already exists.
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists!" });
    }

    // Create a new admin and save it to the database.
    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Admin created successfully!",
      admin: newAdmin
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Export both functions.
module.exports = { loginAdmin, registerAdmin };


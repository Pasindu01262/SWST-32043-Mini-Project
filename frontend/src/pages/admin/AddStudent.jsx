import React, { useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';
import './AddStudent.css'; 

const AddStudent = () => {
    const [formData, setFormData] = useState({
        studentId: '',
        name: '',
        email: '',
        password: '',
        joinYear: ''
    });

    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false); // Check whether it is a success or an error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await axios.post('http://localhost:5000/api/students/register', formData);
            
            setMessage(response.data.message);
            setIsError(false);
            
            setFormData({ studentId: '', name: '', email: '', password: '', joinYear: '' });
            
        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed. An error occurred!');
            setIsError(true);
        }
    };

    return (
        <AdminLayout>
            <div className="add-student-container">
                <h2>Student registration</h2>
                
                {message && (
                    <p className={`message ${isError ? 'error' : 'success'}`}>
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="student-form">

                    <div className="form-group">
                        <label>Student ID:</label>
                        <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} required placeholder="CT/2021/089" />
                    </div>

                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Pasindu Ransika" />
                    </div>
                    
                    <div className="form-group">
                        <label>Email Address:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="pasindu@gmail.com" />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Enter a strong password" />
                    </div>

                    <div className="form-group">
                        <label>Join Year:</label>
                        <input type="number" name="joinYear" value={formData.joinYear} onChange={handleChange} required placeholder="2026" />
                    </div>

                    <button type="submit" className="submit-btn">
                        Register Student
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default AddStudent;
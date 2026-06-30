import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentLogin.css'; 

const StudentLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            // Send data to the backend
            const response = await axios.post('http://localhost:5000/api/students/login', formData);
            
            // Save the token and details in the browser
            localStorage.setItem('studentToken', response.data.token);
            localStorage.setItem('studentData', JSON.stringify(response.data.student));
            
            // Navigate to the Course Registration page after successful login
            navigate('/student/registration'); 
            
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while logging in.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Student Login</h2>
                
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Email Address:</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentLogin;
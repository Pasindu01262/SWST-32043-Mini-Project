import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';
import './Courses.css';

const Courses = () => {

    
    const [formData, setFormData] = useState({
        courseName: '',
        courseCode: '',
        credits: '',
        level: '',
        academicYear: '',
        semester: ''
    });

    const [courses, setCourses] = useState([]);

    
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); 

    useEffect(() => {
        axios.get('http://localhost:5000/api/courses')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }, []);

    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            
            await axios.post('http://localhost:5000/api/courses', formData);

            
            setMessage('Course added successfully!');
            setMessageType('success');

            
            setFormData({
                courseName: '',
                courseCode: '',
                credits: '',
                level: '',
                academicYear: '',
                semester: ''
            });

        } catch (error) {
            
            setMessage(error.response?.data?.message || 'Failed to add course');
            setMessageType('error');
        }
    };

    return (
        <AdminLayout pageTitle="Courses">
            <div className="courses-container">

                
                <div className="courses-form-card">
                    <h3>Add New Course</h3>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Course Name</label>
                            <input
                                type="text"
                                name="courseName"
                                value={formData.courseName}
                                onChange={handleChange}
                                placeholder="e.x. Data Structures"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Course Code</label>
                            <input
                                type="text"
                                name="courseCode"
                                value={formData.courseCode}
                                onChange={handleChange}
                                placeholder="e.x. CS201"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Credits</label>
                            <input
                                type="number"
                                name="credits"
                                value={formData.credits}
                                onChange={handleChange}
                                placeholder="e.x. 3"
                                min="1"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Level</label>
                            <input
                                type="text"
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                                placeholder="e.x. Level 3"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Academic Year</label>
                            <input
                                type="text"
                                name="academicYear"
                                value={formData.academicYear}
                                onChange={handleChange}
                                placeholder="e.x. 2024/2025"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Semester</label>
                            <input
                                type="text"
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                                placeholder="e.x. Semester 1"
                                required
                            />
                        </div>

                        
                        {message && (
                            <p className={`form-message ${messageType}`}>
                                {message}
                            </p>
                        )}

                        <button type="submit" className="btn-add">
                            + Add Course
                        </button>

                    </form>
                </div>

                
                <div className="courses-table-card">
                    <h3>Available Courses</h3>
                    <div className="table-wrapper">
                        <table className="courses-table">
                            <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Course Code</th>
                                    <th>Credits</th>
                                    <th>Semester</th>
                                    <th>Academic Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="no-data">
                                            No Courses found
                                            </td>
                                    </tr>
                                ) : (
                                courses.map(course => (
                                    <tr key={course._id}>
                                        <td>{course.courseName}</td>
                                        <td>{course.courseCode}</td>
                                        <td>{course.credits}</td>
                                        <td>{course.semester}</td>
                                        <td>{course.academicYear}</td>
                                    </tr>
                                ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
};

export default Courses;
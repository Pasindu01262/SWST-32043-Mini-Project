import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';
import './Courses.css';
import { Pencil, Trash2 } from 'lucide-react';

const Courses = () => {

    // Stores all values entered in the course form
    const [formData, setFormData] = useState({
        courseName: '',
        courseCode: '',
        credits: '',
        level: '',
        academicYear: '',
        semester: ''
    });

    
    const [courses, setCourses] = useState([]);
    const [editing, setEditing] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); 

    

    // Fetch all courses from the backend 
    const fetchCourses = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
    };


    useEffect(() => {
        fetchCourses();
    }, []);

    // Updates the corresponding form field whenever the user types
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

      // Handles both adding a new course and updating an existing course
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {

            if (editing) {

                await axios.put(`http://localhost:5000/api/courses/${editing}`, formData);
                setMessage('Course updated successfully!');
                setMessageType('success');
                setEditing(null);

            }else {
            
                await axios.post('http://localhost:5000/api/courses', formData);
                setMessage('Course added successfully!');
                setMessageType('success');

            }

            
            setFormData({
                courseName: '',
                courseCode: '',
                credits: '',
                level: '',
                academicYear: '',
                semester: ''
            });

            fetchCourses();

        } catch (error) {
            
            setMessage(error.response?.data?.message || 'Failed to add course');
            setMessageType('error');
        }
    };

    const handleEdit = (course) => {
        setEditing(course._id);
        setFormData({
            courseName: course.courseName,
            courseCode: course.courseCode,
            credits: course.credits,
            level: course.level,
            academicYear: course.academicYear,
            semester: course.semester
        });
        setMessage('');
    };

      // Cancels editing and restores the form to Add Course mode
    const handleCancelEdit = () => {
        setEditing(null);
        setFormData({
            courseName: '',
            courseCode: '',
            credits: '',
            level: '',
            academicYear: '',
            semester: ''
        });
        setMessage('');
    }

    // Deletes the selected course after user confirmation
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this course?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/courses/${id}`);
            setMessage('Course deleted successfully!');
            setMessageType('success');
            fetchCourses();
        } catch (error) {
            setMessage( 'Failed to delete course');
            setMessageType('error');
        }
    }

    

    return (
        <AdminLayout pageTitle="Courses">
            <div className="courses-container">

                
                <div className="courses-form-card">
                    <h3>{editing ? 'Edit Course' : 'Add New Course'}</h3>

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
                            {editing ? 'Update Course' : '+ Add Course'}
                        </button>
                        {editing && (
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </button>
                    )}

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
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="no-data">
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
                                        <td className="action-buttons">
                                            <button
                                                className="btn-edit"
                                                onClick={() => handleEdit(course)}
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(course._id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
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
import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageHeader from '../components/header';
import './CoursesListShowPage.css';

function EnrolledCoursesList (){
    const navigate = useNavigate();
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    const token = localStorage.getItem('studentToken');
    const stID = studentData ?.studentId;

    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/enrollments/enrolledCourses/${encodeURIComponent(stID)}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setEnrolledCourses(response.data.courses);
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
            }
        };

        if (stID && token) {
            fetchEnrolledCourses();
        }
    }, [stID, token]);

    return (
        <div>
            <PageHeader 
            title="Enrolled Courses" 
            StudentID={stID}
            buttonText="Back to enrollment"
            onBack={() => navigate("/student/registration")}
            />
            <div className="enrolled-courses-container">
                {/* Display the enrolled courses in a card list */}
                {enrolledCourses.length > 0 ? (
                    <div className="courses-grid">
                        {enrolledCourses.map((course) => (
                            <div key={course.courseId} className="course-card">
                                <h3>{course.courseName}</h3>
                                <p>{course.courseCode}</p>
                                <div className="course-card__meta">
                                    <span className="course-card__badge">Credits: {course.credits}</span>
                                    <span className="course-card__badge">{course.level}</span>
                                    <span className="course-card__badge">{course.semester}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="enrolled-courses-container__status">No enrolled courses found.</p>
                )}
            </div>
        </div>
    );
};
export default EnrolledCoursesList;
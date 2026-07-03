import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

function EnrolledCoursesList (){
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
                setEnrolledCourses(response.data);
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
            <h2>Enrolled Courses</h2>
            <ul>
                {enrolledCourses.map((course) => (
                    <li key={course.courseId}>
                        <strong>{course.courseName}</strong> - {course.courseCode}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default EnrolledCoursesList;
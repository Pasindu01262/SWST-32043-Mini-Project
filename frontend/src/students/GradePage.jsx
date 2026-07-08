import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/header';
import './GradePage.css';

const GradeShowPage = () => {
    const navigate = useNavigate();

    const studentData = JSON.parse(localStorage.getItem('studentData'));
    const token = localStorage.getItem('studentToken');

    const stID = studentData?.studentId;

    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGrades();
    }, []);

    const fetchGrades = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/grades/my/${encodeURIComponent(stID)}`,
                
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setGrades(res.data);
        } catch (err) {
            console.error(err);
            alert("Failed to load grades");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <PageHeader
                title="My Results"
                StudentID={stID}
                buttonText="Back to profile"
                onBack={() => navigate("/student/profile")}
                className="header"
            />

            <div className="results-container">

                {loading ? (
                    <p>Loading...</p>
                ) : grades.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Grade</th>
                            </tr>
                        </thead>

                        <tbody>
                            {grades.map((grade) => (
                                <tr key={grade._id}>
                                    <td>{grade.courseCode}</td>
                                    <td>{grade.courseName}</td>
                                    <td>{grade.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

            </div>
        </div>
    );
};

export default GradeShowPage;
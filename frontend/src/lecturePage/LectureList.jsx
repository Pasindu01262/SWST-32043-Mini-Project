import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageHeader from '../components/header';
import './LecturersList.css';

function LecturersList() {
    const navigate = useNavigate();
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    const token = localStorage.getItem('studentToken');
    const stID = studentData?.studentId;

    const [lecturerslist, setlecturerslist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlllectureres = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/lecturers/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setlecturerslist(response.data);
            } catch (error) {
                console.error('Error fetching enrolled courses:', error);
            } finally {
                setLoading(false);
            }
        };
        if (stID && token) {
            fetchAlllectureres();
        }
    }, [stID, token]);

    return (
        <div className="lecturers-page">
            <PageHeader
                title="Lecturers"
                buttonText="Back to profile"
                onBack={() => navigate("/student/profile")}
            />

            <div className="lecturers-page__content">
                {loading ? (
                    <p className="lecturers-page__status">Loading lecturers...</p>
                ) : lecturerslist.length > 0 ? (
                    <div className="lec-list">
                        <div className="lec-list__header">
                            <span className="lec-list__col lec-list__col--name">Name</span>
                            <span className="lec-list__col lec-list__col--email">Email</span>
                            <span className="lec-list__col lec-list__col--dept">Department</span>
                        </div>

                        {lecturerslist.map((lecturer) => (
                            <div key={lecturer._id} className="lec-row">
                                <div className="lec-row__col lec-row__col--name">
                                    <div className="lec-row__avatar">
                                        {lecturer.name ? lecturer.name.charAt(0).toUpperCase() : "?"}
                                    </div>
                                    <span>{lecturer.name}</span>
                                </div>
                                <span className="lec-row__col lec-row__col--email">{lecturer.email}</span>
                                <span className="lec-row__col lec-row__col--dept">
                                    <span className="lec-row__badge">{lecturer.department}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="lecturers-page__status">No lecturers found.</p>
                )}
            </div>
        </div>
    );
};
export default LecturersList;
import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageHeader from '../components/header';

function LecturersList (){
    const navigate = useNavigate();
    const studentData = JSON.parse(localStorage.getItem('studentData'));
    const token = localStorage.getItem('studentToken');
    const stID = studentData ?.studentId;

    const [lecturerslist, setlecturerslist] = useState([]);


    useEffect(() => {
        const fetchAlllectureres = async () => {
            try{
                const response = await axios.get(`http://localhost:5000/api/lecturers/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setlecturerslist(response.data);
                console.log(response.data);
            }catch(error){
                console.error('Error fetching enrolled courses:', error);
            }
        };
        if (stID && token) {
            fetchAlllectureres();
        }
    },
    [stID, token]);



    return(
        <div>
            <PageHeader 
            title="Enrolled Courses" 
            buttonText="Back to profile"
            onBack={() => navigate("/student/profile")}
            />

            <div>
                {lecturerslist.length > 0 ? (
                    <div className="lec-grid">
                        {lecturerslist.map((lecturers) => (
                            <div key={lecturers._id} className="lec-card">
                                <h3>{lecturers.name}</h3>
                                <p>{lecturers.email}</p>
                                <p>{lecturers.department}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No lecturers found.</p>
                )}
            </div>
        </div>
    );
};
export default LecturersList;
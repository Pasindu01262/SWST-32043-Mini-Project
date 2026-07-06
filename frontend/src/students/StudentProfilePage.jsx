import React from 'react';
import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentProfilePage.css';
import StudentProfileHeader from '../components/StudentProfileHeader';
import DashboardCard from '../components/DashboardCard';
import { PiExamFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaRegistered } from "react-icons/fa";

function StudentProfilePage(){
    const navigate = useNavigate();

    const studentData = JSON.parse(localStorage.getItem('studentData'));

    const token = localStorage.getItem('studentToken');
    const name = studentData ?.name;
    const role = studentData ?.role;
    

    useEffect(() => {
        if (!token) {
            // If no token is found, redirect to the login page
            window.location.href = '/';
        }}, [token]);

    const handleLogout = () => {
        localStorage.removeItem("studentToken");
        localStorage.removeItem("studentData");
        navigate("/");
    };
        

    return(
        <div className='container'>
            <StudentProfileHeader 
            name={name} 
            role={role} 
            onLogout={handleLogout}
            />
            <div className='dashboard_cards'>
                <DashboardCard
                    icon={FaChalkboardTeacher}
                    title="Lecturers"
                    buttonText="View Details"
                    onClick={ () => navigate("/student/lecturerslist") }
                />
                <DashboardCard
                    icon={PiExamFill}
                    title="Grades"
                    buttonText="View Details"
                    onClick={ () => navigate('/students/GradePage') }
                />
                <DashboardCard
                    icon={FaRegistered}
                    title="Registration"
                    buttonText="View Details"
                    /*navigate to registration page*/
                    onClick={ () => navigate("/student/registration")}
                />
            </div>
        </div>
    );
};
export default StudentProfilePage;
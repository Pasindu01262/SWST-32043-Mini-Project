import React from 'react';
import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentProfilePage.css';
import StudentProfileHeader from '../components/StudentProfileHeader';
import DashboardCard from '../components/DashboardCard';
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
        

    return(
        <div className='container'>
            <StudentProfileHeader 
            name={name} 
            role={role} />
            <div className='dashboard_cards'>
                <DashboardCard
                    icon="/path/to/lecturers-icon.png"
                    title="Lecturers"
                    buttonText="View Details"
                    onClick={ () => console.log("Lecturers") }
                />
                <DashboardCard
                    icon="/path/to/grades-icon.png"
                    title="Grades"
                    buttonText="View Details"
                    onClick={ () => console.log("Grades") }
                />
                <DashboardCard
                    icon="/path/to/profile-icon.png"
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
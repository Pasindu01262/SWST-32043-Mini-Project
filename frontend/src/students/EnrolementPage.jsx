import React, { use } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageHeader from '../components/header';
import './CourseRegistration.css';
function CourseRegistration (){

    const navigate = useNavigate();

    const studentData = JSON.parse(localStorage.getItem('studentData'));
    const token = localStorage.getItem('studentToken');
    const joinedYear = studentData ?.joinYear;
    const stID = studentData ?.studentId;


    const [courses, setCourses] = useState([]);
    /*const [selectedCourses, setSelectedCourses] = useState([]);*/
    const [searchTerm, setSearchTerm] = useState('');
    const [registeredCredits, setRegisteredCredits] = useState(0);
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/batch/batchdetails/${joinedYear}`);
                console.log(response.data);
                setCourses(response.data);
                
                
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);


    /*const handleAddCourse = (course) => {

        const existingCourse = selectedCourses.find(
            (c) => c.courseCode === course.courseCode
        );
        if (!existingCourse) {
            const selectedCourse = {
                courseCode: course.courseCode,
                credits: course.credits
            };

            setSelectedCourses([...selectedCourses, selectedCourse]);
        } else {
            alert('This course is already added.');
        }
    };*/

    const handleSubmit = async () => {
        try{
            const enrollmentCourses = courses.map(course => ({
                courseCode: course.courseCode,
                credits: course.credits
            }));

            await axios.post('http://localhost:5000/api/enrollments/enroll', 
            {
                studentId: stID,
                courses: enrollmentCourses
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        setIsEnrolled(true);
        alert('Selected courses submitted successfully!');
        }catch (error) {
            console.error('Error submitting selected courses:', error);
        }
    };

    useEffect(() => {
        const fetchRegisteredCredits = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/enrollments/totalCredits/${encodeURIComponent(stID)}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRegisteredCredits(response.data.totalCredits);
            } catch (error) {
                console.error('Error fetching registered credits:', error);
            }
        };

        fetchRegisteredCredits();
    }, []);

    

    return(
        <div className='container'>
            <PageHeader 
            title='Course Registration' 
            StudentID={stID} />
            <div className='button_row'>
                <button 
                className='action_btn1'
                onClick={() => navigate('/student/enrolled-courses')}
                >
                    All Enrollments
                </button>
                <div className='stuID'>
                    <span className='student_id'>{stID}</span>
                </div>
                {/*<button className='action_btn'>See Results</button>*/}
                <div className='serach_box'>
                    <input
                    type = "text"
                    placeholder = "Enter Course Code"
                    />
                </div>
                
                <button className='action_btn'>
                    Search course
                </button>
            </div>
            <div className='Level_details'>
                <p className='level'>{courses[0]?.level} </p>
                <p className='semester'>{courses[0]?.semester} </p>
                <p className='registered-credits'>Registered Credits: {registeredCredits} </p>
                <button 
                className='action_btn2'
                onClick={handleSubmit}>
                    Submit
                </button>
            </div>
            <div className='course_list'>
                {/*Display the list of courses*/}
                {courses.map((course) => (
                    <div key={course._id} className='course_card'>
                        <div className='details_card'>
                            <h3 >{course.courseCode}</h3>
                            <p className='course-name'>{course.courseName}</p>
                            <p className='course-credits'>Credits {course.credits}</p>
                            
                        </div>
                        <div className='enroll_card'>
                            <span className={isEnrolled ? "enrolled_text" : "enroll_text"}>
                                {isEnrolled ? "Enrolled" : "Enroll"}
                            </span>
                        </div>
                    </div>
                ))}     
            </div>
        </div>
    );
}

export default CourseRegistration;
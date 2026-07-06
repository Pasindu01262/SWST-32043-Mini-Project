import React, { use } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageHeader from '../components/header';
import CourseCard from '../components/CoursCard';
import SuccessCard from '../components/successRegister';
import ErrorCard from '../components/ErrorCard';
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
    
    const [searchResults, setSearchResults] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [submittedCourses, setSubmittedCourses] = useState([]);
    const [showSuccessCard, setShowSuccessCard] = useState(false);
    const [showErrorCard,setshowErrorCard] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successmsg,setSuccessmsg] = useState("");

    useEffect(() => {


        const showError = (message) => {
            if (!showErrorCard) {
                setErrorMessage(message);
                setshowErrorCard(true);
            }
        };


        const fetchEnrolledCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/enrollments/enrolledCourses/${encodeURIComponent(stID)}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEnrolledCourses(response.data.courses);
                console.log(response.data);
            } catch (error) {
                showError("Unable to connect to the server.");
            }
        };
        fetchEnrolledCourses();
    }, [stID, token]);


    const isCourseEnrolled = (courseCode) => {
        return enrolledCourses.some(
            (course) => course.courseCode === courseCode
        );
    };

    const areAllCoursesEnrolled = () => {
        return courses.every(course => isCourseEnrolled(course.courseCode));
    };

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

        if (areAllCoursesEnrolled()) {
            setErrorMessage("You have already enrolled in these courses..!");
            setshowErrorCard(true)
            return;
        }
        
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
        setSuccessmsg("Selected courses submitted successfully!")
        setSubmittedCourses(courses);
        setShowSuccessCard(true);
        }catch (error) {
            console.error('Error submitting selected courses:', error);
        }
    };

    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            setErrorMessage("Please enter a course code to search..!");
            setshowErrorCard(true)
            return;
        }
        
        try {
            const response = await axios.get(
                `http://localhost:5000/api/courses/search`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        courseCode: searchTerm
                    }
                }
            );
            const { data} = response.data;

            if (data.length === 0) {
                setErrorMessage("No courses found for this code.");
                setshowErrorCard(true);
                return;
            }
            
            setSearchResults(data);
            setShowPopup(true);
        } catch (error) {
            console.error('Error searching courses:', error);
            
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
            StudentID={stID}
            buttonText="Back to profile"
            onBack={() => navigate("/student/profile")} 
            />
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
                    value = {searchTerm}
                    onChange = {(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <button 
                className='action_btn'
                onClick={handleSearch}
                >
                    Search course
                </button>
                <CourseCard
                course_id={searchResults}
                isOpen={showPopup}
                onClose={() => setShowPopup(false)}
                />
                <ErrorCard
                errormsg = {errorMessage}
                isOpen={showErrorCard}
                onClose={()=> setshowErrorCard(false)}
                />
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
                <SuccessCard
                enrolledCourses={submittedCourses}
                isOpen={showSuccessCard}
                onClose={() => setShowSuccessCard(false)}
                msg={successmsg}
                />
                <ErrorCard
                errormsg = {errorMessage}
                isOpen={showErrorCard}
                onClose={()=> setshowErrorCard(false)}
                />
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
                            <span 
                            className ={
                                isCourseEnrolled(course.courseCode) 
                                ? 'enrolled' 
                                : 'not-enrolled'
                            }
                            >
                               {isCourseEnrolled(course.courseCode) 
                               ? 'Enrolled' 
                               : 'Not Enrolled'
                               }
                            </span>
                        </div>
                    </div>
                ))}     
            </div>
        </div>
    );
}

export default CourseRegistration;
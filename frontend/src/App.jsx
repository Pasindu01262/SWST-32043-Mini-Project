import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentProfilePage from './students/StudentProfilePage';
import StudentLogin from './students/StudentLogin';
import CourseRegistration from './students/EnrolementPage';
import EnrolledCoursesList from './students/CoursesListShowPage';
import Lecturers from './pages/admin/Lecturers';
import AdminLayout from './layouts/AdminLayout';
import AddStudent from './pages/admin/AddStudent';
import Courses from './pages/admin/Courses';
import LecturersList from './lecturePage/LectureList'
import BatchRegistration from './students/BatchRegistration'



function App() {
  const [message, setMessage] = useState("Loading backend status...");

  useEffect(() => {
    fetch('http://localhost:5000/api/status')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage("Backend connection failed! ❌"));
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/admin" element={ <AdminLayout pageTitle="Dashboard"> <h1>Dashboard page</h1> </AdminLayout> } />
        
        {/* Student profile page */}
        <Route path="/student/profile" element={<StudentProfilePage />} />

        {/* Student login page */}
        <Route path="/" element={<StudentLogin />} />

        {/* Student course registration page */}
        <Route path="/student/registration" element={<CourseRegistration />} />

        {/* Student enrolled courses list page */}
        <Route path="/student/enrolled-courses" element={<EnrolledCoursesList />} />

        <Route path="/admin/courses" element={<Courses />} />

        {/* lecturers list page */}
        <Route path="/admin/lecturers" element={<Lecturers />} />

        <Route path="/admin/students" element={<AddStudent />} />

        <Route path="/student/lecturerslist" element={<LecturersList/>}/>
        {/* Fallback Selection Portal Landing Page */}

        {/*Batch registration */}
        
        <Route path="/student/batchregistration" element={<BatchRegistration/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AdminProtectedRoute from './pages/admin/AdminProtectedRoute';

// Admin Imports
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Courses from './pages/admin/Courses';
import Lecturers from './pages/admin/Lecturers';
import AddStudent from './pages/admin/AddStudent';
import AdminResults from './pages/AdminResults';
import BatchRegistration from './students/BatchRegistration';

// Student Imports
import StudentLogin from './students/StudentLogin';
import StudentProfilePage from './students/StudentProfilePage';
import CourseRegistration from './students/EnrolementPage';
import EnrolledCoursesList from './students/CoursesListShowPage';
import LecturersList from './lecturePage/LectureList';
import MyResults from './pages/MyResults';

//student gared see
import GradeShowPage from './students/GradePage'

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/status')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.log("Backend connection failed! ❌"));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Default Landing / Student Login Page */}
        <Route path="/" element={<StudentLogin />} />

        {/*Admin Routes*/}
        {/*Protected Admin Routes*/}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />
        <Route path="/admin/courses" element={<AdminProtectedRoute><Courses /></AdminProtectedRoute>} />
        <Route path="/admin/lecturers" element={<AdminProtectedRoute><Lecturers /></AdminProtectedRoute>} />
        <Route path="/admin/students" element={<AdminProtectedRoute><AddStudent /></AdminProtectedRoute>} />
        <Route path="/admin/results" element={<AdminProtectedRoute><AdminResults /></AdminProtectedRoute>} />
        <Route path="/admin/batchregistration" element={<AdminProtectedRoute><BatchRegistration /></AdminProtectedRoute>} />

        {/*Student Routes*/}
        <Route path="/student/profile" element={<StudentProfilePage />} />
        <Route path="/student/registration" element={<CourseRegistration />} />
        <Route path="/student/enrolled-courses" element={<EnrolledCoursesList />} />
        <Route path="/student/lecturerslist" element={<LecturersList />} />
        <Route path="/my-results" element={<MyResults />} />
        <Route path="/students/GradePage" element={<GradeShowPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
   

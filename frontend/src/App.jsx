import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import StudentProfilePage from './students/StudentProfilePage';
import StudentLogin from './students/StudentLogin';
import CourseRegistration from './students/EnrolementPage';
import EnrolledCoursesList from './students/CoursesListShowPage';
import Lecturers from './pages/admin/Lecturers';

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

        {/* lecturers list page */}
        <Route path="/admin/lecturers" element={<Lecturers />} />

        {/* Fallback Selection Portal Landing Page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

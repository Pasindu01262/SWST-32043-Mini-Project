import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import PageHeader from './components/header';
import Lecturers from './pages/admin/Lecturers';
import AddStudent from './pages/admin/AddStudent';
import CourseRegistration from './students/EnrolementPage';
import StudentLogin from './students/StudentLogin';
import StudentProfileHeader from './components/StudentProfileHeader';
import StudentProfilePage from './students/StudentProfilePage';

function App() {
  const [message, setMessage] = useState("Loading backend status...");

  useEffect(() => {
    fetch('http://localhost:5000/api/status')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage("Backend connection failed! "));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/admin" element={ <AdminLayout pageTitle="Dashboard"> <h1>Dashboard page</h1> </AdminLayout> } />
        
        <Route path="/admin/lecturers" element={<Lecturers />} />
        <Route path="/admin/students" element={<AddStudent />} />
        <Route path="/student/registration" element={<CourseRegistration />} />
        <Route path="/head" element={<PageHeader />} />
        <Route path="/" element={<StudentLogin />} />
        <Route path="/student/profile" element={<StudentProfilePage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

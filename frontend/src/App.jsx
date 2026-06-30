<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Lecturers from './pages/admin/Lecturers';
import AddStudent from './pages/admin/AddStudent';
=======
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Lecturers from './pages/admin/Lecturers';
import CourseRegistration from './students/EnrolementPage';
import PageHeader from './components/header'
>>>>>>> 22006e7b1cff1fbe933a15d58f884bb76e580e3b

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
        {/* Admin Interface */}
        <Route path="/admin" element={
            <AdminLayout pageTitle="Dashboard">
              <h1>Dashboard page</h1>
            </AdminLayout>
        } />
        
        
        {/*Lecturer Route */}
        <Route path="/admin/lecturers" element={<Lecturers />} />

<<<<<<< HEAD
        <Route path="/admin/students" element={<AddStudent />} />
=======
        {/*Studen Courss Enrolment route */}
        <Route path="/student/registration" element={<CourseRegistration />} />

        <Route path="/head" element={<PageHeader />} />
>>>>>>> 22006e7b1cff1fbe933a15d58f884bb76e580e3b

      </Routes>
    </BrowserRouter>
  );
}

export default App;

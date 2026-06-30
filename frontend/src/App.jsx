import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Lecturers from './pages/admin/Lecturers';
import CourseRegistration from './students/EnrolementPage';
import PageHeader from './components/header'

function App() {
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

        {/*Studen Courss Enrolment route */}
        <Route path="/student/registration" element={<CourseRegistration />} />

        <Route path="/head" element={<PageHeader />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

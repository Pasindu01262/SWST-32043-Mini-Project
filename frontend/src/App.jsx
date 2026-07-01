import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Courses from './pages/admin/Courses';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Admin Dashboard */}
        <Route path="/admin" element={
            <AdminLayout pageTitle="Dashboard">
              <h1>Dashboard page</h1>
            </AdminLayout>
        } />

        {/* Courses Route */}
        <Route path="/admin/courses" element={<Courses />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Courses from './pages/admin/Courses';

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [userRole, setUserRole] = useState(null); // 'admin', 'lecturer', 'student', or null
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (userRole === 'admin') {
      if (username === 'admin' && password === 'admin123') {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Invalid admin credentials!');
      }
    } else {
      // Placeholder for Student & Lecturer validation
      setIsAuthenticated(true);
      setError('');
    }
  };

        {/* Admin Dashboard */}
        <Route path="/admin" element={
            <AdminLayout pageTitle="Dashboard">
              <h1>Dashboard page</h1>
            </AdminLayout>
        } />

        {/* Courses Route */}
        <Route path="/admin/courses" element={<Courses />} />
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

}

export default App;
  const resetPortal = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <Router>
      <Routes>
        {/* Portal Gateway / Login Page */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              userRole === 'admin' ? <Navigate to="/admin" replace /> : 
              userRole === 'lecturer' ? <Navigate to="/lecturer" replace /> : 
              <Navigate to="/student" replace />
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0f172a', fontFamily: 'sans-serif' }}>
                
                {/* STEP 1: CHOICE SCREEN */}
                {!userRole ? (
                  <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', width: '450px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                    <h2 style={{ color: '#0f172a', marginBottom: '8px' }}>University Portal</h2>
                    <p style={{ color: '#64748b', marginBottom: '32px' }}>Please select your role to continue access</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <button onClick={() => setUserRole('admin')} style={{ padding: '16px', backgroundColor: '#f97316', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                        Login as Administrator
                      </button>
                      <button onClick={() => setUserRole('lecturer')} style={{ padding: '16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                        Login as Lecturer
                      </button>
                      <button onClick={() => setUserRole('student')} style={{ padding: '16px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                        Login as Student
                      </button>
                    </div>
                  </div>
                ) : (
                  
                  /* STEP 2: DYNAMIC LOGIN FORM */
                  <form onSubmit={handleLogin} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', width: '360px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    <button type="button" onClick={() => setUserRole(null)} style={{ border: 'none', background: 'none', color: '#3b82f6', cursor: 'pointer', padding: 0, marginBottom: '16px' }}>
                      ← Back to roles
                    </button>
                    
                    <h2 style={{ margin: '0 0 6px 0', color: '#0f172a', textTransform: 'capitalize' }}>{userRole} Sign In</h2>
                    <p style={{ color: '#64748b', fontSize: '14px', marginTop: 0, marginBottom: '24px' }}>Secure Portal Verification</p>
                    
                    {error && <div style={{ color: '#ef4444', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}
                    
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#334155' }}>Username / Email</label>
                      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} placeholder={`Enter ${userRole} id`} required />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#334155' }}>Password</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} placeholder="Enter password" required />
                    </div>

                    <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: userRole === 'admin' ? '#f97316' : userRole === 'lecturer' ? '#3b82f6' : '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                      Sign In
                    </button>
                  </form>
                )}
              </div>
            )
          } 
        />

        {/* Protected Dashboard Routes */}
        <Route path="/admin" element={isAuthenticated && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />} />
        
        {/* Placeholder Views for Teammates' parts */}
        <Route path="/lecturer" element={isAuthenticated && userRole === 'lecturer' ? <div style={{ padding: '40px', color: 'white' }}><h2>Lecturer Workspace</h2><button onClick={resetPortal}>Logout</button></div> : <Navigate to="/" replace />} />
        <Route path="/student" element={isAuthenticated && userRole === 'student' ? <div style={{ padding: '40px', color: 'white' }}><h2>Student Portal Hub</h2><button onClick={resetPortal}>Logout</button></div> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

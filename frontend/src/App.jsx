import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';

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
        
        {/* All admin paths feed into our dashboard shell but open different default views */}
        <Route path="/admin" element={<AdminDashboard initialTab="Dashboard" />} />
        <Route path="/admin/lecturers" element={<AdminDashboard initialTab="Lecturers" />} />
        <Route path="/admin/courses" element={<AdminDashboard initialTab="Courses" />} />
        <Route path="/admin/results" element={<AdminDashboard initialTab="Student Results" />} />

        {/* Fallback Selection Portal Landing Page */}
        <Route path="/" element={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0f172a', color: 'white', fontFamily: 'sans-serif' }}>
            <div style={{ textAlign: 'center', backgroundColor: '#1e293b', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
              <h2 style={{ marginBottom: '8px' }}>University Portal Gateway</h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
                System Status: <span style={{ color: message.includes('failed') ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>{message}</span>
              </p>
              <button onClick={() => window.location.href='/admin'} style={{ padding: '12px 24px', backgroundColor: '#f97316', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
                Go to Admin Workspace
              </button>
            </div>
          </div>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
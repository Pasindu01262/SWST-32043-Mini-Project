import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, GraduationCap, UserPlus } from 'lucide-react';
import axios from 'axios';

function AdminDashboard() {
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalLecturers: 0,
    students: []
  });

  // Sidebar navigation - each item links to its own existing route/page,
  // rather than being rendered as an embedded tab inside this component.
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Courses', icon: <BookOpen size={20} />, path: '/admin/courses' },
    { name: 'Lecturers', icon: <Users size={20} />, path: '/admin/lecturers' },
    { name: 'Results', icon: <GraduationCap size={20} />, path: '/admin/results' },
    { name: 'Register Student', icon: <UserPlus size={20} />, path: '/admin/students' },
  ];

  useEffect(() => {
    fetchDashboardSummary();
  }, []);

  const fetchDashboardSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/dashboard/summary');
      setDashboardData(response.data);
    } catch (err) {
      setError('Failed to fetch dashboard summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8fafc', color: '#1e293b', fontFamily: 'sans-serif' }}>

      {/* Sidebar */}
      <div style={{ width: '260px', backgroundColor: '#0f172a', color: '#cbd5e1', padding: '24px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', paddingLeft: '8px' }}>
            <div style={{ backgroundColor: '#f97316', padding: '8px', borderRadius: '8px', color: 'white' }}>
              <GraduationCap size={24} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: 'white' }}>UniAdmin</h2>
              <small style={{ color: '#64748b' }}>Management System</small>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    backgroundColor: isActive ? '#1e293b' : 'transparent',
                    color: isActive ? '#3b82f6' : '#94a3b8',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontWeight: isActive ? '600' : 'normal',
                    textDecoration: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div style={{ fontSize: '12px', color: '#475569', textAlign: 'center' }}>
          © 2026 UniAdmin
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <header style={{ height: '70px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Dashboard</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>Admin User</div>
              <small style={{ color: '#64748b', fontSize: '12px' }}>Administrator</small>
            </div>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#0f172a', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              AU
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
          {loading && <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading...</div>}
          {error && <div style={{ padding: '20px', color: '#dc2626', backgroundColor: '#fee2e2', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}

          {!loading && !error && (
            <>
              {/* Stat Cards */}
              <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
                <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>Total Students</div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b' }}>{dashboardData.totalStudents}</div>
                  </div>
                  <div style={{ backgroundColor: '#dbeafe', color: '#3b82f6', padding: '12px', borderRadius: '50%' }}>
                    <Users size={22} />
                  </div>
                </div>

                <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>Total Courses</div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b' }}>{dashboardData.totalCourses}</div>
                  </div>
                  <div style={{ backgroundColor: '#dbeafe', color: '#3b82f6', padding: '12px', borderRadius: '50%' }}>
                    <BookOpen size={22} />
                  </div>
                </div>

                <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>Total Lecturers</div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b' }}>{dashboardData.totalLecturers}</div>
                  </div>
                  <div style={{ backgroundColor: '#dbeafe', color: '#3b82f6', padding: '12px', borderRadius: '50%' }}>
                    <GraduationCap size={22} />
                  </div>
                </div>
              </div>

              {/* Registered Students List */}
              <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
                  <h2 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>Registered Students List</h2>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>ID</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Name</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Email</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Enrolled Course</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.students.length === 0 ? (
                      <tr>
                        <td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>No students found</td>
                      </tr>
                    ) : (
                      dashboardData.students.map((student) => (
                        <tr key={student.studentId} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '16px', color: '#1e293b', fontWeight: '600' }}>{student.studentId}</td>
                          <td style={{ padding: '16px', color: '#475569' }}>{student.name}</td>
                          <td style={{ padding: '16px', color: '#475569' }}>{student.email}</td>
                          <td style={{ padding: '16px', color: '#3b82f6' }}>
                            {student.enrolledCourses && student.enrolledCourses.length > 0
                              ? student.enrolledCourses.join(', ')
                              : '—'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;

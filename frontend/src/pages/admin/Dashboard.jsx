import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, GraduationCap, UserPlus } from 'lucide-react';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';

function Dashboard() {
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalLecturers: 0,
    students: []
  });


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
    <AdminLayout pageTitle="Dashboard">
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8fafc', color: '#1e293b', fontFamily: 'sans-serif' }}>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

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
    </AdminLayout>
  );
}

export default Dashboard;
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, BookOpen, Users, GraduationCap, UserPlus, Pencil, Trash2 } from 'lucide-react';
import axios from 'axios';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [lecturers, setLecturers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Courses', icon: <BookOpen size={20} /> },
    { name: 'Lecturers', icon: <Users size={20} /> },
    { name: 'Results', icon: <GraduationCap size={20} /> },
    { name: 'Register Student', icon: <UserPlus size={20} /> },
  ];

  // Fetch data when tab changes
  useEffect(() => {
    if (activeTab === 'Lecturers') {
      fetchLecturers();
    } else if (activeTab === 'Courses') {
      fetchCourses();
    } else if (activeTab === 'Results') {
      fetchResults();
    }
  }, [activeTab]);

  const fetchLecturers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/lecturers');
      setLecturers(response.data.data || response.data);
    } catch (err) {
      setError('Failed to fetch lecturers');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
    } catch (err) {
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/results');
      setResults(response.data.data || response.data);
    } catch (err) {
      setError('Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      try {
        await axios.delete(`http://localhost:5000/api/${type}/${id}`);
        if (type === 'lecturers') fetchLecturers();
        else if (type === 'courses') fetchCourses();
        else if (type === 'results') fetchResults();
      } catch (err) {
        alert('Error deleting');
      }
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
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: activeTab === item.name ? '#1e293b' : 'transparent',
                  color: activeTab === item.name ? '#3b82f6' : '#94a3b8',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: activeTab === item.name ? '600' : 'normal',
                  transition: 'all 0.2s'
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
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
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{activeTab}</h1>
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
          {activeTab === 'Dashboard' && (
            <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h3>Welcome to the Admin Command Center</h3>
              <p style={{ color: '#64748b' }}>Select an option from the sidebar to manage university settings, courses, lecturers, or view student results.</p>
            </div>
          )}

          {/* LECTURERS TABLE */}
          {activeTab === 'Lecturers' && (
            <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
                <h2 style={{ margin: '0', fontSize: '28px', fontWeight: 'bold', color: '#1e293b' }}>Lecturer Directory</h2>
              </div>

              {loading && <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading...</div>}
              {error && <div style={{ padding: '20px', color: '#dc2626', backgroundColor: '#fee2e2' }}>{error}</div>}

              {!loading && !error && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Name</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Email</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Department</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Phone</th>
                      <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#1e293b' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lecturers.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>No lecturers found</td>
                      </tr>
                    ) : (
                      lecturers.map((lecturer) => (
                        <tr key={lecturer._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '16px', color: '#1e293b', fontWeight: '600' }}>{lecturer.name}</td>
                          <td style={{ padding: '16px', color: '#475569' }}>{lecturer.email}</td>
                          <td style={{ padding: '16px', color: '#475569' }}>{lecturer.department}</td>
                          <td style={{ padding: '16px', color: '#475569' }}>{lecturer.phone}</td>
                          <td style={{ padding: '16px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6' }}>
                              <Pencil size={18} />
                            </button>
                            <button onClick={() => handleDelete(lecturer._id, 'lecturers')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* COURSES TABLE */}
          {activeTab === 'Courses' && (
            <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
                <h2 style={{ margin: '0', fontSize: '28px', fontWeight: 'bold', color: '#1e293b' }}>Available Courses</h2>
              </div>

              {loading && <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading...</div>}
              {error && <div style={{ padding: '20px', color: '#dc2626', backgroundColor: '#fee2e2' }}>{error}</div>}

              {!loading && !error && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Course Name</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Code</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Credits</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Semester</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Year</th>
                      <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#1e293b' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>No courses found</td>
                      </tr>
                    ) : (
                      courses.map((course) => (
                        <tr key={course._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '16px', color: '#1e293b', fontWeight: '600' }}>{course.courseName}</td>
                          <td style={{ padding: '16px', color: '#475569' }}>{course.courseCode}</td>
                          <td style={{ padding: '16px', color: '#475569' }}>{course.credits}</td>
                          <td style={{ padding: '16px', color: '#475569' }}>{course.semester}</td>
                          <td style={{ padding: '16px', color: '#475569' }}>{course.academicYear}</td>
                          <td style={{ padding: '16px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6' }}>
                              <Pencil size={18} />
                            </button>
                            <button onClick={() => handleDelete(course._id, 'courses')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* RESULTS TABLE */}
          {activeTab === 'Results' && (
            <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
                <h2 style={{ margin: '0', fontSize: '28px', fontWeight: 'bold', color: '#1e293b' }}>Student Results</h2>
              </div>

              {loading && <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading...</div>}
              {error && <div style={{ padding: '20px', color: '#dc2626', backgroundColor: '#fee2e2' }}>{error}</div>}

              {!loading && !error && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#1e293b' }}>Student ID</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Course ID</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Marks</th>
                      <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Grade</th>
                      <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#1e293b' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>No results found</td>
                      </tr>
                    ) : (
                      results.map((result) => (
                        <tr key={result._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '16px', color: '#1e293b', fontWeight: '600' }}>{result.studentId}</td>
                          <td style={{ padding: '16px', color: '#475569' }}>{result.courseId}</td>
                          <td style={{ padding: '16px', color: '#475569' }}>{result.marks}</td>
                          <td style={{ padding: '16px', color: '#475569', fontWeight: '600' }}>{result.grade}</td>
                          <td style={{ padding: '16px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6' }}>
                              <Pencil size={18} />
                            </button>
                            <button onClick={() => handleDelete(result._id, 'results')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === 'Register Student' && (
            <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h3>Student Registration Panel</h3>
              <p style={{ color: '#64748b' }}>Use the AddStudent page for student registration.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
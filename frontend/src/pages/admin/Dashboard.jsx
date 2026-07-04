import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Users, BookOpen, GraduationCap } from 'lucide-react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalStudents: 0, totalCourses: 0, totalLecturers: 0 });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, studentsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/dashboard/stats'),
        axios.get('http://localhost:5000/api/students'),
      ]);

      setStats(statsRes.data);
      setStudents(studentsRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  // enrolledCourses is an array of populated Course objects ({ courseCode, courseName })
  const renderEnrolledCourses = (enrolledCourses) => {
    if (!enrolledCourses || enrolledCourses.length === 0) {
      return <span className="no-course">Not enrolled</span>;
    }
    return (
      <div className="course-tags">
        {enrolledCourses.map((course) => (
          <span key={course._id} className="course-tag">
            {course.courseCode}
          </span>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout pageTitle="Dashboard">
      <div className="dashboard-page-container">

        {/* Stat Cards */}
        <div className="stats-row">
          <div className="stat-card">
            <div>
              <p className="stat-label">Total Students</p>
              <h2 className="stat-value">{loading ? '—' : stats.totalStudents}</h2>
            </div>
            <div className="stat-icon-badge students">
              <Users size={22} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <p className="stat-label">Total Courses</p>
              <h2 className="stat-value">{loading ? '—' : stats.totalCourses}</h2>
            </div>
            <div className="stat-icon-badge courses">
              <BookOpen size={22} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <p className="stat-label">Total Lecturers</p>
              <h2 className="stat-value">{loading ? '—' : stats.totalLecturers}</h2>
            </div>
            <div className="stat-icon-badge lecturers">
              <GraduationCap size={22} />
            </div>
          </div>
        </div>

        {/* Registered Students List */}
        <div className="card-container">
          <h3 className="card-title">Registered Students List</h3>

          {loading && <div className="dashboard-status">Loading...</div>}
          {error && <div className="dashboard-status error">{error}</div>}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Enrolled Course</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td className="student-id">{student.studentId}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{renderEnrolledCourses(student.enrolledCourses)}</td>
                    </tr>
                  ))}

                  {students.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', color: '#64748b' }}>
                        No students registered yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
};

export default Dashboard;
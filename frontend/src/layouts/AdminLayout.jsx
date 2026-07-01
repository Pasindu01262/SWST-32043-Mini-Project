import React from 'react';
import { LayoutDashboard, BookOpen, GraduationCap, FileText, UserPlus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './AdminLayout.css'; 

const AdminLayout = ({ children, pageTitle }) => {
    const location = useLocation();

    const isActive = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
    };

    return (
    <div className="admin-layout-container">
    
      {/* Sidebar */}
        <aside className="admin-sidebar">
        <div className="sidebar-header">
            <div className="logo-icon">
            <GraduationCap size={24} color="white" />
            </div>
            <div className="logo-text">
            <h1>UniAdmin</h1>
            <p>Management System</p>
            </div>
        </div>

        <nav className="sidebar-nav">
            <Link to="/admin" className={isActive('/admin')}>
            <LayoutDashboard size={20} /> <span>Dashboard</span>
            </Link>
            <Link to="/admin/courses" className={isActive('/admin/courses')}>
            <BookOpen size={20} /> <span>Courses</span>
            </Link>
            <Link to="/admin/lecturers" className={isActive('/admin/lecturers')}>
            <GraduationCap size={20} /> <span>Lecturers</span>
            </Link>
            <Link to="/admin/results" className={isActive('/admin/results')}>
            <FileText size={20} /> <span>Results</span>
            </Link>
            <Link to="/admin/register-student" className={isActive('/admin/register-student')}>
            <UserPlus size={20} /> <span>Register Student</span>
            </Link>
        </nav>

        <div className="sidebar-footer">
            © 2026 UniAdmin
        </div>
        </aside>

      {/* Main Content Area */}
        <div className="admin-main-content">
        
        {/* Header */}
        <header className="admin-header">
            <h2>{pageTitle}</h2>
            <div className="header-user-info">
            <div className="user-text">
                <p className="user-name">Admin User</p>
                <p className="user-role">Administrator</p>
            </div>
            <div className="user-avatar">
                AU
            </div>
            </div>

  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <div className="admin-layout-container">
      
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="logo-icon">
            <GraduationCap size={24} color="white" />
          </div>
          <div className="logo-text">
            <h1>UniAdmin</h1>
            <p>Management System</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin" className={isActive('/admin')}>
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </Link>
          <Link to="/admin/courses" className={isActive('/admin/courses')}>
            <BookOpen size={20} /> <span>Courses</span>
          </Link>
          <Link to="/admin/lecturers" className={isActive('/admin/lecturers')}>
            <GraduationCap size={20} /> <span>Lecturers</span>
          </Link>
          <Link to="/admin/results" className={isActive('/admin/results')}>
            <FileText size={20} /> <span>Results</span>
          </Link>
          <Link to="/admin/students" className={isActive('/admin/register-student')}>
            <UserPlus size={20} /> <span>Register Student</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          © 2026 UniAdmin
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main-content">
        
        {/* Header */}
        <header className="admin-header">
          <h2>{pageTitle}</h2>
          <div className="header-user-info">
            <div className="user-text">
              <p className="user-name">Admin User</p>
              <p className="user-role">Administrator</p>
            </div>
            <div className="user-avatar">
              AU
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="admin-content-area">
            {children}
        </main>
        </div>
    </div>
    );
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
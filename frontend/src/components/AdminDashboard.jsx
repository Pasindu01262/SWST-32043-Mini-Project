import React, { useState } from 'react';
import { LayoutDashboard, BookOpen, Users, GraduationCap, UserPlus } from 'lucide-react';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Courses', icon: <BookOpen size={20} /> },
    { name: 'Lecturers', icon: <Users size={20} /> },
    { name: 'Results', icon: <GraduationCap size={20} /> },
    { name: 'Register Student', icon: <UserPlus size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f8fafc', color: '#1e293b', fontFamily: 'sans-serif' }}>
      
      {/* Sidebar */}
      <div style={{ width: '260px', backgroundColor: '#0f172a', color: '#cbd5e1', padding: '24px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Logo Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', paddingLeft: '8px' }}>
            <div style={{ backgroundColor: '#f97316', padding: '8px', borderRadius: '8px', color: 'white' }}>
              <GraduationCap size={24} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: 'white' }}>UniAdmin</h2>
              <small style={{ color: '#64748b' }}>Management System</small>
            </div>
          </div>

          {/* Navigation Links */}
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

        {/* Footer info */}
        <div style={{ fontSize: '12px', color: '#475569', textAlign: 'center' }}>
          © 2026 UniAdmin
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Header bar */}
        <header style={{ height: '70px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{activeTab}</h1>
          
          {/* Admin User Info Profile block */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>Admin User</div>
              <small style={{ color: '#64748b', fontSize: '12px' }}>Administrator</small>
            </div>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#0f172a', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
              AU
            </div>
          </div>
        </header>

        {/* Dynamic Inner Dashboard Body View */}
        <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
          {activeTab === 'Dashboard' && (
            <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h3>Welcome to the Admin Command Center</h3>
              <p style={{ color: '#64748b' }}>Select an option from the sidebar to manage university settings, courses, lecturers, or view student results tables.</p>
            </div>
          )}
          {activeTab !== 'Dashboard' && (
            <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h3>{activeTab} Panel</h3>
              <p style={{ color: '#64748b' }}>This module configuration view is ready to be mapped to the new backend schema controllers.</p>
            </div>
          )}
        </main>
      </div>

    </div>
  );
}

export default AdminDashboard;
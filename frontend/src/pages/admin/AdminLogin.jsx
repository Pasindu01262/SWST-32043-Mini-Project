import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send a request to the Login API we created in the backend.
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email: email,
        password: password
      });

      if (response.data.success) {
        // 1. If the login is successful, store the data in the browser.
        localStorage.setItem('adminToken', 'logged-in');
        localStorage.setItem('adminEmail', response.data.admin.email);

        // 2. Redirect to the Admin Dashboard.
        navigate('/admin/dashboard');
      }
    } catch (err) {
      // Show an error if the email or password is incorrect.
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong! Server connection failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleAdminLogin} className="admin-login-form">
        <h2 className="admin-login-title">Admin Login</h2>
        

        {error && <div className="admin-login-error">{error}</div>}

        <div className="form-group">
          <label className="form-label">Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="admin@gmail.com" 
            className="form-input" 
            required 
          />
        </div>

        <div className="form-group-last">
          <label className="form-label">Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••" 
            className="form-input" 
            required 
          />
        </div>

        <button type="submit" className="admin-login-button" disabled={loading}>
          Login to Dashboard
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
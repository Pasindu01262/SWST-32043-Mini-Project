import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Pencil, Trash2 } from 'lucide-react';
import axios from 'axios'; 
import './Lecturers.css';

const Lecturers = () => {
  // States for storing data
  const [lecturers, setLecturers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: ''
  });

  // A new state for updating (to store the ID of the item currently being edited)
  const [editingId, setEditingId] = useState(null);

  // 1. Fetch data from the database when the page loads (GET request)
  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/lecturers');
      setLecturers(response.data);
    } catch (error) {
      console.error('Error fetching lecturers:', error);
    }
  };

// 2. Update the state when the form is filled
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



// A single function to add a new item and update an existing one
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // If an ID exists, it means it's an update (PUT request)
        await axios.put(`http://localhost:5000/api/lecturers/${editingId}`, formData);
        alert('Lecturer updated successfully! ');
      } 
      
      else {
        // If there is no ID, it means it's a new item (POST request)
        await axios.post('http://localhost:5000/api/lecturers', formData);
        alert('Lecturer added successfully!');
      }
      
      setFormData({ name: '', email: '', phone: '', department: '' });
      setEditingId(null); // // Exit edit mode
      fetchLecturers(); 
    } catch (error) {
      console.error('Error saving lecturer:', error);
      alert('Failed to save lecturer details.');
    }
    };


    // Function to load data into the form when the Edit button is clicked
  const handleEdit = (lecturer) => {
    setEditingId(lecturer._id);
    setFormData({
      name: lecturer.name,
      email: lecturer.email,
      phone: lecturer.phone,
      department: lecturer.department
    });
  };

  // Function to delete data from the database when the Delete button is clicked
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lecturer?')) {
      try {
        await axios.delete(`http://localhost:5000/api/lecturers/${id}`);
        alert('Lecturer deleted!');
        fetchLecturers();// Refresh the table immediately after deletion
      } catch (error) {
        console.error('Error deleting lecturer:', error);
        alert('Failed to delete lecturer.');
      }
    }
  
  };

  return (
    <AdminLayout pageTitle="Lecturers Management">
      <div className="lecturers-page-container">
        
        {/* Add New Lecturer Form */}
        <div className="card-container">
          <h3 className="card-title">{editingId ? 'Edit Lecturer Details' : 'Add New Lecturer'}</h3>
          
         {/* Add onSubmit to the form */}
          <form className="lecturer-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Dr. Kasun Perera" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="k.perera@university.ac" required />
            </div>
            <div className="form-group">
              <label>Phone number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="0712345678" required />
            </div>
            <div className="form-group">
              <label>Department</label>
              <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Computer Engineering" required />
            </div>

           {/* Button color and text change when in edit mode */}
            <button 
              type="submit" 
              className="submit-btn" 
              style={{ backgroundColor: editingId ? '#142243' : '#142243' }}
            >
              {editingId ? 'Update Details' : '+ Add Lecturer'}
            </button>


          {/* Separate Cancel button for exiting edit mode */}
            {editingId && (
              <button 
                type="button" 
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', email: '', phone: '', department: '' });
                }} 
                style={{ marginTop: '8px', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '8px', background: 'white', cursor: 'pointer' }}
              >
                Cancel Edit
              </button>
            )}

          </form>
        </div>

        {/* Lecturer Directory Table */}
        <div className="card-container">
          <h3 className="card-title">Lecturer Directory</h3>
          <div className="table-responsive">
            <table className="lecturer-table">
              <thead>
                <tr>
                  <th>Lecturer Name</th>
                  <th>Email</th> 
                  <th>Department</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Mapping data from the database into the table */}
                {lecturers.map((lecturer) => (
                  <tr key={lecturer._id}>
                    <td className="lecturer-name">{lecturer.name}</td>
                    <td>{lecturer.email}</td>
                    <td>{lecturer.department}</td>
                    <td>{lecturer.phone}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="icon-btn edit" title="Edit"  onClick={() => handleEdit(lecturer)}>
                          <Pencil size={18} />
                        </button>
                        <button className="icon-btn delete" title="Delete"  onClick={() => handleDelete(lecturer._id)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
               {/* Display message when there is no data */}
                {lecturers.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', color: '#64748b' }}>
                      No lecturers found. Please add a new lecturer.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};


export default Lecturers;
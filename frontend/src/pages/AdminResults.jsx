import { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { getAllGrades, addGrade, updateGrade, deleteGrade } from '../services/gradeService';
import AdminLayout from '../layouts/AdminLayout';
import './AdminResults.css';

export default function AdminResults() {
  const [grades, setGrades] = useState([]);
  const [form, setForm] = useState({ studentName: '', studentRegNo: '', courseName: '', courseCode: '', grade: 'A' });
  const [editingId, setEditingId] = useState(null);

  const loadGrades = async () => {
    try {
      const res = await getAllGrades();
      setGrades(res.data);
    } catch (err) {
      console.error("Failed to load grades", err);
    }
  };

  useEffect(() => { loadGrades(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateGrade(editingId, form);
      setEditingId(null);
    } else {
      await addGrade(form);
    }
    setForm({ studentName: '', studentRegNo: '', courseName: '', courseCode: '', grade: 'A' });
    loadGrades();
  };

  const handleEdit = (g) => {
    setForm({ studentName: g.studentName, studentRegNo: g.studentRegNo, courseName: g.courseName, courseCode: g.courseCode, grade: g.grade });
    setEditingId(g._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this result?")) {
      await deleteGrade(id);
      loadGrades();
    }
  };

  return (
    <AdminLayout pageTitle="Student Result">
      <div className="admin-results-container">
        <div className="admin-grid">
          {/* Add / Edit Form Panel */}
          <div className="panel">
            <div className="panel-title">{editingId ? 'Edit Student Result' : 'Add Student Result'}</div>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Student Name:</label>
                <input className="input" placeholder="Pasindu Ransika" value={form.studentName}
                  onChange={(e) => setForm({ ...form, studentName: e.target.value })} required />
              </div>
              <div className="field">
                <label>Student ID:</label>
                <input className="input" placeholder="CT/2021/001" value={form.studentRegNo}
                  onChange={(e) => setForm({ ...form, studentRegNo: e.target.value })} required />
              </div>
              <div className="field">
                <label>Course Name:</label>
                <input className="input" placeholder="Web Application Development" value={form.courseName}
                  onChange={(e) => setForm({ ...form, courseName: e.target.value })} required />
              </div>
              <div className="field">
                <label>Course Code:</label>
                <input className="input" placeholder="SWST-32043" value={form.courseCode}
                  onChange={(e) => setForm({ ...form, courseCode: e.target.value })} required />
              </div>
              <div className="field">
                <label>Grade:</label>
                <select className="select" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })}>
                  {['A', 'B', 'C', 'D', 'E', 'F'].map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <button className="btn-pill" type="submit">
                {editingId ? '✓ Update Result' : '+ Add Result'}
              </button>
            </form>
          </div>

          {/* Results Table Panel */}
          <div className="panel">
            <div className="panel-title">Course Results:</div>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Reg No.</th>
                  <th>Course</th>
                  <th>Code</th>
                  <th>Grade</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {grades.length === 0 ? (
                  <tr><td colSpan="7"><div className="empty-row">No results recorded yet.</div></td></tr>
                ) : grades.map((g) => (
                  <tr key={g._id}>
                    <td style={{ fontWeight: 500, color: '#0f172a' }}>{g.studentName}</td>
                    <td>{g.studentRegNo}</td>
                    <td>{g.courseName}</td>
                    <td><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>{g.courseCode}</code></td>
                    <td style={{ fontWeight: 600 }}>{g.grade}</td>
                    <td>
                      <span className={`status-pill ${g.grade === 'F' ? 'fail' : 'pass'}`}>
                        {g.grade === 'F' ? 'Fail' : 'Pass'}
                      </span>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button className="icon-btn" title="Edit" onClick={() => handleEdit(g)}><Pencil size={15} /></button>
                        <button className="icon-btn danger" title="Delete" onClick={() => handleDelete(g._id)}><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
import { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { getAllGrades, addGrade, updateGrade, deleteGrade } from '../services/gradeService';

export default function AdminResults() {
  const [grades, setGrades] = useState([]);
  const [form, setForm] = useState({ studentName: '', studentRegNo: '', courseName: '', courseCode: '', grade: 'A' });
  const [editingId, setEditingId] = useState(null);

  const loadGrades = async () => {
    const res = await getAllGrades();
    setGrades(res.data);
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
    await deleteGrade(id);
    loadGrades();
  };

  return (
    <div className="layout">
      {/* Placeholder sidebar — replace with the team's real shared dashboard layout once built */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="badge">U</div>
          <span>UniAdmin</span>
        </div>
        <div className="nav-item">Dashboard</div>
        <div className="nav-item">Courses</div>
        <div className="nav-item">Lecturers</div>
        <div className="nav-item active">Results</div>
        <div className="nav-item">Register Student</div>
        <p className="sidebar-note">Sidebar is a placeholder — swap for the real shared layout when ready.</p>
      </aside>

      <main className="content">
        <div className="topbar">
          <h2>Results</h2>
          <div className="admin-pill">
            <div className="avatar">AU</div>
            <div className="meta"><b>Admin User</b>Administrator</div>
          </div>
        </div>

        <div className="admin-grid">
          <div className="panel">
            <div className="panel-title">Add Student Result</div>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Student Name</label>
                <input className="input" value={form.studentName}
                  onChange={(e) => setForm({ ...form, studentName: e.target.value })} required />
              </div>
              <div className="field">
                <label>Registration No.</label>
                <input className="input" value={form.studentRegNo}
                  onChange={(e) => setForm({ ...form, studentRegNo: e.target.value })} required />
              </div>
              <div className="field">
                <label>Course Name</label>
                <input className="input" value={form.courseName}
                  onChange={(e) => setForm({ ...form, courseName: e.target.value })} required />
              </div>
              <div className="field">
                <label>Course Code</label>
                <input className="input" value={form.courseCode}
                  onChange={(e) => setForm({ ...form, courseCode: e.target.value })} required />
              </div>
              <div className="field">
                <label>Grade</label>
                <select className="select" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })}>
                  {['A', 'B', 'C', 'D', 'E', 'F'].map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <button className="btn-pill" type="submit">{editingId ? '✓ Update Result' : '+ Add Result'}</button>
            </form>
          </div>

          <div className="panel">
            <div className="panel-title">Course Results</div>
            <table className="results-table">
              <thead>
                <tr><th>Student</th><th>Reg No.</th><th>Course</th><th>Code</th><th>Grade</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {grades.length === 0 ? (
                  <tr><td colSpan="7"><div className="empty-row">No results recorded yet.</div></td></tr>
                ) : grades.map((g) => (
                  <tr key={g._id}>
                    <td>{g.studentName}</td>
                    <td>{g.studentRegNo}</td>
                    <td>{g.courseName}</td>
                    <td>{g.courseCode}</td>
                    <td>{g.grade}</td>
                    <td>
                      <span className={`status-pill ${g.grade === 'F' ? 'fail' : 'pass'}`}>
                        {g.grade === 'F' ? 'Fail' : 'Pass'}
                      </span>
                    </td>
                    <td>
                      <button className="icon-btn" onClick={() => handleEdit(g)}><Pencil size={14} /></button>
                      <button className="icon-btn danger" onClick={() => handleDelete(g._id)}><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

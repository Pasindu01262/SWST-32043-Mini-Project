import { useState } from 'react';
import { getGradesByRegNo } from '../services/gradeService';

export default function MyResults() {
  const [regNo, setRegNo] = useState('');
  const [grades, setGrades] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await getGradesByRegNo(regNo);
    setGrades(res.data);
    setSearched(true);
  };

  return (
    <div className="student-shell">
      <div className="student-inner">
        <div className="student-header">
          <h1>Results</h1>
          <a className="back-pill" href="/">Back to Dashboard</a>
        </div>

        <div className="student-panel">
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10, marginBottom: searched ? 20 : 0 }}>
            <input className="input" placeholder="Enter your Registration No." value={regNo}
              onChange={(e) => setRegNo(e.target.value)} required />
            <button className="btn-pill btn-blue" style={{ width: 180 }} type="submit">View My Results</button>
          </form>

          {searched && (
            <table className="results-table">
              <thead><tr><th>Course</th><th>Code</th><th>Grade</th><th>Status</th></tr></thead>
              <tbody>
                {grades.length === 0 ? (
                  <tr><td colSpan="4"><div className="empty-row">No results found for this registration number.</div></td></tr>
                ) : grades.map((g) => (
                  <tr key={g._id}>
                    <td>{g.courseName}</td>
                    <td>{g.courseCode}</td>
                    <td>{g.grade}</td>
                    <td>
                      <span className={`status-pill ${g.grade === 'F' ? 'fail' : 'pass'}`}>
                        {g.grade === 'F' ? 'Fail' : 'Pass'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

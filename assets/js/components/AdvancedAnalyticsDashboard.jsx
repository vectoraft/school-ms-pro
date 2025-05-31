import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdvancedAnalyticsDashboard({ studentId, classId }) {
  const [studentPerf, setStudentPerf] = useState([]);
  const [classPerf, setClassPerf] = useState([]);
  const [correlation, setCorrelation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('/wp-json/schoolms/v1/analytics/student-performance', { params: { student_id: studentId } }),
      axios.get('/wp-json/schoolms/v1/analytics/class-performance', { params: { class_id: classId } }),
      axios.get('/wp-json/schoolms/v1/analytics/attendance-performance', { params: { class_id: classId } })
    ]).then(([sp, cp, corr]) => {
      setStudentPerf(sp.data);
      setClassPerf(cp.data);
      setCorrelation(corr.data);
    }).finally(() => setLoading(false));
  }, [studentId, classId]);

  return (
    <div className="dashboard-widget advanced-analytics-dashboard">
      <h3>Advanced Analytics</h3>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <h4>Student Performance</h4>
          <ul>
            {studentPerf.map((row, i) => (
              <li key={i}>{row.subject}: {row.avg_marks}</li>
            ))}
          </ul>
          <h4>Class Performance</h4>
          <ul>
            {classPerf.map((row, i) => (
              <li key={i}>{row.subject}: {row.avg_marks}</li>
            ))}
          </ul>
          <h4>Attendance vs Performance</h4>
          <table className="table table-sm">
            <thead><tr><th>Student ID</th><th>Attendance Rate</th><th>Avg Marks</th></tr></thead>
            <tbody>
              {correlation.map((row, i) => (
                <tr key={i}><td>{row.student_id}</td><td>{row.attendance_rate}</td><td>{row.avg_marks}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

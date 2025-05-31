import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CustomReportingDashboard() {
  const [lowAttendance, setLowAttendance] = useState([]);
  const [topStudents, setTopStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('/wp-json/schoolms/v1/report/low-attendance'),
      axios.get('/wp-json/schoolms/v1/report/top-students')
    ]).then(([low, top]) => {
      setLowAttendance(low.data);
      setTopStudents(top.data);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-widget custom-reporting-dashboard">
      <h3>Custom Reports</h3>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <h4>Students with Low Attendance</h4>
          <table className="table table-sm">
            <thead><tr><th>Student ID</th><th>Present</th><th>Total</th></tr></thead>
            <tbody>
              {lowAttendance.map((row, i) => (
                <tr key={i}><td>{row.student_id}</td><td>{row.present}</td><td>{row.total}</td></tr>
              ))}
            </tbody>
          </table>
          <h4>Top Performing Students</h4>
          <table className="table table-sm">
            <thead><tr><th>Student ID</th><th>Avg Marks</th></tr></thead>
            <tbody>
              {topStudents.map((row, i) => (
                <tr key={i}><td>{row.student_id}</td><td>{row.avg_marks}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

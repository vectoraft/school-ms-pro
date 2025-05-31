import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

// Attendance Analytics Dashboard Widget
export default function AttendanceAnalyticsDashboard() {
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example: Fetch summary for class 1, this week
    axios.get('/wp-json/schoolms/v1/attendance/summary', {
      params: { class_id: 1, start: '2025-05-01', end: '2025-05-31' }
    }).then(res => setSummary(res.data));
    // Example: Fetch trends for student 1
    axios.get('/wp-json/schoolms/v1/attendance/trends', {
      params: { student_id: 1 }
    }).then(res => setTrends(res.data)).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (summary && document.getElementById('attendance-summary-chart')) {
      new Chart(document.getElementById('attendance-summary-chart'), {
        type: 'doughnut',
        data: {
          labels: ['Present', 'Absent', 'Late'],
          datasets: [{
            data: [summary.present, summary.absent, summary.late],
            backgroundColor: ['#4caf50', '#f44336', '#ff9800']
          }]
        }
      });
    }
  }, [summary]);

  return (
    <div className="dashboard-widget attendance-analytics">
      <h3>Attendance Analytics</h3>
      {loading && <div>Loading...</div>}
      {!loading && summary && (
        <>
          <canvas id="attendance-summary-chart" width="200" height="200"></canvas>
          <h4>Student Attendance Trends</h4>
          <table className="table table-sm">
            <thead><tr><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {trends.map((row, i) => (
                <tr key={i}><td>{row.date}</td><td>{row.status}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

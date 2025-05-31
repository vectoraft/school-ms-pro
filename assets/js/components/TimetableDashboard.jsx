import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TimetableDashboard() {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/wp-json/schoolms/v1/timetable/get', { params: { class_id: 1 } })
      .then(res => setTimetable(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-widget timetable-dashboard">
      <h3>Class Timetable</h3>
      {loading && <div>Loading...</div>}
      {!loading && (
        <table className="table table-sm">
          <thead><tr><th>Day</th><th>Period</th><th>Subject</th><th>Teacher</th></tr></thead>
          <tbody>
            {timetable.map((row, i) => (
              <tr key={i}>
                <td>{row.day}</td>
                <td>{row.period}</td>
                <td>{row.subject}</td>
                <td>{row.teacher}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

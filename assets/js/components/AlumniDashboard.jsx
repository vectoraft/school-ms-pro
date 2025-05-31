import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AlumniDashboard() {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example: Fetch alumni for year 2024
    axios.get('/wp-json/schoolms/v1/alumni/list', {
      params: { year: 2024 }
    }).then(res => setAlumni(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-widget alumni-dashboard">
      <h3>Alumni Analytics</h3>
      {loading && <div>Loading...</div>}
      {!loading && (
        <table className="table table-sm">
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Position</th></tr></thead>
          <tbody>
            {alumni.map((a, i) => (
              <tr key={i}>
                <td>{a.first_name} {a.last_name}</td>
                <td>{a.email}</td>
                <td>{a.phone}</td>
                <td>{a.current_position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

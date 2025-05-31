import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function HostelDashboard() {
  const [rooms, setRooms] = useState([]);
  const [occupancy, setOccupancy] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/wp-json/schoolms/v1/hostel/rooms').then(res => setRooms(res.data));
    axios.get('/wp-json/schoolms/v1/hostel/occupancy').then(res => setOccupancy(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-widget hostel-dashboard">
      <h3>Hostel Analytics</h3>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <h4>Room Occupancy</h4>
          <table className="table table-sm">
            <thead><tr><th>Room</th><th>Occupancy</th></tr></thead>
            <tbody>
              {occupancy.map((row, i) => (
                <tr key={i}><td>{row.room_number}</td><td>{row.occupancy}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

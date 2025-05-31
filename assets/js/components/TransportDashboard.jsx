import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TransportDashboard() {
  const [routes, setRoutes] = useState([]);
  const [occupancy, setOccupancy] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/wp-json/schoolms/v1/transport/routes').then(res => setRoutes(res.data));
    axios.get('/wp-json/schoolms/v1/transport/occupancy').then(res => setOccupancy(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-widget transport-dashboard">
      <h3>Transport Analytics</h3>
      {loading && <div>Loading...</div>}
      {!loading && (
        <>
          <h4>Route Occupancy</h4>
          <table className="table table-sm">
            <thead><tr><th>Route</th><th>Occupancy</th></tr></thead>
            <tbody>
              {occupancy.map((row, i) => (
                <tr key={i}><td>{row.route_name}</td><td>{row.occupancy}</td></tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

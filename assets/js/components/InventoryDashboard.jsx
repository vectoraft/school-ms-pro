import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function InventoryDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/wp-json/schoolms/v1/inventory/list')
      .then(res => setItems(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-widget inventory-dashboard">
      <h3>Inventory Analytics</h3>
      {loading && <div>Loading...</div>}
      {!loading && (
        <table className="table table-sm">
          <thead><tr><th>Name</th><th>Quantity</th><th>Location</th></tr></thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

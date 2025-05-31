import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ParentPortalDashboard({ parentId }) {
  const [parent, setParent] = useState(null);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('/wp-json/schoolms/v1/parent/info', { params: { parent_id: parentId } }),
      axios.get('/wp-json/schoolms/v1/parent/children', { params: { parent_id: parentId } })
    ]).then(([p, c]) => {
      setParent(p.data);
      setChildren(c.data);
    }).finally(() => setLoading(false));
  }, [parentId]);

  return (
    <div className="dashboard-widget parent-portal-dashboard">
      <h3>Parent Portal</h3>
      {loading && <div>Loading...</div>}
      {!loading && parent && (
        <>
          <div><strong>Parent:</strong> {parent.first_name} {parent.last_name} ({parent.email})</div>
          <h4>Children</h4>
          <ul>
            {children.map((child, i) => (
              <li key={i}>{child.first_name} {child.last_name} (Class: {child.class_id})</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

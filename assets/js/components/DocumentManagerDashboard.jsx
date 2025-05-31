import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DocumentManagerDashboard() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/wp-json/schoolms/v1/documents/list')
      .then(res => setDocuments(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-widget document-manager-dashboard">
      <h3>Documents</h3>
      {loading && <div>Loading...</div>}
      {!loading && (
        <ul>
          {documents.map((doc, i) => (
            <li key={i}>
              <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.title}</a> ({doc.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

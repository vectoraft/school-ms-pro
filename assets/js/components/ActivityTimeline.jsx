import React, { useEffect, useState } from 'react';
import axios from '../axios.js';

const ActivityTimeline = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('audit')
      .then(res => {
        setLogs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load activity log.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading activity timeline...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4" data-tip="See all recent actions and changes in your school system.">Activity Timeline</h2>
      <ul className="space-y-2">
        {logs.map((log, i) => (
          <li key={i} className="border-l-4 pl-4 py-2 border-primary bg-white rounded shadow">
            <div className="text-sm text-gray-700"><b>{log.user}</b> {log.action} <span className="text-gray-400">{log.timestamp}</span></div>
            <div className="text-xs text-gray-500">{log.details}</div>
          </li>
        ))}
        {logs.length === 0 && <li className="text-gray-400">No recent activity.</li>}
      </ul>
    </div>
  );
};

export default ActivityTimeline;

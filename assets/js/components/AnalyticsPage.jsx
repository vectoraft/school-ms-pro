import React, { useRef, useState, useEffect } from 'react';
import PDFExport from './PDFExport.jsx';
import axios from '../axios.js';

const getColor = value => {
  if (typeof value !== 'number') return '';
  if (value < 0) return 'text-red-600';
  if (value > 0) return 'text-green-600';
  return '';
};

const AnalyticsPage = () => {
  const tableRef = useRef();
  const [analytics, setAnalytics] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('analytics')
      .then(res => {
        setAnalytics(Object.entries(res.data).map(([metric, value]) => ({ metric, value })));
        setLoading(false);
      })
      .catch(e => {
        setError('Could not load analytics.');
        setLoading(false);
      });
  }, []);

  const filtered = analytics.filter(a =>
    a.metric.toLowerCase().includes(search.toLowerCase())
  );

  const getTableHtml = () => {
    return tableRef.current ? tableRef.current.outerHTML : '';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Analytics <span className="text-gray-400 text-base">(Dynamic from API)</span></h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search metrics..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <PDFExport htmlContent={getTableHtml()} />
      </div>
      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <table ref={tableRef} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Metric</th>
              <th className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((row, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2 whitespace-nowrap">{row.metric}</td>
                <td className={`px-4 py-2 whitespace-nowrap ${getColor(row.value)}`}>{typeof row.value === 'number' ? row.value.toLocaleString() : row.value}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center py-4 text-gray-400">No metrics found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsPage;

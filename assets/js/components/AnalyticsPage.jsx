import React, { useRef, useState } from 'react';
import PDFExport from './PDFExport.jsx';

const initialAnalytics = [
  { metric: 'Total Students', value: 1200 },
  { metric: 'Total Funds', value: 45000 },
  { metric: 'Active Staff', value: 32 },
  { metric: 'Graduates', value: 300 },
];

const AnalyticsPage = () => {
  const tableRef = useRef();
  const [analytics, setAnalytics] = useState(initialAnalytics);
  const [search, setSearch] = useState('');
  const filtered = analytics.filter(a =>
    a.metric.toLowerCase().includes(search.toLowerCase())
  );

  const getTableHtml = () => {
    return tableRef.current ? tableRef.current.outerHTML : '';
  };

  // Bulk add demo metrics
  const handleBulkAdd = () => {
    const bulk = Array.from({ length: 10 }, (_, i) => ({
      metric: `Metric ${analytics.length + i + 1}`,
      value: Math.floor(Math.random() * 10000),
    }));
    setAnalytics([...analytics, ...bulk]);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Analytics</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search metrics..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button onClick={handleBulkAdd} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Bulk Add</button>
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
                <td className="px-4 py-2 whitespace-nowrap">{row.value.toLocaleString()}</td>
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

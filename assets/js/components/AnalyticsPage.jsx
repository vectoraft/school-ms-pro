import React, { useRef, useState, useEffect } from 'react';
import PDFExport from './PDFExport.jsx';
import axios from '../axios.js';
import { t } from '../t.js';

// Simple progress bar component
const ProgressBar = ({ progress, label }) => (
  <div className="w-full bg-gray-200 rounded h-4 mb-2">
    <div
      className={`h-4 rounded ${progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
      style={{ width: `${progress}%`, transition: 'width 0.3s' }}
    ></div>
    {label && <div className="text-xs text-gray-600 mt-1">{label}</div>}
  </div>
);

// Custom hook for bulk progress
function useBulkProgress() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const [feedback, setFeedback] = useState([]);

  const start = async (items, actionLabel, perItemFn) => {
    setLoading(true);
    setProgress(0);
    setFeedback([]);
    setProgressLabel(`Starting ${actionLabel}...`);
    const total = items.length;
    for (let i = 0; i < total; i++) {
      setProgressLabel(`${actionLabel} ${items[i].metric || items[i].name || i + 1}...`);
      await perItemFn(items[i], i);
      setFeedback(prev => [...prev, `${actionLabel}d: ${items[i].metric || items[i].name || i + 1}`]);
      setProgress(Math.round(((i + 1) / total) * 100));
    }
    setProgressLabel(`${actionLabel} complete!`);
    setLoading(false);
  };

  return { loading, progress, progressLabel, feedback, start };
}

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

  // Bulk/progress hooks for two simultaneous operations
  const bulkRefresh = useBulkProgress();
  const bulkExport = useBulkProgress();

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

  // Simulate a bulk refresh operation
  const handleBulkRefresh = async () => {
    await bulkRefresh.start(analytics, 'Refresh', async (item) => {
      await new Promise(res => setTimeout(res, 300));
    });
  };

  // Simulate a bulk export operation
  const handleBulkExport = async () => {
    await bulkExport.start(analytics, 'Export', async (item) => {
      await new Promise(res => setTimeout(res, 200));
    });
  };

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
      <h2 className="text-xl font-bold mb-4" data-tip={t("View live stats, trends, and export analytics reports.")}>{t('Analytics')} <span className="text-gray-400 text-base">({t('Dynamic from API')})</span></h2>
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
        <div className="flex gap-2 items-center">
          <PDFExport htmlContent={getTableHtml()} />
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700 transition"
            onClick={handleBulkRefresh}
            disabled={bulkRefresh.loading}
          >
            {bulkRefresh.loading ? 'Bulk Refreshing...' : 'Bulk Refresh'}
          </button>
          <button
            className="bg-green-600 text-white px-3 py-1 rounded shadow hover:bg-green-700 transition"
            onClick={handleBulkExport}
            disabled={bulkExport.loading}
          >
            {bulkExport.loading ? 'Bulk Exporting...' : 'Bulk Export'}
          </button>
        </div>
      </div>
      {/* Progress bars and feedback for both bulk operations */}
      {(bulkRefresh.loading || bulkRefresh.progress === 100) && (
        <div className="mb-4">
          <ProgressBar progress={bulkRefresh.progress} label={bulkRefresh.progressLabel} />
          <ul className="text-xs text-gray-700 max-h-32 overflow-y-auto bg-gray-50 rounded p-2 border">
            {bulkRefresh.feedback.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
      {(bulkExport.loading || bulkExport.progress === 100) && (
        <div className="mb-4">
          <ProgressBar progress={bulkExport.progress} label={bulkExport.progressLabel} />
          <ul className="text-xs text-gray-700 max-h-32 overflow-y-auto bg-gray-50 rounded p-2 border">
            {bulkExport.feedback.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
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

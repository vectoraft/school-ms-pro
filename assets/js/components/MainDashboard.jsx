import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const MainDashboard = ({ stats }) => {
  // Use dynamic stats if provided, else fallback
  const dashboardSummary = `School MS Pro Dashboard\nStudents: ${stats?.students ?? '...'}\nFunds: $${stats?.funds ?? '...'}\nStaff: ${stats?.staff ?? '...'}`;
  const PDFExport = React.lazy(() => import('./PDFExport.jsx'));
  useEffect(() => {
    // Render Next.js style charts
    if (stats) {
      const ctx1 = document.getElementById('enrollment-graph');
      if (ctx1) {
        new Chart(ctx1, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Enrollment',
              data: [120, 140, 160, 180, 200, 220],
              borderColor: '#2563eb',
              backgroundColor: 'rgba(37,99,235,0.1)',
              tension: 0.4,
              fill: true,
            }],
          },
          options: { plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false }
        });
      }
      const ctx2 = document.getElementById('fees-graph');
      if (ctx2) {
        new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Fees',
              data: [5000, 7000, 8000, 9000, 10000, 12000],
              backgroundColor: '#0d6efd',
              borderRadius: 8,
            }],
          },
          options: { plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false }
        });
      }
    }
  }, [stats]);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to School MS Pro</h1>
      <div className="dashboard-grid">
        <div className="card">
          <div className="card-title">{t('Students')}</div>
          <div className="card-subtitle">{t('Total Students')}</div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{stats?.students ?? '...'}</div>
        </div>
        <div className="card">
          <div className="card-title">{t('Funds')}</div>
          <div className="card-subtitle">{t('Total Funds')}</div>
          <div className="text-4xl font-bold text-green-600 dark:text-green-400">${stats?.funds?.toLocaleString?.() ?? '...'}</div>
        </div>
        <div className="card">
          <div className="card-title">{t('Staff')}</div>
          <div className="card-subtitle">{t('Total Staff')}</div>
          <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">{stats?.staff ?? '...'}</div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="graph-container">
          <div className="card-title mb-2">{t('Enrollment Trend')}</div>
          <canvas id="enrollment-graph" className="dashboard-graph"></canvas>
        </div>
        <div className="graph-container">
          <div className="card-title mb-2">{t('Fees Collection')}</div>
          <canvas id="fees-graph" className="dashboard-graph"></canvas>
        </div>
      </div>
      <React.Suspense fallback={<div>Loading PDF Export...</div>}>
        <PDFExport htmlContent={dashboardSummary} />
      </React.Suspense>
    </div>
  );
};

export default MainDashboard;

import React from 'react';
const MainDashboard = ({ stats }) => {
  // Use dynamic stats if provided, else fallback
  const dashboardSummary = `School MS Pro Dashboard\nStudents: ${stats?.students ?? '...'}\nFunds: $${stats?.funds ?? '...'}\nStaff: ${stats?.staff ?? '...'}`;
  const PDFExport = React.lazy(() => import('./PDFExport.jsx'));
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to School MS Pro</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Dashboard cards with dynamic data */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded shadow flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats?.students ?? '...'}</span>
          <span className="mt-2 text-gray-500 dark:text-gray-300">Students</span>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded shadow flex flex-col items-center">
          <span className="text-3xl font-bold text-green-600 dark:text-green-400">${stats?.funds?.toLocaleString?.() ?? '...'}</span>
          <span className="mt-2 text-gray-500 dark:text-gray-300">Funds</span>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded shadow flex flex-col items-center">
          <span className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats?.staff ?? '...'}</span>
          <span className="mt-2 text-gray-500 dark:text-gray-300">Staff</span>
        </div>
      </div>
      <React.Suspense fallback={<div>Loading PDF Export...</div>}>
        <PDFExport htmlContent={dashboardSummary} />
      </React.Suspense>
    </div>
  );
};
export default MainDashboard;

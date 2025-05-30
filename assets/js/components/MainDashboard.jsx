import React from 'react';
const MainDashboard = () => {
  // Example content for PDF export
  const dashboardSummary = `School MS Pro Dashboard\nStudents: 1,200\nFunds: $45,000\nStaff: 32`;
  const PDFExport = React.lazy(() => import('./PDFExport.jsx'));
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to School MS Pro</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Example dashboard cards */}
        <div className="bg-white p-6 rounded shadow flex flex-col items-center">
          <span className="text-3xl font-bold text-blue-600">1,200</span>
          <span className="mt-2 text-gray-500">Students</span>
        </div>
        <div className="bg-white p-6 rounded shadow flex flex-col items-center">
          <span className="text-3xl font-bold text-green-600">$45,000</span>
          <span className="mt-2 text-gray-500">Funds</span>
        </div>
        <div className="bg-white p-6 rounded shadow flex flex-col items-center">
          <span className="text-3xl font-bold text-yellow-600">32</span>
          <span className="mt-2 text-gray-500">Staff</span>
        </div>
      </div>
      <React.Suspense fallback={<div>Loading PDF Export...</div>}>
        <PDFExport htmlContent={dashboardSummary} />
      </React.Suspense>
    </div>
  );
};
export default MainDashboard;

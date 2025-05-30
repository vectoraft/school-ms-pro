import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar.jsx';
import ProfileMenu from './ProfileMenu.jsx';
import MainDashboard from './MainDashboard.jsx';
import Preloader from './Preloader.jsx';
import AnalyticsPage from './AnalyticsPage.jsx';
import AdminsPage from './AdminsPage.jsx';
import RolesPage from './RolesPage.jsx';
import StudentsPage from './StudentsPage.jsx';
import AccountsPage from './AccountsPage.jsx';
import CreateTransaction from './CreateTransaction.jsx';
import DueStudents from './DueStudents.jsx';
import TransactionsPage from './TransactionsPage.jsx';
import FundsPage from './FundsPage.jsx';
import SettingsPage from './SettingsPage.jsx';
import GroupsPage from './GroupsPage.jsx';
import DocumentsPage from './DocumentsPage.jsx';

// Example: dynamic routing for dashboard pages
const pageComponents = {
  dashboard: MainDashboard,
  analytics: AnalyticsPage,
  admins: AdminsPage,
  roles: RolesPage,
  students: StudentsPage,
  accounts: AccountsPage,
  createtransaction: CreateTransaction,
  duestudents: DueStudents,
  transactions: TransactionsPage,
  funds: FundsPage,
  settings: SettingsPage,
  groups: GroupsPage,
  documents: DocumentsPage,
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('dashboard');
  // ...user, role, permissions, etc...

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200); // Simulate preloader
  }, []);

  if (loading) return <Preloader />;

  const PageComponent = pageComponents[page] || MainDashboard;

  return (
    <div className="flex min-h-screen bg-gray-50 font-montserrat">
      <Sidebar onNavigate={setPage} />
      <div className="flex-1 flex flex-col">
        <ProfileMenu />
        <main className="flex-1 p-6">
          <PageComponent />
        </main>
      </div>
    </div>
  );
};
export default App;

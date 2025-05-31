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
import StudentProfile from './StudentProfile.jsx';
import TeacherProfile from './TeacherProfile.jsx';
import ParentProfile from './ParentProfile.jsx';
import SessionsPage from './SessionsPage.jsx';
import ActivityTimeline from './ActivityTimeline.jsx';
import { t } from '../t.js';

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
  sessions: SessionsPage,
  activity: ActivityTimeline,
};

const App = ({ initialPage }) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(initialPage || 'dashboard');
  const [stats, setStats] = useState(null);
  const [profileRoute, setProfileRoute] = useState(null); // {type, id}

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200); // Simulate preloader
    // Fetch dashboard stats for cards
    fetch('/wp-json/schoolms/v1/analytics')
      .then(res => res.ok ? res.json() : Promise.reject('Failed to load stats'))
      .then(data => setStats({
        students: data.students_count,
        funds: data.total_funds,
        staff: data.admins_count,
      }))
      .catch(() => setStats(null));
  }, []);

  // Listen for global search navigation
  useEffect(() => {
    const handler = e => {
      if (e.detail && e.detail.url) {
        const match = e.detail.url.match(/\/(student|teacher|parent)-profile\/(\d+)/);
        if (match) setProfileRoute({ type: match[1], id: match[2] });
      }
    };
    window.addEventListener('schoolms:navigate', handler);
    return () => window.removeEventListener('schoolms:navigate', handler);
  }, []);

  if (loading) return <Preloader />;

  if (profileRoute) {
    if (profileRoute.type === 'student') return <StudentProfile studentId={profileRoute.id} />;
    if (profileRoute.type === 'teacher') return <TeacherProfile teacherId={profileRoute.id} />;
    if (profileRoute.type === 'parent') return <ParentProfile parentId={profileRoute.id} />;
  }

  const PageComponent = pageComponents[page] || MainDashboard;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 font-montserrat transition-colors">
      <Sidebar onNavigate={setPage} />
      <div className="flex-1 flex flex-col">
        <ProfileMenu />
        <main className="flex-1 p-6">
          {page === 'dashboard' ? <MainDashboard stats={stats} /> : <PageComponent />}
        </main>
      </div>
    </div>
  );
};
export default App;

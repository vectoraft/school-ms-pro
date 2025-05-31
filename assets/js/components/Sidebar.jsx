import React, { useState } from 'react';
import GlobalSearchBar from './GlobalSearchBar.jsx';
import { t } from '../t.js';

const Sidebar = ({ onNavigate }) => {
  const [dark, setDark] = useState(false);

  return (
    <aside className={`w-64 ${dark ? 'bg-gray-900 text-white border-gray-800' : 'bg-white text-gray-900 border-r'} flex flex-col min-h-screen transition-colors`}>
      <div className="h-16 flex items-center justify-between font-bold text-lg tracking-wide border-b px-4">
        <span>{t('School MS Pro')}</span>
        <button
          className="ml-2 px-2 py-1 rounded text-xs border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setDark(d => !d)}
          aria-label={t('Toggle dark mode')}
        >
          {dark ? '🌙' : '☀️'}
        </button>
        <button
          data-tip={t('Print this page for a clean report.')}
          className="ml-2 px-2 py-1 rounded text-xs border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => window.print()}
          aria-label={t('Print this page')}
        >🖨️ {t('Print')}</button>
      </div>
      <GlobalSearchBar onResult={null} />
      <nav className="flex-1 p-4 space-y-2">
        <button onClick={() => onNavigate('dashboard')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">{t('Dashboard')}</button>
        <button onClick={() => onNavigate('analytics')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">{t('Analytics')}</button>
        <button onClick={() => onNavigate('admins')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">{t('Admins')}</button>
        <button onClick={() => onNavigate('roles')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">{t('Roles')}</button>
        <button onClick={() => onNavigate('students')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">{t('Students')}</button>
        <button onClick={() => onNavigate('teachers')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">{t('Teachers')}</button>
        <button onClick={() => onNavigate('parents')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">{t('Parents')}</button>
        <button onClick={() => onNavigate('library')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">{t('Library')}</button>
        <button onClick={() => onNavigate('funds')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">{t('Fees')}</button>
        <button onClick={() => onNavigate('notifications')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">{t('Notifications')}</button>
        <button onClick={() => onNavigate('messaging')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">{t('Messaging')}</button>
        <button onClick={() => onNavigate('activity')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">{t('Activity Timeline')}</button>
        <button onClick={() => onNavigate('sessions')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">{t('Sessions & Promotion')}</button>
        <button onClick={() => onNavigate('settings')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">{t('Settings')}</button>
        <button onClick={() => onNavigate('groups')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">{t('Groups')}</button>
        <button onClick={() => onNavigate('documents')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">{t('Documents')}</button>
        {/* ...add more navigation as needed... */}
      </nav>
      <div className="mt-4 text-center text-xs text-gray-400">
        <a href="mailto:support@yourschool.com" target="_blank" rel="noopener noreferrer" className="underline text-blue-500">{t('Contact Support')}</a>
      </div>
    </aside>
  );
};

export default Sidebar;

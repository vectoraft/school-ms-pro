import React, { useState } from 'react';

const Sidebar = ({ onNavigate }) => {
  const [dark, setDark] = useState(false);

  return (
    <aside className={`w-64 ${dark ? 'bg-gray-900 text-white border-gray-800' : 'bg-white text-gray-900 border-r'} flex flex-col min-h-screen transition-colors`}>
      <div className="h-16 flex items-center justify-between font-bold text-lg tracking-wide border-b px-4">
        <span>School MS Pro</span>
        <button
          className="ml-2 px-2 py-1 rounded text-xs border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setDark(d => !d)}
          aria-label="Toggle dark mode"
        >
          {dark ? '🌙' : '☀️'}
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <button onClick={() => onNavigate('dashboard')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">Dashboard</button>
        <button onClick={() => onNavigate('analytics')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">Analytics</button>
        <button onClick={() => onNavigate('admins')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">Admins</button>
        <button onClick={() => onNavigate('roles')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">Roles</button>
        <button onClick={() => onNavigate('students')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">Students</button>
        <button onClick={() => onNavigate('accounts')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">Accounts</button>
        <button onClick={() => onNavigate('createtransaction')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">Create Transaction</button>
        <button onClick={() => onNavigate('duestudents')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">Due Students</button>
        <button onClick={() => onNavigate('transactions')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">Transactions</button>
        <button onClick={() => onNavigate('funds')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">Funds</button>
        <button onClick={() => onNavigate('settings')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">Settings</button>
        <button onClick={() => onNavigate('groups')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">Groups</button>
        <button onClick={() => onNavigate('documents')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100 dark:hover:bg-gray-800">Documents</button>
        {/* ...add more navigation as needed... */}
      </nav>
    </aside>
  );
};

export default Sidebar;

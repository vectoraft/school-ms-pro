import React from 'react';
const Sidebar = ({ onNavigate }) => (
  <aside className="w-64 bg-white border-r flex flex-col min-h-screen">
    <div className="h-16 flex items-center justify-center font-bold text-lg tracking-wide border-b">School MS Pro</div>
    <nav className="flex-1 p-4 space-y-2">
      <button onClick={() => onNavigate('dashboard')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100">Dashboard</button>
      <button onClick={() => onNavigate('analytics')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100">Analytics</button>
      <button onClick={() => onNavigate('admins')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100">Admins</button>
      <button onClick={() => onNavigate('roles')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100">Roles</button>
      <button onClick={() => onNavigate('students')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100">Students</button>
      <button onClick={() => onNavigate('accounts')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100">Accounts</button>
      <button onClick={() => onNavigate('createtransaction')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100">Create Transaction</button>
      <button onClick={() => onNavigate('duestudents')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100">Due Students</button>
      <button onClick={() => onNavigate('transactions')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100">Transactions</button>
      <button onClick={() => onNavigate('funds')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100">Funds</button>
      <button onClick={() => onNavigate('settings')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100">Settings</button>
      <button onClick={() => onNavigate('groups')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100">Groups</button>
      <button onClick={() => onNavigate('documents')} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-100">Documents</button>
      {/* ...add more navigation as needed... */}
    </nav>
  </aside>
);
export default Sidebar;

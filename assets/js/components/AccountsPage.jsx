import React, { useRef, useState } from 'react';
import PDFExport from './PDFExport.jsx';

const initialAccounts = [
  { id: 1, name: 'General Fund', balance: 12000, type: 'Asset' },
  { id: 2, name: 'Library Fund', balance: 3500, type: 'Asset' },
  { id: 3, name: 'Scholarship', balance: 8000, type: 'Liability' },
  { id: 4, name: 'Sports', balance: 2100, type: 'Asset' },
];

const AccountsPage = () => {
  const tableRef = useRef();
  const [accounts, setAccounts] = useState(initialAccounts);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = accounts.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.type.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
    return 0;
  });

  const getTableHtml = () => {
    return tableRef.current ? tableRef.current.outerHTML : '';
  };

  const handleBulkAdd = () => {
    const bulk = Array.from({ length: 20 }, (_, i) => ({
      id: accounts.length + i + 1,
      name: `Account ${accounts.length + i + 1}`,
      balance: Math.floor(Math.random() * 10000),
      type: ['Asset', 'Liability'][Math.floor(Math.random() * 2)],
    }));
    setAccounts([...accounts, ...bulk]);
  };

  const handleSort = key => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Accounts</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name or type..."
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
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('id')}>ID {sortKey === 'id' ? (sortAsc ? '▲' : '▼') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>Name {sortKey === 'name' ? (sortAsc ? '▲' : '▼') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('balance')}>Balance {sortKey === 'balance' ? (sortAsc ? '▲' : '▼') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('type')}>Type {sortKey === 'type' ? (sortAsc ? '▲' : '▼') : ''}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sorted.map(account => (
              <tr key={account.id}>
                <td className="px-4 py-2 whitespace-nowrap">{account.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{account.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">${account.balance.toLocaleString()}</td>
                <td className="px-4 py-2 whitespace-nowrap">{account.type}</td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400">No accounts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountsPage;

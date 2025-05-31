import React, { useRef, useState, useEffect } from 'react';
import PDFExport from './PDFExport.jsx';
import ModalForm from './ModalForm.jsx';
import Toast from './Toast.jsx';

const AccountsPage = () => {
  const tableRef = useRef();
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editAccount, setEditAccount] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/wp-json/schoolms/v1/accounts')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(data => {
        setAccounts(data.map((a, i) => ({
          id: a.id || i + 1,
          name: a.name || 'Unknown',
          balance: a.balance || 0,
          type: a.type || '-',
        })));
        setLoading(false);
      })
      .catch(e => {
        setError('Could not load accounts.');
        setLoading(false);
      });
  }, []);

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

  const handleSort = key => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const openAdd = () => { setEditAccount(null); setModalOpen(true); };
  const openEdit = account => { setEditAccount(account); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditAccount(null); };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target;
    const data = {
      name: form.name.value,
      balance: parseFloat(form.balance.value),
      type: form.type.value
    };
    try {
      let res;
      if (editAccount) {
        res = await fetch(`/wp-json/schoolms/v1/accounts/${editAccount.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } else {
        res = await fetch('/wp-json/schoolms/v1/accounts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }
      if (!res.ok) throw new Error('Failed to save account');
      setToast({ message: editAccount ? 'Account updated!' : 'Account created!', type: 'success' });
      setModalOpen(false);
      // Refresh data
      const refreshed = await fetch('/wp-json/schoolms/v1/accounts').then(r => r.json());
      setAccounts(refreshed.map((a, i) => ({
        id: a.id || i + 1,
        name: a.name || 'Unknown',
        balance: a.balance || 0,
        type: a.type || '-',
      })));
    } catch (e) {
      setToast({ message: e.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async account => {
    if (!window.confirm('Delete this account?')) return;
    try {
      const res = await fetch(`/wp-json/schoolms/v1/accounts/${account.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete account');
      setToast({ message: 'Account deleted!', type: 'success' });
      setAccounts(accounts.filter(a => a.id !== account.id));
    } catch (e) {
      setToast({ message: e.message, type: 'error' });
    }
  };

  if (loading) return <div className="text-center py-8 text-lg text-primary">Loading accounts...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div>
      <Toast message={toast.message ? t(toast.message) : ''} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
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
          <button onClick={openAdd} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Add Account</button>
        </div>
        <PDFExport htmlContent={getTableHtml()} />
      </div>
      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <table ref={tableRef} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('id')}>{t('ID')} {sortKey === 'id' ? (sortAsc ? '▲' : '▼') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>{t('Name')} {sortKey === 'name' ? (sortAsc ? '▲' : '▼') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('balance')}>{t('Balance')} {sortKey === 'balance' ? (sortAsc ? '▲' : '▼') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('type')}>{t('Type')} {sortKey === 'type' ? (sortAsc ? '▲' : '▼') : ''}</th>
              <th className="px-4 py-2">{t('Actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sorted.map(account => (
              <tr key={account.id}>
                <td className="px-4 py-2 whitespace-nowrap">{account.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{account.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">${account.balance.toLocaleString()}</td>
                <td className="px-4 py-2 whitespace-nowrap">{account.type}</td>
                <td className="px-4 py-2 whitespace-nowrap flex gap-2">
                  <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => openEdit(account)}>Edit</button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(account)}>Delete</button>
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">{t('No accounts found.')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ModalForm open={modalOpen} title={editAccount ? t('Edit Account') : t('Add Account')} onClose={closeModal}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input name="name" defaultValue={editAccount?.name || ''} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Balance</label>
            <input name="balance" type="number" step="0.01" defaultValue={editAccount?.balance || 0} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Type</label>
            <input name="type" defaultValue={editAccount?.type || ''} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={closeModal}>{t('Cancel')}</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded" disabled={submitting}>{submitting ? t('Saving...') : (editAccount ? t('Update') : t('Create'))}</button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default AccountsPage;

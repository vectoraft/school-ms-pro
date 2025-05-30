import React, { useRef, useState, useEffect } from 'react';
import PDFExport from './PDFExport.jsx';
import ModalForm from './ModalForm.jsx';
import Toast from './Toast.jsx';

const FundsPage = () => {
  const tableRef = useRef();
  const [funds, setFunds] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editFund, setEditFund] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/wp-json/schoolms/v1/funds')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(data => {
        setFunds(data.map((f, i) => ({
          id: f.id || i + 1,
          name: f.name || 'Unknown',
          amount: f.amount || 0,
          status: f.status || '-',
        })));
        setLoading(false);
      })
      .catch(e => {
        setError('Could not load funds.');
        setLoading(false);
      });
  }, []);

  const filtered = funds.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.status.toLowerCase().includes(search.toLowerCase())
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

  const openAdd = () => { setEditFund(null); setModalOpen(true); };
  const openEdit = fund => { setEditFund(fund); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditFund(null); };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target;
    const data = {
      name: form.name.value,
      amount: parseFloat(form.amount.value),
      status: form.status.value
    };
    try {
      let res;
      if (editFund) {
        res = await fetch(`/wp-json/schoolms/v1/funds/${editFund.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } else {
        res = await fetch('/wp-json/schoolms/v1/funds', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }
      if (!res.ok) throw new Error('Failed to save fund');
      setToast({ message: editFund ? 'Fund updated!' : 'Fund created!', type: 'success' });
      setModalOpen(false);
      // Refresh data
      const refreshed = await fetch('/wp-json/schoolms/v1/funds').then(r => r.json());
      setFunds(refreshed.map((f, i) => ({
        id: f.id || i + 1,
        name: f.name || 'Unknown',
        amount: f.amount || 0,
        status: f.status || '-',
      })));
    } catch (e) {
      setToast({ message: e.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async fund => {
    if (!window.confirm('Delete this fund?')) return;
    try {
      const res = await fetch(`/wp-json/schoolms/v1/funds/${fund.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete fund');
      setToast({ message: 'Fund deleted!', type: 'success' });
      setFunds(funds.filter(f => f.id !== fund.id));
    } catch (e) {
      setToast({ message: e.message, type: 'error' });
    }
  };

  if (loading) return <div className="text-center py-8 text-lg text-primary">Loading funds...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
      <h2 className="text-xl font-bold mb-4">Funds</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name or status..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button onClick={openAdd} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Add Fund</button>
        </div>
        <PDFExport htmlContent={getTableHtml()} />
      </div>
      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <table ref={tableRef} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('id')}>ID {sortKey === 'id' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>Name {sortKey === 'name' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('amount')}>Amount {sortKey === 'amount' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('status')}>Status {sortKey === 'status' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sorted.map(fund => (
              <tr key={fund.id}>
                <td className="px-4 py-2 whitespace-nowrap">{fund.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{fund.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">${fund.amount.toLocaleString()}</td>
                <td className="px-4 py-2 whitespace-nowrap">{fund.status}</td>
                <td className="px-4 py-2 whitespace-nowrap flex gap-2">
                  <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => openEdit(fund)}>Edit</button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(fund)}>Delete</button>
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">No funds found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ModalForm open={modalOpen} title={editFund ? 'Edit Fund' : 'Add Fund'} onClose={closeModal}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input name="name" defaultValue={editFund?.name || ''} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Amount</label>
            <input name="amount" type="number" step="0.01" defaultValue={editFund?.amount || 0} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Status</label>
            <input name="status" defaultValue={editFund?.status || ''} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={closeModal}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded" disabled={submitting}>{submitting ? 'Saving...' : (editFund ? 'Update' : 'Create')}</button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default FundsPage;

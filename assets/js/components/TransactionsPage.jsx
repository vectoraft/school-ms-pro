import React, { useRef, useState, useEffect } from 'react';
import PDFExport from './PDFExport.jsx';
import ModalForm from './ModalForm.jsx';
import Toast from './Toast.jsx';

const TransactionsPage = () => {
  const tableRef = useRef();
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/wp-json/schoolms/v1/transactions')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(data => {
        setTransactions(data.map((t, i) => ({
          id: t.id || i + 1,
          date: t.date || '-',
          amount: t.amount || 0,
          type: t.type || '-',
          description: t.description || '-',
        })));
        setLoading(false);
      })
      .catch(e => {
        setError('Could not load transactions.');
        setLoading(false);
      });
  }, []);

  const filtered = transactions.filter(t =>
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.type.toLowerCase().includes(search.toLowerCase())
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

  const openAdd = () => { setEditTransaction(null); setModalOpen(true); };
  const openEdit = tx => { setEditTransaction(tx); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditTransaction(null); };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target;
    const data = {
      date: form.date.value,
      amount: parseFloat(form.amount.value),
      type: form.type.value,
      description: form.description.value
    };
    try {
      let res;
      if (editTransaction) {
        res = await fetch(`/wp-json/schoolms/v1/transactions/${editTransaction.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } else {
        res = await fetch('/wp-json/schoolms/v1/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }
      if (!res.ok) throw new Error('Failed to save transaction');
      setToast({ message: editTransaction ? 'Transaction updated!' : 'Transaction created!', type: 'success' });
      setModalOpen(false);
      // Refresh data
      const refreshed = await fetch('/wp-json/schoolms/v1/transactions').then(r => r.json());
      setTransactions(refreshed.map((t, i) => ({
        id: t.id || i + 1,
        date: t.date || '-',
        amount: t.amount || 0,
        type: t.type || '-',
        description: t.description || '-',
      })));
    } catch (e) {
      setToast({ message: e.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async tx => {
    if (!window.confirm('Delete this transaction?')) return;
    try {
      const res = await fetch(`/wp-json/schoolms/v1/transactions/${tx.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete transaction');
      setToast({ message: 'Transaction deleted!', type: 'success' });
      setTransactions(transactions.filter(t => t.id !== tx.id));
    } catch (e) {
      setToast({ message: e.message, type: 'error' });
    }
  };

  if (loading) return <div className="text-center py-8 text-lg text-primary">Loading transactions...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by description or type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button onClick={openAdd} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Add Transaction</button>
        </div>
        <PDFExport htmlContent={getTableHtml()} />
      </div>
      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <table ref={tableRef} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('id')}>ID {sortKey === 'id' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('date')}>Date {sortKey === 'date' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('amount')}>Amount {sortKey === 'amount' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('type')}>Type {sortKey === 'type' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('description')}>Description {sortKey === 'description' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sorted.map(tx => (
              <tr key={tx.id}>
                <td className="px-4 py-2 whitespace-nowrap">{tx.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{tx.date}</td>
                <td className="px-4 py-2 whitespace-nowrap">${tx.amount.toLocaleString()}</td>
                <td className="px-4 py-2 whitespace-nowrap">{tx.type}</td>
                <td className="px-4 py-2 whitespace-nowrap">{tx.description}</td>
                <td className="px-4 py-2 whitespace-nowrap flex gap-2">
                  <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => openEdit(tx)}>Edit</button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(tx)}>Delete</button>
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-400">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ModalForm open={modalOpen} title={editTransaction ? 'Edit Transaction' : 'Add Transaction'} onClose={closeModal}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input name="date" type="date" defaultValue={editTransaction?.date !== '-' ? editTransaction?.date : ''} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Amount</label>
            <input name="amount" type="number" step="0.01" defaultValue={editTransaction?.amount || 0} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Type</label>
            <input name="type" defaultValue={editTransaction?.type || ''} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <input name="description" defaultValue={editTransaction?.description || ''} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={closeModal}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded" disabled={submitting}>{submitting ? 'Saving...' : (editTransaction ? 'Update' : 'Create')}</button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default TransactionsPage;

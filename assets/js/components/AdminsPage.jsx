import React, { useRef, useState, useEffect } from 'react';
import PDFExport from './PDFExport.jsx';
import ModalForm from './ModalForm.jsx';
import Toast from './Toast.jsx';
import axios from '../axios.js';

const AdminsPage = () => {
  const tableRef = useRef();
  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/wp-json/schoolms/v1/admins')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(data => {
        setAdmins(data.map((a, i) => ({
          id: a.id || i + 1,
          name: a.name || 'Unknown',
          email: a.email || '-',
          role: a.role || '-',
        })));
        setLoading(false);
      })
      .catch(e => {
        setError('Could not load admins.');
        setLoading(false);
      });
  }, []);

  const filtered = admins.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.role.toLowerCase().includes(search.toLowerCase())
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

  const openAdd = () => { setEditAdmin(null); setModalOpen(true); };
  const openEdit = admin => { setEditAdmin(admin); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditAdmin(null); };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      role: form.role.value
    };
    try {
      let res;
      if (editAdmin) {
        res = await fetch(`/wp-json/schoolms/v1/admins/${editAdmin.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } else {
        res = await fetch('/wp-json/schoolms/v1/admins', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }
      if (!res.ok) throw new Error('Failed to save admin');
      setToast({ message: editAdmin ? 'Admin updated!' : 'Admin created!', type: 'success' });
      setModalOpen(false);
      // Refresh data
      const refreshed = await fetch('/wp-json/schoolms/v1/admins').then(r => r.json());
      setAdmins(refreshed.map((a, i) => ({
        id: a.id || i + 1,
        name: a.name || 'Unknown',
        email: a.email || '-',
        role: a.role || '-',
      })));
    } catch (e) {
      setToast({ message: e.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async admin => {
    if (!window.confirm('Delete this admin?')) return;
    try {
      const res = await fetch(`/wp-json/schoolms/v1/admins/${admin.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete admin');
      setToast({ message: 'Admin deleted!', type: 'success' });
      setAdmins(admins.filter(a => a.id !== admin.id));
    } catch (e) {
      setToast({ message: e.message, type: 'error' });
    }
  };

  const handleImport = async e => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'teachers');
    try {
      await axios.post('import_csv', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Teachers import successful!');
      // Optionally refresh data
    } catch (err) {
      alert('Teachers import failed!');
    }
  };

  const handleExport = async () => {
    try {
      const res = await axios.get('export_csv', { params: { type: 'teachers' }, responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'teachers.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Teachers export failed!');
    }
  };

  if (loading) return <div className="text-center py-8 text-lg text-primary">Loading admins...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div>
      <Toast message={toast.message ? t(toast.message) : ''} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
      <h2 className="text-xl font-bold mb-4" data-tip="See all recent actions and changes in your school system.">Audit Log <span className="text-gray-400 text-base">(Dynamic from API)</span></h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button onClick={openAdd} className="px-3 py-1 bg-primary text-white rounded hover:bg-blue-700">{t('Add Admin')}</button>
        </div>
        <PDFExport htmlContent={getTableHtml()} />
      </div>
      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <table ref={tableRef} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('id')}>{t('ID')} {sortKey === 'id' ? (sortAsc ? '▲' : '▼') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>{t('Name')} {sortKey === 'name' ? (sortAsc ? '▲' : '▼') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('email')}>{t('Email')} {sortKey === 'email' ? (sortAsc ? '▲' : '▼') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('role')}>{t('Role')} {sortKey === 'role' ? (sortAsc ? '▲' : '▼') : ''}</th>
              <th className="px-4 py-2">{t('Actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sorted.map(admin => (
              <tr key={admin.id}>
                <td className="px-4 py-2 whitespace-nowrap">{admin.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{admin.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{admin.email}</td>
                <td className="px-4 py-2 whitespace-nowrap">{admin.role}</td>
                <td className="px-4 py-2 whitespace-nowrap flex gap-2">
                  <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => openEdit(admin)}>Edit</button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(admin)}>Delete</button>
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">{t('No admins found.')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ModalForm open={modalOpen} title={editAdmin ? t('Edit Admin') : t('Add Admin')} onClose={closeModal}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input name="name" defaultValue={editAdmin?.name || ''} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input name="email" type="email" defaultValue={editAdmin?.email || ''} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Role</label>
            <select name="role" defaultValue={editAdmin?.role || 'Admin'} className="w-full border px-3 py-2 rounded">
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={closeModal}>{t('Cancel')}</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded" disabled={submitting}>{submitting ? t('Saving...') : (editAdmin ? t('Update') : t('Create'))}</button>
          </div>
        </form>
      </ModalForm>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Bulk Import/Export Teachers</h3>
        <div className="flex gap-2">
          <input
            type="file"
            accept=".csv"
            onChange={handleImport}
            className="border px-2 py-1 rounded"
          />
          <button onClick={handleExport} className="px-3 py-1 bg-primary text-white rounded hover:bg-blue-700">Export Teachers CSV</button>
        </div>
      </div>
    </div>
  );
};

export default AdminsPage;

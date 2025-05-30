import React, { useRef, useState, useEffect } from 'react';
import PDFExport from './PDFExport.jsx';
import ModalForm from './ModalForm.jsx';
import Toast from './Toast.jsx';

const RolesPage = () => {
  const tableRef = useRef();
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editRole, setEditRole] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/wp-json/schoolms/v1/roles')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(data => {
        setRoles(data.map((r, i) => ({
          id: r.id || i + 1,
          name: r.name || 'Unknown',
          permissions: r.permissions || '-',
        })));
        setLoading(false);
      })
      .catch(e => {
        setError('Could not load roles.');
        setLoading(false);
      });
  }, []);

  const filtered = roles.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.permissions.toLowerCase().includes(search.toLowerCase())
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

  const openAdd = () => { setEditRole(null); setModalOpen(true); };
  const openEdit = role => { setEditRole(role); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditRole(null); };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target;
    const data = {
      name: form.name.value,
      permissions: form.permissions.value
    };
    try {
      let res;
      if (editRole) {
        res = await fetch(`/wp-json/schoolms/v1/roles/${editRole.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } else {
        res = await fetch('/wp-json/schoolms/v1/roles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }
      if (!res.ok) throw new Error('Failed to save role');
      setToast({ message: editRole ? 'Role updated!' : 'Role created!', type: 'success' });
      setModalOpen(false);
      // Refresh data
      const refreshed = await fetch('/wp-json/schoolms/v1/roles').then(r => r.json());
      setRoles(refreshed.map((r, i) => ({
        id: r.id || i + 1,
        name: r.name || 'Unknown',
        permissions: r.permissions || '-',
      })));
    } catch (e) {
      setToast({ message: e.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async role => {
    if (!window.confirm('Delete this role?')) return;
    try {
      const res = await fetch(`/wp-json/schoolms/v1/roles/${role.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete role');
      setToast({ message: 'Role deleted!', type: 'success' });
      setRoles(roles.filter(r => r.id !== role.id));
    } catch (e) {
      setToast({ message: e.message, type: 'error' });
    }
  };

  if (loading) return <div className="text-center py-8 text-lg text-primary">Loading roles...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
      <h2 className="text-xl font-bold mb-4">Roles Management</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by role or permissions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button onClick={openAdd} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Add Role</button>
        </div>
        <PDFExport htmlContent={getTableHtml()} />
      </div>
      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <table ref={tableRef} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('id')}>ID {sortKey === 'id' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>Role {sortKey === 'name' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('permissions')}>Permissions {sortKey === 'permissions' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sorted.map(role => (
              <tr key={role.id}>
                <td className="px-4 py-2 whitespace-nowrap">{role.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{role.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{role.permissions}</td>
                <td className="px-4 py-2 whitespace-nowrap flex gap-2">
                  <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => openEdit(role)}>Edit</button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(role)}>Delete</button>
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400">No roles found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ModalForm open={modalOpen} title={editRole ? 'Edit Role' : 'Add Role'} onClose={closeModal}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Role Name</label>
            <input name="name" defaultValue={editRole?.name || ''} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Permissions</label>
            <input name="permissions" defaultValue={editRole?.permissions || ''} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={closeModal}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded" disabled={submitting}>{submitting ? 'Saving...' : (editRole ? 'Update' : 'Create')}</button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default RolesPage;

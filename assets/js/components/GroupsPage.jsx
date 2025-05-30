import React, { useRef, useState, useEffect } from 'react';
import PDFExport from './PDFExport.jsx';
import ModalForm from './ModalForm.jsx';
import Toast from './Toast.jsx';

const GroupsPage = () => {
  const tableRef = useRef();
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editGroup, setEditGroup] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/wp-json/schoolms/v1/groups')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(data => {
        setGroups(data.map((g, i) => ({
          id: g.id || i + 1,
          name: g.name || 'Unknown',
          members: g.members || 0,
          status: g.status || '-',
        })));
        setLoading(false);
      })
      .catch(e => {
        setError('Could not load groups.');
        setLoading(false);
      });
  }, []);

  const filtered = groups.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.status.toLowerCase().includes(search.toLowerCase())
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

  const openAdd = () => { setEditGroup(null); setModalOpen(true); };
  const openEdit = group => { setEditGroup(group); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditGroup(null); };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target;
    const data = {
      name: form.name.value,
      members: parseInt(form.members.value, 10),
      status: form.status.value
    };
    try {
      let res;
      if (editGroup) {
        res = await fetch(`/wp-json/schoolms/v1/groups/${editGroup.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } else {
        res = await fetch('/wp-json/schoolms/v1/groups', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      }
      if (!res.ok) throw new Error('Failed to save group');
      setToast({ message: editGroup ? 'Group updated!' : 'Group created!', type: 'success' });
      setModalOpen(false);
      // Refresh data
      const refreshed = await fetch('/wp-json/schoolms/v1/groups').then(r => r.json());
      setGroups(refreshed.map((g, i) => ({
        id: g.id || i + 1,
        name: g.name || 'Unknown',
        members: g.members || 0,
        status: g.status || '-',
      })));
    } catch (e) {
      setToast({ message: e.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async group => {
    if (!window.confirm('Delete this group?')) return;
    try {
      const res = await fetch(`/wp-json/schoolms/v1/groups/${group.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete group');
      setToast({ message: 'Group deleted!', type: 'success' });
      setGroups(groups.filter(g => g.id !== group.id));
    } catch (e) {
      setToast({ message: e.message, type: 'error' });
    }
  };

  if (loading) return <div className="text-center py-8 text-lg text-primary">Loading groups...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
      <h2 className="text-xl font-bold mb-4">Groups</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name or status..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button onClick={openAdd} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Add Group</button>
        </div>
        <PDFExport htmlContent={getTableHtml()} />
      </div>
      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <table ref={tableRef} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('id')}>ID {sortKey === 'id' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>Name {sortKey === 'name' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('members')}>Members {sortKey === 'members' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('status')}>Status {sortKey === 'status' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sorted.map(group => (
              <tr key={group.id}>
                <td className="px-4 py-2 whitespace-nowrap">{group.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{group.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{group.members}</td>
                <td className="px-4 py-2 whitespace-nowrap">{group.status}</td>
                <td className="px-4 py-2 whitespace-nowrap flex gap-2">
                  <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => openEdit(group)}>Edit</button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(group)}>Delete</button>
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-400">No groups found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ModalForm open={modalOpen} title={editGroup ? 'Edit Group' : 'Add Group'} onClose={closeModal}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input name="name" defaultValue={editGroup?.name || ''} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Members</label>
            <input name="members" type="number" min="0" defaultValue={editGroup?.members || 0} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Status</label>
            <input name="status" defaultValue={editGroup?.status || ''} required className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={closeModal}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded" disabled={submitting}>{submitting ? 'Saving...' : (editGroup ? 'Update' : 'Create')}</button>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default GroupsPage;

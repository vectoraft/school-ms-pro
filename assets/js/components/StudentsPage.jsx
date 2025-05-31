import React, { useRef, useState, useEffect } from 'react';
import PDFExport from './PDFExport.jsx';
import axios from '../axios.js';
import { t } from '../t.js';

const StudentsPage = () => {
  const tableRef = useRef();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('students')
      .then(res => {
        setStudents(res.data.map((s, i) => ({
          id: s.id || i + 1,
          name: s.name || 'Unknown',
          grade: s.grade || '-',
          email: s.email || '-',
        })));
        setLoading(false);
      })
      .catch(e => {
        setError('Could not load students.');
        setLoading(false);
      });
  }, []);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
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

  const handleImport = async e => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'students'); // or teachers, staff, etc.
    try {
      await axios.post('import_csv', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Import successful!');
      // Optionally refresh data
    } catch (err) {
      alert('Import failed!');
    }
  };

  const handleExport = async () => {
    try {
      const res = await axios.get('export_csv', { params: { type: 'students' }, responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'students.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Export failed!');
    }
  };

  if (loading) return <div className="text-center py-8 text-lg text-primary">Loading students...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4" data-tip={t("Manage all students, add, import/export, and filter by class or section.")}>{t('Students')} <span className="text-gray-400 text-base">({t('Dynamic from API')})</span></h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={t("Search by name or email...")}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <PDFExport htmlContent={getTableHtml()} />
      </div>
      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <table ref={tableRef} className="min-w-full table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('id')}>{t('ID')} {sortKey === 'id' ? (sortAsc ? '▲' : '▼') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>{t('Name')} {sortKey === 'name' ? (sortAsc ? '▲' : '▼') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('grade')}>{t('Grade')} {sortKey === 'grade' ? (sortAsc ? '▲' : '▼') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('email')}>{t('Email')} {sortKey === 'email' ? (sortAsc ? '▲' : '▼') : ''}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sorted.map(student => (
              <tr key={student.id}>
                <td className="px-4 py-2 whitespace-nowrap">{student.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{student.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{student.grade}</td>
                <td className="px-4 py-2 whitespace-nowrap">{student.email}</td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400">{t('No students found.')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 mt-4">
        <input type="file" accept=".csv" onChange={handleImport} className="border px-2 py-1 rounded" />
        <button onClick={handleExport} className="bg-primary text-white px-4 py-2 rounded">Export CSV</button>
      </div>
    </div>
  );
};

export default StudentsPage;

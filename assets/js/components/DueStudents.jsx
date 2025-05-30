import React, { useRef, useState, useEffect } from 'react';
import PDFExport from './PDFExport.jsx';
import axios from '../axios.js';

const DueStudents = () => {
  const tableRef = useRef();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('students?due_only=1')
      .then(res => {
        setStudents(res.data.map((s, i) => ({
          id: s.id || i + 1,
          name: s.name || 'Unknown',
          due: s.due || 0,
          grade: s.grade || '-',
        })));
        setLoading(false);
      })
      .catch(e => {
        setError('Could not load due students.');
        setLoading(false);
      });
  }, []);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.grade.toLowerCase().includes(search.toLowerCase())
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

  if (loading) return <div className="text-center py-8 text-lg text-primary">Loading due students...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Due Students <span className="text-gray-400 text-base">(Dynamic from API)</span></h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name or grade..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <PDFExport htmlContent={getTableHtml()} />
      </div>
      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <table ref={tableRef} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('id')}>ID {sortKey === 'id' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>Name {sortKey === 'name' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('due')}>Due {sortKey === 'due' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('grade')}>Grade {sortKey === 'grade' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sorted.map(student => (
              <tr key={student.id}>
                <td className="px-4 py-2 whitespace-nowrap">{student.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{student.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">${student.due.toLocaleString()}</td>
                <td className="px-4 py-2 whitespace-nowrap">{student.grade}</td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400">No due students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DueStudents;

import React, { useRef, useState } from 'react';
import PDFExport from './PDFExport.jsx';

const initialStudents = [
  { id: 1, name: 'Alice Johnson', grade: 'A', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', grade: 'B', email: 'bob@example.com' },
  { id: 3, name: 'Charlie Lee', grade: 'A', email: 'charlie@example.com' },
  { id: 4, name: 'Diana King', grade: 'C', email: 'diana@example.com' },
];

const StudentsPage = () => {
  const tableRef = useRef();
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);

  // Filter and sort students
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
    return 0;
  });

  // Convert table HTML to string for PDF export
  const getTableHtml = () => {
    return tableRef.current ? tableRef.current.outerHTML : '';
  };

  // Bulk add students (for demo)
  const handleBulkAdd = () => {
    const bulk = Array.from({ length: 20 }, (_, i) => ({
      id: students.length + i + 1,
      name: `Student ${students.length + i + 1}`,
      grade: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
      email: `student${students.length + i + 1}@example.com`,
    }));
    setStudents([...students, ...bulk]);
  };

  // Sort handler
  const handleSort = key => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Students</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name or email..."
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
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('grade')}>Grade {sortKey === 'grade' ? (sortAsc ? '▲' : '▼') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('email')}>Email {sortKey === 'email' ? (sortAsc ? '▲' : '▼') : ''}</th>
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
                <td colSpan={4} className="text-center py-4 text-gray-400">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsPage;

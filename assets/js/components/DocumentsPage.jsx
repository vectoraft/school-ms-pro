import React, { useRef, useState, useEffect } from 'react';
import PDFExport from './PDFExport.jsx';
import axios from '../axios.js';

const DocumentsPage = () => {
  const tableRef = useRef();
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('documents')
      .then(res => {
        setDocuments(res.data.map((d, i) => ({
          id: d.id || i + 1,
          title: d.title || '-',
          type: d.type || '-',
          uploaded: d.uploaded || '-',
        })));
        setLoading(false);
      })
      .catch(e => {
        setError('Could not load documents.');
        setLoading(false);
      });
  }, []);

  const filtered = documents.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.type.toLowerCase().includes(search.toLowerCase())
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
    formData.append('type', 'library');
    try {
      await axios.post('import_csv', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Library import successful!');
      // Optionally refresh data
    } catch (err) {
      alert('Library import failed!');
    }
  };

  const handleExport = async () => {
    try {
      const res = await axios.get('export_csv', { params: { type: 'library' }, responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'library.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Library export failed!');
    }
  };

  if (loading) return <div className="text-center py-8 text-lg text-primary">Loading documents...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Documents <span className="text-gray-400 text-base">(Dynamic from API)</span></h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by title or type..."
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
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('title')}>Title {sortKey === 'title' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('type')}>Type {sortKey === 'type' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
              <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('uploaded')}>Uploaded {sortKey === 'uploaded' ? (sortAsc ? '\u25b2' : '\u25bc') : ''}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sorted.map(doc => (
              <tr key={doc.id}>
                <td className="px-4 py-2 whitespace-nowrap">{doc.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{doc.title}</td>
                <td className="px-4 py-2 whitespace-nowrap">{doc.type}</td>
                <td className="px-4 py-2 whitespace-nowrap">{doc.uploaded}</td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400">No documents found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 mt-4">
        <input type="file" accept=".csv" onChange={handleImport} className="border px-2 py-1 rounded" />
        <button onClick={handleExport} className="bg-blue-500 text-white px-4 py-2 rounded">Export Library CSV</button>
      </div>
    </div>
  );
};

export default DocumentsPage;

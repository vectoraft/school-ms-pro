import React, { useRef, useState } from 'react';
import PDFExport from './PDFExport.jsx';

const initialPreloader = [
  { id: 1, message: 'Loading School MS Pro...' },
];

const Preloader = () => {
  const tableRef = useRef();
  const [messages, setMessages] = useState(initialPreloader);
  const [search, setSearch] = useState('');
  const filtered = messages.filter(m =>
    m.message.toLowerCase().includes(search.toLowerCase())
  );

  const getTableHtml = () => {
    return tableRef.current ? tableRef.current.outerHTML : '';
  };

  const handleBulkAdd = () => {
    const bulk = Array.from({ length: 5 }, (_, i) => ({
      id: messages.length + i + 1,
      message: `Loading message ${messages.length + i + 1}`,
    }));
    setMessages([...messages, ...bulk]);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Preloader Messages</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search messages..."
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
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map(msg => (
              <tr key={msg.id}>
                <td className="px-4 py-2 whitespace-nowrap">{msg.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{msg.message}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center py-4 text-gray-400">No messages found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Preloader;

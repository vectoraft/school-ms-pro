import React, { useState } from 'react';
import axios from '../axios.js';

const GlobalSearchBar = ({ onResult }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleSearch = async e => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setShow(true);
    try {
      const res = await axios.get('search', { params: { q: query } });
      setResults(res.data);
      if (onResult) onResult(res.data);
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto mb-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
          placeholder="Search students, teachers, parents, messages..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Search</button>
      </form>
      {show && (
        <div className="absolute left-0 right-0 bg-white border rounded shadow mt-1 z-10 max-h-64 overflow-y-auto">
          {loading ? <div className="p-4 text-center">Searching...</div> :
            results.length === 0 ? <div className="p-4 text-gray-400">No results.</div> :
            results.map((r, i) => (
              <div key={i} className="p-2 border-b last:border-b-0 cursor-pointer hover:bg-blue-50" onClick={() => {
                window.dispatchEvent(new CustomEvent('schoolms:navigate', { detail: { url: r.url } }));
                setShow(false);
              }}>
                <b>{r.type}:</b> {r.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchBar;

import React, { useState, useEffect } from 'react';
import axios from '../axios.js';

const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [promotionTarget, setPromotionTarget] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPromotion, setShowPromotion] = useState(false);
  const [promoting, setPromoting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get('sessions'),
      axios.get('classes'),
      axios.get('students'),
    ])
      .then(([sess, cls, std]) => {
        setSessions(sess.data);
        setClasses(cls.data);
        setStudents(std.data);
        setActiveSession(sess.data.find(s => s.active));
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load sessions/classes/students.');
        setLoading(false);
      });
  }, []);

  const handleSetActive = async (id) => {
    await axios.post('sessions/set_active', { id });
    setActiveSession(sessions.find(s => s.id === id));
  };

  const handlePromote = async () => {
    setPromoting(true);
    try {
      await axios.post('students/promote', { fromClass: selectedClass, toClass: promotionTarget });
      setMessage('Promotion successful!');
    } catch {
      setMessage('Promotion failed.');
    }
    setPromoting(false);
  };

  if (loading) return <div>Loading sessions...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4" data-tip="Manage academic sessions and promote students in bulk.">Sessions & Promotion</h2>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Sessions</h3>
        <ul>
          {sessions.map(s => (
            <li key={s.id} className="mb-1">
              <span className={s.active ? 'font-bold text-green-600' : ''}>{s.name}</span>
              {!s.active && (
                <button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded" onClick={() => handleSetActive(s.id)}>Set Active</button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Bulk Promotion</h3>
        <button className="px-3 py-1 bg-primary text-white rounded mb-2" onClick={() => setShowPromotion(v => !v)}>
          {showPromotion ? 'Hide Promotion' : 'Show Promotion'}
        </button>
        {showPromotion && (
          <div className="p-4 border rounded bg-gray-50 mt-2">
            <div className="mb-2">
              <label className="block mb-1">From Class</label>
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="border px-2 py-1 rounded">
                <option value="">Select class</option>
                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="mb-2">
              <label className="block mb-1">To Class</label>
              <select value={promotionTarget} onChange={e => setPromotionTarget(e.target.value)} className="border px-2 py-1 rounded">
                <option value="">Select class</option>
                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={handlePromote} disabled={promoting || !selectedClass || !promotionTarget}>
              {promoting ? 'Promoting...' : 'Promote Students'}
            </button>
            {message && <div className="mt-2 text-primary">{message}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionsPage;

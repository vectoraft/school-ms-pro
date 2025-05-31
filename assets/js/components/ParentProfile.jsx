import React, { useState, useEffect } from 'react';
import axios from '../axios.js';
import { t } from '../t.js';

const tabs = [
  { key: 'info', label: 'Info' },
  { key: 'students', label: 'Linked Students' },
  { key: 'messages', label: 'Messages' },
  { key: 'attachments', label: 'Attachments' },
];

const ParentProfile = ({ parentId }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [parent, setParent] = useState(null);
  const [students, setStudents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`parents/${parentId}`),
      axios.get(`parents/${parentId}/students`),
      axios.get(`messages?parent_id=${parentId}`),
      axios.get(`files?parent_id=${parentId}`),
    ])
      .then(([p, s, m, att]) => {
        setParent(p.data);
        setStudents(s.data);
        setMessages(m.data);
        setAttachments(att.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load parent profile.');
        setLoading(false);
      });
  }, [parentId]);

  const handleFileUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('parent_id', parentId);
    try {
      await axios.post('files', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      // Refresh attachments
      const att = await axios.get(`files?parent_id=${parentId}`);
      setAttachments(att.data);
    } catch {
      alert('Upload failed!');
    }
    setUploading(false);
  };

  if (loading) return <div className="text-center py-8 text-lg text-primary">Loading profile...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!parent) return <div className="text-center py-8 text-gray-400">Parent not found.</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <button className="mb-4 text-blue-600 underline" onClick={() => window.history.back()}>&larr; Back</button>
      <div className="flex gap-4 mb-4 border-b">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`px-4 py-2 font-semibold border-b-2 ${activeTab === tab.key ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === 'info' && (
        <div>
          <h2 className="text-xl font-bold mb-4" data-tip={t("View and manage all parents and their linked students.")}>{t('Parents')} <span className="text-gray-400 text-base">({t('Dynamic from API')})</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><b>Email:</b> {parent.email}</div>
            <div><b>Phone:</b> {parent.phone}</div>
            <div><b>Address:</b> {parent.address}</div>
          </div>
        </div>
      )}
      {activeTab === 'students' && (
        <div>
          <h3 className="font-semibold mb-2">Linked Students</h3>
          <ul className="space-y-2">
            {students.map((s, i) => (
              <li key={i}>{s.name} (Class: {s.class})</li>
            ))}
            {students.length === 0 && <li className="text-gray-400">No linked students.</li>}
          </ul>
        </div>
      )}
      {activeTab === 'messages' && (
        <div>
          <h3 className="font-semibold mb-2">Messages</h3>
          <ul className="space-y-2">
            {messages.map((m, i) => (
              <li key={i} className="border rounded p-2"><b>{m.from_name}:</b> {m.message}</li>
            ))}
            {messages.length === 0 && <li className="text-gray-400">No messages.</li>}
          </ul>
        </div>
      )}
      {activeTab === 'attachments' && (
        <div>
          <h3 className="font-semibold mb-2">Attachments</h3>
          <div className="mb-2">
            <input type="file" onChange={handleFileUpload} disabled={uploading} />
            {uploading && <span className="ml-2 text-primary">Uploading...</span>}
          </div>
          <ul className="space-y-2">
            {attachments.map((a, i) => (
              <li key={i}><a href={a.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{a.file_name || a.file_url}</a></li>
            ))}
            {attachments.length === 0 && <li className="text-gray-400">No attachments.</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ParentProfile;

import React, { useState, useEffect } from 'react';
import axios from '../axios.js';

const tabs = [
  { key: 'info', label: 'Info' },
  { key: 'attendance', label: 'Attendance' },
  { key: 'fees', label: 'Fees' },
  { key: 'messages', label: 'Messages' },
  { key: 'attachments', label: 'Attachments' },
];

const StudentProfile = ({ studentId }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [fees, setFees] = useState([]);
  const [messages, setMessages] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`students/${studentId}`),
      axios.get(`attendance?student_id=${studentId}`),
      axios.get(`fees?student_id=${studentId}`),
      axios.get(`messages?student_id=${studentId}`),
      axios.get(`files?student_id=${studentId}`),
    ])
      .then(([s, a, f, m, att]) => {
        setStudent(s.data);
        setAttendance(a.data);
        setFees(f.data);
        setMessages(m.data);
        setAttachments(att.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load student profile.');
        setLoading(false);
      });
  }, [studentId]);

  const handleFileUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('student_id', studentId);
    try {
      await axios.post('files', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      // Refresh attachments
      const att = await axios.get(`files?student_id=${studentId}`);
      setAttachments(att.data);
    } catch {
      alert('Upload failed!');
    }
    setUploading(false);
  };

  if (loading) return <div className="text-center py-8 text-lg text-primary">Loading profile...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!student) return <div className="text-center py-8 text-gray-400">Student not found.</div>;

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
          <h2 className="text-xl font-bold mb-2">{student.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><b>Roll No:</b> {student.roll_no}</div>
            <div><b>Class:</b> {student.class}</div>
            <div><b>Status:</b> {student.status}</div>
            <div><b>Email:</b> {student.email}</div>
            <div><b>Phone:</b> {student.phone}</div>
            <div><b>Parent:</b> {student.parent_name || 'N/A'}</div>
          </div>
        </div>
      )}
      {activeTab === 'attendance' && (
        <div>
          <h3 className="font-semibold mb-2">Attendance</h3>
          <table className="min-w-full table-auto border">
            <thead><tr><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {attendance.map((a, i) => (
                <tr key={i}><td>{a.date}</td><td>{a.status}</td></tr>
              ))}
              {attendance.length === 0 && <tr><td colSpan={2} className="text-center text-gray-400">No records.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === 'fees' && (
        <div>
          <h3 className="font-semibold mb-2">Fee History</h3>
          <table className="min-w-full table-auto border">
            <thead><tr><th>Date</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {fees.map((f, i) => (
                <tr key={i}><td>{f.date}</td><td>{f.type}</td><td>{f.amount}</td><td>{f.status}</td></tr>
              ))}
              {fees.length === 0 && <tr><td colSpan={4} className="text-center text-gray-400">No records.</td></tr>}
            </tbody>
          </table>
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

export default StudentProfile;

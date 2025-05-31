import React, { useState, useEffect } from 'react';
import axios from '../axios.js';
import { t } from '../t.js';

const tabs = [
  { key: 'info', label: 'Info' },
  { key: 'timetable', label: 'Timetable' },
  { key: 'subjects', label: 'Subjects' },
  { key: 'messages', label: 'Messages' },
  { key: 'attachments', label: 'Attachments' },
  { key: 'calendar', label: 'Google Calendar' },
];

const TeacherProfile = ({ teacherId }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [teacher, setTeacher] = useState(null);
  const [timetable, setTimetable] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [calendarUrl, setCalendarUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`admins/${teacherId}`),
      axios.get(`timetable?teacher_id=${teacherId}`),
      axios.get(`subjects?teacher_id=${teacherId}`),
      axios.get(`messages?teacher_id=${teacherId}`),
      axios.get(`files?teacher_id=${teacherId}`),
      axios.get(`calendar?teacher_id=${teacherId}`),
    ])
      .then(([t, tt, s, m, att, cal]) => {
        setTeacher(t.data);
        setTimetable(tt.data);
        setSubjects(s.data);
        setMessages(m.data);
        setAttachments(att.data);
        setCalendarUrl(cal.data.url || '');
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load teacher profile.');
        setLoading(false);
      });
  }, [teacherId]);

  const handleFileUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('teacher_id', teacherId);
    try {
      await axios.post('files', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      // Refresh attachments
      const att = await axios.get(`files?teacher_id=${teacherId}`);
      setAttachments(att.data);
    } catch {
      alert('Upload failed!');
    }
    setUploading(false);
  };

  const handleConnectCalendar = async () => {
    // Redirect to Google OAuth (backend should handle the flow)
    window.location.href = `/wp-json/schoolms/v1/calendar_auth?teacher_id=${teacherId}`;
  };

  if (loading) return <div className="text-center py-8 text-lg text-primary">Loading profile...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!teacher) return <div className="text-center py-8 text-gray-400">Teacher not found.</div>;

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
          <h2 className="text-xl font-bold mb-4" data-tip={t("View and manage all teachers, subjects, and assignments.")}>{t('Teachers')} <span className="text-gray-400 text-base">({t('Dynamic from API')})</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><b>Email:</b> {teacher.email}</div>
            <div><b>Phone:</b> {teacher.phone}</div>
            <div><b>Role:</b> {teacher.role}</div>
            <div><b>Bio:</b> {teacher.bio || 'N/A'}</div>
          </div>
        </div>
      )}
      {activeTab === 'timetable' && (
        <div>
          <h3 className="font-semibold mb-2">Timetable</h3>
          <table className="min-w-full table-auto border">
            <thead><tr><th>Class</th><th>Subject</th><th>Start</th><th>End</th></tr></thead>
            <tbody>
              {timetable.map((tt, i) => (
                <tr key={i}><td>{tt.class}</td><td>{tt.subject}</td><td>{tt.start_time}</td><td>{tt.end_time}</td></tr>
              ))}
              {timetable.length === 0 && <tr><td colSpan={4} className="text-center text-gray-400">No records.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === 'subjects' && (
        <div>
          <h3 className="font-semibold mb-2">Subjects</h3>
          <ul className="space-y-2">
            {subjects.map((s, i) => (
              <li key={i}>{s.name}</li>
            ))}
            {subjects.length === 0 && <li className="text-gray-400">No subjects.</li>}
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
      {activeTab === 'calendar' && (
        <div>
          <h3 className="font-semibold mb-2">Google Calendar</h3>
          {calendarUrl ? (
            <iframe src={calendarUrl} title="Google Calendar" className="w-full h-96 border rounded" />
          ) : (
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleConnectCalendar}>Connect Google Calendar</button>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherProfile;

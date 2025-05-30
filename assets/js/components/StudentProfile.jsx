import React, { useEffect, useState } from 'react';
import axios from '../axios.js';

const StudentProfile = ({ studentId, onBack }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!studentId) return;
    setLoading(true);
    axios.get(`students/${studentId}/profile`)
      .then(res => {
        setStudent(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load student profile.');
        setLoading(false);
      });
  }, [studentId]);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!student) return null;

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">&larr; Back to Students</button>
      <div className="flex gap-6 items-center mb-6">
        <img src={student.photo_url || '/wp-content/plugins/school-ms-pro/assets/img/avatar-student.png'} alt="Profile" className="w-24 h-24 rounded-full border" />
        <div>
          <h2 className="text-2xl font-bold">{student.name}</h2>
          <div className="text-gray-600">Roll: {student.roll_number} | Class: {student.class} | Section: {student.section}</div>
          <div className="text-gray-500">Status: {student.status}</div>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Contact Info</h3>
        <div>Email: {student.email}</div>
        <div>Phone: {student.phone}</div>
        <div>Address: {student.address}</div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Parent/Guardian</h3>
        {student.parent ? (
          <div>{student.parent.name} ({student.parent.relation})<br/>Phone: {student.parent.phone} | Email: {student.parent.email}</div>
        ) : <div className="text-gray-400">No parent linked.</div>}
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Attendance</h3>
        <div>Total Days: {student.attendance?.total_days ?? '-'} | Present: {student.attendance?.present ?? '-'} | Absent: {student.attendance?.absent ?? '-'}</div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Fee History</h3>
        <table className="min-w-full text-sm">
          <thead><tr><th>Date</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            {student.fees?.length ? student.fees.map((fee, i) => (
              <tr key={i}>
                <td>{fee.date}</td>
                <td>{fee.type}</td>
                <td>${fee.amount}</td>
                <td>{fee.status}</td>
              </tr>
            )) : <tr><td colSpan={4} className="text-center text-gray-400">No fee records.</td></tr>}
          </tbody>
        </table>
      </div>
      {/* Attachments, messages, etc. can be added here */}
    </div>
  );
};

export default StudentProfile;

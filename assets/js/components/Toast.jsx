import React from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;
  const bg = type === 'error' ? 'bg-red-100' : 'bg-green-100';
  const text = type === 'error' ? 'text-red-600' : 'text-green-600';
  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded shadow-lg border ${bg} ${text} transition-all animate-fade-in`} role="alert">
      <span>{message}</span>
      <button className="ml-4 text-lg" onClick={onClose}>&times;</button>
    </div>
  );
};

export default Toast;

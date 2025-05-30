// Main React entry for SPA dashboard
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import '../css/main.css';
import '../css/custom-theme.css';

const container = document.getElementById('school-ms-pro-root');
if (container) {
  createRoot(container).render(<App />);
}

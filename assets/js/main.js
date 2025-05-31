// Main React entry for SPA dashboard
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import '../css/main.css';
import '../css/custom-theme.css';
import '../css/print.css';
import '../css/tailwind-dashboard.css';
import '../css/montserrat.css';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const container = document.getElementById('school-ms-pro-root');
if (container) {
  // Get the page/route from data attribute (for admin, shortcode, or Elementor)
  const page = container.getAttribute('data-schoolms-page') || 'dashboard';
  createRoot(container).render(<App initialPage={page} />);
}

useEffect(() => {
  tippy('[data-tip]', { placement: 'top', theme: 'light-border' });
}, []);

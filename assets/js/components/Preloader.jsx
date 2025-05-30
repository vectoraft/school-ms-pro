import React from 'react';
const Preloader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    <span className="ml-4 text-xl font-semibold font-montserrat">Loading School MS Pro...</span>
  </div>
);
export default Preloader;
